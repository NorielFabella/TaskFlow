import type { Project, ProjectStatus } from "../types/project";
import type { Task } from "../types/task";

export interface ProjectProgress {
    totalTasks: number;
    completedTasks: number;
    progress: number;
    status: ProjectStatus;
}

export function getProjectProgress(
    project: Project,
    tasks: Task[]
): ProjectProgress {

    const projectTasks = tasks.filter(
        (task) => task.projectId === project.id
    );

    const totalTasks = projectTasks.length;

    const completedTasks = projectTasks.filter(
        (task) => task.completed
    ).length;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round(
                  (completedTasks / totalTasks) * 100
              );

    let status: ProjectStatus;

    if (totalTasks === 0) {

        status = "Not Started";

    } else if (completedTasks === totalTasks) {

        status = "Completed";

    } else {

        status = "In Progress";

    }

    return {
        totalTasks,
        completedTasks,
        progress,
        status,
    };

}