// 🎮 VamosJuntos! - Sistema de Gamificação
import { UserProgress, Stats, Achievement, HealthMilestone } from './types';

export function calculateStats(progress: UserProgress): Stats {
  const now = new Date();
  const quitDate = new Date(progress.quitDate);
  const diffMs = now.getTime() - quitDate.getTime();
  
  const minutesSmokeFree = Math.floor(diffMs / (1000 * 60));
  const hoursSmokeFree = Math.floor(minutesSmokeFree / 60);
  const daysSmokeFree = Math.floor(hoursSmokeFree / 24);
  
  const cigarettesNotSmoked = Math.floor((minutesSmokeFree / (24 * 60)) * progress.cigarettesPerDay);
  const packsNotSmoked = cigarettesNotSmoked / progress.cigarettesPerPack;
  const moneySaved = packsNotSmoked * progress.pricePerPack;
  
  // Cada cigarro leva ~5 minutos para fumar
  const timeSaved = cigarettesNotSmoked * 5;
  
  // Progresso de saúde baseado em dias sem fumar (máximo 365 dias = 100%)
  const healthProgress = Math.min((daysSmokeFree / 365) * 100, 100);
  
  return {
    daysSmokeFree,
    hoursSmokeFree,
    minutesSmokeFree,
    cigarettesNotSmoked,
    moneySaved,
    timeSaved,
    healthProgress
  };
}

export const achievements: Achievement[] = [
  // Conquistas Pessoais
  {
    id: 'first-day',
    title: '🌅 Primeiro Dia',
    description: 'Você completou seu primeiro dia sem fumar!',
    icon: 'Sunrise',
    unlocked: false,
    requirement: { type: 'days', value: 1 },
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'first-week',
    title: '🎯 Uma Semana Forte',
    description: '7 dias de liberdade! Você está arrasando!',
    icon: 'Target',
    unlocked: false,
    requirement: { type: 'days', value: 7 },
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'money-saver',
    title: '💰 Economista',
    description: 'Você economizou R$ 100!',
    icon: 'PiggyBank',
    unlocked: false,
    requirement: { type: 'money', value: 100 },
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'first-month',
    title: '🏆 Campeão do Mês',
    description: '30 dias sem fumar! Você é incrível!',
    icon: 'Trophy',
    unlocked: false,
    requirement: { type: 'days', value: 30 },
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'hundred-cigs',
    title: '🚭 Cem Não Fumados',
    description: '100 cigarros que não entraram no seu corpo!',
    icon: 'Ban',
    unlocked: false,
    requirement: { type: 'cigarettes', value: 100 },
    color: 'from-red-400 to-rose-500'
  },
  {
    id: 'three-months',
    title: '⭐ Estrela Brilhante',
    description: '90 dias de vida nova! Você é uma inspiração!',
    icon: 'Star',
    unlocked: false,
    requirement: { type: 'days', value: 90 },
    color: 'from-indigo-400 to-purple-500'
  },
  {
    id: 'half-year',
    title: '🎊 Meio Ano Livre',
    description: '6 meses sem fumar! Você mudou sua vida!',
    icon: 'PartyPopper',
    unlocked: false,
    requirement: { type: 'days', value: 180 },
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'one-year',
    title: '👑 Rei da Liberdade',
    description: '1 ano completo! Você é um verdadeiro vencedor!',
    icon: 'Crown',
    unlocked: false,
    requirement: { type: 'days', value: 365 },
    color: 'from-yellow-400 via-orange-500 to-red-500'
  },

  // Conquistas Sociais - Amigos
  {
    id: 'first-friend',
    title: '🤝 Primeira Conexão',
    description: 'Você fez seu primeiro amigo no VamosJuntos!',
    icon: 'UserPlus',
    unlocked: false,
    requirement: { type: 'social', value: 1 },
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'social-butterfly',
    title: '🦋 Borboleta Social',
    description: 'Você tem 5 amigos te apoiando!',
    icon: 'Users',
    unlocked: false,
    requirement: { type: 'social', value: 5 },
    color: 'from-pink-400 to-purple-500'
  },
  {
    id: 'community-leader',
    title: '🌟 Líder da Comunidade',
    description: '10 amigos! Você está construindo uma rede incrível!',
    icon: 'UsersRound',
    unlocked: false,
    requirement: { type: 'social', value: 10 },
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'inspiration',
    title: '💫 Inspiração',
    description: '25 amigos! Você inspira muitas pessoas!',
    icon: 'Sparkles',
    unlocked: false,
    requirement: { type: 'social', value: 25 },
    color: 'from-purple-400 via-pink-500 to-orange-500'
  },

  // Conquistas Sociais - Engajamento
  {
    id: 'first-post',
    title: '📸 Primeira Postagem',
    description: 'Você compartilhou sua jornada pela primeira vez!',
    icon: 'Camera',
    unlocked: false,
    requirement: { type: 'social', value: 1 },
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'storyteller',
    title: '📖 Contador de Histórias',
    description: 'Você postou 10 vezes! Continue compartilhando!',
    icon: 'BookOpen',
    unlocked: false,
    requirement: { type: 'social', value: 10 },
    color: 'from-green-400 to-teal-500'
  },
  {
    id: 'influencer',
    title: '🎬 Influenciador',
    description: '50 postagens! Você é uma referência na comunidade!',
    icon: 'Video',
    unlocked: false,
    requirement: { type: 'social', value: 50 },
    color: 'from-red-400 to-pink-500'
  },

  // Conquistas Sociais - Apoio Mútuo
  {
    id: 'supporter',
    title: '💪 Apoiador',
    description: 'Você enviou 10 mensagens de apoio!',
    icon: 'MessageCircle',
    unlocked: false,
    requirement: { type: 'social', value: 10 },
    color: 'from-teal-400 to-cyan-500'
  },
  {
    id: 'motivator',
    title: '🔥 Motivador',
    description: 'Você curtiu 50 postagens de amigos!',
    icon: 'Heart',
    unlocked: false,
    requirement: { type: 'social', value: 50 },
    color: 'from-rose-400 to-red-500'
  },
  {
    id: 'mentor',
    title: '🎓 Mentor',
    description: 'Você ajudou 5 pessoas a começarem sua jornada!',
    icon: 'GraduationCap',
    unlocked: false,
    requirement: { type: 'social', value: 5 },
    color: 'from-indigo-400 to-purple-500'
  },

  // Conquistas Sociais - Comunidade
  {
    id: 'daily-visitor',
    title: '📅 Visitante Diário',
    description: 'Você visitou a comunidade por 7 dias seguidos!',
    icon: 'CalendarCheck',
    unlocked: false,
    requirement: { type: 'social', value: 7 },
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'party-starter',
    title: '🎉 Animador',
    description: 'Você criou 3 grupos de apoio!',
    icon: 'PartyPopper',
    unlocked: false,
    requirement: { type: 'social', value: 3 },
    color: 'from-fuchsia-400 to-pink-500'
  },
  {
    id: 'trending',
    title: '🔥 Em Alta',
    description: 'Sua postagem recebeu 100 curtidas!',
    icon: 'TrendingUp',
    unlocked: false,
    requirement: { type: 'social', value: 100 },
    color: 'from-orange-400 via-red-500 to-pink-500'
  }
];

