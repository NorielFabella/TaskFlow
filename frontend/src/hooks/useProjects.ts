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

import { useActivity } from "./useActivity";


const STORAGE_KEY = "taskflow-projects";


export function useProjects() {

    const [projects, setProjects] = useState<Project[]>(() =>
        load(
            STORAGE_KEY,
            initialProjects
        )
    );


    const {
        createActivity,
    } = useActivity();



    useEffect(() => {

        save(
            STORAGE_KEY,
            projects
        );

    }, [projects]);



    function createProject(
        newProject: ProjectFormData
    ) {

        const project = {
            id: Date.now(),
            ...newProject,
            progress: 0,
            tasks: 0,
        };


        setProjects((previous) =>
            createProjectService(
                previous,
                newProject
            )
        );


        createActivity({

            id: Date.now(),

            type: "project",

            title: "Project Created",

            description:
                `"${project.name}" was created.`,

            time: "Just now",

        });

    }



    function updateProject(
        id: number,
        updatedProject: ProjectFormData
    ) {


        const existingProject =
            projects.find(
                (project) =>
                    project.id === id
            );


        setProjects((previous) =>
            updateProjectService(
                previous,
                id,
                updatedProject
            )
        );



        if (existingProject) {

            createActivity({

                id: Date.now(),

                type: "project",

                title: "Project Updated",

                description:
                    `"${existingProject.name}" was updated.`,

                time: "Just now",

            });

        }

    }



    function deleteProject(
        id: number
    ) {


        const project =
            projects.find(
                (project) =>
                    project.id === id
            );


        setProjects((previous) =>
            deleteProjectService(
                previous,
                id
            )
        );



        if (project) {

            createActivity({

                id: Date.now(),

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