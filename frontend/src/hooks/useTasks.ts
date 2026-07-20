import { useEffect, useState } from "react";

import {
    getTasks,
    createTask as createTaskService,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService,
    toggleTaskComplete as toggleTaskCompleteService,
} from "../services/task.service";

import type {
    Task,
    TaskFormData,
} from "../types/task";

import { useActivity } from "./useActivity";

export function useTasks() {

    const [tasks, setTasks] = useState<Task[]>([]);

    const {
        createActivity,
    } = useActivity();

    async function loadTasks() {

        const data = await getTasks();

        setTasks(data);

    }

    useEffect(() => {

        loadTasks();

    }, []);

    async function createTask(
        newTask: TaskFormData
    ) {

        await createTaskService(
            newTask
        );

        await loadTasks();

        createActivity({
            type: "task",
            title: "Task Created",
            description:
                `"${newTask.title}" was added.`,
            time: "Just now",
        });

    }

    async function updateTask(
        id: number,
        updatedTask: TaskFormData
    ) {

        await updateTaskService(
            id,
            updatedTask
        );

        await loadTasks();

        createActivity({
            type: "task",
            title: "Task Updated",
            description:
                `"${updatedTask.title}" was updated.`,
            time: "Just now",
        });

    }

    async function deleteTask(
        id: number
    ) {

        const task =
            tasks.find(
                (task) =>
                    task.id === id
            );

        await deleteTaskService(id);

        await loadTasks();

        if (task) {

            createActivity({
                type: "task",
                title: "Task Deleted",
                description:
                    `"${task.title}" was removed.`,
                time: "Just now",
            });

        }

    }

    async function toggleTaskCompleted(
        id: number
    ) {

        const task =
            tasks.find(
                (task) =>
                    task.id === id
            );

        if (!task) return;

        await toggleTaskCompleteService(
            id,
            !task.completed
        );

        await loadTasks();

        if (!task.completed) {

            createActivity({
                type: "completed",
                title: "Task Completed",
                description:
                    `"${task.title}" was completed.`,
                time: "Just now",
            });

        }

    }

    return {

        tasks,

        createTask,

        updateTask,

        deleteTask,

        toggleTaskCompleted,

    };

}