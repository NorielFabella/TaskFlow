import { useState } from "react";

import { useTasks } from "../hooks/useTasks";

import {
    getTasksForDate,
} from "../services/calendar.service";

import type { Task } from "../types/task";

import PageHeader from "../components/common/PageHeader";

import CalendarHeader from "../features/calendar/components/CalendarHeader";
import CalendarGrid from "../features/calendar/components/CalendarGrid";
import CalendarDayModal from "../features/calendar/components/CalendarDayModal";

export default function CalendarPage() {

    const { tasks } = useTasks();

    const [currentDate, setCurrentDate] =
        useState(new Date());

    const [selectedDate, setSelectedDate] =
        useState<Date | null>(null);

    const [selectedTasks, setSelectedTasks] =
        useState<Task[]>([]);

    const [modalOpen, setModalOpen] =
        useState(false);

    function previousMonth() {

        setCurrentDate((previous) => {

            const next = new Date(previous);

            next.setMonth(next.getMonth() - 1);

            return next;

        });

    }

    function nextMonth() {

        setCurrentDate((previous) => {

            const next = new Date(previous);

            next.setMonth(next.getMonth() + 1);

            return next;

        });

    }

    function goToToday() {

        setCurrentDate(new Date());

    }

    function handleDayClick(date: Date) {

        setSelectedDate(date);

        setSelectedTasks(
            getTasksForDate(tasks, date)
        );

        setModalOpen(true);

    }

    return (

        <div className="space-y-8">

            <PageHeader
                title="Calendar"
                subtitle="View your deadlines and scheduled tasks."
            />

            <CalendarHeader
                currentDate={currentDate}
                onPrevious={previousMonth}
                onNext={nextMonth}
                onToday={goToToday}
            />

            <CalendarGrid
                currentDate={currentDate}
                tasks={tasks}
                onDayClick={handleDayClick}
            />

            <CalendarDayModal
                open={modalOpen}
                date={selectedDate}
                tasks={selectedTasks}
                onClose={() => setModalOpen(false)}
            />

        </div>

    );

}