export const healthMilestones: HealthMilestone[] = [
  {
    id: 'oxygen',
    title: 'Oxigênio Normalizado',
    description: 'Níveis de oxigênio no sangue voltaram ao normal',
    timeRequired: 8, // 8 horas
    achieved: false,
    icon: 'Wind'
  },
  {
    id: 'taste',
    title: 'Paladar Renovado',
    description: 'Sentidos de paladar e olfato melhoraram',
    timeRequired: 48, // 2 dias
    achieved: false,
    icon: 'Sparkles'
  },
  {
    id: 'breathing',
    title: 'Respiração Melhorada',
    description: 'Função pulmonar começou a melhorar',
    timeRequired: 336, // 2 semanas
    achieved: false,
    icon: 'Heart'
  },
  {
    id: 'circulation',
    title: 'Circulação Perfeita',
    description: 'Circulação sanguínea melhorou significativamente',
    timeRequired: 720, // 1 mês
    achieved: false,
    icon: 'Activity'
  },
  {
    id: 'lungs',
    title: 'Pulmões Renovados',
    description: 'Risco de doenças pulmonares reduzido pela metade',
    timeRequired: 2160, // 3 meses
    achieved: false,
    icon: 'Zap'
  },
  {
    id: 'heart',
    title: 'Coração Forte',
    description: 'Risco de ataque cardíaco reduzido drasticamente',
    timeRequired: 8760, // 1 ano
    achieved: false,
    icon: 'HeartPulse'
  }
];

export function checkAchievements(stats: Stats, achievements: Achievement[], socialStats?: { friends: number; posts: number; likes: number; messages: number }): Achievement[] {
  return achievements.map(achievement => {
    let shouldUnlock = false;
    
    switch (achievement.requirement.type) {
      case 'days':
        shouldUnlock = stats.daysSmokeFree >= achievement.requirement.value;
        break;
      case 'cigarettes':
        shouldUnlock = stats.cigarettesNotSmoked >= achievement.requirement.value;
        break;
      case 'money':
        shouldUnlock = stats.moneySaved >= achievement.requirement.value;
        break;
      case 'health':
        shouldUnlock = stats.healthProgress >= achievement.requirement.value;
        break;
      case 'social':
        if (socialStats) {
          // Lógica específica para cada conquista social
          if (achievement.id === 'first-friend' || achievement.id === 'social-butterfly' || 
              achievement.id === 'community-leader' || achievement.id === 'inspiration') {
            shouldUnlock = socialStats.friends >= achievement.requirement.value;
          } else if (achievement.id === 'first-post' || achievement.id === 'storyteller' || 
                     achievement.id === 'influencer') {
            shouldUnlock = socialStats.posts >= achievement.requirement.value;
          } else if (achievement.id === 'motivator' || achievement.id === 'trending') {
            shouldUnlock = socialStats.likes >= achievement.requirement.value;
          } else if (achievement.id === 'supporter') {
            shouldUnlock = socialStats.messages >= achievement.requirement.value;
          }
        }
        break;
    }
    
    return {
      ...achievement,
      unlocked: shouldUnlock || achievement.unlocked,
      unlockedAt: shouldUnlock && !achievement.unlocked ? new Date() : achievement.unlockedAt
    };
  });
}

export function checkHealthMilestones(stats: Stats, milestones: HealthMilestone[]): HealthMilestone[] {
  return milestones.map(milestone => ({
    ...milestone,
    achieved: stats.hoursSmokeFree >= milestone.timeRequired || milestone.achieved
  }));
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatTime(minutes: number): string {
  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor((minutes % (24 * 60)) / 60);
  const mins = minutes % 60;
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}
