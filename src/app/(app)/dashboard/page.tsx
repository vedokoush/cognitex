'use client';

import React, from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { TrendingUp, Award, Clock, Activity } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from '@/components/ui/chart';
import { calculateMotivationScore } from '@/ai/flows/calculate-motivation-score';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Skill Growth',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

// Mock progress data
const mockProgressData = {
  streak: 5,
  timeSpent: 4.5, // hours
  skillGrowth: 15, // percentage
  completedTasks: 25,
};

export default function DashboardPage() {
  const [motivationData, setMotivationData] = React.useState<{
    score: number | null;
    insights: string | null;
  }>({ score: null, insights: null });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchMotivationScore() {
      try {
        setLoading(true);
        const mood = 'focused'; // Assuming a default mood for dashboard load
        const progressData = JSON.stringify(mockProgressData);
        const result = await calculateMotivationScore({ mood, progressData });
        setMotivationData({
          score: result.motivationScore,
          insights: result.insights,
        });
      } catch (error) {
        console.error('Failed to fetch motivation score:', error);
        setMotivationData({
          score: 78, // Fallback score
          insights: 'Keep up the great work! Your consistency is paying off.', // Fallback insight
        });
      } finally {
        setLoading(false);
      }
    }
    fetchMotivationScore();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your learning journey.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Motivation Score
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 w-1/2 bg-muted animate-pulse rounded-md" />
            ) : (
              <div className="text-2xl font-bold">{motivationData.score}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {loading ? (
                <div className="h-4 w-full bg-muted animate-pulse rounded-md mt-1" />
              ) : (
                motivationData.insights
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak Counter</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgressData.streak} days</div>
            <p className="text-xs text-muted-foreground">
              Keep the flame alive!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgressData.timeSpent} hrs</div>
            <p className="text-xs text-muted-foreground">
              in the last 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{mockProgressData.skillGrowth}%</div>
            <p className="text-xs text-muted-foreground">
              since last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Growth Indicator</CardTitle>
          <CardDescription>
            A look at your progress over the last few months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full h-[300px]">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
