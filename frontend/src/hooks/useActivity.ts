import {
    useEffect,
    useState,
} from "react";

import type { Activity } from "../types/activity";

import {
    createActivity as createActivityService,
    getActivities,
} from "../services/activity.service";

export function useActivity() {

    const [activities, setActivities] =
        useState<Activity[]>([]);

    useEffect(() => {

        loadActivities();

    }, []);

    async function loadActivities() {

        const data =
            await getActivities();

        setActivities(data);

    }

    async function createActivity(
        activity: Omit<Activity, "id">
    ) {

        await createActivityService(activity);

        await loadActivities();

    }

    return {

        activities,

        createActivity,

        refreshActivities: loadActivities,

    };

}