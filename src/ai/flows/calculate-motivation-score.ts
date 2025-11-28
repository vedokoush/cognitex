'use server';

/**
 * @fileOverview A flow to calculate the motivation score based on mood and progress data.
 *
 * - calculateMotivationScore - A function that calculates the motivation score.
 * - CalculateMotivationScoreInput - The input type for the calculateMotivationScore function.
 * - CalculateMotivationScoreOutput - The return type for the calculateMotivationScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateMotivationScoreInputSchema = z.object({
  mood: z
    .string()
    .describe("The student's current mood (e.g., stress, excited, tired)."),
  progressData: z
    .string()
    .describe(
      'A string containing a json document of student progress data, including streak counter, time spent learning and skill growth indicator.'
    ),
});
export type CalculateMotivationScoreInput = z.infer<
  typeof CalculateMotivationScoreInputSchema
>;

const CalculateMotivationScoreOutputSchema = z.object({
  motivationScore: z
    .number()
    .describe(
      'A numerical score representing the student’s current motivation level.'
    ),
  insights: z
    .string()
    .describe(
      'Insights into the motivation score, including factors that are positively or negatively influencing it.'
    ),
});
export type CalculateMotivationScoreOutput = z.infer<
  typeof CalculateMotivationScoreOutputSchema
>;

export async function calculateMotivationScore(
  input: CalculateMotivationScoreInput
): Promise<CalculateMotivationScoreOutput> {
  return calculateMotivationScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateMotivationScorePrompt',
  input: {schema: CalculateMotivationScoreInputSchema},
  output: {schema: CalculateMotivationScoreOutputSchema},
  prompt: `You are an AI motivation expert. Your task is to calculate a motivation score for a student based on their mood and progress data.

Mood: {{{mood}}}
Progress Data: {{{progressData}}}

Consider the mood and progress data to calculate the motivation score. A positive mood and good progress should result in a higher score. A negative mood and poor progress should result in a lower score.

Provide insights into the motivation score, explaining which factors are contributing positively or negatively to the score.

Please output a JSON document.
`,
});

const calculateMotivationScoreFlow = ai.defineFlow(
  {
    name: 'calculateMotivationScoreFlow',
    inputSchema: CalculateMotivationScoreInputSchema,
    outputSchema: CalculateMotivationScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
