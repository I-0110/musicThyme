// Entry types/interfaces for practice log

// Previous practice logs
export type Entry = {
    id: string;
    date: string;
    instrument: string;
    scales: string[];
    study: string[];
    piece: string[];
    solos: string[];
    notes: string | undefined;
    startTime: string;
    endTime: string;
};

// New practice log form data
export type PracticeForm = {
    date: string;
    instrument: string;
    scales: string[];
    study: string[];
    piece: string[];
    solos: string[];
    notes: string | undefined;
    startTime: string;
    endTime: string;
};

// Empty form template for new practice log
export const emptyForm: PracticeForm = {
    date: new Date().toISOString().split('T')[0], // Default to today's date
    instrument: "",
    scales: [],
    study: [],
    piece: [],
    solos: [],
    notes: undefined,
    startTime: "00:00",
    endTime: "00:00",
};

