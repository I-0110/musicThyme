// Helper functions
import { QuizQuestion, CharacterOrder } from "./interface";
import { carnivalMovements, quizQuestions } from "./quiz-data";

export const getQuestionByMovementId = (movementId: string): QuizQuestion | undefined => {
    return quizQuestions.find(q => q.movementId === movementId);
};

export const getMovementById = (movementId: string): CharacterOrder | undefined => {
    return carnivalMovements.find(m => m.id === movementId);
};

// Shuffle Questions Array 
export const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}




