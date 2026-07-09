import {
    FolderKanban,
    ListTodo,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import Badge from "../../../components/ui/Badge";
import StatCard from "../../../components/ui/StatCard";

const stats = [
    {
        title: "Projects",
        value: 12,
        icon: <FolderKanban size={22} />,
        badge: <Badge>+2 this month</Badge>,
    },
    {
        title: "Tasks",
        value: 58,
        icon: <ListTodo size={22} />,
        badge: <Badge variant="info">18 Active</Badge>,
    },
    {
        title: "Completed",
        value: 39,
        icon: <CheckCircle2 size={22} />,
        badge: <Badge variant="success">67% Done</Badge>,
    },
    {
        title: "Upcoming",
        value: 7,
        icon: <Clock3 size={22} />,
        badge: <Badge variant="warning">Due Soon</Badge>,
    },
];

export default function StatsGrid() {
    return (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    badge={stat.badge}
                />
            ))}
        </section>
    );
}