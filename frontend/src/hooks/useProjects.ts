import { useEffect, useState } from "react";

import {
    getProjects,
    createProject as createProjectService,
    updateProject as updateProjectService,
    deleteProject as deleteProjectService,
} from "../services/project.service";

import type {
    Project,
    ProjectFormData,
} from "../types/project";

import { useActivity } from "./useActivity";

export function useProjects() {

    const [projects, setProjects] = useState<Project[]>([]);

    const {
        createActivity,
    } = useActivity();

    async function loadProjects() {

        const data = await getProjects();

        setProjects(data);

    }

    useEffect(() => {

        loadProjects();

    }, []);

    async function createProject(
        newProject: ProjectFormData
    ) {

        await createProjectService(
            newProject
        );

        await loadProjects();

        createActivity({
            type: "project",
            title: "Project Created",
            description:
                `"${newProject.name}" was created.`,
            time: "Just now",

        });

    }

    async function updateProject(
        id: number,
        updatedProject: ProjectFormData
    ) {

        await updateProjectService(
            id,
            updatedProject
        );

        await loadProjects();

        createActivity({
            type: "project",
            title: "Project Updated",
            description:
                `"${updatedProject.name}" was updated.`,
            time: "Just now",
        });

    }

    async function deleteProject(
        id: number
    ) {

        const project =
            projects.find(
                (project) =>
                    project.id === id
            );

        await deleteProjectService(id);

        await loadProjects();

        if (project) {

            createActivity({
                type: "project",
                title: "Project Deleted",
                description:
                    `"${project.name}" was removed.`,
                time: "Just now",
            });

        }

    }

    return {

        projects,

        createProject,

        updateProject,

        deleteProject,

    };

}