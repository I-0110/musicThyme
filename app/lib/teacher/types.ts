import { Entry } from "@/app/lib/practice/types";

export type Student = {
    id: string;
    name: string | null;
    email: string;
    entries: Entry[];
};

export type GoalFormData = {
    studentIds: string[];
    title: string;
    description: string | null;
    targetMins: number;
}

export type Goal = {
    id: string;
    studentId: string;
    teacherId: string;
    title: string;
    description: string | null;
    targetMins: number;
    createdAt: string;
}

// Empty form template to assign Goal
export const emptyForm: GoalFormData = {
    studentIds: [],
    title: "",
    description: "",
    targetMins: 0,
};