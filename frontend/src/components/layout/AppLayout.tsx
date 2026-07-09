import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-zinc-950 text-white">

            {/* Sidebar */}
            <aside className="hidden md:flex">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Top Navigation */}
                <Topbar />

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto bg-zinc-950 p-8">
                    <div className="mx-auto w-full max-w-7xl">
                        <Outlet />
                    </div>
                </main>

            </div>

        </div>
    );
}