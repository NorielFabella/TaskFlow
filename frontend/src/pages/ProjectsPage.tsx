import { useState } from "react";
import { toast } from "sonner";

import ProjectsToolbar from "../features/projects/components/ProjectsToolbar";
import ProjectCard from "../features/projects/components/ProjectCard";
import EmptyProjects from "../features/projects/components/EmptyProjects";

import ConfirmDialog from "../components/ui/ConfirmDialog";
import PageHeader from "../components/common/PageHeader";

import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";

import { getProjectProgress } from "../services/projectProgress.service";

import { useProjectModal } from "../features/projects/context/ProjectModalContext";

import { useTasksContext } from "../features/tasks/context/TasksContext";

import type { Project } from "../types/project";

export default function ProjectsPage() {

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");

    const [deletingProject, setDeletingProject] =
        useState<Project | undefined>();

    const {
        openCreateModal,
        openEditModal,
    } = useProjectModal();

    const {
        projects,
        deleteProject,
    } = useProjects();

    const { tasks } = useTasks();

    const {
        refreshTasks,
    } = useTasksContext();

    const filteredProjects = projects.filter((project) => {

        const matchesSearch =
            project.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const projectStats =
            getProjectProgress(project, tasks);

        const matchesStatus =
            status === "All" ||
            projectStats.status === status;

        return (
            matchesSearch &&
            matchesStatus
        );

    });

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

    function handleEditProject(
        project: Project
    ) {

        openEditModal(project);

    }

    return (

        <div className="space-y-8">

            <PageHeader
                title="Projects"
                subtitle="Manage all of your projects."
            >

                <ProjectsToolbar
                    search={search}
                    status={status}
                    onSearchChange={setSearch}
                    onStatusChange={setStatus}
                    onCreateProject={openCreateModal}
                />

            </PageHeader>

            {filteredProjects.length > 0 ? (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {filteredProjects.map((project) => (

                        <ProjectCard
                            key={project.id}
                            project={project}
                            tasks={tasks}
                            onEdit={handleEditProject}
                            onDelete={setDeletingProject}
                        />

                    ))}

                </div>

            ) : (

                <EmptyProjects />

            )}

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

        </div>

    );

}