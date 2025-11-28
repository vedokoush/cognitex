'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating flashcard battle games based on a given subject or concept.
 *
 * - generateFlashcardBattle - A function that takes a subject/concept and returns a flashcard battle game.
 * - GenerateFlashcardBattleInput - The input type for the generateFlashcardBattle function.
 * - GenerateFlashcardBattleOutput - The return type for the generateFlashcardBattle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardBattleInputSchema = z.object({
  subject: z.string().describe('The subject or concept for which to generate the flashcard battle.'),
});
export type GenerateFlashcardBattleInput = z.infer<typeof GenerateFlashcardBattleInputSchema>;

const GenerateFlashcardBattleOutputSchema = z.object({
  flashcards: z
    .array(
      z.object({
        question: z.string().describe('The question for the flashcard.'),
        answer: z.string().describe('The answer to the question.'),
      })
    )
    .describe('An array of flashcards for the battle.'),
});
export type GenerateFlashcardBattleOutput = z.infer<typeof GenerateFlashcardBattleOutputSchema>;

export async function generateFlashcardBattle(
  input: GenerateFlashcardBattleInput
): Promise<GenerateFlashcardBattleOutput> {
  return generateFlashcardBattleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlashcardBattlePrompt',
  input: {schema: GenerateFlashcardBattleInputSchema},
  output: {schema: GenerateFlashcardBattleOutputSchema},
  prompt: `You are an AI that generates flashcard battle games for students.

  The student will provide a subject or concept, and you will generate a set of flashcards with questions and answers related to that subject.

  Subject/Concept: {{{subject}}}

  Generate a set of flashcards (at least 5) that can be used in a flashcard battle game. Each flashcard should have a question and a corresponding answer.
  The flashcards should be diverse and cover different aspects of the subject.
  The output should be a JSON object in the format of GenerateFlashcardBattleOutputSchema.
  Make sure that the "question" and "answer" fields are not empty.
  Do not include any additional explanations or context other than the flashcards themselves.
  `,
});

const generateFlashcardBattleFlow = ai.defineFlow(
  {
    name: 'generateFlashcardBattleFlow',
    inputSchema: GenerateFlashcardBattleInputSchema,
    outputSchema: GenerateFlashcardBattleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
