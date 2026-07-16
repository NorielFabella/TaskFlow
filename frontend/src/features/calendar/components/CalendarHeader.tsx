import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import Button from "../../../components/ui/Button";

interface CalendarHeaderProps {
    currentDate: Date;
    onPrevious: () => void;
    onNext: () => void;
    onToday: () => void;
}

export default function CalendarHeader({
    currentDate,
    onPrevious,
    onNext,
    onToday,
}: CalendarHeaderProps) {

    const month = currentDate.toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric",
        }
    );

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

                <Button
                    variant="secondary"
                    onClick={onPrevious}
                >
                    <ChevronLeft size={18} />
                </Button>

                <h2 className="text-2xl font-bold text-white">
                    {month}
                </h2>

                <Button
                    variant="secondary"
                    onClick={onNext}
                >
                    <ChevronRight size={18} />
                </Button>

            </div>

            <Button
                onClick={onToday}
            >
                Today
            </Button>

        </div>
    );
}