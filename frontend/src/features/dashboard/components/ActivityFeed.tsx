import {
    CheckCircle2,
    FolderKanban,
    ListTodo,
    Settings,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

const activities = [
    {
        id: 1,
        icon: <FolderKanban size={18} />,
        title: "Created project",
        description: "TaskFlow",
        time: "5 min ago",
    },
    {
        id: 2,
        icon: <ListTodo size={18} />,
        title: "Added new task",
        description: "Build Dashboard",
        time: "20 min ago",
    },
    {
        id: 3,
        icon: <CheckCircle2 size={18} />,
        title: "Completed task",
        description: "Setup React Router",
        time: "1 hour ago",
    },
    {
        id: 4,
        icon: <Settings size={18} />,
        title: "Updated workspace",
        description: "General Settings",
        time: "Yesterday",
    },
];

export default function ActivityFeed() {
    return (
        <Card className="flex h-full flex-col">

            <SectionHeader
                title="Activity Feed"
                subtitle="Recent workspace activity."
            />

            <div className="space-y-5">

                {activities.map((activity) => (

                    <div
                        key={activity.id}
                        className="flex gap-4"
                    >

                        {/* Timeline */}

                        <div className="flex flex-col items-center">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300">
                                {activity.icon}
                            </div>

                            {activity.id !== activities.length && (
                                <div className="mt-2 h-full w-px bg-zinc-800" />
                            )}

                        </div>

                        {/* Content */}

                        <div className="pb-5">

                            <h3 className="font-medium text-white">
                                {activity.title}
                            </h3>

                            <p className="text-sm text-zinc-400">
                                {activity.description}
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                                {activity.time}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </Card>
    );
}