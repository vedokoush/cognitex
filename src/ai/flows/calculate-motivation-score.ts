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
  prompt: `Bạn là một chuyên gia về động lực AI. Nhiệm vụ của bạn là tính toán điểm động lực cho một học sinh dựa trên tâm trạng và dữ liệu tiến độ của họ.

Tâm trạng: {{{mood}}}
Dữ liệu tiến độ: {{{progressData}}}

Hãy xem xét tâm trạng và dữ liệu tiến độ để tính điểm động lực. Một tâm trạng tích cực và tiến độ tốt sẽ cho điểm cao hơn. Một tâm trạng tiêu cực và tiến độ kém sẽ cho điểm thấp hơn.

Cung cấp thông tin chi tiết về điểm động lực, giải thích yếu tố nào đang góp phần tích cực hoặc tiêu cực vào điểm số.

Vui lòng xuất ra một tài liệu JSON.
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
