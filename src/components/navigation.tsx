'use client';

import React from 'react';
import Link from 'next/link';
import { BrainCircuit, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  {
    label: 'Về CogniTex',
    href: '#',
    dropdown: [
      { label: 'Về chúng tôi', href: '#' },
      { label: 'Sứ mệnh', href: '#' },
      { label: 'Đội ngũ', href: '#' },
    ],
  },
  {
    label: 'MindMirror',
    href: '#',
    dropdown: [
      { label: 'Mood Scanner', href: '#' },
      { label: 'Hỗ trợ bằng AI', href: '#' },
      { label: 'Gamification', href: '#' },
    ],
  },
  {
    label: 'Reflection Wall',
    href: '#', dropdown: [
        { label: 'RiseBoard', href: '#' },
          { label: 'SkillQuest', href: '#' },
          { label: 'LearnPulse', href: '#' },],
  },

  {
    label: 'Khóa học',
    href: '#',
    dropdown: [
      { label: 'Toán', href: '#' },
      { label: 'Lý', href: '#' },
      { label: 'Hóa', href: '#' },
    ],
  },
];

export default function Navigation() {
  return (
    <header className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-white" />
          <span className="font-bold text-xl text-white">CogniTex</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.dropdown ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white"
                  >
                    {item.label} <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.dropdown.map((subItem) => (
                    <DropdownMenuItem key={subItem.label} asChild>
                      <Link href={subItem.href}>{subItem.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
           <Link href="/dashboard">Bảng điều khiển</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Bắt đầu ngay</Link>
        </Button>
      </div>
    </header>
  );
}
