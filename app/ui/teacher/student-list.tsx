"use client";

import { useState } from "react";
import { Student, Goal } from "@/app/lib/teacher/types";
import StudentCard from "./student-card";

type Props = {
  students: Student[];
  loading: boolean;
  error: string | null;
  goalsByStudent: Record<string, Goal[]>;
  fetchGoalsForStudent: (id: string) => void;
  removeStudent: (id: string) => void;
  deleteGoal: (goalId: string, studentId: string) => void;
  onAssignGoal: (student: Student) => void;
  onEditGoal: (goal: Goal, studentId: string, student: Student) => void;
};

export default function StudentList({
  students,
  loading,
  error,
  goalsByStudent,
  fetchGoalsForStudent,
  removeStudent,
  deleteGoal,
  onAssignGoal,
  onEditGoal,
}: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading) {
    return <p className="text-thyme-300 animate-pulse">Loading students...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  if (students.length === 0) {
    return (
      <div className="bg-thyme-100 rounded-lg p-8 text-center">
        <p className="text-thyme-300">No students yet!</p>
        <p className="text-thyme-300 text-sm mt-1">
          Add your first student using the form on the left.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {students.map(student => (
        <StudentCard
          key={student.id}
          student={student}
          expanded={expandedId === student.id}
          goals={goalsByStudent[student.id] ?? []}
          onToggle={() => {
            const newId = expandedId === student.id ? null : student.id;
            setExpandedId(newId);
            if (newId) fetchGoalsForStudent(newId);
          }}
          onRemove={removeStudent}
          onAssignGoal={onAssignGoal}
          onEditGoal={(goal, studentId) =>
            onEditGoal(goal, studentId, student)
          }
          onDeleteGoal={(goalId, studentId) =>
            deleteGoal(goalId, studentId)
          }
        />
      ))}
    </div>
  );
}