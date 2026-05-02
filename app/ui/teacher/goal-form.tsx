"use client";

import { useState, useEffect } from "react";
import { Student, GoalFormData, Goal } from "@/app/lib/teacher/types";

type Props = {
  students: Student[];
  editingGoal?: { goal: Goal; studentId: string } | null;
  targetStudentId?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function GoalForm({  
  students, 
  editingGoal,
  targetStudentId,
  onSuccess, 
  onCancel 
}: Props) {

  const [form, setForm] = useState<GoalFormData>({
    studentIds: (() => {
      if (editingGoal) return [editingGoal.studentId];
      if (targetStudentId === "all") return students.map(s => s.id);
      if (targetStudentId) return [targetStudentId];
      return [];
    })(), 
    title: editingGoal?.goal.title ?? "",
    description: editingGoal?.goal.description ?? null,
    targetMins: editingGoal?.goal.targetMins ?? 30,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Calculate initial studentIds synchronously
    const getInitialStudentIds = () => {
      if (editingGoal) return [editingGoal.studentId];
      if (targetStudentId === "all") return students.map(s => s.id);
      if (targetStudentId === "selected") return [];
      if (targetStudentId) return [targetStudentId];
      return [];
    };
    setForm(prev => ({
      ...prev,
      studentIds: getInitialStudentIds(),
    }));
  }, [editingGoal, targetStudentId, students]);

  const toggleStudent = (id: string) => {
    setForm(prev => ({
      ...prev,
      studentIds: prev.studentIds.includes(id)
        ? prev.studentIds.filter(s => s !== id)
        : [...prev.studentIds, id],
    }));
  };

  const selectAll = () => {
    setForm(prev => ({
      ...prev,
      studentIds: students.map(s => s.id),
    }));
  };

  const allSelected = form.studentIds.length === students.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.studentIds.length === 0) {
      setError("Please select at least one student.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (editingGoal) {
        await fetch(`/api/goals/${editingGoal.goal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            targetMins: form.targetMins,
          }),
        });
      } else {
        // Create new goal(s)
        const { studentIds, ...rest } = form;
        await fetch("/api/goals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            studentIds.length === 1
              ? { studentId: studentIds[0], ...rest }
              : { studentIds, ...rest }
          ),
        });
      }
      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3 p-3">
      <h1 className="mb-3 text-xl font-bold text-thyme-400">
        {editingGoal ? "Edit Goal" : "Assign New Goal"}
      </h1>

      {/* Student selector */}
      <div className="w-full overflow-hidden">
        {/* Selected students — checkboxes */}
        {(targetStudentId === "selected" || !targetStudentId) && (
          <div
            style={{ position: "relative", zIndex: 0 }}
            className="flex flex-col space-y-2 p-3 max-h-40 overflow-y-auto w-full"
          >
            {students.map(student => (
              <div
                key={student.id}
                style={{ position: "relative", zIndex: 0 }}
                className="flex flex-row items-center gap-2 p-1 rounded hover:bg-thyme-50 cursor-pointer"
                onClick={() => toggleStudent(student.id)}
              >
                <input
                  type="checkbox"
                  checked={form.studentIds.includes(student.id)}
                  onChange={() => toggleStudent(student.id)}
                  style={{ position: "relative", zIndex: 0 }}
                  className="accent-thyme-500 shrink-0 w-4 h-4 cursor-pointer"
                  onClick={e => e.stopPropagation()}
                />
                <span className="text-sm text-thyme-500">{student.name}</span>
                <span className="text-xs text-thyme-300">{student.email}</span>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                if (allSelected) {
                  setForm(prev => ({ ...prev, studentIds: [] }));
                } else {
                  selectAll();
                }
              }}
              className="flex items-center gap-1 text-sm bg-thyme-500
                text-thyme-100 px-4 py-2 rounded hover:bg-thyme-300"
            >
              {allSelected ? "Unselect All" : "Select All Students"}
            </button>
          </div>
        )}
      </div>

      {/* Single student */}
      {targetStudentId && targetStudentId !== "all" && targetStudentId !== "selected" && (
        <div className="rounded p-3">
          {students.filter(s => s.id === targetStudentId).map(student => (
            <div key={student.id} className="flex items-center gap-2">
              <span className="text-sm font-medium text-thyme-500">{student.name}</span>
              <span className="text-xs text-thyme-300">{student.email}</span>
            </div>
          ))}
        </div>
      )}

      {/* All students — names only, no checkboxes */}
      {targetStudentId === "all" && (
        <div className="rounded p-3 space-y-1 max-h-40 overflow-y-auto">
          {students.map(student => (
            <div key={student.id} className="flex items-center gap-2">
              <span className="text-sm text-thyme-500">{student.name}</span>
              <span className="text-xs text-thyme-300">{student.email}</span>
            </div>
          ))}
        </div>
      )}

      {/* Goal Title */}
      <div className="relative">
        <input
          type="text"
          placeholder=" "
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="peer w-full border border-thyme-300 rounded p-3 pt-5 focus:outline-none focus:border-thyme-500"
          required
        />
        <label className="absolute left-3 top-1 text-xs text-thyme-400 bg-thyme-100 pointer-events-none
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-1 peer-focus:text-xs transition-all duration-200">
          Goal Title
        </label>
      </div>

      {/* Description */}
      <div className="relative">
        <textarea
          placeholder=" "
          value={form.description ?? ""}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="peer w-full border border-thyme-300 rounded p-3 pt-5 focus:outline-none focus:border-thyme-500"
        />
        <label className="absolute left-3 top-1 text-xs text-thyme-400 pointer-events-none
          peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm
          peer-focus:top-0 peer-focus:text-transparent transition-all duration-200">
          Description
        </label>
      </div>

      {/* Target minutes per day */}
      <div className="relative">
        <input
          type="number"
          placeholder=" "
          min={1}
          value={form.targetMins}
          onChange={e => setForm({ ...form, targetMins: Number(e.target.value) })}
          className="peer w-full border border-thyme-300 text-thyme-300 rounded p-3 pt-5 focus:outline-none focus:border-thyme-500"
          required
        />
        <label className="absolute left-3 top-1 text-xs text-thyme-500 bg-thyme-100 pointer-events-none
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-1 peer-focus:text-xs transition-all duration-200">
          Target minutes per day
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-thyme-300 text-thyme-100 py-2 rounded hover:bg-thyme-200 hover:text-thyme-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Assign goal"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-thyme-500 text-thyme-500 py-2 rounded hover:bg-red-500 hover:text-thyme-100 hover:border-transparent disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}