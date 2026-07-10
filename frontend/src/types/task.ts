export type TaskPriority =
    | "Low"
    | "Medium"
    | "High";

export interface Task {
    id: number;
    title: string;
    project: string;
    priority: TaskPriority;
    completed: boolean;
    dueDate?: string;
}