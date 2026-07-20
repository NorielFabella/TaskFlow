export type TaskPriority =
    | "Low"
    | "Medium"
    | "High";

export interface Task {
    id: number;

    title: string;

    description: string;

    projectId: number;

    priority: TaskPriority;

    completed: boolean;

    dueDate: string;
}

export interface TaskFormData {
    title: string;

    description: string;

    projectId: number;

    priority: TaskPriority;

    dueDate: string;
}