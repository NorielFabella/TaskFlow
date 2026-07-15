import {
    FolderKanban,
    ListTodo,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import Badge from "../../../components/ui/Badge";
import StatCard from "../../../components/ui/StatCard";

import { useProjects } from "../../../hooks/useProjects";
import { useTasks } from "../../../hooks/useTasks";

export default function StatsGrid() {

    const { projects } = useProjects();

    const { tasks } = useTasks();

    const totalProjects = projects.length;

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(
            (task) => task.completed
        ).length;

    const upcomingTasks =
        tasks.filter((task) => {

            if (task.completed) {
                return false;
            }

            return new Date(task.dueDate) >= new Date();

        }).length;

    const completionRate =
        totalTasks === 0
            ? 0
            : Math.round(
                  (completedTasks / totalTasks) * 100
              );

    const stats = [

        {
            title: "Projects",

            value: totalProjects,

            icon: <FolderKanban size={22} />,

            badge: (
                <Badge>
                    Total Projects
                </Badge>
            ),
        },

        {
            title: "Tasks",

            value: totalTasks,

            icon: <ListTodo size={22} />,

            badge: (
                <Badge variant="info">
                    Active Tasks
                </Badge>
            ),
        },

        {
            title: "Completed",

            value: completedTasks,

            icon: <CheckCircle2 size={22} />,

            badge: (
                <Badge variant="success">
                    {completionRate}% Done
                </Badge>
            ),
        },

        {
            title: "Upcoming",

            value: upcomingTasks,

            icon: <Clock3 size={22} />,

            badge: (
                <Badge variant="warning">
                    Due Soon
                </Badge>
            ),
        },

    ];

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