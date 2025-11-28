'use client';

import React, { useState } from 'react';
import { Swords, Heart, Shield, Sparkles, Star, Bot, User } from 'lucide-react';
import { generateFlashcardBattle } from '@/ai/flows/generate-flashcard-battle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Flashcard = {
  question: string;
  answer: string;
};

type GameState = 'idle' | 'loading' | 'playing' | 'ended';
type Turn = 'player' | 'ai';

const MAX_HEALTH = 100;
const PLAYER_DAMAGE = 25;
const AI_DAMAGE = 20;

export default function SkillQuestPage() {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(MAX_HEALTH);
  const [aiHealth, setAiHealth] = useState(MAX_HEALTH);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [xp, setXp] = useState(0);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'incorrect';
    message: string;
  } | null>(null);
  const [turn, setTurn] = useState<Turn>('player');

  const startGame = async () => {
    if (!subject) {
      toast({
        title: 'Chưa có chủ đề',
        description: 'Vui lòng nhập một chủ đề để bắt đầu trận chiến.',
        variant: 'destructive',
      });
      return;
    }
    setGameState('loading');
    setFeedback(null);
    try {
      const { flashcards } = await generateFlashcardBattle({ subject });
      if (flashcards && flashcards.length > 0) {
        setFlashcards(flashcards);
        setCurrentCardIndex(0);
        setPlayerHealth(MAX_HEALTH);
        setAiHealth(MAX_HEALTH);
        setXp(0);
        setGameState('playing');
        setTurn('player');
      } else {
        throw new Error('Không có thẻ flashcard nào được tạo.');
      }
    } catch (error) {
      console.error('Không thể bắt đầu trò chơi:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể tạo thẻ flashcard. Vui lòng thử một chủ đề khác.',
        variant: 'destructive',
      });
      setGameState('idle');
    }
  };

  const handleAnswerSubmit = () => {
    if (turn !== 'player') return;
    const isCorrect = playerAnswer.trim().toLowerCase() === flashcards[currentCardIndex].answer.trim().toLowerCase();
    
    if (isCorrect) {
      setFeedback({ type: 'correct', message: `Chính xác! Bạn gây ${PLAYER_DAMAGE} sát thương.` });
      setAiHealth((prev) => Math.max(0, prev - PLAYER_DAMAGE));
      setXp((prev) => prev + 10);
    } else {
      setFeedback({ type: 'incorrect', message: `Chưa đúng. Đáp án đúng là: ${flashcards[currentCardIndex].answer}` });
      setPlayerHealth((prev) => Math.max(0, prev - AI_DAMAGE));
    }
    setTurn('ai');
    setPlayerAnswer('');
  };

  const nextTurn = () => {
    setFeedback(null);
    if (aiHealth <= 0 || playerHealth <= 0) {
      setGameState('ended');
      return;
    }

    if (currentCardIndex + 1 < flashcards.length) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // reshuffle or end
      setCurrentCardIndex(0);
    }
    setTurn('player');
  };

  const resetGame = () => {
    setGameState('idle');
    setSubject('');
  };
  
  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Nhiệm Vụ Kỹ Năng</h1>
        <p className="text-muted-foreground">
          Chiến đấu theo cách của bạn để có kiến thức!
        </p>
      </div>

      {gameState === 'idle' && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Bắt đầu một trận chiến mới</CardTitle>
            <CardDescription>
              Nhập một chủ đề hoặc khái niệm để tạo ra một trận chiến flashcard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="ví dụ: Quang hợp, Chiến tranh thế giới thứ hai, React Hooks"
              onKeyDown={(e) => e.key === 'Enter' && startGame()}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={startGame} className="w-full">
              <Swords className="mr-2 h-4 w-4" /> Bắt đầu trận chiến
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {gameState === 'loading' && (
        <div className="flex flex-col items-center gap-4 text-center">
            <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            <p className="text-lg font-medium">Đang tạo nhiệm vụ của bạn...</p>
            <p className="text-muted-foreground">AI đang tạo ra các câu hỏi thử thách về {subject}.</p>
        </div>
      )}

      {gameState === 'playing' && currentCard && (
        <div className="w-full max-w-2xl space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 font-semibold"><User/> Người chơi</div>
              <Progress value={playerHealth} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-1">{playerHealth} / {MAX_HEALTH} Máu</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 font-semibold"><Bot /> Đối thủ AI</div>
              <Progress value={aiHealth} className="mt-2" indicatorClassName="bg-destructive"/>
              <p className="text-sm text-muted-foreground mt-1">{aiHealth} / {MAX_HEALTH} Máu</p>
            </div>
          </div>

          <Card className="text-center">
            <CardHeader>
              <CardDescription>Câu hỏi {currentCardIndex + 1} trên {flashcards.length}</CardDescription>
              <CardTitle className="text-2xl">{currentCard.question}</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                  value={playerAnswer}
                  onChange={(e) => setPlayerAnswer(e.target.value)}
                  placeholder="Câu trả lời của bạn..."
                  disabled={turn !== 'player'}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                  className="text-center"
                />
            </CardContent>
            <CardFooter className="flex-col gap-4">
               {turn === 'player' ? (
                 <Button onClick={handleAnswerSubmit} className="w-full">Tấn công!</Button>
               ) : (
                 <Button onClick={nextTurn} className="w-full">Câu hỏi tiếp theo</Button>
               )}
            </CardFooter>
          </Card>
          
           {feedback && (
            <Alert variant={feedback.type === 'correct' ? 'default' : 'destructive'} className={cn(feedback.type === 'correct' && 'border-green-500 text-green-700 dark:text-green-400')}>
              <Shield className="h-4 w-4" />
              <AlertTitle>{feedback.type === 'correct' ? 'Thành công!' : 'Ôi không!'}</AlertTitle>
              <AlertDescription>
                {feedback.message}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
      
      <AlertDialog open={gameState === 'ended'}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{playerHealth > 0 ? "Chiến thắng!" : "Thất bại!"}</AlertDialogTitle>
            <AlertDialogDescription>
              {playerHealth > 0 ? "Bạn đã đánh bại AI! Kiến thức của bạn đã chiến thắng." : "AI đã đánh bại bạn. Hãy học tập và trở lại mạnh mẽ hơn!"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-yellow-500">
                <Star /> {xp} KN nhận được
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={resetGame}>Chơi lại</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
