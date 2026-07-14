import clsx from "clsx";
import {
    Circle,
    CircleCheckBig,
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

    return (
        <Card
            className={clsx(
                "transition-all duration-300 hover:border-white",
                task.completed &&
                "border-zinc-900 bg-zinc-950"
            )}
        >

            {/* Header */}

            <div className="flex items-start justify-between">

                <div className="flex flex-1 items-start gap-4">

                    <button
                        onClick={() => onToggleComplete(task)}
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
                                className="text-zinc-500"
                            />
                        )}
                    </button>

                    <div className="flex-1">

                        <h3
                            className={clsx(
                                "font-semibold",
                                task.completed
                                    ? "text-zinc-500 line-through"
                                    : "text-white"
                            )}
                        >
                            {task.title}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-400">
                            {task.description}
                        </p>

                    </div>

                </div>

                <DropdownMenu
                    items={[
                        {
                            label: "Edit",
                            onClick: () => onEdit(task),
                        },
                        {
                            label: "Delete",
                            danger: true,
                            onClick: () => onDelete(task),
                        },
                    ]}
                />

            </div>

            {/* Footer */}

            <div className="mt-6 flex items-center justify-between">

                <Badge variant={priorityVariant}>
                    {task.priority}
                </Badge>

                <div className="flex items-center gap-5 text-sm text-zinc-500">

                    <span>
                        {task.project}
                    </span>

                    <span>
                        {task.dueDate}
                    </span>

                </div>

            </div>

        </Card>
    );
}