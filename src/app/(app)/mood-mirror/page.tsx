'use client';

import React, { useState } from 'react';
import {
  Activity,
  Lightbulb,
  LineChart,
  BrainCircuit,
  Pencil,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  HappyIcon,
  ExcitedIcon,
  TiredIcon,
  StressedIcon,
  SadIcon,
} from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { provideMoodBasedInsights } from '@/ai/flows/provide-mood-based-insights';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const moods = [
  { name: 'Happy', icon: HappyIcon, color: 'text-green-500' },
  { name: 'Excited', icon: ExcitedIcon, color: 'text-yellow-500' },
  { name: 'Tired', icon: TiredIcon, color: 'text-blue-500' },
  { name: 'Stressed', icon: StressedIcon, color: 'text-purple-500' },
  { name: 'Sad', icon: SadIcon, color: 'text-gray-500' },
];

type MoodInsight = {
  insight: string;
  suggestedActivity: string;
  motivationStateAnalysis: string;
};

const reflectionChartData = [
  { date: 'Mon', emotion: 8, progress: 7 },
  { date: 'Tue', emotion: 6, progress: 8 },
  { date: 'Wed', emotion: 7, progress: 6 },
  { date: 'Thu', emotion: 9, progress: 9 },
  { date: 'Fri', emotion: 7, progress: 8 },
];

const chartConfig = {
  emotion: { label: 'Emotion', color: 'hsl(var(--primary))' },
  progress: { label: 'Progress', color: 'hsl(var(--accent))' },
} satisfies ChartConfig;

export default function MoodMirrorPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [insights, setInsights] = useState<MoodInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    setLoading(true);
    setInsights(null);
    try {
      const result = await provideMoodBasedInsights({ mood });
      setInsights(result);
    } catch (error) {
      console.error('Failed to get mood insights:', error);
      // Handle error display to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">MindMirror</h1>
        <p className="text-muted-foreground">
          Check in with your emotions and reflect on your journey.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Select a mood to get personalized insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => handleMoodSelect(mood.name)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedMood === mood.name
                    ? 'border-primary bg-primary/10'
                    : 'border-transparent hover:bg-accent/10'
                }`}
              >
                <mood.icon
                  className={`h-12 w-12 ${mood.color} transition-transform duration-200 ${
                    selectedMood === mood.name ? 'scale-110' : 'scale-100'
                  }`}
                />
                <span
                  className={`font-medium ${
                    selectedMood === mood.name
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {mood.name}
                </span>
              </button>
            ))}
          </div>

          {(loading || insights) && (
            <div className="mt-8">
              <Separator />
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <Card className="bg-background/50">
                  <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <CardTitle>Cause Insight</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? <Skeleton className="h-20" /> : <p>{insights?.insight}</p>}
                  </CardContent>
                </Card>
                <Card className="bg-background/50">
                  <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <Activity className="h-6 w-6 text-primary" />
                    <CardTitle>Suggested Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                  {loading ? <Skeleton className="h-20" /> : <p>{insights?.suggestedActivity}</p>}
                  </CardContent>
                </Card>
                <Card className="bg-background/50">
                  <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    <CardTitle>Motivation Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                  {loading ? <Skeleton className="h-20" /> : <p>{insights?.motivationStateAnalysis}</p>}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pencil /> Daily Reflection
            </CardTitle>
            <CardDescription>
              Take a moment to think about your day.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>What's one thing you learned today?</Label>
              <Textarea placeholder="e.g., I learned about the Pythagorean theorem..." />
            </div>
            <div className="space-y-4">
              <Label>How difficult did you find today's topic?</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <div className="space-y-4">
              <Label>How confident do you feel about it?</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <Button className="w-full">Save Reflection</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart /> Emotion & Progress
            </CardTitle>
            <CardDescription>
              Your reflection history for the past week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-[250px]">
              <BarChart accessibilityLayer data={reflectionChartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="emotion" fill="var(--color-emotion)" radius={4} />
                <Bar dataKey="progress" fill="var(--color-progress)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
