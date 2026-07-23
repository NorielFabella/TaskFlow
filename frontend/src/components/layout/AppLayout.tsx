import { useState } from "react";
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

    const [mobileSidebarOpen, setMobileSidebarOpen] =
        useState(false);

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

            <aside className="hidden lg:flex">
                <Sidebar />
            </aside>

            <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 lg:hidden ${
                    mobileSidebarOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
                aria-label="Close navigation"
            />

            <div
                id="mobile-navigation"
                className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 lg:hidden ${
                    mobileSidebarOpen
                        ? "translate-x-0"
                        : "pointer-events-none -translate-x-full"
                }`}
                aria-hidden={!mobileSidebarOpen}
                inert={!mobileSidebarOpen}
            >
                <Sidebar
                    onNavigate={() => setMobileSidebarOpen(false)}
                />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    isMenuOpen={mobileSidebarOpen}
                    onMenuToggle={() =>
                        setMobileSidebarOpen((open) => !open)
                    }
                />

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
