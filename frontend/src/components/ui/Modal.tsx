import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({
    open,
    title,
    children,
    onClose,
}: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">

            <div className="my-auto w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-4 sm:px-6">

                    <h2 className="min-w-0 text-lg font-semibold text-white">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Content */}

                <div className="p-4 sm:p-6">
                    {children}
                </div>

            </div>

        </div>
    );
}
