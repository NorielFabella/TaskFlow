import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import FilterSelect from "../../../components/ui/FilterSelect";

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

            <div className="flex flex-col gap-3 sm:flex-row">

                <Input
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="sm:max-w-md sm:flex-1"
                    
                />

                <FilterSelect
                    className="w-full sm:w-auto"
                    value={status}
                    onChange={(e) =>
                        onStatusChange(e.target.value)
                    }
                >
                    <option value="All">
                        All Status
                    </option>

                    <option value="Not Started">
                        Not Started
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Completed">
                        Completed
                    </option>
                </FilterSelect>

            </div>

            <Button
                onClick={onCreateProject}
                className="w-full sm:w-auto"
            >
                + New Project
            </Button>

        </div>
    );
}
