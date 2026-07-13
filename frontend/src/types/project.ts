export type ProjectStatus =
    | "Not Started"
    | "In Progress"
    | "Completed";

export interface Project {
    id: number;
    name: string;
    description: string;
    progress: number;
    status: ProjectStatus;
    tasks: number;
}

export interface ProjectFormData {
    name: string;
    description: string;
    status: ProjectStatus;
}