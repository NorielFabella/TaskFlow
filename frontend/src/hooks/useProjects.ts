import { useEffect, useState } from "react";

import { projects as initialProjects } from "../data/projects";

import {
    load,
    save,
} from "../services/storage";

import {
    createProject as createProjectService,
    updateProject as updateProjectService,
    deleteProject as deleteProjectService,
} from "../services/project.service";

import type {
    Project,
    ProjectFormData,
} from "../types/project";

const STORAGE_KEY = "taskflow-projects";

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>(() =>
        load(STORAGE_KEY, initialProjects)
    );

    useEffect(() => {
        save(STORAGE_KEY, projects);
    }, [projects]);

    function createProject(newProject: ProjectFormData) {
        setProjects((previous) =>
            createProjectService(previous, newProject)
        );
    }

    function updateProject(
        id: number,
        updatedProject: ProjectFormData
    ) {
        setProjects((previous) =>
            updateProjectService(
                previous,
                id,
                updatedProject
            )
        );
    }

    function deleteProject(id: number) {
        setProjects((previous) =>
            deleteProjectService(previous, id)
        );
    }

    return {
        projects,
        createProject,
        updateProject,
        deleteProject,
    };
}