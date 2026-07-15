export type ActivityType =
    | "project"
    | "task"
    | "completed"
    | "settings";


export interface Activity {
    id: number;
    type: ActivityType;
    title: string;
    description: string;
    time: string;
}