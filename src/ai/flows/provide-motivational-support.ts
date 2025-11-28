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
  prompt: `You are a motivational AI assistant named Cogni, designed to encourage students in their learning journey.

  The student is feeling {{mood}} and their recent activity is: {{recentActivity}}.
  They are currently working on learning goal: {{learningGoal}}.

  Generate a short, personalized motivational message (1-2 sentences max) to encourage the student and provide support.
  Focus on their specific situation and learning goals.`,
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
