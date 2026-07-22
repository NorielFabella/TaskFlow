import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    getProjects,
    createProject as createProjectService,
    updateProject as updateProjectService,
    deleteProject as deleteProjectService,
} from "../../../services/project.service";

import type {
    Project,
    ProjectFormData,
} from "../../../types/project";

import { useActivity } from "../../../hooks/useActivity";

interface ProjectsContextValue {

    projects: Project[];

    createProject: (
        project: ProjectFormData
    ) => Promise<void>;

    updateProject: (
        id: number,
        project: ProjectFormData
    ) => Promise<void>;

    deleteProject: (
        id: number
    ) => Promise<void>;

    refreshProjects: () => Promise<void>;

}

const ProjectsContext =
    createContext<ProjectsContextValue | null>(
        null
    );

export function ProjectsProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [projects, setProjects] =
        useState<Project[]>([]);

    const {
        createActivity,
    } = useActivity();

    async function refreshProjects() {

        const data =
            await getProjects();

        setProjects(data);

    }

    useEffect(() => {

        refreshProjects();

    }, []);

    async function createProject(
        project: ProjectFormData
    ) {

        await createProjectService(project);

        await refreshProjects();

        createActivity({
            type: "project",
            title: "Project Created",
            description: `"${project.name}" was created.`,
            time: "Just now",
        });

    }

    async function updateProject(
        id: number,
        project: ProjectFormData
    ) {

        await updateProjectService(
            id,
            project
        );

        await refreshProjects();

        createActivity({
            type: "project",
            title: "Project Updated",
            description: `"${project.name}" was updated.`,
            time: "Just now",
        });

    }

    async function deleteProject(
        id: number
    ) {

        const project =
            projects.find(
                (p) => p.id === id
            );

        await deleteProjectService(id);

        await refreshProjects();

        if (project) {

            createActivity({
                type: "project",
                title: "Project Deleted",
                description: `"${project.name}" was removed.`,
                time: "Just now",
            });

        }

    }

    const value = useMemo(
        () => ({
            projects,
            createProject,
            updateProject,
            deleteProject,
            refreshProjects,
        }),
        [projects]
    );

    return (

        <ProjectsContext.Provider value={value}>

            {children}

        </ProjectsContext.Provider>

    );

}

export function useProjectsContext() {

    const context =
        useContext(ProjectsContext);

    if (!context) {

        throw new Error(
            "useProjectsContext must be used inside ProjectsProvider."
        );

    }

    return context;

}