import { useEffect, useState } from "react";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import type {
    Project,
    ProjectFormData,
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

    useEffect(() => {

        if (project) {

            setName(project.name);

            setDescription(project.description);

        } else {

            setName("");

            setDescription("");

        }

    }, [project, open]);

    function handleSubmit() {

        if (!name.trim()) return;

        onSubmit({

            name,

            description,

        });

        setName("");

        setDescription("");

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
                        onChange={(e) =>
                            setName(e.target.value)
                        }
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
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

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