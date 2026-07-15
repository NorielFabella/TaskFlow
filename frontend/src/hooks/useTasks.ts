import { useEffect, useState } from "react";

import { tasks as initialTasks } from "../data/tasks";

import type {
    Task,
    TaskFormData,
} from "../types/task";

import {
    load,
    save,
} from "../services/storage";

import {
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompleted,
} from "../services/task.service";

import { useActivity } from "./useActivity";


const STORAGE_KEY = "taskflow-tasks";


export function useTasks() {

    const [tasks, setTasks] = useState<Task[]>(() =>
        load(STORAGE_KEY, initialTasks)
    );


    const {
        createActivity,
    } = useActivity();



    useEffect(() => {

        save(
            STORAGE_KEY,
            tasks
        );

    }, [tasks]);



    return {

        tasks,


        createTask(
            newTask: TaskFormData
        ) {

            const task = {
                id: Date.now(),
                completed: false,
                ...newTask,
            };


            setTasks((previous) =>
                createTask(
                    previous,
                    newTask
                )
            );


            createActivity({

                id: Date.now(),

                type: "task",

                title: "Task Created",

                description:
                    `"${task.title}" was added.`,

                time: "Just now",

            });

        },



        updateTask(
            id: number,
            updatedTask: TaskFormData
        ) {


            const existingTask =
                tasks.find(
                    (task) =>
                        task.id === id
                );


            setTasks((previous) =>
                updateTask(
                    previous,
                    id,
                    updatedTask
                )
            );


            if (existingTask) {

                createActivity({

                    id: Date.now(),

                    type: "task",

                    title: "Task Updated",

                    description:
                        `"${existingTask.title}" was updated.`,

                    time: "Just now",

                });

            }

        },



        deleteTask(
            id: number
        ) {


            const task =
                tasks.find(
                    (task) =>
                        task.id === id
                );


            setTasks((previous) =>
                deleteTask(
                    previous,
                    id
                )
            );


            if (task) {

                createActivity({

                    id: Date.now(),

                    type: "task",

                    title: "Task Deleted",

                    description:
                        `"${task.title}" was removed.`,

                    time: "Just now",

                });

            }

        },



        toggleTaskCompleted(
            id: number
        ) {


            const task =
                tasks.find(
                    (task) =>
                        task.id === id
                );


            setTasks((previous) =>
                toggleTaskCompleted(
                    previous,
                    id
                )
            );


            if (task && !task.completed) {

                createActivity({

                    id: Date.now(),

                    type: "completed",

                    title: "Task Completed",

                    description:
                        `"${task.title}" was completed.`,

                    time: "Just now",

                });

            }

        },

    };

}