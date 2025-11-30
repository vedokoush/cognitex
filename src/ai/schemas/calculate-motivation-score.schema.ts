import {z} from 'genkit';

export const CalculateMotivationScoreInputSchema = z.object({
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

export const CalculateMotivationScoreOutputSchema = z.object({
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
