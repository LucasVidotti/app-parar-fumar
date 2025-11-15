'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  color: string;
  requirement?: string;
}

export function AchievementCard({ 
  title, 
  description, 
  icon, 
  unlocked, 
  color,
  requirement 
}: AchievementCardProps) {
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Award;
  
  return (
    <Card className={`group relative overflow-hidden border-2 transition-all duration-300 ${
      unlocked 
        ? 'border-transparent bg-gradient-to-br ' + color + ' hover:scale-105 hover:shadow-2xl' 
        : 'border-gray-200 bg-gray-50 opacity-60 hover:opacity-80 dark:border-gray-700 dark:bg-gray-800'
    }`}>
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className={`rounded-2xl p-3 ${unlocked ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <IconComponent className={`h-8 w-8 ${unlocked ? 'text-white' : 'text-gray-400'}`} />
          </div>
          
          {unlocked ? (
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              <Check className="mr-1 h-3 w-3" />
              Conquistado
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-gray-200 dark:bg-gray-700">
              <Lock className="mr-1 h-3 w-3" />
              Bloqueado
            </Badge>
          )}
        </div>
        
        <h3 className={`mb-2 text-lg font-bold ${unlocked ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
          {title}
        </h3>
        <p className={`text-sm ${unlocked ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
          {description}
        </p>
        
        {!unlocked && requirement && (
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
            Requisito: {requirement}
          </p>
        )}
      </div>
      
      {unlocked && (
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white opacity-10 blur-3xl" />
      )}
    </Card>
  );
}
