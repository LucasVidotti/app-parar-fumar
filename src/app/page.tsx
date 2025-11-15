'use client';

import { useState, useEffect } from 'react';
import { StatsCard } from '@/components/custom/stats-card';
import { AchievementCard } from '@/components/custom/achievement-card';
import { UserProfileComponent } from '@/components/custom/user-profile';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  DollarSign, 
  Cigarette, 
  Clock, 
  Heart,
  TrendingUp,
  Award,
  Sparkles,
  Users,
  MessageCircle,
  Settings,
  Crown,
  User
} from 'lucide-react';
import { 
  calculateStats, 
  achievements, 
  healthMilestones,
  checkAchievements,
  checkHealthMilestones,
  formatMoney,
  formatTime
} from '@/lib/gamification';
import { UserProgress, UserProfile } from '@/lib/types';

export default function FreshLifeApp() {
  // Dados de exemplo - em produção viriam do banco de dados
  const [userProgress] = useState<UserProgress>({
    quitDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 dias atrás
    cigarettesPerDay: 20,
    pricePerPack: 12,
    cigarettesPerPack: 20
  });

  const [stats, setStats] = useState(calculateStats(userProgress));
  const [userAchievements, setUserAchievements] = useState(achievements);
  const [userMilestones, setUserMilestones] = useState(healthMilestones);
  const [isPremium] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Estatísticas sociais de exemplo
  const [socialStats] = useState({
    friends: 3,
    posts: 5,
    likes: 25,
    messages: 8
  });

  // Perfil de exemplo
  const [userProfile] = useState<UserProfile>({
    id: '1',
    name: 'João Silva',
    username: 'joaosilva',
    avatar: undefined,
    bio: 'Em busca de uma vida mais saudável! 💪 Cada dia é uma vitória.',
    quitDate: userProgress.quitDate,
    location: 'São Paulo, SP',
    isPremium: isPremium,
    stats: stats,
    achievements: userAchievements,
    friends: socialStats.friends,
    posts: socialStats.posts,
    followers: 12,
    following: 8,
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  });

  useEffect(() => {
    // Atualiza estatísticas a cada minuto
    const interval = setInterval(() => {
      const newStats = calculateStats(userProgress);
      setStats(newStats);
      setUserAchievements(checkAchievements(newStats, userAchievements, socialStats));
      setUserMilestones(checkHealthMilestones(newStats, userMilestones));
    }, 60000);

    return () => clearInterval(interval);
  }, [userProgress, userAchievements, userMilestones, socialStats]);

  const unlockedCount = userAchievements.filter(a => a.unlocked).length;
  const achievedMilestones = userMilestones.filter(m => m.achieved).length;

  // Se estiver mostrando o perfil, renderiza apenas o componente de perfil
  if (showProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        {/* Header com Logo */}
        <header className="border-b border-purple-200/50 bg-white/80 backdrop-blur-lg dark:border-purple-800/30 dark:bg-gray-900/80">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    FreshLife
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Sua jornada de liberdade</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowProfile(false)}
                >
                  Voltar ao Dashboard
                </Button>
                {!isPremium && (
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Crown className="mr-2 h-4 w-4" />
                    Seja Premium
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <UserProfileComponent
            profile={userProfile}
            isOwnProfile={true}
            onEditProfile={() => console.log('Editar perfil')}
          />
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-200 bg-white/50 py-8 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              <strong className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-transparent">
                FreshLife
              </strong> - Sua jornada de liberdade começa aqui 🎉
            </p>
            <p className="text-xs">
              Dados baseados em pesquisas da OMS • Feito com 💜 para você
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Header com Logo */}
      <header className="border-b border-purple-200/50 bg-white/80 backdrop-blur-lg dark:border-purple-800/30 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  FreshLife
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Sua jornada de liberdade</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowProfile(true)}
                title="Ver Perfil"
              >
                <User className="h-5 w-5" />
              </Button>
              {!isPremium && (
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Crown className="mr-2 h-4 w-4" />
                  Seja Premium
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Contador Principal */}
        <Card className="mb-8 overflow-hidden border-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 text-white shadow-2xl">
          <div className="relative z-10 text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Calendar className="mr-1 h-3 w-3" />
              Livre desde {userProgress.quitDate.toLocaleDateString('pt-BR')}
            </Badge>
            
            <h2 className="mb-2 text-5xl font-bold md:text-7xl">
              {stats.daysSmokeFree}
            </h2>
            <p className="mb-6 text-xl opacity-90 md:text-2xl">
              {stats.daysSmokeFree === 1 ? 'Dia' : 'Dias'} sem fumar
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div>
                <p className="font-semibold">{stats.hoursSmokeFree}h</p>
                <p className="opacity-80">Horas</p>
              </div>
              <div className="h-12 w-px bg-white/30" />
              <div>
                <p className="font-semibold">{stats.minutesSmokeFree}min</p>
                <p className="opacity-80">Minutos</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl" />
        </Card>

        {/* Estatísticas Principais */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Economia"
            value={formatMoney(stats.moneySaved)}
            subtitle="Dinheiro economizado"
            icon={DollarSign}
            gradient="from-green-400 to-emerald-600"
            delay={0}
          />
          <StatsCard
            title="Cigarros"
            value={stats.cigarettesNotSmoked}
            subtitle="Não fumados"
            icon={Cigarette}
            gradient="from-red-400 to-rose-600"
            delay={100}
          />
          <StatsCard
            title="Tempo"
            value={formatTime(stats.timeSaved)}
            subtitle="Vida recuperada"
            icon={Clock}
            gradient="from-blue-400 to-cyan-600"
            delay={200}
          />
          <StatsCard
            title="Saúde"
            value={`${Math.round(stats.healthProgress)}%`}
            subtitle="Recuperação"
            icon={Heart}
            gradient="from-pink-400 to-purple-600"
            delay={300}
          />
        </div>

        {/* Marcos de Saúde */}
        <Card className="mb-8 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Marcos de Saúde
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {achievedMilestones} de {userMilestones.length} conquistados
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
          
          <div className="space-y-4">
            {userMilestones.map((milestone, index) => {
              const IconComponent = (require('lucide-react') as any)[milestone.icon];
              return (
                <div key={milestone.id} className="flex items-start gap-4">
                  <div className={`rounded-xl p-3 ${
                    milestone.achieved 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      milestone.achieved ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-semibold ${
                        milestone.achieved 
                          ? 'text-gray-900 dark:text-gray-100' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {milestone.title}
                      </h4>
                      {milestone.achieved && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          ✓ Alcançado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {milestone.description}
                    </p>
                    {!milestone.achieved && (
                      <Progress 
                        value={(stats.hoursSmokeFree / milestone.timeRequired) * 100} 
                        className="mt-2 h-2"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Conquistas */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Conquistas
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {unlockedCount} de {userAchievements.length} desbloqueadas
              </p>
            </div>
            <Award className="h-8 w-8 text-purple-500" />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                unlocked={achievement.unlocked}
                color={achievement.color}
                requirement={
                  !achievement.unlocked
                    ? `${achievement.requirement.value} ${
                        achievement.requirement.type === 'days' ? 'dias' :
                        achievement.requirement.type === 'cigarettes' ? 'cigarros' :
                        achievement.requirement.type === 'money' ? 'reais' : 
                        achievement.requirement.type === 'social' ? 'ações sociais' : 'pontos'
                      }`
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        {/* Comunidade (Preview - Bloqueado para usuários free) */}
        <Card className="relative overflow-hidden border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 p-8 dark:border-purple-700 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="relative z-10 text-center">
            <div className="mb-4 flex justify-center gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <Users className="h-8 w-8 text-purple-500" />
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <MessageCircle className="h-8 w-8 text-pink-500" />
              </div>
            </div>
            
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Comunidade FreshLife
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Conecte-se com milhares de pessoas na mesma jornada que você!
            </p>
            
            <div className="mb-6 flex flex-wrap justify-center gap-3 text-sm">
              <Badge variant="secondary">📸 Feed de fotos</Badge>
              <Badge variant="secondary">💬 Chat em grupo</Badge>
              <Badge variant="secondary">👥 Adicionar amigos</Badge>
              <Badge variant="secondary">📖 Stories diários</Badge>
              <Badge variant="secondary">💪 Desafios em grupo</Badge>
            </div>
            
            {!isPremium && (
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Crown className="mr-2 h-5 w-5" />
                Desbloquear Comunidade - R$ 9,90/mês
              </Button>
            )}
          </div>
          
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-300 opacity-20 blur-3xl dark:bg-purple-600" />
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white/50 py-8 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            <strong className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-transparent">
              FreshLife
            </strong> - Sua jornada de liberdade começa aqui 🎉
          </p>
          <p className="text-xs">
            Dados baseados em pesquisas da OMS • Feito com 💜 para você
          </p>
        </div>
      </footer>
    </div>
  );
}
