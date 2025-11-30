'use server';
/**
 * @fileOverview A Genkit flow that provides personalized motivational support to students.
 *
 * - provideMotivationalSupport - A function that provides motivational support.
 */

import {ai} from '@/ai/genkit';
import {
  ProvideMotivationalSupportInput,
  ProvideMotivationalSupportInputSchema,
  ProvideMotivationalSupportOutput,
  ProvideMotivationalSupportOutputSchema,
} from '@/ai/schemas/provide-motivational-support.schema';

export async function provideMotivationalSupport(
  input: ProvideMotivationalSupportInput
): Promise<ProvideMotivationalSupportOutput> {
  return provideMotivationalSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideMotivationalSupportPrompt',
  input: {schema: ProvideMotivationalSupportInputSchema},
  output: {schema: ProvideMotivationalSupportOutputSchema},
  prompt: `Bạn là một trợ lý AI tạo động lực tên là Cogni, được thiết kế để khuyến khích học sinh trong hành trình học tập của họ.

  Học sinh đang cảm thấy {{mood}} và hoạt động gần đây của họ là: {{recentActivity}}.
  Họ hiện đang làm việc với mục tiêu học tập: {{learningGoal}}.

  Tạo một thông điệp tạo động lực ngắn gọn, được cá nhân hóa (tối đa 1-2 câu) để khuyến khích học sinh và cung cấp hỗ trợ.
  Tập trung vào tình hình cụ thể và mục tiêu học tập của họ.`,
});

const provideMotivationalSupportFlow = ai.defineFlow(
  {
    name: 'provideMotivationalSupportFlow',
    inputSchema: ProvideMotivationalSupportInputSchema,
    outputSchema: ProvideMotivationalSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
