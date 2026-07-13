import { useEffect, useState } from "react";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import type {
    Project,
    ProjectFormData,
    ProjectStatus,
} from "../../../types/project";

interface ProjectModalProps {
    open: boolean;
    onClose: () => void;

    onSubmit: (project: ProjectFormData) => void;

    project?: Project;

    title?: string;
    submitLabel?: string;
}

export default function ProjectModal({
    open,
    onClose,
    onSubmit,
    project,
    title = "Create Project",
    submitLabel = "Create Project",
}: ProjectModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<ProjectStatus>("Not Started");

    useEffect(() => {
        if (project) {
            // Edit mode
            setName(project.name);
            setDescription(project.description);
            setStatus(project.status);
        } else {
        }
    }, [project, open]);

    function handleSubmit() {
        if (!name.trim()) return;

        onSubmit({
            name,
            description,
            status,
        });

        setName("");
        setDescription("");
        setStatus("Not Started");
    }

    return (
        <Modal
            open={open}
            title={title}
            onClose={onClose}
        >
            <div className="space-y-5">

                {/* Project Name */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Project Name
                    </label>

                    <Input
                        placeholder="Enter project name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Description */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Description
                    </label>

                    <Input
                        placeholder="Enter description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Status */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) =>
                        setStatus(e.target.value as ProjectStatus)
                    }
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white outline-none transition-colors focus:border-white"
                    >
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 pt-4">

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                    >
                        {submitLabel}
                    </Button>

                </div>

            </div>
        </Modal>
    );
}