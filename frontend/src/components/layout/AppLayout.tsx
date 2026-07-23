import { Outlet } from "react-router-dom";

import { toast } from "sonner";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import ProjectModal from "../../features/projects/components/ProjectModal";

import {
    ProjectModalProvider,
    useProjectModal,
} from "../../features/projects/context/ProjectModalContext";

import { useProjects } from "../../hooks/useProjects";

import type { ProjectFormData } from "../../types/project";

function AppLayoutContent() {

    const {
        open,
        editingProject,
        closeModal,
    } = useProjectModal();

    const {
        createProject,
        updateProject,
    } = useProjects();

    function handleSubmitProject(
        data: ProjectFormData
    ) {
        if (editingProject) {
            updateProject(
                editingProject.id,
                data
            );
            toast.success(
                "Project updated."
            );
        } else {
            createProject(data);
            toast.success(
                "Project created."
            );
        }
        closeModal();
    }

    return (

        <div className="flex h-screen overflow-hidden bg-zinc-950 text-white">

            <aside className="hidden md:flex">
                <Sidebar />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar />

                <main className="flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-6 lg:p-8">

                    <div className="mx-auto w-full max-w-7xl">

                        <Outlet />

                    </div>

                </main>

            </div>

            <ProjectModal
                open={open}
                project={editingProject ?? undefined}
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
                onClose={closeModal}
                onSubmit={handleSubmitProject}
            />

        </div>

    );

}

export default function AppLayout() {

    return (

        <ProjectModalProvider>

            <AppLayoutContent />

        </ProjectModalProvider>

    );

}
