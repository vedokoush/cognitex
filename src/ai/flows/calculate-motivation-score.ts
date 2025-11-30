'use server';

/**
 * @fileOverview A flow to calculate the motivation score based on mood and progress data.
 *
 * - calculateMotivationScore - A function that calculates the motivation-score.
 */

import {ai} from '@/ai/genkit';
import {
  CalculateMotivationScoreInput,
  CalculateMotivationScoreInputSchema,
  CalculateMotivationScoreOutput,
  CalculateMotivationScoreOutputSchema,
} from '@/ai/schemas/calculate-motivation-score.schema';

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
