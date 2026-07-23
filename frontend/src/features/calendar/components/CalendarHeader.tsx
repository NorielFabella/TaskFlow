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
        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">

            <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-start">

                <Button
                    variant="secondary"
                    onClick={onPrevious}
                    className="px-3 sm:px-5"
                >
                    <ChevronLeft size={18} />
                </Button>

                <h2 className="min-w-0 text-center text-xl font-bold text-white sm:text-2xl">
                    {month}
                </h2>

                <Button
                    variant="secondary"
                    onClick={onNext}
                    className="px-3 sm:px-5"
                >
                    <ChevronRight size={18} />
                </Button>

            </div>

            <Button
                onClick={onToday}
                className="w-full md:w-auto"
            >
                Today
            </Button>

        </div>
    );
}
