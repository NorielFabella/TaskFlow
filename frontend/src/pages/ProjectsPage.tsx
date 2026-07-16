import { useState } from "react";

import ProjectsToolbar from "../features/projects/components/ProjectsToolbar";
import ProjectCard from "../features/projects/components/ProjectCard";
import EmptyProjects from "../features/projects/components/EmptyProjects";
import ProjectModal from "../features/projects/components/ProjectModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { toast } from "sonner";

import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { getProjectProgress } from "../services/projectProgress.service";

import type { Project, ProjectFormData } from "../types/project";
import PageHeader from "../components/common/PageHeader";

export default function ProjectsPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const [modalOpen, setModalOpen] = useState(false);

    const [editingProject, setEditingProject] =
        useState<Project | undefined>();

    const [deletingProject, setDeletingProject] =
        useState<Project | undefined>();

    const {
        projects,
        createProject,
        updateProject,
        deleteProject
    } = useProjects();

    const { tasks } = useTasks();

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

    function handleCreateProject(
        newProject: ProjectFormData
    ) {
        createProject(newProject);
        toast.success("Project created.");
        setModalOpen(false);
    }

    function handleUpdateProject(
        updatedProject: ProjectFormData
    ) {
        if (!editingProject) return;

        updateProject(
            editingProject.id,
            updatedProject
        );

        toast.success("Project updated.");

        setEditingProject(undefined);
        setModalOpen(false);
    }

    function handleDeleteProject() {
        if (!deletingProject) return;

        deleteProject(deletingProject.id);
        toast.success("Project deleted.");
        setDeletingProject(undefined);
    }

    function handleEditProject(project: Project) {
        setEditingProject(project);
        setModalOpen(true);
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
                    onCreateProject={() => setModalOpen(true)}
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

            <ProjectModal
                open={modalOpen}
                project={editingProject}
                title={
                    editingProject
                        ? "Edit Project"
                        : "Create Project"
                }
                submitLabel={
                    editingProject
                        ? "Save Changes"
                        : "Create Project"
                }
                onClose={() => {
                    setModalOpen(false);
                    setEditingProject(undefined);
                }}
                onSubmit={
                    editingProject
                        ? handleUpdateProject
                        : handleCreateProject
                }
            />

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
                onCancel={() => setDeletingProject(undefined)}
            />

        </div>
    );
}