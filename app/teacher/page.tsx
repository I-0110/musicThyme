"use client";

// TODO: Delete this line and create a new file on ui folders to import here
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTeacher } from "@/app/lib/teacher/useTeacher";
import Nav from "@/app/ui/nav";
import StudentCard from "@/app/ui/teacher/student-card";
import GoalForm from "@/app/ui/teacher/goal-form";
import { Student, Goal } from "@/app/lib/teacher/types";

function formatMins(mins: number): string {
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (hrs === 0) return `${rem} min`;
  if (rem === 0) return `${hrs} hr`;
  return `${hrs} hr ${rem} min`;
}

function getTotalMinsThisWeek(entries: Student["entries"]): number {
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

export default function TeacherPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    students, loading, error, goalsByStudent,
    addStudent, removeStudent, fetchGoalsForStudent, deleteGoal,
  } = useTeacher();

  const [addForm, setAddForm] = useState({ name: "", email: "" });
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [goalTarget, setGoalTarget] = useState<Student | null>(null);
  const [editingGoal, setEditingGoal] = useState<{
    goal: Goal;       
    studentId: string;
  } | null>(null);

  // Redirect non-teachers
  if (status === "loading") return null;
  if (
    session?.user?.role !== "TEACHER" &&
    session?.user?.role !== "ADMIN"
  ) {
    router.push("/practice");
    return null;
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);
    setAddSuccess(false);
    try {
      await addStudent(addForm.name, addForm.email);
      setAddForm({ name: "", email: "" });
      setAddSuccess(true);
    } catch (err) {
      setAddError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setAddLoading(false);
    }
  };

  // Summary stats
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

  const totalGoals = Object.values(goalsByStudent)
    .reduce((sum, goals) => sum + goals.length, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 p-6">

        {/* Summary stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-thyme-100 rounded-lg p-4 text-center">
            <p className="text-xs text-thyme-300 mb-1">Total students</p>
            <p className="text-2xl font-bold text-thyme-500">
              {students.length}
            </p>
          </div>
          <div className="bg-thyme-100 rounded-lg p-4 text-center">
            <p className="text-xs text-thyme-300 mb-1">Practiced today</p>
            <p className="text-2xl font-bold text-thyme-500">
              {practicedToday}
            </p>
          </div>
          <div className="bg-thyme-100 rounded-lg p-4 text-center">
            <p className="text-xs text-thyme-300 mb-1">Avg this week</p>
            <p className="text-2xl font-bold text-thyme-500">
              {formatMins(avgMinsThisWeek)}
            </p>
          </div>
          <div className="bg-thyme-100 rounded-lg p-4 text-center">
            <p className="text-xs text-thyme-300 mb-1">Goals assigned</p>
            <p className="text-2xl font-bold text-thyme-500">
              {totalGoals}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">

          {/* LEFT — 1/3 */}
          <div className="md:w-1/3 space-y-6">

            {/* Add student form */}
            <div className="bg-thyme-100 rounded-lg p-6">
              <h2 className="text-xl font-bold text-thyme-500 mb-4">
                Add student
              </h2>
              <form onSubmit={handleAddStudent} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder=" "
                    value={addForm.name}
                    onChange={e =>
                      setAddForm({ ...addForm, name: e.target.value })
                    }
                    className="peer w-full border border-gray-300 rounded p-3 pt-5
                      focus:outline-none focus:border-thyme-500"
                    required
                  />
                  <label className="absolute left-3 top-1 text-xs text-thyme-400
                    pointer-events-none transition-all duration-200
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                    peer-focus:top-1 peer-focus:text-xs">
                    Student name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder=" "
                    value={addForm.email}
                    onChange={e =>
                      setAddForm({ ...addForm, email: e.target.value })
                    }
                    className="peer w-full border border-gray-300 rounded p-3 pt-5
                      focus:outline-none focus:border-thyme-500"
                    required
                  />
                  <label className="absolute left-3 top-1 text-xs text-thyme-400
                    pointer-events-none transition-all duration-200
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                    peer-focus:top-1 peer-focus:text-xs">
                    Student email
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="w-full bg-thyme-500 text-white py-2 rounded
                    disabled:opacity-50 hover:bg-thyme-600"
                >
                  {addLoading ? "Adding..." : "Add to my class"}
                </button>
                {addError && (
                  <p className="text-red-500 text-sm">{addError}</p>
                )}
                {addSuccess && (
                  <p className="text-green-500 text-sm">
                    Student added! ✓
                  </p>
                )}
              </form>
            </div>

            {/* Goal form — slides in when + Goal is clicked */}
            {goalTarget && (
              <div className="bg-thyme-100 rounded-lg p-6">
                <GoalForm
                  students={students}
                  editingGoal={editingGoal}
                  onSuccess={() => {
                    setGoalTarget(null);
                    setEditingGoal(null);
                    // Refresh goals for this student
                    if (goalTarget) fetchGoalsForStudent(goalTarget.id);
                  }}
                  onCancel={() => {
                    setGoalTarget(null);
                    setEditingGoal(null);
                  }}
                />
              </div>
            )}

          </div>

          {/* RIGHT — 2/3 — Student cards */}
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-xl font-bold text-thyme-500">
              My students
            </h2>

            {loading && (
              <p className="text-thyme-300 animate-pulse">
                Loading students...
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            {!loading && students.length === 0 && (
              <div className="bg-thyme-100 rounded-lg p-8 text-center">
                <p className="text-thyme-300">
                  No students yet!
                </p>
                <p className="text-thyme-300 text-sm mt-1">
                  Add your first student using the form on the left.
                </p>
              </div>
            )}

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
              onAssignGoal={s => {
                setGoalTarget(s);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onEditGoal={(goal, studentId) => {
                setGoalTarget(student);
                setEditingGoal({ goal, studentId }); // ← goal not goalId
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDeleteGoal={(goalId, studentId) => deleteGoal(goalId, studentId)}
            />
          ))}
          </div>

        </div>
      </main>
    </div>
  );
}