export type DeadlinePriority =
    | "Low"
    | "Medium"
    | "High";

export interface Deadline {
    id: number;
    title: string;
    project: string;
    dueDate: string;
    priority: DeadlinePriority;
}