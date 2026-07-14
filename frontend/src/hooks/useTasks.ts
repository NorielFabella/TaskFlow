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

const STORAGE_KEY = "taskflow-tasks";

export function useTasks() {

    const [tasks, setTasks] = useState<Task[]>(() =>
        load(STORAGE_KEY, initialTasks)
    );

    useEffect(() => {
        save(STORAGE_KEY, tasks);
    }, [tasks]);

    return {

        tasks,

        createTask(newTask: TaskFormData) {

            setTasks((previous) =>
                createTask(previous, newTask)
            );

        },

        updateTask(
            id: number,
            updatedTask: TaskFormData
        ) {

            setTasks((previous) =>
                updateTask(
                    previous,
                    id,
                    updatedTask
                )
            );

        },

        deleteTask(id: number) {

            setTasks((previous) =>
                deleteTask(previous, id)
            );

        },

        toggleTaskCompleted(id: number) {

            setTasks((previous) =>
                toggleTaskCompleted(
                    previous,
                    id
                )
            );

        },

    };

}