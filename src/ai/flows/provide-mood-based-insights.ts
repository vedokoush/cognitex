'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing mood-based insights to students.
 *
 * It includes:
 * - `provideMoodBasedInsights`: The main function to get mood insights.
 */

import {ai} from '@/ai/genkit';
import {
  MoodBasedInsightsInput,
  MoodBasedInsightsInputSchema,
  MoodBasedInsightsOutput,
  MoodBasedInsightsOutputSchema,
} from '@/ai/schemas/provide-mood-based-insights.schema';

export async function provideMoodBasedInsights(
  input: MoodBasedInsightsInput
): Promise<MoodBasedInsightsOutput> {
  return provideMoodBasedInsightsFlow(input);
}

const moodBasedInsightsPrompt = ai.definePrompt({
  name: 'moodBasedInsightsPrompt',
  input: {schema: MoodBasedInsightsInputSchema},
  output: {schema: MoodBasedInsightsOutputSchema},
  prompt: `Bạn là một người bạn đồng hành học tập AI luôn hỗ trợ, giúp học sinh hiểu tâm trạng của mình và đưa ra những gợi ý hữu ích.

  Dựa trên tâm trạng của học sinh, hãy cung cấp thông tin chi tiết về lý do tại sao họ có thể cảm thấy như vậy. Đồng thời, đề xuất một hoạt động phù hợp với tâm trạng hiện tại của họ và thực hiện một phân tích ngắn gọn về trạng thái động lực.

  Tâm trạng: {{{mood}}}

  Thông tin chi tiết:
  Hoạt động đề xuất:
  Phân tích trạng thái động lực:`,
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
