import { FolderSearch } from "lucide-react";

export default function EmptyProjects() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-20 text-center">

            <div className="rounded-full bg-zinc-900 p-5">
                <FolderSearch
                    size={36}
                    className="text-zinc-500"
                />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-white">
                No projects found
            </h2>

            <p className="mt-2 max-w-sm text-zinc-500">
                Try adjusting your search or filter settings.
            </p>

        </div>
    );
}