'use client';

import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function StatsCard({ title, value, subtitle, icon: Icon, gradient, delay = 0 }: StatsCardProps) {
  return (
    <Card 
      className={`relative overflow-hidden border-0 bg-gradient-to-br ${gradient} p-6 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium uppercase tracking-wider opacity-90">{title}</h3>
          <Icon className="h-6 w-6 opacity-80" />
        </div>
        <p className="mb-1 text-3xl font-bold md:text-4xl">{value}</p>
        {subtitle && (
          <p className="text-sm opacity-80">{subtitle}</p>
        )}
      </div>
      
      {/* Efeito de brilho */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white opacity-10 blur-2xl" />
    </Card>
  );
}
