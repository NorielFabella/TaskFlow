import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type { Project } from "../../../types/project";

interface ProjectModalContextValue {

    open: boolean;

    editingProject: Project | null;

    openCreateModal: () => void;

    openEditModal: (
        project: Project
    ) => void;

    closeModal: () => void;

}

const ProjectModalContext =
    createContext<ProjectModalContextValue | null>(
        null
    );

export function ProjectModalProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [open, setOpen] =
        useState(false);

    const [editingProject, setEditingProject] =
        useState<Project | null>(null);

    function openCreateModal() {

        setEditingProject(null);

        setOpen(true);

    }

    function openEditModal(
        project: Project
    ) {

        setEditingProject(project);

        setOpen(true);

    }

    function closeModal() {

        setEditingProject(null);

        setOpen(false);

    }

    const value = useMemo(
        () => ({
            open,
            editingProject,
            openCreateModal,
            openEditModal,
            closeModal,
        }),
        [
            open,
            editingProject,
        ]
    );

    return (

        <ProjectModalContext.Provider
            value={value}
        >

            {children}

        </ProjectModalContext.Provider>

    );

}

export function useProjectModal() {

    const context =
        useContext(ProjectModalContext);

    if (!context) {

        throw new Error(
            "useProjectModal must be used inside ProjectModalProvider."
        );

    }

    return context;

}