import { useState } from "react";
import { toast } from "sonner";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import SectionHeader from "../../../components/common/SectionHeader";

import { useProjects } from "../../../hooks/useProjects";
import { useTasks } from "../../../hooks/useTasks";

import {
    deleteAllProjects,
} from "../../../services/project.service";

import {
    deleteAllTasks,
} from "../../../services/task.service";

export default function WorkspaceSection() {

    const { projects } = useProjects();
    const { tasks } = useTasks();

    const [confirmOpen, setConfirmOpen] =
        useState(false);

    async function handleResetWorkspace() {

        try {
            await deleteAllTasks();
            await deleteAllProjects();
            toast.success(
                "Workspace reset."
            );

            setTimeout(() => {

                window.location.reload();

            }, 600);

        } catch (error) {

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to reset workspace."
            );

        }

    }

    return (

        <>

            <Card>

                <SectionHeader
                    title="Workspace"
                    subtitle="Manage your TaskFlow workspace."
                />

                <div className="space-y-4">

                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                        <div>

                            <h3 className="font-medium text-white">
                                Projects
                            </h3>

                            <p className="text-sm text-zinc-400">
                                Total projects
                            </p>

                        </div>

                        <span className="text-2xl font-bold text-white">
                            {projects.length}
                        </span>

                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                        <div>

                            <h3 className="font-medium text-white">
                                Tasks
                            </h3>

                            <p className="text-sm text-zinc-400">
                                Total tasks
                            </p>

                        </div>

                        <span className="text-2xl font-bold text-white">
                            {tasks.length}
                        </span>

                    </div>

                    <div className="pt-2">

                        <Button
                            variant="danger"
                            onClick={() =>
                                setConfirmOpen(true)
                            }
                        >
                            Reset Workspace
                        </Button>

                    </div>

                </div>

            </Card>

            <ConfirmDialog
                open={confirmOpen}
                title="Reset Workspace"
                description="This will permanently delete all projects and tasks stored on this device. This action cannot be undone."
                confirmText="Reset"
                cancelText="Cancel"
                onConfirm={handleResetWorkspace}
                onCancel={() =>
                    setConfirmOpen(false)
                }
            />

        </>

    );

}