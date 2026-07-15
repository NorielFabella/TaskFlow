import {
    FolderKanban,
} from "lucide-react";

import type { Project } from "../../../types/project";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import DropdownMenu from "../../../components/ui/DropdownMenu";

interface ProjectCardProps {
    project: Project;

    onEdit?: (project: Project) => void;

    onDelete?: (project: Project) => void;
}

export default function ProjectCard({
    project,
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

    return (
        <Card className="group transition-all duration-300 hover:-translate-y-1 hover:border-white">

            {/* Header */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-zinc-800 p-3 transition-colors group-hover:bg-white group-hover:text-black">

                        <FolderKanban size={20} />

                    </div>

                    <div>

                        <h3 className="font-semibold text-white">
                            {project.name}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-400">
                            {project.description}
                        </p>

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

                <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm text-zinc-400">
                        Progress
                    </span>

                    <span className="text-sm font-medium text-white">
                        {project.progress}%
                    </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

                    <div
                        className="h-full rounded-full bg-white transition-all duration-500"
                        style={{
                            width: `${project.progress}%`,
                        }}
                    />

                </div>

            </div>

            {/* Footer */}

            <div className="mt-6 flex items-center justify-between">

                <Badge
                    variant={
                        project.status === "Completed"
                            ? "success"
                            : "info"
                    }
                >
                    {project.status === "Completed"
                        ? "Completed"
                        : "In Progress"}
                </Badge>

                <span className="text-sm text-zinc-500">
                    {project.tasks ?? 0} Tasks
                </span>

            </div>

        </Card>
    );
}