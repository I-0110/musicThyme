import { Entry } from "@/app/lib/practice/types";
import { Student } from "../teacher/types";
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

export function totalHoursThisWeek(entries: Student["entries"]): string {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const mins = entries
    .filter(e => new Date(e.date) >= weekAgo)
    .reduce((sum, e) => {
      const [sh, sm] = e.startTime.split(":").map(Number);
      const [eh, em] = e.endTime.split(":").map(Number);
      const diff = (eh * 60 + em) - (sh * 60 + sm);
      return sum + (diff > 0 ? diff : 0);
    }, 0);
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    if (hrs === 0) return `${rem} min`;
    if (rem === 0) return `${hrs} hr`;
    return `${hrs} hr ${rem} min`;
}

export function minutesToTime(time: string) {
    if (!time) return "--";
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const min = m.toString().padStart(2, "0");
    return `${hour12}:${min} ${period}`;
}

export function formatMins(mins: number): string {
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (hrs === 0) return `${rem} min`;
  if (rem === 0) return `${hrs} hr`;
  return `${hrs} hr ${rem} min`;
}

export function getTotalMinsThisWeek(entries: { date: string; startTime: string; endTime: string }[]): number {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return entries
    .filter(e => new Date(e.date) >= weekAgo)
    .reduce((sum, e) => {
      const [sh, sm] = e.startTime.split(":").map(Number);
      const [eh, em] = e.endTime.split(":").map(Number);
      const diff = (eh * 60 + em) - (sh * 60 + sm);
      return sum + (diff > 0 ? diff : 0);
    }, 0);
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

export function getCurrentStreak(entries: Entry[]): number {
  if (entries.length === 0) return 0;

  const practicedDays = new Set(
    entries.map(e => new Date(e.date).toLocaleDateString())
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    if (practicedDays.has(day.toLocaleDateString())) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}