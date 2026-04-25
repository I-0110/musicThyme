import { Entry } from "@/app/lib/practice/types";

export function getLast7Days(entries: Entry[]) {
    const days: { date: string; minutes: number }[] = [];

    for (let i = 6; i>= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const label = day.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
        const dataStr = day.toLocaleDateString();

        const mins = entries
            .filter(e => new Date(e.date).toLocaleDateString() === dataStr) 
            .reduce((sum, e) => {
                const [startHour, startMins] = e.startTime.split(":").map(Number);
                const [endHour, endMins] = e.endTime.split(":").map(Number);
                const diff = (endHour * 60 + endMins) - (startHour * 60 + startMins);

                return sum + (diff > 0 ? diff : 0);
            }, 0);

            days.push({ date: label, minutes: mins });
    }

    return days;
}