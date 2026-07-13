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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">

                    <h2 className="text-lg font-semibold text-white">
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

                <div className="p-6">
                    {children}
                </div>

            </div>

        </div>
    );
}