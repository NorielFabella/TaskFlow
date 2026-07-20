import { supabase } from "../lib/supabase";

import type {
    Project,
    ProjectFormData,
} from "../types/project";

export async function getProjects(): Promise<Project[]> {

    const {
        data,
        error,
    } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw new Error(error.message);
    }

    return data.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description ?? "",
    }));

}

export async function createProject(
    newProject: ProjectFormData
): Promise<void> {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated.");
    }

    const { error } = await supabase
        .from("projects")
        .insert({
            user_id: user.id,
            name: newProject.name,
            description: newProject.description,
            status: "Not Started",
        });

    if (error) {
        throw new Error(error.message);
    }

}

export async function updateProject(
    projectId: number,
    updatedProject: ProjectFormData
): Promise<void> {

    const { error } = await supabase
        .from("projects")
        .update({
            name: updatedProject.name,
            description: updatedProject.description,
        })
        .eq("id", projectId);

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteProject(
    projectId: number
): Promise<void> {

    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

    if (error) {
        throw new Error(error.message);
    }

}


export async function deleteAllProjects(): Promise<void> {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated.");
    }

    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

}