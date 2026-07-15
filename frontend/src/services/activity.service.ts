import type { Activity } from "../types/activity";

const ACTIVITY_KEY = "taskflow-activities";


export function getActivities(): Activity[] {

    const stored =
        localStorage.getItem(ACTIVITY_KEY);


    if (!stored) {
        return [];
    }


    return JSON.parse(stored);

}



export function addActivity(
    activity: Activity
) {

    const activities =
        getActivities();


    const updatedActivities = [
        activity,
        ...activities,
    ];


    localStorage.setItem(
        ACTIVITY_KEY,
        JSON.stringify(updatedActivities)
    );

}



export function clearActivities() {

    localStorage.removeItem(
        ACTIVITY_KEY
    );

}