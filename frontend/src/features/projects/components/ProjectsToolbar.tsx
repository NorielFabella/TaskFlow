import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

interface ProjectsToolbarProps {
    search: string;
    status: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;

    onCreateProject: () => void;
}

export default function ProjectsToolbar({
    search,
    status,
    onSearchChange,
    onStatusChange,
    onCreateProject,
}: ProjectsToolbarProps) {console.log("Toolbar rendered");
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-1 gap-3">

                <Input
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="max-w-md"
                    
                />

                <select
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm text-white outline-none transition-colors hover:border-zinc-700 focus:border-white"
                >
                    <option value="All">All Status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Started">Not Started</option>
                </select>

            </div>

            <Button
                onClick={onCreateProject}
            >
                + New Project
            </Button>

        </div>
    );
}