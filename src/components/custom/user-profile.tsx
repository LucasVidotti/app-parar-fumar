'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  MapPin,
  Crown,
  Users,
  Image as ImageIcon,
  Award,
  Heart,
  MessageCircle,
  Settings,
  Share2,
  Edit,
  TrendingUp,
  HandHeart
} from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { formatMoney } from '@/lib/gamification';

interface UserProfileComponentProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onAddFriend?: () => void;
  onMessage?: () => void;
}

export function UserProfileComponent({
  profile,
  isOwnProfile = false,
  onEditProfile,
  onAddFriend,
  onMessage
}: UserProfileComponentProps) {
  const unlockedAchievements = profile.achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Header do Perfil */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-green-600 to-orange-500 p-8 text-white shadow-2xl">
        <div className="relative z-10">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-white/20 text-3xl font-bold text-white backdrop-blur-sm">
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {profile.isPremium && (
                <div className="absolute -right-2 -top-2 rounded-full bg-yellow-400 p-2 shadow-lg">
                  <Crown className="h-5 w-5 text-yellow-900" />
                </div>
              )}
            </div>

            {/* Informações do Usuário */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-2 flex flex-col items-center gap-2 md:flex-row">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                {profile.isPremium && (
                  <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">
                    <Crown className="mr-1 h-3 w-3" />
                    Premium
                  </Badge>
                )}
              </div>
              
              <p className="mb-4 text-lg opacity-90">@{profile.username}</p>
              
              {profile.bio && (
                <p className="mb-4 max-w-2xl text-white/90">{profile.bio}</p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Livre há {profile.stats.daysSmokeFree} dias</span>
                </div>
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <HandHeart className="h-4 w-4" />
                  <span>Desde {new Date(profile.joinedAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-2">
              {isOwnProfile ? (
                <>
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30"
                    onClick={onEditProfile}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="bg-white text-blue-600 hover:bg-white/90"
                    onClick={onAddFriend}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Adicionar Amigo
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30"
                    onClick={onMessage}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Mensagem
                  </Button>
                </>
              )}
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl" />
      </Card>

      {/* Estatísticas Sociais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 text-center">
          <Users className="mx-auto mb-2 h-8 w-8 text-blue-500" />
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {profile.friends}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Amigos</p>
        </Card>

        <Card className="p-6 text-center">
          <ImageIcon className="mx-auto mb-2 h-8 w-8 text-green-500" />
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {profile.posts}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Postagens</p>
        </Card>

        <Card className="p-6 text-center">
          <Award className="mx-auto mb-2 h-8 w-8 text-orange-500" />
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {unlockedAchievements}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Conquistas</p>
        </Card>

        <Card className="p-6 text-center">
          <TrendingUp className="mx-auto mb-2 h-8 w-8 text-emerald-500" />
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {formatMoney(profile.stats.moneySaved)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Economizados</p>
        </Card>
      </div>

      {/* Tabs de Conteúdo */}
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          <TabsTrigger value="posts">Postagens</TabsTrigger>
        </TabsList>

        {/* Tab: Estatísticas */}
        <TabsContent value="stats" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              Progresso Pessoal
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dias sem fumar
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {profile.stats.daysSmokeFree}
                  </span>
                </div>
                <Progress value={(profile.stats.daysSmokeFree / 365) * 100} className="h-3" />
                <p className="mt-1 text-xs text-gray-500">Meta: 365 dias</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cigarros não fumados
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    {profile.stats.cigarettesNotSmoked}
                  </span>
                </div>
                <Progress value={Math.min((profile.stats.cigarettesNotSmoked / 1000) * 100, 100)} className="h-3" />
                <p className="mt-1 text-xs text-gray-500">Próxima meta: 1.000</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Recuperação da saúde
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {Math.round(profile.stats.healthProgress)}%
                  </span>
                </div>
                <Progress value={profile.stats.healthProgress} className="h-3" />
                <p className="mt-1 text-xs text-gray-500">Baseado em dados da OMS</p>
              </div>

              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-900/20 dark:to-emerald-900/20">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Economia Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatMoney(profile.stats.moneySaved)}
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tempo Recuperado</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.floor(profile.stats.timeSaved / 60)}h
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab: Conquistas */}
        <TabsContent value="achievements" className="space-y-4">
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Conquistas Desbloqueadas
              </h3>
              <Badge variant="secondary">
                {unlockedAchievements} / {profile.achievements.length}
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profile.achievements
                .filter(a => a.unlocked)
                .map((achievement) => {
                  const IconComponent = (require('lucide-react') as any)[achievement.icon];
                  return (
                    <div
                      key={achievement.id}
                      className={`rounded-xl bg-gradient-to-br ${achievement.color} p-4 text-white shadow-lg`}
                    >
                      <IconComponent className="mb-2 h-8 w-8" />
                      <h4 className="mb-1 font-bold">{achievement.title}</h4>
                      <p className="text-sm opacity-90">{achievement.description}</p>
                      {achievement.unlockedAt && (
                        <p className="mt-2 text-xs opacity-75">
                          {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>

            {unlockedAchievements === 0 && (
              <div className="py-12 text-center">
                <Award className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <p className="text-gray-600 dark:text-gray-400">
                  Nenhuma conquista desbloqueada ainda
                </p>
                <p className="text-sm text-gray-500">
                  Continue sua jornada para desbloquear conquistas!
                </p>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Tab: Postagens */}
        <TabsContent value="posts" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              Postagens Recentes
            </h3>

            {!profile.isPremium ? (
              <div className="py-12 text-center">
                <Crown className="mx-auto mb-4 h-16 w-16 text-blue-300" />
                <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Recurso Premium
                </p>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Assine o plano Premium para postar e ver postagens
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  <Crown className="mr-2 h-4 w-4" />
                  Assinar Premium
                </Button>
              </div>
            ) : profile.posts === 0 ? (
              <div className="py-12 text-center">
                <ImageIcon className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <p className="text-gray-600 dark:text-gray-400">
                  Nenhuma postagem ainda
                </p>
                <p className="text-sm text-gray-500">
                  Compartilhe sua jornada com a comunidade!
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Aqui viriam as postagens reais */}
                <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20" />
                <div className="aspect-square rounded-lg bg-gradient-to-br from-green-100 to-orange-100 dark:from-green-900/20 dark:to-orange-900/20" />
                <div className="aspect-square rounded-lg bg-gradient-to-br from-orange-100 to-blue-100 dark:from-orange-900/20 dark:to-blue-900/20" />
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
