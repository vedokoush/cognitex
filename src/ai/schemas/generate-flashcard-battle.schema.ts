import {z} from 'genkit';

export const GenerateFlashcardBattleInputSchema = z.object({
  subject: z
    .string()
    .describe(
      'The subject or concept for which to generate the flashcard battle.'
    ),
});
export type GenerateFlashcardBattleInput = z.infer<
  typeof GenerateFlashcardBattleInputSchema
>;

export const GenerateFlashcardBattleOutputSchema = z.object({
  flashcards: z
    .array(
      z.object({
        question: z.string().describe('The question for the flashcard.'),
        answer: z.string().describe('The answer to the question.'),
      })
    )
    .describe('An array of flashcards for the battle.'),
});
export type GenerateFlashcardBattleOutput = z.infer<
  typeof GenerateFlashcardBattleOutputSchema
>;
