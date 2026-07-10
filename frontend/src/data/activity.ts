import type { Activity } from "../types/activity";

export const activities: Activity[] = [
    {
        id: 1,
        type: "project",
        title: "Created project",
        description: "TaskFlow",
        time: "5 min ago",
    },
    {
        id: 2,
        type: "task",
        title: "Added new task",
        description: "Build Dashboard",
        time: "20 min ago",
    },
    {
        id: 3,
        type: "completed",
        title: "Completed task",
        description: "Setup React Router",
        time: "1 hour ago",
    },
    {
        id: 4,
        type: "settings",
        title: "Updated workspace",
        description: "General Settings",
        time: "Yesterday",
    },
];