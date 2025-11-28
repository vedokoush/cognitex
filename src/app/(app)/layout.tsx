'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BrainCircuit,
  HeartHandshake,
  LayoutDashboard,
  Puzzle,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import CogniAssistant from '@/components/cogni-assistant';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/dashboard',
      icon: <LayoutDashboard />,
      label: 'Bảng điều khiển',
    },
    {
      href: '/mood-mirror',
      icon: <HeartHandshake />,
      label: 'Gương Thần',
    },
    {
      href: '/skill-quest',
      icon: <Puzzle />,
      label: 'Nhiệm Vụ Kỹ Năng',
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-primary group-data-[collapsible=icon]:hidden">
                CogniTex
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} passHref>
                    <SidebarMenuButton
                      className={cn(
                        'w-full justify-start',
                        pathname === item.href &&
                          'bg-accent text-accent-foreground'
                      )}
                      tooltip={item.label}
                      isActive={pathname === item.href}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
                {children}
            </main>
            <CogniAssistant />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
