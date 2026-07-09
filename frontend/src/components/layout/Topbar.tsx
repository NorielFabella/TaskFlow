import {
    Bell,
    Moon,
    Search,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/projects": "Projects",
    "/tasks": "Tasks",
    "/calendar": "Calendar",
    "/settings": "Settings",
};

export default function Topbar() {
    const location = useLocation();

    const pageTitle =
        pageTitles[location.pathname] ?? "TaskFlow";

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950/95 px-8 backdrop-blur">

            {/* Left */}

            <h1 className="text-2xl font-bold tracking-tight text-white">
                {pageTitle}
            </h1>

            {/* Right */}

            <div className="flex items-center gap-3">

                {/* Search */}

                <div className="hidden items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 transition-all duration-200 focus-within:w-80 focus-within:border-white lg:flex">

                    <Search
                        size={18}
                        className="text-zinc-500"
                    />

                    <input
                        type="text"
                        placeholder="Search projects or tasks..."
                        className="w-56 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                    />

                </div>

                {/* Theme */}

                <button
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:border-white hover:text-white"
                    aria-label="Toggle Theme"
                >
                    <Moon size={18} />
                </button>

                {/* Notifications */}

                <button
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:border-white hover:text-white"
                    aria-label="Notifications"
                >
                    <Bell size={18} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white" />

                </button>

                {/* User */}

                <button className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 transition-all duration-200 hover:border-white">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                        NF
                    </div>

                    <div className="hidden text-left xl:block">

                        <p className="text-sm font-medium text-white">
                            Noriel
                        </p>

                        <p className="text-xs text-zinc-500">
                            Frontend Developer
                        </p>

                    </div>

                </button>

            </div>

        </header>
    );
}