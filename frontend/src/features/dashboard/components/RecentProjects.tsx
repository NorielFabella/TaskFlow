import { useState } from "react";
import { toast } from "sonner";

import Card from "../../../components/ui/Card";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import SectionHeader from "../../../components/common/SectionHeader";

import EmptyProjects from "../../projects/components/EmptyProjects";
import ProjectCard from "../../projects/components/ProjectCard";

import { useProjects } from "../../../hooks/useProjects";
import { useTasks } from "../../../hooks/useTasks";

import { useProjectModal } from "../../projects/context/ProjectModalContext";
import { useTasksContext } from "../../tasks/context/TasksContext";

import type { Project } from "../../../types/project";

export default function RecentProjects() {

    const {
        projects,
        deleteProject,
    } = useProjects();

    const {
        tasks,
    } = useTasks();

    const {
        openEditModal,
    } = useProjectModal();

    const {
        refreshTasks,
    } = useTasksContext();

    const [deletingProject, setDeletingProject] =
        useState<Project | undefined>();

    const recentProjects =
        projects.slice(0, 3);

    async function handleDeleteProject() {
        if (!deletingProject) return;
        await deleteProject(
            deletingProject.id
        );
        await refreshTasks();
        toast.success(
            "Project deleted."
        );
        setDeletingProject(undefined);
    }

    return (

        <>

            <Card className="flex h-full flex-col">

                <SectionHeader
                    title="Recent Projects"
                    subtitle="Your latest active projects."
                />

                {recentProjects.length > 0 ? (

                    <div className="space-y-4">

                        {recentProjects.map((project) => (

                            <ProjectCard
                                key={project.id}
                                project={project}
                                tasks={tasks}
                                onEdit={openEditModal}
                                onDelete={setDeletingProject}
                            />

                        ))}

                    </div>

                ) : (

                    <EmptyProjects />

                )}

            </Card>

            <ConfirmDialog
                open={!!deletingProject}
                title="Delete Project"
                description={
                    deletingProject
                        ? `Are you sure you want to delete "${deletingProject.name}"?`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleDeleteProject}
                onCancel={() =>
                    setDeletingProject(undefined)
                }
            />

        </>

    );

}