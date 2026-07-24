import type { Task } from "../types/task";

export interface CalendarDay {
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
}

export function getCalendarDays(
    currentDate: Date
): CalendarDay[] {

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(
        year,
        month,
        1
    );

    const lastDayOfMonth = new Date(
        year,
        month + 1,
        0
    );

    const firstWeekDay =
        firstDayOfMonth.getDay();

    const daysInMonth =
        lastDayOfMonth.getDate();

    const previousMonthLastDay =
        new Date(
            year,
            month,
            0
        ).getDate();

    const days: CalendarDay[] = [];

    // Previous month

    for (
        let i = firstWeekDay - 1;
        i >= 0;
        i--
    ) {

        days.push({

            date: new Date(
                year,
                month - 1,
                previousMonthLastDay - i
            ),

            dayNumber:
                previousMonthLastDay - i,

            isCurrentMonth: false,

        });

    }

    // Current month

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        days.push({

            date: new Date(
                year,
                month,
                day
            ),

            dayNumber: day,

            isCurrentMonth: true,

        });

    }

    // Next month

    let nextDay = 1;

    while (days.length < 42) {

        days.push({

            date: new Date(
                year,
                month + 1,
                nextDay
            ),

            dayNumber: nextDay,

            isCurrentMonth: false,

        });

        nextDay++;

    }

    return days;

}

export function isToday(
    date: Date
) {

    const today = new Date();

    return (

        today.getFullYear() ===
            date.getFullYear() &&

        today.getMonth() ===
            date.getMonth() &&

        today.getDate() ===
            date.getDate()

    );

}

export function isSameDate(
    first: Date,
    second: Date
) {

    return (

        first.getFullYear() ===
            second.getFullYear() &&

        first.getMonth() ===
            second.getMonth() &&

        first.getDate() ===
            second.getDate()

    );

}

function parseLocalDate(
    value: string
): Date {

    const [year, month, day] =
        value.split("-").map(Number);

    return new Date(
        year,
        month - 1,
        day
    );

}

export function getTasksForDate(
    tasks: Task[],
    date: Date
) {

    return tasks.filter(
        (task) =>
            !task.completed &&
            isSameDate(
                parseLocalDate(task.dueDate),
                date
            )
    );

}