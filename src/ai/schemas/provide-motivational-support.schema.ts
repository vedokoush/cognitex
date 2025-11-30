import {z} from 'genkit';

export const ProvideMotivationalSupportInputSchema = z.object({
  mood: z
    .string()
    .describe('The current mood of the student (e.g., stressed, excited, tired).'),
  recentActivity: z
    .string()
    .describe(
      "A summary of the student's recent activity (e.g., long inactivity, achieved a learning milestone)." +
        "Examples: 'Student has been inactive for 30 minutes', 'Student completed a SkillQuest level successfully'."
    ),
  learningGoal: z
    .string()
    .describe("The student's current learning goal or subject."),
});

export type ProvideMotivationalSupportInput = z.infer<
  typeof ProvideMotivationalSupportInputSchema
>;

export const ProvideMotivationalSupportOutputSchema = z.object({
  message: z
    .string()
    .describe('A personalized motivational message for the student.'),
});

export type ProvideMotivationalSupportOutput = z.infer<
  typeof ProvideMotivationalSupportOutputSchema
>;
