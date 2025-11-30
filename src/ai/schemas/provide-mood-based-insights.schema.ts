import {z} from 'genkit';

export const MoodBasedInsightsInputSchema = z.object({
  mood: z
    .string()
    .describe("The student's selected mood (e.g., stressed, excited, tired)."),
});
export type MoodBasedInsightsInput = z.infer<
  typeof MoodBasedInsightsInputSchema
>;

export const MoodBasedInsightsOutputSchema = z.object({
  insight: z
    .string()
    .describe(
      'AI-generated insights into why the student might be feeling the selected mood.'
    ),
  suggestedActivity: z
    .string()
    .describe(
      "A suggested activity based on the student's mood (e.g., challenge, relaxation game, quick study)."
    ),
  motivationStateAnalysis: z
    .string()
    .describe('Analysis of the student motivation state'),
});
export type MoodBasedInsightsOutput = z.infer<
  typeof MoodBasedInsightsOutputSchema
>;
