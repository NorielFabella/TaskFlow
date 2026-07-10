import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

interface ProjectsToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function ProjectsToolbar({
    search,
    onSearchChange,
    
}: ProjectsToolbarProps) {console.log("Toolbar rendered");
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-1 gap-3">

                <Input
                    placeholder="THIS IS THE NEW TOOLBAR"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="max-w-md"
                    
                />

                <select
                
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm text-white outline-none transition-colors hover:border-zinc-700 focus:border-white"
                >
                    <option>All Status</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Not Started</option>
                </select>

            </div>

            <Button>
                + New Project
            </Button>

        </div>
    );
}