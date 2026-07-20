import { supabase } from "../../../lib/supabase";

import type {
    LoginData,
    RegisterData,
    User,
} from "../../../types/auth";


export async function register(
    data: RegisterData
): Promise<User> {

    const {
        data: authData,
        error: authError,
    } =
        await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });


    if (authError) {
        throw new Error(
            authError.message
        );
    }


    if (!authData.user) {
        throw new Error(
            "Registration failed."
        );
    }


    const { error: profileError } =
        await supabase
            .from("profiles")
            .insert({
                id: authData.user.id,
                name: data.name,
                email: data.email,
            });


    if (profileError) {
        throw new Error(
            profileError.message
        );
    }


    return {
        id: authData.user.id,
        name: data.name,
        email: data.email,
    };

}



export async function login(
    data: LoginData
): Promise<User> {

    const {
        data: authData,
        error,
    } =
        await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });


    if (error) {
        throw new Error(
            error.message
        );
    }


    if (!authData.user) {
        throw new Error(
            "Login failed."
        );
    }


    const {
        data: profile,
        error: profileError,
    } =
        await supabase
            .from("profiles")
            .select("*")
            .eq(
                "id",
                authData.user.id
            )
            .single();


    if (profileError) {
        throw new Error(
            profileError.message
        );
    }


    return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
    };

}



export async function logout(): Promise<void> {

    const { error } =
        await supabase.auth.signOut();


    if (error) {
        throw new Error(
            error.message
        );
    }

}



export async function getCurrentUser(): Promise<User | null> {

    const {
        data: {
            session,
        },
    } =
        await supabase.auth.getSession();


    if (!session?.user) {
        return null;
    }


    const {
        data: profile,
    } =
        await supabase
            .from("profiles")
            .select("*")
            .eq(
                "id",
                session.user.id
            )
            .single();


    if (!profile) {
        return null;
    }


    return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
    };

}

export async function updateProfileName(
    name: string
): Promise<User> {

    const {
        data: {
            user: authUser,
        },
        error: authError,
    } =
        await supabase.auth.getUser();


    if (authError || !authUser) {
        throw new Error(
            "User not authenticated."
        );
    }


    const {
        data: profile,
        error,
    } =
        await supabase
            .from("profiles")
            .update({
                name,
            })
            .eq(
                "id",
                authUser.id
            )
            .select()
            .single();


    if (error) {
        throw new Error(
            error.message
        );
    }


    return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
    };

}

export async function updatePassword(
    password: string
): Promise<void> {

    const {
        error,
    } =
        await supabase.auth.updateUser({
            password,
        });


    if (error) {
        throw new Error(
            error.message
        );
    }

}