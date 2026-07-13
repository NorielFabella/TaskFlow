import type { Project, ProjectFormData } from "../types/project";

export function createProject(
    projects: Project[],
    newProject: ProjectFormData
): Project[] {
    const project: Project = {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
        status: newProject.status,
        progress: 0,
        tasks: 0,
    };

    return [project, ...projects];
}

export function updateProject(
    projects: Project[],
    projectId: number,
    updatedProject: ProjectFormData
): Project[] {
    return projects.map((project) =>
        project.id === projectId
            ? {
                  ...project,
                  ...updatedProject,
              }
            : project
    );
}

export function deleteProject(
    projects: Project[],
    projectId: number
): Project[] {
    return projects.filter(
        (project) => project.id !== projectId
    );
}