import { supabase } from "../lib/supabase";

import type {
    Task,
    TaskFormData,
} from "../types/task";

export async function getTasks(): Promise<Task[]> {

    const {
        data,
        error,
    } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw new Error(error.message);
    }

    return data.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description ?? "",
        projectId: task.project_id,
        priority: task.priority,
        completed: task.completed,
        dueDate: task.due_date ?? "",
    }));

}

export async function createTask(
    newTask: TaskFormData
): Promise<void> {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated.");
    }

    const { error } = await supabase
        .from("tasks")
        .insert({
            user_id: user.id,
            project_id: newTask.projectId,
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            due_date: newTask.dueDate,
        });

    if (error) {
        throw new Error(error.message);
    }

}

export async function updateTask(
    taskId: number,
    updatedTask: TaskFormData
): Promise<void> {

    const { error } = await supabase
        .from("tasks")
        .update({
            title: updatedTask.title,
            description: updatedTask.description,
            project_id: updatedTask.projectId,
            priority: updatedTask.priority,
            due_date: updatedTask.dueDate,
        })
        .eq("id", taskId);

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteTask(
    taskId: number
): Promise<void> {

    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskId);

    if (error) {
        throw new Error(error.message);
    }

}

export async function toggleTaskComplete(
    taskId: number,
    completed: boolean
): Promise<void> {

    const { error } = await supabase
        .from("tasks")
        .update({
            completed,
        })
        .eq("id", taskId);

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteAllTasks(): Promise<void> {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated.");
    }

    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

}