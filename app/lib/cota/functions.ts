// Helper functions
import { Character, Details, Vocabulary, Content, LessonPlan, Instrumentation } from "./interface";
import { carnivalCharacters, characterDetails, characterContent, characterInstruments, characterLesson, vocabulary } from "./data";
// Please add QuizQuestion to import { Character } from "./interface";

// import { carnivalMovements, quizQuestions } from "./data";

// export const getQuestionByMovementId = (movementId: string): QuizQuestion | undefined => {
//     return quizQuestions.find(q => q.movementId === movementId);
// };

// export const getMovementById = (movementId: string): Character | undefined => {
//     return carnivalMovements.find(m => m.id === movementId);
// };

// Shuffle Questions Array 
export const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Grid position for a character based on their index (0 - 13), 5x4 grid
export const getGrid = (index: number): { row: number; col: number} => {
    // Layout for 14 characters in 5x4 grid (border pattern)
    const positions = [
        // Top row: 0 - 4
        { row: 0, col: 0}, 
        { row: 0, col: 1}, 
        { row: 0, col: 2},
        { row: 0, col: 3}, 
        { row: 0, col: 4},
        // Right col (2 middle positions, 5 - 6)
        { row: 1, col: 4}, 
        { row: 2, col: 4},
        // Bottom row (5 positions, right to left, 7 - 11)
        { row: 3, col: 4}, 
        { row: 3, col: 3}, 
        { row: 3, col: 2},
        { row: 3, col: 1}, 
        { row: 3, col: 0},
        // Left col (2 middle positions, bottom to top, 12 - 13)
        { row: 2, col: 0}, 
        { row: 1, col: 0},
    ];

    return positions[index] || { row: 0, col: 0 };
}

// Characters on the map grid
export const mapPath = (characters: Character[]) => {
    const sorted = [...characters].sort((a, b) => a.orderNumber - b.orderNumber);

    return {
        topRow: sorted.slice(0, 5),
        rightColumn: sorted.slice(5, 8),
        bottomRow: sorted.slice(8, 13).reverse(),
        leftColumn: sorted.slice(13, 14)
    };
};

// Find Character by Id, so user can access individual page with more information
export function getCharacterById(id: string): Character | undefined {
    return carnivalCharacters.find(char => char.id === id);
}

// Get Details by characterId
export function getCharacterDetails(characterId: string): Details | undefined {
    return characterDetails.find(d => d.characterId === characterId);
}

// Get Content by characterId START HERE
export function getCharacterContent(characterId: string): Content | undefined {
    return characterContent.find(content => content.characterId === characterId);
}

// Get Instrumentation
export function getCharacterInstruments(characterId: string): Instrumentation | undefined {
    return characterInstruments.find(instr => instr.characterId === characterId);
}

// Get Lesson Plan
export function getCharacterLessonPlan(characterId: string): LessonPlan | undefined {
    return characterLesson.find(lesson => lesson.characterId === characterId);
}

// Get Vocabulary
export function getVocabulary(characterId: string): Vocabulary[] {
    return vocabulary.filter(vocab => vocab.characterId === characterId);
}

