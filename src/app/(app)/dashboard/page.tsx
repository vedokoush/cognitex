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
  { month: 'Tháng 1', desktop: 186, mobile: 80 },
  { month: 'Tháng 2', desktop: 305, mobile: 200 },
  { month: 'Tháng 3', desktop: 237, mobile: 120 },
  { month: 'Tháng 4', desktop: 73, mobile: 190 },
  { month: 'Tháng 5', desktop: 209, mobile: 130 },
  { month: 'Tháng 6', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Phát triển Kỹ năng',
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
        const mood = 'tập trung'; // Assuming a default mood for dashboard load
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
          insights: 'Hãy tiếp tục công việc tuyệt vời của bạn! Sự nhất quán của bạn đang được đền đáp.', // Fallback insight
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
        <h1 className="text-3xl font-bold tracking-tight">Chào mừng trở lại!</h1>
        <p className="text-muted-foreground">
          Đây là tổng quan về hành trình học tập của bạn.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Điểm Động Lực
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
            <CardTitle className="text-sm font-medium">Chuỗi Ngày Học</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgressData.streak} ngày</div>
            <p className="text-xs text-muted-foreground">
              Hãy giữ vững ngọn lửa!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thời Gian Học</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgressData.timeSpent} giờ</div>
            <p className="text-xs text-muted-foreground">
              trong 7 ngày qua
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tăng Trưởng Kỹ Năng</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{mockProgressData.skillGrowth}%</div>
            <p className="text-xs text-muted-foreground">
              so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chỉ Báo Tăng Trưởng Kỹ Năng</CardTitle>
          <CardDescription>
            Cái nhìn về sự tiến bộ của bạn trong vài tháng qua.
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
