export type ProjectStatus =
    | "Not Started"
    | "In Progress"
    | "Completed";

export interface Project {
    id: number;
    name: string;
    description: string;
}

export interface ProjectFormData {
    name: string;
    description: string;
}