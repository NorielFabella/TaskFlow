import {
    Navigate,
} from "react-router-dom";

import type {
    ReactNode,
} from "react";

import {
    useAuth,
} from "../context/AuthContext";


interface GuestRouteProps {

    children: ReactNode;

}



export default function GuestRoute({
    children,
}: GuestRouteProps) {


    const {
        isAuthenticated,
        isLoading,
    } = useAuth();



    if (isLoading) {

        return (

            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-zinc-950
                    text-white
                "
            >
                Loading...
            </div>

        );

    }



    if (isAuthenticated) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );

    }



    return <>{children}</>;

}