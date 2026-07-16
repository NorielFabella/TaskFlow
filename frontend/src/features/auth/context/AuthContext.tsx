import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type {
    LoginData,
    RegisterData,
    User,
} from "../../../types/auth";

import {
    login as loginService,
    register as registerService,
    logout as logoutService,
    getCurrentUser,
} from "../services/auth.service";


interface AuthContextValue {

    user: User | null;

    isAuthenticated: boolean;

    login: (
        data: LoginData
    ) => Promise<void>;

    register: (
        data: RegisterData
    ) => Promise<void>;

    logout: () => Promise<void>;

}


const AuthContext =
    createContext<AuthContextValue | null>(
        null
    );


interface AuthProviderProps {
    children: ReactNode;
}


export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [user, setUser] =
        useState<User | null>(null);


    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        async function loadUser() {

            const currentUser =
                await getCurrentUser();

            setUser(currentUser);

            setLoading(false);

        }


        loadUser();

    }, []);



    async function login(
        data: LoginData
    ) {

        const currentUser =
            await loginService(data);

        setUser(currentUser);

    }



    async function register(
        data: RegisterData
    ) {

        await registerService(data);

    }



    async function logout() {

        await logoutService();

        setUser(null);

    }



    const value = useMemo(
        () => ({
            user,

            isAuthenticated:
                user !== null,

            login,

            register,

            logout,

        }),
        [user]
    );



    if (loading) {
        return null;
    }



    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );

}



export function useAuth() {

    const context =
        useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuth must be used within an AuthProvider."
        );

    }


    return context;

}