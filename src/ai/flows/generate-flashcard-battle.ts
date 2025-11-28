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
  prompt: `Bạn là một AI tạo ra các trò chơi chiến đấu bằng thẻ flashcard cho học sinh.

  Học sinh sẽ cung cấp một chủ đề hoặc khái niệm, và bạn sẽ tạo ra một bộ thẻ flashcard với các câu hỏi và câu trả lời liên quan đến chủ đề đó.

  Chủ đề/Khái niệm: {{{subject}}}

  Tạo một bộ thẻ flashcard (ít nhất 5 thẻ) có thể được sử dụng trong một trò chơi chiến đấu bằng thẻ flashcard. Mỗi thẻ nên có một câu hỏi và câu trả lời tương ứng.
  Các thẻ flashcard phải đa dạng và bao gồm các khía cạnh khác nhau của chủ đề.
  Đầu ra phải là một đối tượng JSON theo định dạng của GenerateFlashcardBattleOutputSchema.
  Đảm bảo rằng các trường "question" và "answer" không trống.
  Không bao gồm bất kỳ giải thích hoặc ngữ cảnh bổ sung nào ngoài chính các thẻ flashcard.
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
