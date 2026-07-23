import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { useAuth } from "../../auth/context/AuthContext";

import {
    getTasks,
    createTask as createTaskService,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService,
    toggleTaskComplete as toggleTaskCompleteService,
} from "../../../services/task.service";

import type {
    Task,
    TaskFormData,
} from "../../../types/task";

import { useActivity } from "../../../hooks/useActivity";

interface TasksContextValue {

    tasks: Task[];

    createTask: (
        task: TaskFormData
    ) => Promise<void>;

    updateTask: (
        id: number,
        task: TaskFormData
    ) => Promise<void>;

    deleteTask: (
        id: number
    ) => Promise<void>;

    toggleTaskCompleted: (
        id: number
    ) => Promise<void>;

    refreshTasks: () => Promise<void>;

}

const TasksContext =
    createContext<TasksContextValue | null>(
        null
    );

export function TasksProvider({
    children,
}: {
    children: ReactNode;
}) {
    
    const [tasks, setTasks] =
        useState<Task[]>([]);
    
    const { user } = useAuth();

    const {
        createActivity,
    } = useActivity();

    async function refreshTasks() {

        const data =
            await getTasks();

        setTasks(data);

    }

    useEffect(() => {

        if (!user) {

            setTasks([]);

            return;

        }


        refreshTasks();

    }, [user]);

    async function createTask(
        task: TaskFormData
    ) {

        await createTaskService(task);

        await refreshTasks();

        createActivity({
            type: "task",
            title: "Task Created",
            description: `"${task.title}" was added.`,
            time: "Just now",
        });

    }

    async function updateTask(
        id: number,
        task: TaskFormData
    ) {

        await updateTaskService(
            id,
            task
        );

        await refreshTasks();

        createActivity({
            type: "task",
            title: "Task Updated",
            description: `"${task.title}" was updated.`,
            time: "Just now",
        });

    }

    async function deleteTask(
        id: number
    ) {

        const task =
            tasks.find(
                (t) => t.id === id
            );

        await deleteTaskService(id);

        await refreshTasks();

        if (task) {

            createActivity({
                type: "task",
                title: "Task Deleted",
                description: `"${task.title}" was removed.`,
                time: "Just now",
            });

        }

    }

    async function toggleTaskCompleted(
        id: number
    ) {

        const task =
            tasks.find(
                (t) => t.id === id
            );

        if (!task) return;

        await toggleTaskCompleteService(
            id,
            !task.completed
        );

        await refreshTasks();

        if (!task.completed) {

            createActivity({
                type: "completed",
                title: "Task Completed",
                description: `"${task.title}" was completed.`,
                time: "Just now",
            });

        }

    }

    const value = useMemo(
        () => ({
            tasks,
            createTask,
            updateTask,
            deleteTask,
            toggleTaskCompleted,
            refreshTasks,
        }),
        [tasks]
    );

    return (

        <TasksContext.Provider value={value}>

            {children}

        </TasksContext.Provider>

    );

}

export function useTasksContext() {

    const context =
        useContext(TasksContext);

    if (!context) {

        throw new Error(
            "useTasksContext must be used inside TasksProvider."
        );

    }

    return context;

}