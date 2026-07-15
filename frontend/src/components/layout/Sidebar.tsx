import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    CalendarDays,
    Settings,
    CircleUserRound,
    LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import clsx from "clsx";

import { useAuth } from "../../features/auth/context/AuthContext";

const navigation = [
    {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Projects",
        path: "/projects",
        icon: FolderKanban,
    },
    {
        name: "Tasks",
        path: "/tasks",
        icon: CheckSquare,
    },
    {
        name: "Calendar",
        path: "/calendar",
        icon: CalendarDays,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings,
    },
];

export default function Sidebar() {

    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();

    async function handleLogout() {

        await logout();

        toast.success(
            "Signed out successfully."
        );

        navigate("/login");

    }

    return (
        <aside className="flex h-full w-72 flex-col border-r border-zinc-800 bg-zinc-950">

            {/* Logo */}

            <div className="border-b border-zinc-800 px-6 py-6">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-white p-2 text-black">
                        <CheckSquare size={22} />
                    </div>

                    <div>

                        <h1 className="text-xl font-bold tracking-tight text-white">
                            TaskFlow
                        </h1>

                        <p className="text-xs text-zinc-500">
                            Project Management
                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 overflow-y-auto p-4">

                <div className="flex flex-col gap-2">

                    {navigation.map((item) => {

                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    clsx(
                                        "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-white text-black shadow-sm"
                                            : "text-zinc-400 hover:translate-x-1 hover:bg-zinc-900 hover:text-white"
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            size={19}
                                            className={clsx(
                                                "transition-colors duration-200",
                                                isActive
                                                    ? "text-black"
                                                    : "text-zinc-500 group-hover:text-white"
                                            )}
                                        />

                                        <span>
                                            {item.name}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        );

                    })}

                </div>

            </nav>

            {/* User */}

            <div className="border-t border-zinc-800 p-4">

                <div className="rounded-xl bg-zinc-900 p-3">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">

                            <CircleUserRound size={24} />

                        </div>

                        <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-white">
                                {user?.name}
                            </p>

                            <p className="truncate text-xs text-zinc-500">
                                {user?.email}
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="
                            mt-4
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            font-medium
                            text-zinc-400
                            transition-all
                            duration-200
                            hover:bg-red-500/10
                            hover:text-red-400
                        "
                    >

                        <LogOut size={18} />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </div>

        </aside>
    );
}