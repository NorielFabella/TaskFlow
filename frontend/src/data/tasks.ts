import type { Task } from "../types/task";

export const tasks: Task[] = [
    {
        id: 1,
        title: "Build Dashboard Layout",
        project: "TaskFlow",
        completed: true,
        priority: "High",
    },
    {
        id: 2,
        title: "Create Login Page",
        project: "TaskFlow",
        completed: false,
        priority: "Medium",
    },
    {
        id: 3,
        title: "Design Database Schema",
        project: "TaskFlow",
        completed: false,
        priority: "Low",
    },
    {
        id: 4,
        title: "Deploy Portfolio",
        project: "Portfolio",
        completed: true,
        priority: "Medium",
    },
];