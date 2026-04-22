import { Entry } from "@/app/lib/practice/types";
// Duration helper functions for practice entries
export function calculateDuration(startTime: string, endTime: string) {
    if (!startTime || !endTime) return "--";
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const difference = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    if (difference <= 0) return "--";

    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;
    if (hours === 0) return `${minutes}min(s)`;
    if (minutes === 0) return `${hours}hr(s)`;
    return `${hours}hr ${minutes}min(s)`;
}

export function minutesToTime(time: string) {
    if (!time) return "--";
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const min = m.toString().padStart(2, "0");
    return `${hour12}:${min} ${period}`;
}

// Group entries by date and sum duration in minutes
export function getChartData(entries: Entry[]) {
    const map: Record<string, number> = {};

    entries.forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });

        const [startHour, startMins] = entry.startTime.split(":").map(Number);
        const [endHour, endMins] = entry.endTime.split(":").map(Number);
        const mins = (endHour * 60 + endMins) - (startHour * 60 + startMins);

        if (mins > 0) {
            map[date] = (map[date] ?? 0) + mins;
        }
    });

    // Convert to array sorted by date, last 14 days 
    return Object.entries(map)
        .slice(-14)
        .map(([date, minutes]) => ({
            date,
            minutes, 
            hours: parseFloat((minutes / 60).toFixed(1)),
    }));
}