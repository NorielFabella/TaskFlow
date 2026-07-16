import clsx from "clsx";
import {
    FolderKanban,
    ListTodo,
    TrendingUp,
} from "lucide-react";

import type { Project } from "../../../types/project";
import type { Task } from "../../../types/task";

import { getProjectProgress } from "../../../services/projectProgress.service";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import DropdownMenu from "../../../components/ui/DropdownMenu";

interface ProjectCardProps {
    project: Project;
    tasks: Task[];

    onEdit?: (project: Project) => void;
    onDelete?: (project: Project) => void;
}

export default function ProjectCard({
    project,
    tasks,
    onEdit,
    onDelete,
}: ProjectCardProps) {

    const menuItems = [
        ...(onEdit
            ? [
                  {
                      label: "Edit",
                      onClick: () => onEdit(project),
                  },
              ]
            : []),

        ...(onDelete
            ? [
                  {
                      label: "Delete",
                      danger: true,
                      onClick: () => onDelete(project),
                  },
              ]
            : []),
    ];

    const stats = getProjectProgress(
        project,
        tasks
    );

    const statusVariant =
        stats.status === "Completed"
            ? "success"
            : stats.status === "In Progress"
              ? "info"
              : "warning";

    return (

        <Card
            className={clsx(
                "group transition-all duration-300",
                "hover:-translate-y-1 hover:border-white hover:shadow-lg",
                stats.status === "Completed" &&
                    "opacity-90"
            )}
        >

            {/* Header */}

            <div className="flex items-start justify-between gap-4">

                <div className="flex flex-1 items-start gap-4">

                    <div className="rounded-xl bg-zinc-800 p-3 transition-colors duration-300 group-hover:bg-white group-hover:text-black">

                        <FolderKanban size={20} />

                    </div>

                    <div className="min-w-0 flex-1">

                        <h3 className="truncate text-lg font-semibold text-white">
                            {project.name}
                        </h3>

                        {project.description && (

                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                {project.description}
                            </p>

                        )}

                    </div>

                </div>

                {menuItems.length > 0 && (

                    <DropdownMenu
                        items={menuItems}
                    />

                )}

            </div>

            {/* Progress */}

            <div className="mt-6">

                <div className="mb-3 flex items-center justify-between">

                    <div className="flex items-center gap-2 text-sm text-zinc-400">

                        <TrendingUp size={15} />

                        <span>
                            Progress
                        </span>

                    </div>

                    <span className="font-semibold text-white">
                        {stats.progress}%
                    </span>

                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800">

                    <div
                        className="h-full rounded-full bg-white transition-all duration-500"
                        style={{
                            width: `${stats.progress}%`,
                        }}
                    />

                </div>

            </div>

            {/* Footer */}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">

                <Badge variant={statusVariant}>
                    {stats.status}
                </Badge>

                <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">

                    <ListTodo size={14} />

                    <span>
                        {stats.totalTasks} Tasks
                    </span>

                </div>

            </div>

        </Card>

    );

}