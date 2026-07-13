import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";

interface DropdownItem {
    label: string;
    onClick: () => void;
    danger?: boolean;
}

interface DropdownMenuProps {
    items: DropdownItem[];
}

export default function DropdownMenu({
    items,
}: DropdownMenuProps) {
    const [open, setOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <button
                onClick={() => setOpen((value) => !value)}
                className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                aria-label="Open Menu"
            >
                <MoreHorizontal size={18} />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-zinc-800 bg-zinc-900 p-2 shadow-xl">

                    {items.map((item) => (

                        <button
                            key={item.label}
                            onClick={() => {
                                item.onClick();
                                setOpen(false);
                            }}
                            className={`flex w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                                item.danger
                                    ? "text-red-400 hover:bg-red-500/10"
                                    : "text-white hover:bg-zinc-800"
                            }`}
                        >
                            {item.label}
                        </button>

                    ))}

                </div>
            )}

        </div>
    );
}