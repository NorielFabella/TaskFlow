import {
    useState,
} from "react";

import type { Activity } from "../types/activity";

import {
    addActivity,
    getActivities,
} from "../services/activity.service";


export function useActivity() {

    const [activities, setActivities] =
        useState<Activity[]>(
            getActivities()
        );


    function createActivity(
        activity: Activity
    ) {

        addActivity(activity);

        setActivities(
            getActivities()
        );

    }


    return {
        activities,
        createActivity,
    };

}