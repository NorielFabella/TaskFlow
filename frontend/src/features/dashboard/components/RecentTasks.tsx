import {
    CheckCircle2,
    Circle,
    Clock3,
} from "lucide-react";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";

import { useProjects } from "../../../hooks/useProjects";
import { useTasks } from "../../../hooks/useTasks";

export default function RecentTasks() {

    const { tasks } = useTasks();
    const { projects } = useProjects();

    const recentTasks = tasks.slice(0, 5);

    return (
        <Card className="flex h-full flex-col">

            <SectionHeader
                title="Recent Tasks"
                subtitle="Your latest task activity."
            />

            {recentTasks.length > 0 ? (

                <div className="space-y-3">

                    {recentTasks.map((task) => (

                        <div
                            key={task.id}
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-zinc-800
                                bg-zinc-950
                                p-4
                                transition-colors
                                hover:border-white
                            "
                        >

                            <div className="flex min-w-0 flex-1 items-center gap-4">

                                {task.completed ? (

                                    <CheckCircle2
                                        size={20}
                                        className="text-emerald-400"
                                    />

                                ) : (

                                    <Circle
                                        size={20}
                                        className="text-zinc-500"
                                    />

                                )}

                                <div className="min-w-0">

                                    <h3
                                        className={
                                            task.completed
                                                ? "truncate font-medium text-zinc-500 line-through"
                                                : "truncate font-medium text-white"
                                        }
                                    >
                                        {task.title}
                                    </h3>

                                    <p className="truncate text-sm text-zinc-400">
                                        {projects.find(
                                            (project) =>
                                                project.id === task.projectId
                                        )?.name ?? "Unknown Project"}
                                    </p>

                                </div>

                            </div>


                            <div className="flex shrink-0 items-center gap-3">

                                <Badge
                                    variant={
                                        task.priority === "High"
                                            ? "danger"
                                            : task.priority === "Medium"
                                            ? "warning"
                                            : "default"
                                    }
                                >
                                    {task.priority}
                                </Badge>


                                <Clock3
                                    size={18}
                                    className="text-zinc-500"
                                />

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <div className="flex flex-1 items-center justify-center py-12 text-sm text-zinc-500">

                    No tasks yet.

                </div>

            )}

        </Card>
    );
}
