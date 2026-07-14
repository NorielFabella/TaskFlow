import type { Task } from "../types/task";

export const tasks: Task[] = [
    {
        id: 1,
        title: "Build Dashboard Layout",
        description: "Finish the dashboard widgets and responsive layout.",
        project: "TaskFlow",
        priority: "High",
        completed: false,
        dueDate: "2026-07-20",
    },
    {
        id: 2,
        title: "Create Login Page",
        description: "Implement authentication UI.",
        project: "TaskFlow",
        priority: "Medium",
        completed: false,
        dueDate: "2026-07-22",
    },
    {
        id: 3,
        title: "Design Database Schema",
        description: "Plan tables for projects and tasks.",
        project: "TaskFlow",
        priority: "Low",
        completed: true,
        dueDate: "2026-07-15",
    },
    {
        id: 4,
        title: "Deploy Portfolio",
        description: "Publish latest portfolio updates.",
        project: "Portfolio",
        priority: "Medium",
        completed: false,
        dueDate: "2026-07-25",
    },
];