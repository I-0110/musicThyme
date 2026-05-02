"use client"

import { Student } from "@/app/lib/teacher/types"
import { formatMins, getTotalMinsThisWeek } from "@/app/lib/practice/utils";

type Props = {
    students: Student[];
    totalGoals: number;
};

export default function TeacherSummary({ students, totalGoals }: Props) {
  const practicedToday = students.filter(s =>
    (s.entries ?? []).some(
      e => new Date(e.date).toLocaleDateString() ===
        new Date().toLocaleDateString()
    )
  ).length;

  const avgMinsThisWeek = students.length === 0 ? 0 :
    Math.round(
      students.reduce((sum, s) =>
        sum + getTotalMinsThisWeek(s.entries ?? []), 0
      ) / students.length
    );

  const stats = [
    { label: "Total students", value: students.length },
    { label: "Practiced today", value: practicedToday },
    { label: "Avg this week", value: formatMins(avgMinsThisWeek) },
    { label: "Goals assigned", value: totalGoals },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map(stat => (
        <div key={stat.label} className="bg-thyme-100 rounded-lg p-4 text-center">
          <p className="text-xs text-thyme-300 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-thyme-500">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}