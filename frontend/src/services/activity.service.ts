import { supabase } from "../lib/supabase";

import type { Activity } from "../types/activity";

export async function createActivity(
    activity: Omit<Activity, "id">
): Promise<void> {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated.");
    }

    const { error } = await supabase
        .from("activities")
        .insert({
            user_id: user.id,

            type: activity.type,

            title: activity.title,

            description: activity.description,
        });

    if (error) {
        throw new Error(error.message);
    }

}

export async function getActivities(): Promise<Activity[]> {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const {
        data,
        error,
    } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw new Error(error.message);
    }

    return data.map((activity) => ({

        id: activity.id,

        type: activity.type,

        title: activity.title,

        description: activity.description,

        time: new Date(
            activity.created_at
        ).toLocaleString(),

    }));

}