'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  ArrowRight,
  BrainCircuit,
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

const onboardingSchema = z.object({
  aiUsage: z.string({ required_error: 'Please select an option.' }),
  learningTime: z.string({ required_error: 'Please select a duration.' }),
  reflection: z.string({ required_error: 'Please select an option.' }),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const features = [
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: 'MindMirror',
    description:
      'Check in with your mood and get personalized support and activities. Reflect on your progress with our Emotion & Progress chart.',
  },
  {
    icon: <Puzzle className="h-10 w-10 text-primary" />,
    title: 'SkillQuest',
    description:
      'Turn any subject into a fun Flashcard Battle. Gain XP, level up, and watch your skills grow with every correct answer.',
  },
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: 'LearnPulse',
    description:
      "Your personal dashboard shows your Motivation Score, streaks, and skill growth, focusing on your journey without comparing you to others.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: 'Cogni Assistant',
    description:
      'Your friendly AI buddy is here to help explain concepts, celebrate your wins, and give you a motivational boost whenever you need it.',
  },
];

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Alex Johnson',
    quote:
      "CogniTex makes learning feel like a game, not a chore. The AI assistant is a lifesaver for tough subjects!",
    avatar: PlaceHolderImages.find((img) => img.id === 'testimonial-1')?.imageUrl,
    imageHint: PlaceHolderImages.find((img) => img.id === 'testimonial-1')?.imageHint
  },
  {
    id: 'testimonial-2',
    name: 'Samantha Lee',
    quote:
      "I love how I can track my mood and see how it connects to my learning. It's helped me build better study habits.",
    avatar: PlaceHolderImages.find((img) => img.id === 'testimonial-2')?.imageUrl,
    imageHint: PlaceHolderImages.find((img) => img.id === 'testimonial-2')?.imageHint
  },
  {
    id: 'testimonial-3',
    name: 'David Chen',
    quote:
      'The motivation dashboard is my favorite. Seeing my personal growth without any leaderboards is super encouraging.',
    avatar: PlaceHolderImages.find((img) => img.id === 'testimonial-3')?.imageUrl,
    imageHint: PlaceHolderImages.find((img) => img.id === 'testimonial-3')?.imageHint
  },
];

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
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">CogniTex</h1>
        </div>
        <Button asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </header>

      <main className="container mx-auto px-4">
        <section className="text-center py-20 sm:py-32">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
            Unlock Your Learning Potential
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            CogniTex is a personalized learning platform that uses AI to boost
            your motivation, support your emotional well-being, and make
            learning fun.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#onboarding">
                Start Your Journey <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Features Designed for You
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                Kickstart Your Personalized Journey
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
                          How often do you use AI in learning?
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
                                Daily
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="weekly" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                A few times a week
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="rarely" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Rarely or never
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
                          For how long do you want to learn daily?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="15-min">15 minutes</SelectItem>
                            <SelectItem value="30-min">30 minutes</SelectItem>
                            <SelectItem value="1-hour">1 hour</SelectItem>
                            <SelectItem value="1-hour-plus">
                              More than 1 hour
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
                          Do you usually reflect on AI-generated answers?
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
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg">
                    Get Started!
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>

        <section id="testimonials" className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            What Students Say
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card/80 backdrop-blur-sm flex flex-col">
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
          <p>&copy; {new Date().getFullYear()} CogniTex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
