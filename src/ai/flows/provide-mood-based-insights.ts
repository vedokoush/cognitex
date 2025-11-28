// src/ai/flows/provide-mood-based-insights.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing mood-based insights to students.
 *
 * It includes:
 * - `provideMoodBasedInsights`: The main function to get mood insights.
 * - `MoodBasedInsightsInput`: The input type for the function.
 * - `MoodBasedInsightsOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodBasedInsightsInputSchema = z.object({
  mood: z
    .string()
    .describe("The student's selected mood (e.g., stressed, excited, tired)."),
});
export type MoodBasedInsightsInput = z.infer<typeof MoodBasedInsightsInputSchema>;

const MoodBasedInsightsOutputSchema = z.object({
  insight: z
    .string()
    .describe('AI-generated insights into why the student might be feeling the selected mood.'),
  suggestedActivity: z
    .string()
    .describe("A suggested activity based on the student's mood (e.g., challenge, relaxation game, quick study)."),
  motivationStateAnalysis: z.string().describe('Analysis of the student motivation state'),
});
export type MoodBasedInsightsOutput = z.infer<typeof MoodBasedInsightsOutputSchema>;

export async function provideMoodBasedInsights(
  input: MoodBasedInsightsInput
): Promise<MoodBasedInsightsOutput> {
  return provideMoodBasedInsightsFlow(input);
}

const moodBasedInsightsPrompt = ai.definePrompt({
  name: 'moodBasedInsightsPrompt',
  input: {schema: MoodBasedInsightsInputSchema},
  output: {schema: MoodBasedInsightsOutputSchema},
  prompt: `You are a supportive AI learning companion that helps students understand their mood and provides helpful recommendations.

  Based on the student's mood, provide insights into why they might be feeling that way.  Also, suggest an activity that would be appropriate for their current mood, and perform a brief motivation state analysis.

  Mood: {{{mood}}}

  Insight:
  Suggested Activity:
  Motivation State Analysis:`,
});

const provideMoodBasedInsightsFlow = ai.defineFlow(
  {
    name: 'provideMoodBasedInsightsFlow',
    inputSchema: MoodBasedInsightsInputSchema,
    outputSchema: MoodBasedInsightsOutputSchema,
  },
  async input => {
    const {output} = await moodBasedInsightsPrompt(input);
    return output!;
  }
);
