import type { Project } from "../types/project";

export const projects: Project[] = [
    {
        id: 1,
        name: "TaskFlow",
        description: "Personal productivity application",
        progress: 65,
        status: "In Progress",
        tasks: 12,
    },
    {
        id: 2,
        name: "Portfolio",
        description: "Personal portfolio website",
        progress: 100,
        status: "Completed",
        tasks: 8,
    },
    {
        id: 3,
        name: "Fabric Defect Detection",
        description: "Computer vision application for detecting defects in fabric",
        progress: 100,
        status: "Completed",
        tasks: 15,
    },
];