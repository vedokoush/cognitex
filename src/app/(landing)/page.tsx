'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  ArrowRight,
  HeartHandshake,
  Puzzle,
  Sparkles,
  Target,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Navigation from '@/components/navigation';

const onboardingSchema = z.object({
  aiUsage: z.string({ required_error: 'Vui lòng chọn một tùy chọn.' }),
  learningTime: z.string({ required_error: 'Vui lòng chọn một khoảng thời gian.' }),
  reflection: z.string({ required_error: 'Vui lòng chọn một tùy chọn.' }),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const features = [
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: 'Gương Thần',
    description:
      'Kiểm tra tâm trạng của bạn và nhận hỗ trợ cũng như các hoạt động được cá nhân hóa. Suy ngẫm về sự tiến bộ của bạn với biểu đồ Cảm xúc & Tiến độ của chúng tôi.',
  },
  {
    icon: <Puzzle className="h-10 w-10 text-primary" />,
    title: 'Nhiệm Vụ Kỹ Năng',
    description:
      'Biến bất kỳ chủ đề nào thành một Trận chiến Flashcard vui nhộn. Tích lũy KN, lên cấp và xem kỹ năng của bạn phát triển sau mỗi câu trả lời đúng.',
  },
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: 'Nhịp Học',
    description:
      "Bảng điều khiển cá nhân của bạn hiển thị Điểm Động lực, chuỗi ngày học và sự phát triển kỹ năng, tập trung vào hành trình của bạn mà không so sánh với người khác.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: 'Trợ lý Cogni',
    description:
      'Người bạn AI thân thiện của bạn ở đây để giúp giải thích các khái niệm, ăn mừng chiến thắng của bạn và tạo động lực cho bạn bất cứ khi nào bạn cần.',
  },
];

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Alex Johnson',
    quote:
      "CogniTex làm cho việc học giống như một trò chơi, không phải là một công việc vặt. Trợ lý AI là một cứu cánh cho các môn học khó!",
    avatar: PlaceHolderImages.find((img) => img.id === 'testimonial-1')?.imageUrl,
    imageHint: PlaceHolderImages.find((img) => img.id === 'testimonial-1')?.imageHint
  },
  {
    id: 'testimonial-2',
    name: 'Samantha Lee',
    quote:
      "Tôi thích cách tôi có thể theo dõi tâm trạng của mình và xem nó kết nối với việc học của tôi như thế nào. Nó đã giúp tôi xây dựng thói quen học tập tốt hơn.",
    avatar: PlaceHolderImages.find((img) => img.id === 'testimonial-2')?.imageUrl,
    imageHint: PlaceHolderImages.find((img) => img.id === 'testimonial-2')?.imageHint
  },
  {
    id: 'testimonial-3',
    name: 'David Chen',
    quote:
      'Bảng điều khiển động lực là yêu thích của tôi. Thấy sự phát triển cá nhân của mình mà không có bất kỳ bảng xếp hạng nào là siêu khuyến khích.',
    avatar: PlaceHolderImages.find((img) => img.id === 'testimonial-3')?.imageUrl,
    imageHint: PlaceHolderImages.find((img) => img.id === 'testimonial-3')?.imageHint
  },
];

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

export default function LandingPage() {
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
  });

  function onSubmit(data: OnboardingFormValues) {
    // In a real app, you'd save this to user preferences
    console.log(data);
    // For now, we just navigate
    window.location.href = '/dashboard';
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <Navigation />
      </div>

      <main className="container mx-auto px-4 -mt-24 md:-mt-32 relative z-10">
        <div className="text-center mb-24">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Mở Khóa Tiềm Năng Học Tập Của Bạn
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              CogniTex là một nền tảng học tập được cá nhân hóa, sử dụng AI để tăng cường động lực, hỗ trợ sức khỏe tinh thần và làm cho việc học trở nên thú vị.
            </p>
            <div className="mt-8 flex justify-center gap-4">
               <Button size="lg" asChild>
                <Link href="#onboarding">
                  Bắt Đầu Hành Trình Của Bạn <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
        </div>
      
        <section id="features" className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Các Tính Năng Dành Cho Bạn
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section id="onboarding" className="py-20">
          <Card className="max-w-2xl mx-auto shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">
                Khởi Động Hành Trình Cá Nhân Hóa Của Bạn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="aiUsage"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Bạn có thường sử dụng AI trong học tập không?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="daily" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Hàng ngày
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="weekly" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Vài lần một tuần
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="rarely" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Hiếm khi hoặc không bao giờ
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="learningTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Bạn muốn học bao lâu mỗi ngày?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn một mục tiêu thời gian" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="15-min">15 phút</SelectItem>
                            <SelectItem value="30-min">30 phút</SelectItem>
                            <SelectItem value="1-hour">1 giờ</SelectItem>
                            <SelectItem value="1-hour-plus">
                              Hơn 1 giờ
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reflection"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Bạn có thường suy ngẫm về các câu trả lời do AI tạo ra không?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Có</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">Không</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg">
                    Bắt đầu!
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>

        <section id="testimonials" className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Học Sinh Nói Gì
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <p className="italic text-foreground/90">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4">
                  <Avatar>
                    {testimonial.avatar && (
                      <Image
                        src={testimonial.avatar}
                        alt={`Avatar of ${testimonial.name}`}
                        width={40}
                        height={40}
                        data-ai-hint={testimonial.imageHint}
                      />
                    )}
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CogniTex. Mọi quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
