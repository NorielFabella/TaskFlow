import Button from "../../../components/ui/Button";
import { useAuth } from "../../auth/context/AuthContext";

export default function DashboardHeader() {
    const { user } = useAuth();
    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    }

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
                <h1 className="text-3xl font-bold text-white">
                    {greeting}
                    {user?.name ? `, ${user.name}` : ""} 👋
                </h1>

                <p className="mt-2 text-zinc-400">
                    Welcome back! Here's what's happening today.
                </p>
            </div>

            <Button>
                + New Project
            </Button>

        </div>
    );
}