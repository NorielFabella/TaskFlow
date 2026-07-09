import {
    FolderKanban,
    MoreHorizontal,
} from "lucide-react";

import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/common/SectionHeader";


const projects = [
    {
        id: 1,
        name: "TaskFlow",
        description: "Personal productivity application",
        progress: 65,
        status: "In Progress",
    },
    {
        id: 2,
        name: "Portfolio",
        description: "Developer portfolio website",
        progress: 100,
        status: "Completed",
    },
    {
        id: 3,
        name: "Fabric Defect Detection",
        description: "Computer vision thesis project",
        progress: 100,
        status: "Completed",
    },
];

export default function RecentProjects() {
    return (
        <Card className="flex h-full flex-col">

            <SectionHeader
                title="Recent Projects"
                subtitle="Your latest active projects."
            />

            <div className="space-y-4">

                {projects.map((project) => (

                    <div
                        key={project.id}
                        className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-white"
                    >

                        <div className="flex items-center gap-4">

                            <div className="rounded-lg bg-zinc-900 p-3">
                                <FolderKanban size={20} />
                            </div>

                            <div>

                                <h3 className="font-medium text-white">
                                    {project.name}
                                </h3>

                                <p className="text-sm text-zinc-400">
                                    {project.description}
                                </p>

                                <div className="mt-3">

                                    <div className="mb-2 h-2 w-48 rounded-full bg-zinc-800">

                                        <div
                                            className="h-2 rounded-full bg-white"
                                            style={{
                                                width: `${project.progress}%`,
                                            }}
                                        />

                                    </div>

                                    <p className="text-xs text-zinc-500">
                                        {project.progress}% Complete
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            {project.status === "Completed" ? (
                                <Badge variant="success">
                                    Completed
                                </Badge>
                            ) : (
                                <Badge variant="info">
                                    In Progress
                                </Badge>
                            )}

                            <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                                <MoreHorizontal size={18} />
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </Card>
    );
}