import clsx from "clsx";
import {
    CalendarDays,
    Circle,
    CircleCheckBig,
    FolderKanban,
} from "lucide-react";

import type { Task } from "../../../types/task";

import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import DropdownMenu from "../../../components/ui/DropdownMenu";

interface TaskCardProps {
    task: Task;

    onToggleComplete: (task: Task) => void;

    onEdit: (task: Task) => void;

    onDelete: (task: Task) => void;
}

export default function TaskCard({
    task,
    onToggleComplete,
    onEdit,
    onDelete,
}: TaskCardProps) {

    const priorityVariant =
        task.priority === "High"
            ? "danger"
            : task.priority === "Medium"
                ? "warning"
                : "success";

    const formattedDueDate = new Date(
        task.dueDate
    ).toLocaleDateString(
        undefined,
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );

    return (

        <Card
            className={clsx(
                "group transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-lg",
                task.completed &&
                    "border-zinc-900 bg-zinc-950 opacity-80"
            )}
        >

            {/* Header */}

            <div className="flex items-start justify-between gap-4">

                <div className="flex flex-1 items-start gap-4">

                    <button
                        onClick={() =>
                            onToggleComplete(task)
                        }
                        className="mt-1 rounded-full transition-transform hover:scale-110"
                        aria-label={
                            task.completed
                                ? "Mark as incomplete"
                                : "Mark as completed"
                        }
                    >

                        {task.completed ? (
                            <CircleCheckBig
                                size={22}
                                className="text-emerald-400"
                            />
                        ) : (
                            <Circle
                                size={22}
                                className="text-zinc-500 group-hover:text-white"
                            />
                        )}

                    </button>

                    <div className="min-w-0 flex-1">

                        <h3
                            className={clsx(
                                "truncate text-lg font-semibold transition-colors",
                                task.completed
                                    ? "text-zinc-500 line-through"
                                    : "text-white"
                            )}
                        >
                            {task.title}
                        </h3>

                        {task.description && (

                            <p
                                className={clsx(
                                    "mt-2 text-sm leading-relaxed",
                                    task.completed
                                        ? "text-zinc-600"
                                        : "text-zinc-400"
                                )}
                            >
                                {task.description}
                            </p>

                        )}

                    </div>

                </div>

                <DropdownMenu
                    items={[
                        {
                            label: "Edit",
                            onClick: () =>
                                onEdit(task),
                        },
                        {
                            label: "Delete",
                            danger: true,
                            onClick: () =>
                                onDelete(task),
                        },
                    ]}
                />

            </div>

            {/* Metadata */}

            <div className="mt-6 flex flex-wrap items-center gap-3">

                <Badge variant={priorityVariant}>
                    {task.priority}
                </Badge>

                <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">

                    <FolderKanban
                        size={14}
                    />

                    <span>
                        {task.project}
                    </span>

                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500">

                    <CalendarDays
                        size={15}
                    />

                    <span>
                        Due {formattedDueDate}
                    </span>

                </div>

            </div>

        </Card>

    );

}