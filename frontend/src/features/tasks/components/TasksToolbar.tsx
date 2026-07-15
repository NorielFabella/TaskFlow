import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import FilterSelect from "../../../components/ui/FilterSelect";

type TaskStatusFilter =
    | "All"
    | "Completed"
    | "Pending";


type PriorityFilter =
    | "All"
    | "High"
    | "Medium"
    | "Low";


interface TasksToolbarProps {

    search: string;

    status: TaskStatusFilter;

    priority: PriorityFilter;


    onSearchChange: (
        value: string
    ) => void;


    onStatusChange: (
        value: TaskStatusFilter
    ) => void;


    onPriorityChange: (
        value: PriorityFilter
    ) => void;


    onCreateTask: () => void;

}

export default function TasksToolbar({
    search,
    status,
    priority,
    onSearchChange,
    onStatusChange,
    onPriorityChange,
    onCreateTask,
}: TasksToolbarProps) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-1 flex-wrap gap-3">

                <Input
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    className="max-w-md"
                />

                <FilterSelect
                    value={status}
                    onChange={(e) =>
                        onStatusChange(
                            e.target.value as TaskStatusFilter
                        )
                    }
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm text-white outline-none transition-colors hover:border-zinc-700 focus:border-white"
                >
                    <option value="All">
                        All Status
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                    <option value="Pending">
                        Pending
                    </option>
                </FilterSelect>

                <FilterSelect
                    value={priority}
                    onChange={(e) =>
                        onPriorityChange(
                            e.target.value as PriorityFilter
                        )
                    }
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm text-white outline-none transition-colors hover:border-zinc-700 focus:border-white"
                >
                    <option value="All">
                        All Priority
                    </option>

                    <option value="High">
                        High
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="Low">
                        Low
                    </option>
                </FilterSelect>

            </div>

            <Button onClick={onCreateTask}>
                + New Task
            </Button>

        </div>
    );
}