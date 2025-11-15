// 🎮 FreshLife - Sistema de Tipos
export interface UserProgress {
  quitDate: Date;
  cigarettesPerDay: number;
  pricePerPack: number;
  cigarettesPerPack: number;
}

export interface Stats {
  daysSmokeFree: number;
  hoursSmokeFree: number;
  minutesSmokeFree: number;
  cigarettesNotSmoked: number;
  moneySaved: number;
  timeSaved: number; // em minutos
  healthProgress: number; // 0-100%
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  requirement: {
    type: 'days' | 'cigarettes' | 'money' | 'health' | 'social';
    value: number;
  };
  color: string;
}

export interface HealthMilestone {
  id: string;
  title: string;
  description: string;
  timeRequired: number; // em horas
  achieved: boolean;
  icon: string;
}

export interface Subscription {
  isPremium: boolean;
  plan?: 'monthly' | 'yearly';
  expiresAt?: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  quitDate: Date;
  location?: string;
  isPremium: boolean;
  stats: Stats;
  achievements: Achievement[];
  friends: number;
  posts: number;
  followers: number;
  following: number;
  joinedAt: Date;
}

export interface Friend {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  daysSmokeFree: number;
  isPremium: boolean;
  status: 'pending' | 'accepted' | 'blocked';
}
