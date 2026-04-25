"use client";

import { useState, useEffect } from "react";
import { Student, GoalFormData, emptyForm, Goal } from "./types";

export function useTeacher() {
  const [students, setStudents] = useState<Student[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalsByStudent, setGoalsByStudent] = useState<Record<string, Goal[]>>({});
  const [form, setForm] = useState<GoalFormData>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/teacher/students")
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load students");
        setLoading(false);
      });
  }, []);

  // Add/Remove student
  const addStudent = async (name: string, email: string) => {
    const res = await fetch("/api/teacher/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    setStudents(prev => [...prev, data.student]);
  };

  const removeStudent = async (studentId: string) => {
    if (!confirm("Remove this student from your class?")) return;
    await fetch("/api/teacher/students", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId }),
    });
    setStudents(prev => prev.filter(s => s.id !== studentId));
  };

  // Expand student's card to see more info.
  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Assign Goal for one student
  const assignGoal = async (
    studentId: string,
    goal: { title: string; description: string; targetMins: number }
  ) => {
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, ...goal }),
    });
    if (!res.ok) throw new Error("Failed to assign goal");
    return res.json();
  };

  // Assign one Goal for more students
  const assignGoalToMany = async (
    studentIds: string[],
    goal: { 
        title: string; 
        description: string;
        targetMins: string;
    }
  ) => {
    const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentIds, ...goal }),
    });

    if (!res.ok) throw new Error("Failed to assign goals");

    return res.json();
  };

  // Edit/Delete Goals
  const updateGoal = async (
    goalId: string,
    studentId: string,
    data: { 
      title: string;
      description: string | null;
      targetMins: number; 
    }
  ) => {
    const res = await fetch(`/api/goals/${goalId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setGoalsByStudent(prev => ({
      ...prev,
      [studentId]: (prev[studentId] ?? []).map(g => g.id === goalId ? updated : g),
    }));
  };
    
  const deleteGoal = async (goalId: string, studentId: string) => {
    if (!confirm("Delete this goal?")) return;
    await fetch(`/api/goals/${goalId}`, { method: "DELETE" });
    setGoalsByStudent(prev => ({
      ...prev,
      [studentId]: (prev[studentId] ?? []).filter(g => g.id !== goalId),
    }));
  };

  const handleCancelEdit = () => {
    setEdit(null);
    setForm(emptyForm);
  }

  // Find the goals for student (previous ones)
  const fetchGoalsForStudent = async (studentId: string) => {
    if (goalsByStudent[studentId]) return; 
    const res = await fetch(`/api/goals?studentId=${studentId}`);
    const data = await res.json();
    setGoalsByStudent(prev => ({ ...prev, [studentId]: data }));
  };

  return {
    students, goals, form, loading, edit, error, goalsByStudent, expandedId, setGoals,
    addStudent, removeStudent, toggleExpand, assignGoal, fetchGoalsForStudent, assignGoalToMany, updateGoal, deleteGoal, handleCancelEdit, 
  };
}