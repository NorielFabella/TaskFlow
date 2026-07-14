export type TaskPriority =
    | "Low"
    | "Medium"
    | "High";

export interface Task {
    id: number;

    title: string;

    description: string;

    project: string;

    priority: TaskPriority;

    completed: boolean;

    dueDate: string;
}

export interface TaskFormData {
    title: string;

    description: string;

    project: string;

    priority: TaskPriority;

    dueDate: string;
}