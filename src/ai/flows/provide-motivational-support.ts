'use server';
/**
 * @fileOverview A Genkit flow that provides personalized motivational support to students.
 *
 * - provideMotivationalSupport - A function that provides motivational support.
 * - ProvideMotivationalSupportInput - The input type for the provideMotivationalSupport function.
 * - ProvideMotivationalSupportOutput - The return type for the provideMotivationalSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideMotivationalSupportInputSchema = z.object({
  mood: z.string().describe('The current mood of the student (e.g., stressed, excited, tired).'),
  recentActivity: z
    .string()
    .describe(
      'A summary of the student\'s recent activity (e.g., long inactivity, achieved a learning milestone).' + 
        'Examples: \'Student has been inactive for 30 minutes\', \'Student completed a SkillQuest level successfully\'.' 
    ),
  learningGoal: z.string().describe('The student\'s current learning goal or subject.'),
});

export type ProvideMotivationalSupportInput = z.infer<typeof ProvideMotivationalSupportInputSchema>;

const ProvideMotivationalSupportOutputSchema = z.object({
  message: z.string().describe('A personalized motivational message for the student.'),
});

export type ProvideMotivationalSupportOutput = z.infer<typeof ProvideMotivationalSupportOutputSchema>;

export async function provideMotivationalSupport(input: ProvideMotivationalSupportInput): Promise<ProvideMotivationalSupportOutput> {
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
