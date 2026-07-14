import { ListTodo } from "lucide-react";

export default function EmptyTasks() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-20">

            <ListTodo
                size={42}
                className="text-zinc-600"
            />

            <h2 className="mt-4 text-xl font-semibold text-white">
                No Tasks Found
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
                Try changing your search or filters.
            </p>

        </div>
    );
}