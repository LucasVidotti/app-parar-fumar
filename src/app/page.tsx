"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Cigarette,
  DollarSign,
  Heart,
  Clock,
  TrendingUp,
  Award,
  Zap,
  Menu,
  X,
  Trophy,
  Target,
  Activity,
  Smile,
  Wind,
  Brain,
  Sparkles,
  Users,
  MessageCircle,
  ThumbsUp,
  Share2,
  UserCircle,
  Save,
  Leaf,
  Star,
  Flame,
  Shield,
  Crown,
  Rocket,
  Mountain,
  Sun,
  Moon,
  Coffee,
  Gift,
  Gem,
  Medal,
  Lightbulb,
  Sunrise,
  Sunset,
  UserPlus,
  UserCheck,
  UserX,
  Check,
  Calendar,
  Droplet,
  Utensils,
  Phone,
  ExternalLink,
  CircleDot,
  Play,
  Pause,
  BookOpen,
  TrendingDown,
  BarChart3,
  PieChart,
  Frown,
  Meh,
  SmilePlus,
  Plus,
  Search,
  Filter,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import { Logo } from "@/components/custom/logo";

interface QuitData {
  quitDate: Date;
  cigarettesPerDay: number;
  pricePerPack: number;
  cigarettesPerPack: number;
}

interface HealthMilestone {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  achieved: boolean;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "time" | "health" | "money" | "cigarettes" | "life" | "special" | "environment" | "social";
  achieved: boolean;
  requirement: number;
  currentValue: number;
  unit: string;
  color: string;
}

interface CommunityPost {
  id: number;
  author: string;
  avatar: string;
  daysClean: number;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  achievement?: {
    title: string;
    icon: React.ReactNode;
    color: string;
  };
}

interface UserProfile {
  name: string;
  location: string;
  about: string;
  visibility: "public" | "friends" | "private";
}

interface FriendRequest {
  id: number;
  from: string;
  avatar: string;
  daysClean: number;
  mutualFriends: number;
  timestamp: string;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  daysClean: number;
  status: "online" | "offline";
}

interface DiaryEntry {
  id: number;
  date: Date;
  mood: 1 | 2 | 3 | 4 | 5;
  cravingLevel: number;
  triggers: string[];
  notes: string;
  victories: string;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [achievementFilter, setAchievementFilter] = useState<string>("all");
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Estados para "Derrote seu Desejo"
  const [cravingTab, setCravingTab] = useState<"tip" | "hotline" | "breathing">("tip");
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathingTimer, setBreathingTimer] = useState(0);

  // Estados para Diário
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    {
      id: 1,
      date: new Date(2024, 0, 15),
      mood: 4,
      cravingLevel: 3,
      triggers: ["estresse", "trabalho"],
      notes: "Dia difícil no trabalho, mas consegui resistir. Fui caminhar quando bateu a vontade.",
      victories: "Resisti a 3 momentos de vontade intensa"
    },
    {
      id: 2,
      date: new Date(2024, 0, 14),
      mood: 5,
      cravingLevel: 2,
      triggers: ["social"],
      notes: "Saí com amigos e não fumei! Me senti muito orgulhoso.",
      victories: "Primeira vez saindo sem fumar"
    },
    {
      id: 3,
      date: new Date(2024, 0, 13),
      mood: 3,
      cravingLevel: 7,
      triggers: ["estresse", "ansiedade"],
      notes: "Dia muito difícil. Quase recaí, mas liguei para um amigo da comunidade.",
      victories: "Pedi ajuda quando precisei"
    },
    {
      id: 4,
      date: new Date(2024, 0, 12),
      mood: 4,
      cravingLevel: 4,
      triggers: ["café"],
      notes: "Percebi que café é um gatilho forte. Vou tentar chá.",
      victories: "Identifiquei um gatilho importante"
    },
    {
      id: 5,
      date: new Date(2024, 0, 11),
      mood: 5,
      cravingLevel: 1,
      triggers: [],
      notes: "Dia excelente! Quase não pensei em fumar.",
      victories: "Dia inteiro sem vontade"
    }
  ]);

  const [newEntry, setNewEntry] = useState<Partial<DiaryEntry>>({
    mood: 3,
    cravingLevel: 5,
    triggers: [],
    notes: "",
    victories: ""
  });

  const availableTriggers = [
    "estresse", "trabalho", "social", "álcool", "café", 
    "ansiedade", "tédio", "após refeição", "manhã", "noite"
  ];

  // Dicas do dia
  const dailyTips = [
    "Fale com alguém na comunidade - compartilhar sua experiência ajuda muito!",
    "Beba um copo de água gelada - ajuda a reduzir a ansiedade",
    "Faça 10 respirações profundas - acalma o corpo e a mente",
    "Saia para uma caminhada rápida de 5 minutos",
    "Mastigue uma goma de mascar sem açúcar",
    "Escove os dentes - muda o sabor na boca",
    "Faça alongamentos por 2 minutos",
    "Ligue para um amigo ou familiar",
    "Leia depoimentos de sucesso na comunidade",
    "Visualize seus objetivos e conquistas"
  ];

  const [currentTip] = useState(dailyTips[Math.floor(Math.random() * dailyTips.length)]);

  // Estados sociais
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: 1,
      from: "Carlos Mendes",
      avatar: "CM",
      daysClean: 89,
      mutualFriends: 3,
      timestamp: "2h atrás"
    },
    {
      id: 2,
      from: "Fernanda Lima",
      avatar: "FL",
      daysClean: 156,
      mutualFriends: 5,
      timestamp: "1 dia atrás"
    }
  ]);

  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: "Maria Silva", avatar: "MS", daysClean: 45, status: "online" },
    { id: 2, name: "João Santos", avatar: "JS", daysClean: 120, status: "online" },
    { id: 3, name: "Ana Costa", avatar: "AC", daysClean: 7, status: "offline" },
    { id: 4, name: "Pedro Oliveira", avatar: "PO", daysClean: 365, status: "online" }
  ]);

  const [postsShared, setPostsShared] = useState(0);
  const [friendsCount, setFriendsCount] = useState(friends.length);
  const [commentsCount, setCommentsCount] = useState(0);
  const [likesReceived, setLikesReceived] = useState(0);

  // Estado do perfil do usuário
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Você",
    location: "",
    about: "",
    visibility: "public"
  });

  // Dados do usuário - em produção viria de um banco de dados
  const quitData: QuitData = {
    quitDate: new Date("2024-01-01T00:00:00"),
    cigarettesPerDay: 20,
    pricePerPack: 12.00,
    cigarettesPerPack: 20
  };

  // Posts da comunidade (mock data)
  const communityPosts: CommunityPost[] = [
    {
      id: 1,
      author: "Maria Silva",
      avatar: "MS",
      daysClean: 45,
      content: "Hoje completo 45 dias sem fumar! A vontade ainda aparece, mas estou firme. Cada dia fica mais fácil. Obrigada pelo apoio de todos! 💪",
      likes: 127,
      comments: 23,
      timestamp: "2h atrás",
      achievement: {
        title: "45 Dias Livre",
        icon: <Trophy className="w-5 h-5" />,
        color: "bg-emerald-500"
      }
    },
    {
      id: 2,
      author: "João Santos",
      avatar: "JS",
      daysClean: 120,
      content: "4 meses livre! Minha respiração melhorou muito, consigo subir escadas sem cansar. Vale cada esforço! 🎉",
      likes: 89,
      comments: 15,
      timestamp: "5h atrás"
    },
    {
      id: 3,
      author: "Ana Costa",
      avatar: "AC",
      daysClean: 7,
      content: "Primeira semana completa! Os primeiros dias foram os mais difíceis, mas estou conseguindo. Vamos juntos! 🌟",
      likes: 156,
      comments: 31,
      timestamp: "1 dia atrás",
      achievement: {
        title: "Uma Semana",
        icon: <Star className="w-5 h-5" />,
        color: "bg-blue-500"
      }
    },
    {
      id: 4,
      author: "Pedro Oliveira",
      avatar: "PO",
      daysClean: 365,
      content: "1 ANO SEM FUMAR! Nunca pensei que conseguiria. Se eu consegui, você também consegue! Não desista! 🏆",
      likes: 342,
      comments: 67,
      timestamp: "2 dias atrás",
      achievement: {
        title: "Um Ano",
        icon: <Crown className="w-5 h-5" />,
        color: "bg-gradient-to-br from-yellow-400 to-orange-500"
      }
    }
  ];

  // Calcular tempo decorrido
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - quitData.quitDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [quitData.quitDate]);

  // Efeito para animação de respiração
  useEffect(() => {
    if (!breathingActive) return;

    const interval = setInterval(() => {
      setBreathingTimer((prev) => {
        const newTime = prev + 0.1;

        // Inspirar: 0-4s
        if (newTime <= 4) {
          setBreathingPhase("inhale");
        }
        // Segurar: 4-6.5s
        else if (newTime <= 6.5) {
          setBreathingPhase("hold");
        }
        // Expirar: 6.5-10.5s
        else if (newTime <= 10.5) {
          setBreathingPhase("exhale");
        }
        // Reiniciar
        else {
          return 0;
        }

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [breathingActive]);

  // Cálculos
  const totalMinutes = timeElapsed.days * 24 * 60 + timeElapsed.hours * 60 + timeElapsed.minutes;
  const cigarettesNotSmoked = Math.floor((totalMinutes / (24 * 60)) * quitData.cigarettesPerDay);
  const moneySaved = (cigarettesNotSmoked / quitData.cigarettesPerPack) * quitData.pricePerPack;
  const lifeRegained = Math.floor(cigarettesNotSmoked * 11); // 11 minutos por cigarro
  const lifeRegainedDays = Math.floor(lifeRegained / (24 * 60));
  const lifeRegainedHours = Math.floor((lifeRegained % (24 * 60)) / 60);
  const lifeRegainedMinutes = lifeRegained % 60;

  // Marcos de saúde (baseado em dados médicos reais) - COM CORES DISTINTAS
  const healthMilestones: HealthMilestone[] = [
    {
      time: "20 minutos",
      title: "Pressão arterial normaliza",
      description: "Sua frequência cardíaca e pressão arterial voltam ao normal",
      icon: <Heart className="w-5 h-5" />,
      achieved: totalMinutes >= 20,
      color: "text-rose-500"
    },
    {
      time: "8 horas",
      title: "Oxigênio normalizado",
      description: "Níveis de oxigênio no sangue voltam ao normal",
      icon: <Droplet className="w-5 h-5" />,
      achieved: totalMinutes >= 480,
      color: "text-blue-500"
    },
    {
      time: "24 horas",
      title: "Risco cardíaco reduzido",
      description: "Risco de ataque cardíaco começa a diminuir",
      icon: <Activity className="w-5 h-5" />,
      achieved: totalMinutes >= 1440,
      color: "text-red-600"
    },
    {
      time: "48 horas",
      title: "Paladar e olfato melhoram",
      description: "Terminações nervosas começam a se regenerar",
      icon: <Utensils className="w-5 h-5" />,
      achieved: totalMinutes >= 2880,
      color: "text-amber-500"
    },
    {
      time: "72 horas",
      title: "Respiração melhora",
      description: "Brônquios relaxam, respirar fica mais fácil",
      icon: <Wind className="w-5 h-5" />,
      achieved: totalMinutes >= 4320,
      color: "text-cyan-500"
    },
    {
      time: "2 semanas",
      title: "Circulação melhora",
      description: "Circulação sanguínea e função pulmonar melhoram",
      icon: <TrendingUp className="w-5 h-5" />,
      achieved: timeElapsed.days >= 14,
      color: "text-purple-500"
    },
    {
      time: "1 mês",
      title: "Pulmões se recuperam",
      description: "Tosse e falta de ar diminuem significativamente",
      icon: <Sparkles className="w-5 h-5" />,
      achieved: timeElapsed.days >= 30,
      color: "text-emerald-500"
    },
    {
      time: "3 meses",
      title: "Fertilidade aumenta",
      description: "Fertilidade e função imunológica melhoram",
      icon: <Zap className="w-5 h-5" />,
      achieved: timeElapsed.days >= 90,
      color: "text-yellow-500"
    },
    {
      time: "9 meses",
      title: "Pulmões limpos",
      description: "Cílios pulmonares se regeneram, menos infecções",
      icon: <Brain className="w-5 h-5" />,
      achieved: timeElapsed.days >= 270,
      color: "text-indigo-500"
    },
    {
      time: "1 ano",
      title: "Risco cardíaco 50% menor",
      description: "Risco de doença cardíaca cai pela metade",
      icon: <Trophy className="w-5 h-5" />,
      achieved: timeElapsed.days >= 365,
      color: "text-orange-500"
    }
  ];

  const achievedMilestones = healthMilestones.filter(m => m.achieved).length;

  // Sistema completo de conquistas (90+ conquistas incluindo sociais)
  const achievements: Achievement[] = [
    // CONQUISTAS DE TEMPO (15 conquistas)
    {
      id: "time_1h",
      title: "Primeira Hora",
      description: "Completou 1 hora sem fumar",
      icon: <Clock className="w-8 h-8" />,
      category: "time",
      achieved: totalMinutes >= 60,
      requirement: 60,
      currentValue: totalMinutes,
      unit: "minutos",
      color: "bg-blue-400"
    },
    {
      id: "time_12h",
      title: "Meio Dia Forte",
      description: "12 horas de liberdade",
      icon: <Sun className="w-8 h-8" />,
      category: "time",
      achieved: totalMinutes >= 720,
      requirement: 720,
      currentValue: totalMinutes,
      unit: "minutos",
      color: "bg-yellow-400"
    },
    {
      id: "time_1d",
      title: "Primeiro Dia",
      description: "24 horas sem fumar",
      icon: <Trophy className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 1,
      requirement: 1,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-emerald-400"
    },
    {
      id: "time_3d",
      title: "Três Dias",
      description: "72 horas de vitória",
      icon: <Flame className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 3,
      requirement: 3,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-orange-500"
    },
    {
      id: "time_1w",
      title: "Uma Semana",
      description: "7 dias consecutivos",
      icon: <Award className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 7,
      requirement: 7,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-blue-500"
    },
    {
      id: "time_2w",
      title: "Duas Semanas",
      description: "14 dias de determinação",
      icon: <Star className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 14,
      requirement: 14,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-purple-500"
    },
    {
      id: "time_1m",
      title: "Um Mês",
      description: "30 dias de liberdade",
      icon: <Sparkles className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 30,
      requirement: 30,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-pink-500"
    },
    {
      id: "time_2m",
      title: "Dois Meses",
      description: "60 dias sem fumar",
      icon: <Rocket className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 60,
      requirement: 60,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-indigo-500"
    },
    {
      id: "time_3m",
      title: "Três Meses",
      description: "90 dias de conquista",
      icon: <Mountain className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 90,
      requirement: 90,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-teal-500"
    },
    {
      id: "time_6m",
      title: "Meio Ano",
      description: "180 dias livre",
      icon: <Crown className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 180,
      requirement: 180,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-yellow-600"
    },
    {
      id: "time_9m",
      title: "Nove Meses",
      description: "270 dias de vitória",
      icon: <Gem className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 270,
      requirement: 270,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-cyan-500"
    },
    {
      id: "time_1y",
      title: "Um Ano",
      description: "365 dias sem fumar!",
      icon: <Trophy className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 365,
      requirement: 365,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500"
    },
    {
      id: "time_2y",
      title: "Dois Anos",
      description: "730 dias de liberdade",
      icon: <Medal className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 730,
      requirement: 730,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: "time_3y",
      title: "Três Anos",
      description: "1095 dias de conquista",
      icon: <Crown className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 1095,
      requirement: 1095,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      id: "time_5y",
      title: "Cinco Anos",
      description: "1825 dias - Lenda!",
      icon: <Sparkles className="w-8 h-8" />,
      category: "time",
      achieved: timeElapsed.days >= 1825,
      requirement: 1825,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500"
    },

    // CONQUISTAS DE VIDA RECUPERADA (20 conquistas)
    {
      id: "life_1h",
      title: "1 Hora de Vida",
      description: "Recuperou 1 hora de vida",
      icon: <Sunrise className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegained >= 60,
      requirement: 60,
      currentValue: lifeRegained,
      unit: "minutos",
      color: "bg-amber-400"
    },
    {
      id: "life_6h",
      title: "6 Horas de Vida",
      description: "Recuperou 6 horas de vida",
      icon: <Sun className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegained >= 360,
      requirement: 360,
      currentValue: lifeRegained,
      unit: "minutos",
      color: "bg-yellow-500"
    },
    {
      id: "life_12h",
      title: "12 Horas de Vida",
      description: "Meio dia recuperado",
      icon: <Sunset className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegained >= 720,
      requirement: 720,
      currentValue: lifeRegained,
      unit: "minutos",
      color: "bg-orange-500"
    },
    {
      id: "life_1d",
      title: "1 Dia de Vida",
      description: "24 horas recuperadas!",
      icon: <Moon className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 1,
      requirement: 1,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-indigo-500"
    },
    {
      id: "life_3d",
      title: "3 Dias de Vida",
      description: "72 horas extras de vida",
      icon: <Sparkles className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 3,
      requirement: 3,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-purple-500"
    },
    {
      id: "life_1w",
      title: "1 Semana de Vida",
      description: "7 dias recuperados",
      icon: <Heart className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 7,
      requirement: 7,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-pink-500"
    },
    {
      id: "life_2w",
      title: "2 Semanas de Vida",
      description: "14 dias extras de vida",
      icon: <Zap className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 14,
      requirement: 14,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-cyan-500"
    },
    {
      id: "life_1m",
      title: "1 Mês de Vida",
      description: "30 dias recuperados!",
      icon: <Trophy className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 30,
      requirement: 30,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-emerald-500"
    },
    {
      id: "life_2m",
      title: "2 Meses de Vida",
      description: "60 dias extras de vida",
      icon: <Star className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 60,
      requirement: 60,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-blue-600"
    },
    {
      id: "life_3m",
      title: "3 Meses de Vida",
      description: "90 dias recuperados",
      icon: <Crown className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 90,
      requirement: 90,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-violet-600"
    },
    {
      id: "life_6m",
      title: "6 Meses de Vida",
      description: "Meio ano recuperado!",
      icon: <Gem className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 180,
      requirement: 180,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-fuchsia-600"
    },
    {
      id: "life_9m",
      title: "9 Meses de Vida",
      description: "270 dias extras de vida",
      icon: <Rocket className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 270,
      requirement: 270,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-rose-600"
    },
    {
      id: "life_1y",
      title: "1 Ano de Vida",
      description: "365 dias recuperados!",
      icon: <Medal className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 365,
      requirement: 365,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-gradient-to-br from-green-400 to-emerald-600"
    },
    {
      id: "life_2y",
      title: "2 Anos de Vida",
      description: "730 dias extras de vida!",
      icon: <Sparkles className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 730,
      requirement: 730,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-gradient-to-br from-blue-400 to-cyan-600"
    },
    {
      id: "life_3y",
      title: "3 Anos de Vida",
      description: "1095 dias recuperados!",
      icon: <Crown className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 1095,
      requirement: 1095,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-gradient-to-br from-purple-400 to-pink-600"
    },
    {
      id: "life_5y",
      title: "5 Anos de Vida",
      description: "1825 dias extras - Incrível!",
      icon: <Trophy className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 1825,
      requirement: 1825,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500"
    },
    {
      id: "life_10y",
      title: "10 Anos de Vida",
      description: "3650 dias recuperados - Lendário!",
      icon: <Sparkles className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 3650,
      requirement: 3650,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-gradient-to-br from-amber-300 via-orange-500 to-red-600"
    },
    {
      id: "life_15y",
      title: "15 Anos de Vida",
      description: "5475 dias extras - Épico!",
      icon: <Crown className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 5475,
      requirement: 5475,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600"
    },
    {
      id: "life_20y",
      title: "20 Anos de Vida",
      description: "7300 dias recuperados - Mítico!",
      icon: <Gem className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 7300,
      requirement: 7300,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-700"
    },
    {
      id: "life_30y",
      title: "30 Anos de Vida",
      description: "10950 dias extras - Divino!",
      icon: <Sparkles className="w-8 h-8" />,
      category: "life",
      achieved: lifeRegainedDays >= 10950,
      requirement: 10950,
      currentValue: lifeRegainedDays,
      unit: "dias",
      color: "bg-gradient-to-br from-pink-300 via-rose-500 to-red-700"
    },

    // CONQUISTAS DE CIGARROS (15 conquistas)
    {
      id: "cig_10",
      title: "10 Evitados",
      description: "Não fumou 10 cigarros",
      icon: <Cigarette className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 10,
      requirement: 10,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-red-400"
    },
    {
      id: "cig_50",
      title: "50 Evitados",
      description: "Não fumou 50 cigarros",
      icon: <Cigarette className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 50,
      requirement: 50,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-red-500"
    },
    {
      id: "cig_100",
      title: "100 Evitados",
      description: "Não fumou 100 cigarros",
      icon: <Cigarette className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 100,
      requirement: 100,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-red-600"
    },
    {
      id: "cig_250",
      title: "250 Evitados",
      description: "Não fumou 250 cigarros",
      icon: <Shield className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 250,
      requirement: 250,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-orange-600"
    },
    {
      id: "cig_500",
      title: "500 Evitados",
      description: "Meio milhar evitado!",
      icon: <Award className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 500,
      requirement: 500,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-rose-600"
    },
    {
      id: "cig_1000",
      title: "1000 Evitados",
      description: "Um milhar evitado!",
      icon: <Trophy className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 1000,
      requirement: 1000,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-red-500 to-orange-600"
    },
    {
      id: "cig_2500",
      title: "2500 Evitados",
      description: "2500 cigarros não fumados",
      icon: <Star className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 2500,
      requirement: 2500,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      id: "cig_5000",
      title: "5000 Evitados",
      description: "5 mil cigarros evitados!",
      icon: <Crown className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 5000,
      requirement: 5000,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-red-600 to-pink-600"
    },
    {
      id: "cig_7500",
      title: "7500 Evitados",
      description: "7500 cigarros não fumados",
      icon: <Gem className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 7500,
      requirement: 7500,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-pink-600 to-rose-700"
    },
    {
      id: "cig_10000",
      title: "10000 Evitados",
      description: "10 mil cigarros evitados!",
      icon: <Medal className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 10000,
      requirement: 10000,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-rose-600 to-red-800"
    },
    {
      id: "cig_15000",
      title: "15000 Evitados",
      description: "15 mil cigarros não fumados",
      icon: <Sparkles className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 15000,
      requirement: 15000,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-red-700 to-orange-800"
    },
    {
      id: "cig_20000",
      title: "20000 Evitados",
      description: "20 mil cigarros evitados - Épico!",
      icon: <Trophy className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 20000,
      requirement: 20000,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-orange-700 to-red-900"
    },
    {
      id: "cig_30000",
      title: "30000 Evitados",
      description: "30 mil cigarros não fumados!",
      icon: <Crown className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 30000,
      requirement: 30000,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-red-800 to-pink-900"
    },
    {
      id: "cig_50000",
      title: "50000 Evitados",
      description: "50 mil cigarros evitados - Lendário!",
      icon: <Gem className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 50000,
      requirement: 50000,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-pink-800 to-rose-900"
    },
    {
      id: "cig_100000",
      title: "100000 Evitados",
      description: "100 mil cigarros não fumados - Divino!",
      icon: <Sparkles className="w-8 h-8" />,
      category: "cigarettes",
      achieved: cigarettesNotSmoked >= 100000,
      requirement: 100000,
      currentValue: cigarettesNotSmoked,
      unit: "cigarros",
      color: "bg-gradient-to-br from-rose-800 to-red-950"
    },

    // CONQUISTAS DE DINHEIRO (15 conquistas)
    {
      id: "money_10",
      title: "R$ 10 Economizados",
      description: "Economizou R$ 10",
      icon: <DollarSign className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 10,
      requirement: 10,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-green-400"
    },
    {
      id: "money_50",
      title: "R$ 50 Economizados",
      description: "Economizou R$ 50",
      icon: <DollarSign className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 50,
      requirement: 50,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-green-500"
    },
    {
      id: "money_100",
      title: "R$ 100 Economizados",
      description: "Primeira centena economizada!",
      icon: <DollarSign className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 100,
      requirement: 100,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-green-600"
    },
    {
      id: "money_250",
      title: "R$ 250 Economizados",
      description: "Economizou R$ 250",
      icon: <Gift className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 250,
      requirement: 250,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-emerald-600"
    },
    {
      id: "money_500",
      title: "R$ 500 Economizados",
      description: "Meio milhar economizado!",
      icon: <Award className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 500,
      requirement: 500,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-teal-600"
    },
    {
      id: "money_1000",
      title: "R$ 1000 Economizados",
      description: "Primeiro milhar economizado!",
      icon: <Trophy className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 1000,
      requirement: 1000,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      id: "money_2000",
      title: "R$ 2000 Economizados",
      description: "Dois mil reais economizados!",
      icon: <Star className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 2000,
      requirement: 2000,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },
    {
      id: "money_3000",
      title: "R$ 3000 Economizados",
      description: "Três mil reais economizados!",
      icon: <Crown className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 3000,
      requirement: 3000,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-teal-500 to-cyan-600"
    },
    {
      id: "money_5000",
      title: "R$ 5000 Economizados",
      description: "Cinco mil reais economizados!",
      icon: <Gem className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 5000,
      requirement: 5000,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-cyan-500 to-blue-600"
    },
    {
      id: "money_7500",
      title: "R$ 7500 Economizados",
      description: "7500 reais economizados!",
      icon: <Medal className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 7500,
      requirement: 7500,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
      id: "money_10000",
      title: "R$ 10000 Economizados",
      description: "Dez mil reais economizados - Épico!",
      icon: <Sparkles className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 10000,
      requirement: 10000,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-indigo-500 to-purple-600"
    },
    {
      id: "money_15000",
      title: "R$ 15000 Economizados",
      description: "15 mil reais economizados!",
      icon: <Trophy className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 15000,
      requirement: 15000,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      id: "money_20000",
      title: "R$ 20000 Economizados",
      description: "20 mil reais economizados - Lendário!",
      icon: <Crown className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 20000,
      requirement: 20000,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
      id: "money_30000",
      title: "R$ 30000 Economizados",
      description: "30 mil reais economizados!",
      icon: <Gem className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 30000,
      requirement: 30000,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-rose-500 to-red-600"
    },
    {
      id: "money_50000",
      title: "R$ 50000 Economizados",
      description: "50 mil reais economizados - Divino!",
      icon: <Sparkles className="w-8 h-8" />,
      category: "money",
      achieved: moneySaved >= 50000,
      requirement: 50000,
      currentValue: moneySaved,
      unit: "reais",
      color: "bg-gradient-to-br from-red-500 to-orange-700"
    },

    // CONQUISTAS DE SAÚDE (10 conquistas)
    {
      id: "health_heart",
      title: "Coração Normalizado",
      description: "Pressão arterial voltou ao normal",
      icon: <Heart className="w-8 h-8" />,
      category: "health",
      achieved: totalMinutes >= 20,
      requirement: 20,
      currentValue: totalMinutes,
      unit: "minutos",
      color: "bg-red-500"
    },
    {
      id: "health_oxygen",
      title: "Oxigênio Restaurado",
      description: "Níveis de oxigênio normalizados",
      icon: <Wind className="w-8 h-8" />,
      category: "health",
      achieved: totalMinutes >= 480,
      requirement: 480,
      currentValue: totalMinutes,
      unit: "minutos",
      color: "bg-sky-500"
    },
    {
      id: "health_cardiac",
      title: "Risco Cardíaco Reduzido",
      description: "Risco de ataque cardíaco diminuiu",
      icon: <Activity className="w-8 h-8" />,
      category: "health",
      achieved: totalMinutes >= 1440,
      requirement: 1440,
      currentValue: totalMinutes,
      unit: "minutos",
      color: "bg-rose-600"
    },
    {
      id: "health_taste",
      title: "Sentidos Restaurados",
      description: "Paladar e olfato melhoraram",
      icon: <Smile className="w-8 h-8" />,
      category: "health",
      achieved: totalMinutes >= 2880,
      requirement: 2880,
      currentValue: totalMinutes,
      unit: "minutos",
      color: "bg-amber-500"
    },
    {
      id: "health_breathing",
      title: "Respiração Melhorada",
      description: "Brônquios relaxaram, respirar ficou mais fácil",
      icon: <Wind className="w-8 h-8" />,
      category: "health",
      achieved: totalMinutes >= 4320,
      requirement: 4320,
      currentValue: totalMinutes,
      unit: "minutos",
      color: "bg-cyan-500"
    },
    {
      id: "health_circulation",
      title: "Circulação Melhorada",
      description: "Circulação sanguínea melhorou",
      icon: <TrendingUp className="w-8 h-8" />,
      category: "health",
      achieved: timeElapsed.days >= 14,
      requirement: 14,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-blue-600"
    },
    {
      id: "health_lungs",
      title: "Pulmões Recuperados",
      description: "Tosse e falta de ar diminuíram",
      icon: <Sparkles className="w-8 h-8" />,
      category: "health",
      achieved: timeElapsed.days >= 30,
      requirement: 30,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-purple-600"
    },
    {
      id: "health_fertility",
      title: "Fertilidade Aumentada",
      description: "Fertilidade e imunidade melhoraram",
      icon: <Zap className="w-8 h-8" />,
      category: "health",
      achieved: timeElapsed.days >= 90,
      requirement: 90,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-yellow-600"
    },
    {
      id: "health_clean_lungs",
      title: "Pulmões Limpos",
      description: "Cílios pulmonares regenerados",
      icon: <Brain className="w-8 h-8" />,
      category: "health",
      achieved: timeElapsed.days >= 270,
      requirement: 270,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-indigo-600"
    },
    {
      id: "health_heart_risk",
      title: "Risco Cardíaco 50% Menor",
      description: "Risco de doença cardíaca caiu pela metade",
      icon: <Trophy className="w-8 h-8" />,
      category: "health",
      achieved: timeElapsed.days >= 365,
      requirement: 365,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-gradient-to-br from-red-500 to-pink-600"
    },

    // CONQUISTAS ESPECIAIS (7 conquistas)
    {
      id: "special_first_step",
      title: "Primeiro Passo",
      description: "Iniciou sua jornada sem fumar",
      icon: <Lightbulb className="w-8 h-8" />,
      category: "special",
      achieved: true,
      requirement: 1,
      currentValue: 1,
      unit: "",
      color: "bg-yellow-400"
    },
    {
      id: "special_warrior",
      title: "Guerreiro",
      description: "Completou 100 dias sem fumar",
      icon: <Shield className="w-8 h-8" />,
      category: "special",
      achieved: timeElapsed.days >= 100,
      requirement: 100,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-blue-700"
    },
    {
      id: "special_champion",
      title: "Campeão",
      description: "Completou 200 dias sem fumar",
      icon: <Medal className="w-8 h-8" />,
      category: "special",
      achieved: timeElapsed.days >= 200,
      requirement: 200,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-purple-700"
    },
    {
      id: "special_legend",
      title: "Lenda",
      description: "Completou 500 dias sem fumar",
      icon: <Crown className="w-8 h-8" />,
      category: "special",
      achieved: timeElapsed.days >= 500,
      requirement: 500,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      id: "special_master",
      title: "Mestre",
      description: "Completou 1000 dias sem fumar",
      icon: <Gem className="w-8 h-8" />,
      category: "special",
      achieved: timeElapsed.days >= 1000,
      requirement: 1000,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-gradient-to-br from-cyan-500 to-blue-700"
    },
    {
      id: "special_immortal",
      title: "Imortal",
      description: "Completou 2000 dias sem fumar",
      icon: <Sparkles className="w-8 h-8" />,
      category: "special",
      achieved: timeElapsed.days >= 2000,
      requirement: 2000,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-gradient-to-br from-purple-600 to-pink-700"
    },
    {
      id: "special_divine",
      title: "Divino",
      description: "Completou 3000 dias sem fumar",
      icon: <Trophy className="w-8 h-8" />,
      category: "special",
      achieved: timeElapsed.days >= 3000,
      requirement: 3000,
      currentValue: timeElapsed.days,
      unit: "dias",
      color: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600"
    },

    // CONQUISTAS SOCIAIS (8 conquistas)
    {
      id: "social_first_friend",
      title: "Primeira Amizade",
      description: "Fez seu primeiro amigo na comunidade",
      icon: <UserPlus className="w-8 h-8" />,
      category: "social",
      achieved: friendsCount >= 1,
      requirement: 1,
      currentValue: friendsCount,
      unit: "amigos",
      color: "bg-blue-500"
    },
    {
      id: "social_5_friends",
      title: "Círculo Social",
      description: "Tem 5 amigos na comunidade",
      icon: <Users className="w-8 h-8" />,
      category: "social",
      achieved: friendsCount >= 5,
      requirement: 5,
      currentValue: friendsCount,
      unit: "amigos",
      color: "bg-indigo-500"
    },
    {
      id: "social_10_friends",
      title: "Rede de Apoio",
      description: "Tem 10 amigos na comunidade",
      icon: <Users className="w-8 h-8" />,
      category: "social",
      achieved: friendsCount >= 10,
      requirement: 10,
      currentValue: friendsCount,
      unit: "amigos",
      color: "bg-purple-500"
    },
    {
      id: "social_first_post",
      title: "Primeira Partilha",
      description: "Compartilhou sua primeira conquista",
      icon: <Share2 className="w-8 h-8" />,
      category: "social",
      achieved: postsShared >= 1,
      requirement: 1,
      currentValue: postsShared,
      unit: "posts",
      color: "bg-emerald-500"
    },
    {
      id: "social_5_posts",
      title: "Inspirador",
      description: "Compartilhou 5 conquistas",
      icon: <Sparkles className="w-8 h-8" />,
      category: "social",
      achieved: postsShared >= 5,
      requirement: 5,
      currentValue: postsShared,
      unit: "posts",
      color: "bg-teal-500"
    },
    {
      id: "social_10_posts",
      title: "Motivador",
      description: "Compartilhou 10 conquistas",
      icon: <Star className="w-8 h-8" />,
      category: "social",
      achieved: postsShared >= 10,
      requirement: 10,
      currentValue: postsShared,
      unit: "posts",
      color: "bg-cyan-500"
    },
    {
      id: "social_supporter",
      title: "Apoiador",
      description: "Deu 50 curtidas em posts da comunidade",
      icon: <ThumbsUp className="w-8 h-8" />,
      category: "social",
      achieved: likesReceived >= 50,
      requirement: 50,
      currentValue: likesReceived,
      unit: "curtidas",
      color: "bg-pink-500"
    },
    {
      id: "social_mentor",
      title: "Mentor",
      description: "Comentou 25 vezes ajudando outros",
      icon: <MessageCircle className="w-8 h-8" />,
      category: "social",
      achieved: commentsCount >= 25,
      requirement: 25,
      currentValue: commentsCount,
      unit: "comentários",
      color: "bg-orange-500"
    }
  ];

  const achievedCount = achievements.filter(a => a.achieved).length;
  const totalAchievements = achievements.length;

  // Filtrar conquistas
  const filteredAchievements = achievementFilter === "all" 
    ? achievements 
    : achievements.filter(a => a.category === achievementFilter);

  const handleSaveProfile = () => {
    alert("Perfil salvo com sucesso!");
  };

  const handleAcceptFriend = (id: number) => {
    setFriendRequests(prev => prev.filter(req => req.id !== id));
    setFriendsCount(prev => prev + 1);
    alert("Solicitação de amizade aceita!");
  };

  const handleRejectFriend = (id: number) => {
    setFriendRequests(prev => prev.filter(req => req.id !== id));
    alert("Solicitação de amizade recusada.");
  };

  const handleShareAchievement = (achievement: Achievement) => {
    setPostsShared(prev => prev + 1);
    alert(`Conquista "${achievement.title}" compartilhada com a comunidade!`);
  };

  const toggleBreathing = () => {
    if (breathingActive) {
      setBreathingActive(false);
      setBreathingTimer(0);
      setBreathingPhase("inhale");
    } else {
      setBreathingActive(true);
    }
  };

  // Calcular escala do círculo de respiração
  const getBreathingScale = () => {
    if (breathingPhase === "inhale") {
      const progress = breathingTimer / 4;
      return 0.5 + (progress * 0.5);
    } else if (breathingPhase === "hold") {
      return 1;
    } else {
      const progress = (breathingTimer - 6.5) / 4;
      return 1 - (progress * 0.5);
    }
  };

  const getBreathingText = () => {
    if (breathingPhase === "inhale") return "Inspire";
    if (breathingPhase === "hold") return "Segure";
    return "Expire";
  };

  // Funções do Diário
  const handleAddDiaryEntry = () => {
    if (!newEntry.notes && !newEntry.victories) {
      alert("Adicione pelo menos uma nota ou vitória!");
      return;
    }

    const entry: DiaryEntry = {
      id: diaryEntries.length + 1,
      date: new Date(),
      mood: newEntry.mood || 3,
      cravingLevel: newEntry.cravingLevel || 5,
      triggers: newEntry.triggers || [],
      notes: newEntry.notes || "",
      victories: newEntry.victories || ""
    };

    setDiaryEntries([entry, ...diaryEntries]);
    setNewEntry({
      mood: 3,
      cravingLevel: 5,
      triggers: [],
      notes: "",
      victories: ""
    });
    alert("Entrada adicionada com sucesso!");
  };

  const toggleTrigger = (trigger: string) => {
    const currentTriggers = newEntry.triggers || [];
    if (currentTriggers.includes(trigger)) {
      setNewEntry({
        ...newEntry,
        triggers: currentTriggers.filter(t => t !== trigger)
      });
    } else {
      setNewEntry({
        ...newEntry,
        triggers: [...currentTriggers, trigger]
      });
    }
  };

  const getMoodIcon = (mood: number) => {
    switch(mood) {
      case 1: return <Frown className="w-6 h-6 text-red-500" />;
      case 2: return <Frown className="w-6 h-6 text-orange-500" />;
      case 3: return <Meh className="w-6 h-6 text-yellow-500" />;
      case 4: return <Smile className="w-6 h-6 text-green-500" />;
      case 5: return <SmilePlus className="w-6 h-6 text-emerald-500" />;
      default: return <Meh className="w-6 h-6" />;
    }
  };

  const getMoodLabel = (mood: number) => {
    switch(mood) {
      case 1: return "Muito Difícil";
      case 2: return "Difícil";
      case 3: return "Neutro";
      case 4: return "Bom";
      case 5: return "Excelente";
      default: return "Neutro";
    }
  };

  // Cálculos para gráficos
  const diaryStreak = diaryEntries.length; // Simplificado para demo
  const avgMood = diaryEntries.reduce((sum, e) => sum + e.mood, 0) / diaryEntries.length || 0;
  const avgCraving = diaryEntries.reduce((sum, e) => sum + e.cravingLevel, 0) / diaryEntries.length || 0;
  
  // Contar gatilhos
  const triggerCounts: Record<string, number> = {};
  diaryEntries.forEach(entry => {
    entry.triggers.forEach(trigger => {
      triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
    });
  });
  const topTriggers = Object.entries(triggerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Logo size={56} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                  VamosJuntos!
                </h1>
                <p className="text-xs text-gray-600">Quit Smoking Together</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                onClick={() => setActiveTab("dashboard")}
                className={activeTab === "dashboard" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                size="sm"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                variant={activeTab === "diary" ? "default" : "ghost"}
                onClick={() => setActiveTab("diary")}
                className={activeTab === "diary" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                size="sm"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Diário
              </Button>
              <Button 
                variant={activeTab === "evolution" ? "default" : "ghost"}
                onClick={() => setActiveTab("evolution")}
                className={activeTab === "evolution" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                size="sm"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Evolução
              </Button>
              <Button 
                variant={activeTab === "craving" ? "default" : "ghost"}
                onClick={() => setActiveTab("craving")}
                className={activeTab === "craving" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                size="sm"
              >
                <Target className="w-4 h-4 mr-2" />
                Derrote seu Desejo
              </Button>
              <Button 
                variant={activeTab === "health" ? "default" : "ghost"}
                onClick={() => setActiveTab("health")}
                className={activeTab === "health" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                size="sm"
              >
                <Heart className="w-4 h-4 mr-2" />
                Saúde
              </Button>
              <Button 
                variant={activeTab === "achievements" ? "default" : "ghost"}
                onClick={() => setActiveTab("achievements")}
                className={activeTab === "achievements" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                size="sm"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Conquistas
              </Button>
              <Button 
                variant={activeTab === "community" ? "default" : "ghost"}
                onClick={() => setActiveTab("community")}
                className={activeTab === "community" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                size="sm"
              >
                <Users className="w-4 h-4 mr-2" />
                Comunidade
              </Button>
              <Button 
                variant={activeTab === "friends" ? "default" : "ghost"}
                onClick={() => setActiveTab("friends")}
                className={activeTab === "friends" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                size="sm"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Amigos
                {friendRequests.length > 0 && (
                  <Badge className="ml-2 bg-red-500">{friendRequests.length}</Badge>
                )}
              </Button>
              <Button 
                variant={activeTab === "profile" ? "default" : "ghost"}
                onClick={() => setActiveTab("profile")}
                className={activeTab === "profile" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                size="sm"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <Button 
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                onClick={() => { setActiveTab("dashboard"); setMenuOpen(false); }}
                className={`w-full justify-start ${activeTab === "dashboard" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                variant={activeTab === "diary" ? "default" : "ghost"}
                onClick={() => { setActiveTab("diary"); setMenuOpen(false); }}
                className={`w-full justify-start ${activeTab === "diary" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Diário
              </Button>
              <Button 
                variant={activeTab === "evolution" ? "default" : "ghost"}
                onClick={() => { setActiveTab("evolution"); setMenuOpen(false); }}
                className={`w-full justify-start ${activeTab === "evolution" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Evolução
              </Button>
              <Button 
                variant={activeTab === "craving" ? "default" : "ghost"}
                onClick={() => { setActiveTab("craving"); setMenuOpen(false); }}
                className={`w-full justify-start ${activeTab === "craving" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
              >
                <Target className="w-4 h-4 mr-2" />
                Derrote seu Desejo
              </Button>
              <Button 
                variant={activeTab === "health" ? "default" : "ghost"}
                onClick={() => { setActiveTab("health"); setMenuOpen(false); }}
                className={`w-full justify-start ${activeTab === "health" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
              >
                <Heart className="w-4 h-4 mr-2" />
                Saúde
              </Button>
              <Button 
                variant={activeTab === "achievements" ? "default" : "ghost"}
                onClick={() => { setActiveTab("achievements"); setMenuOpen(false); }}
                className={`w-full justify-start ${activeTab === "achievements" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Conquistas
              </Button>
              <Button 
                variant={activeTab === "community" ? "default" : "ghost"}
                onClick={() => { setActiveTab("community"); setMenuOpen(false); }}
                className={`w-full justify-start ${activeTab === "community" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
              >
                <Users className="w-4 h-4 mr-2" />
                Comunidade
              </Button>
              <Button 
                variant={activeTab === "friends" ? "default" : "ghost"}
                onClick={() => { setActiveTab("friends"); setMenuOpen(false); }}
                className={`w-full justify-start ${activeTab === "friends" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Amigos
                {friendRequests.length > 0 && (
                  <Badge className="ml-2 bg-red-500">{friendRequests.length}</Badge>
                )}
              </Button>
              <Button 
                variant={activeTab === "profile" ? "default" : "ghost"}
                onClick={() => { setActiveTab("profile"); setMenuOpen(false); }}
                className={`w-full justify-start ${activeTab === "profile" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Hero com Relógio Animado Central */}
            <Card className="bg-gradient-to-br from-emerald-500 via-teal-600 to-green-600 text-white p-8 md:p-12 shadow-2xl border-0 overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-white/20 animate-spin" style={{ animationDuration: '3s' }}></div>
                    
                    <div className="relative bg-white/20 backdrop-blur-md rounded-full p-8 md:p-12 border-4 border-white/40">
                      <Clock className="w-16 h-16 md:w-24 md:h-24 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Você está livre há</h2>
                  <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
                      <div className="text-3xl md:text-5xl font-bold">{timeElapsed.days}</div>
                      <div className="text-xs md:text-sm text-emerald-100 mt-1">dias</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
                      <div className="text-3xl md:text-5xl font-bold">{timeElapsed.hours}</div>
                      <div className="text-xs md:text-sm text-emerald-100 mt-1">horas</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
                      <div className="text-3xl md:text-5xl font-bold">{timeElapsed.minutes}</div>
                      <div className="text-xs md:text-sm text-emerald-100 mt-1">minutos</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
                      <div className="text-3xl md:text-5xl font-bold">{timeElapsed.seconds}</div>
                      <div className="text-xs md:text-sm text-emerald-100 mt-1">segundos</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-emerald-100 text-base md:text-lg">
                    Desde {quitData.quitDate.toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </Card>

            {/* Indicadores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 border-emerald-100 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dias sem fumar</p>
                    <p className="text-3xl font-bold text-gray-900">{timeElapsed.days}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-emerald-100 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Cigarette className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cigarros evitados</p>
                    <p className="text-3xl font-bold text-gray-900">{cigarettesNotSmoked}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-emerald-100 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reais salvos</p>
                    <p className="text-3xl font-bold text-gray-900">
                      R$ {moneySaved.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-emerald-100 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tempo recuperado</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {lifeRegainedDays}d {lifeRegainedHours}h
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Motivação */}
            <Card className="p-6 border-emerald-100 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                Continue Firme!
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Parabéns por sua jornada! Cada dia sem fumar é uma vitória para sua saúde, 
                seu bolso e sua qualidade de vida. Você já economizou <strong>R$ {moneySaved.toFixed(2)}</strong>, 
                evitou <strong>{cigarettesNotSmoked} cigarros</strong> e recuperou <strong>{lifeRegainedDays} dias e {lifeRegainedHours} horas de vida</strong>!
              </p>
            </Card>

            {/* Próximos marcos */}
            <Card className="p-6 border-emerald-100 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Próximos Marcos de Saúde
              </h3>
              <div className="space-y-4">
                {healthMilestones.filter(m => !m.achieved).slice(0, 3).map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 bg-emerald-100 rounded-lg ${milestone.color}`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {milestone.time}
                        </Badge>
                        <h4 className="font-semibold">{milestone.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Diário Tab */}
        {activeTab === "diary" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Meu Diário</h2>
              <p className="text-purple-100">
                Registre seus sentimentos, gatilhos e vitórias diárias
              </p>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  <span className="font-semibold">{diaryStreak} dias de registro</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">{diaryEntries.length} entradas</span>
                </div>
              </div>
            </div>

            {/* Nova Entrada */}
            <Card className="p-6 border-purple-100 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-600" />
                Nova Entrada de Hoje
              </h3>

              <div className="space-y-6">
                {/* Humor */}
                <div>
                  <Label className="text-gray-700 font-semibold mb-3 block">
                    Como você está se sentindo hoje?
                  </Label>
                  <div className="flex gap-3 justify-between">
                    {[1, 2, 3, 4, 5].map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setNewEntry({...newEntry, mood: mood as 1 | 2 | 3 | 4 | 5})}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                          newEntry.mood === mood
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {getMoodIcon(mood)}
                          <span className="text-xs font-medium">{getMoodLabel(mood)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nível de Vontade */}
                <div>
                  <Label className="text-gray-700 font-semibold mb-3 block">
                    Nível de vontade de fumar hoje: {newEntry.cravingLevel}/10
                  </Label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={newEntry.cravingLevel}
                    onChange={(e) => setNewEntry({...newEntry, cravingLevel: parseInt(e.target.value)})}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Nenhuma</span>
                    <span>Moderada</span>
                    <span>Intensa</span>
                  </div>
                </div>

                {/* Gatilhos */}
                <div>
                  <Label className="text-gray-700 font-semibold mb-3 block">
                    Gatilhos identificados
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {availableTriggers.map((trigger) => (
                      <button
                        key={trigger}
                        onClick={() => toggleTrigger(trigger)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          newEntry.triggers?.includes(trigger)
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {trigger}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notas */}
                <div>
                  <Label htmlFor="notes" className="text-gray-700 font-semibold mb-2 block">
                    Notas do dia
                  </Label>
                  <Textarea
                    id="notes"
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                    placeholder="Como foi seu dia? O que você sentiu? O que te ajudou?"
                    className="min-h-[100px]"
                  />
                </div>

                {/* Vitórias */}
                <div>
                  <Label htmlFor="victories" className="text-gray-700 font-semibold mb-2 block">
                    Vitórias do dia
                  </Label>
                  <Input
                    id="victories"
                    value={newEntry.victories}
                    onChange={(e) => setNewEntry({...newEntry, victories: e.target.value})}
                    placeholder="Ex: Resisti a 3 momentos de vontade intensa"
                  />
                </div>

                <Button 
                  onClick={handleAddDiaryEntry}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                  size="lg"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Entrada
                </Button>
              </div>
            </Card>

            {/* Histórico */}
            <Card className="p-6 border-purple-100 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Histórico de Entradas
              </h3>

              <div className="space-y-4">
                {diaryEntries.map((entry) => (
                  <div key={entry.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getMoodIcon(entry.mood)}
                        <div>
                          <p className="font-semibold text-gray-900">
                            {entry.date.toLocaleDateString("pt-BR", { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                          <p className="text-sm text-gray-600">
                            Humor: {getMoodLabel(entry.mood)} • Vontade: {entry.cravingLevel}/10
                          </p>
                        </div>
                      </div>
                    </div>

                    {entry.triggers.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Gatilhos:</p>
                        <div className="flex flex-wrap gap-1">
                          {entry.triggers.map((trigger, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.notes && (
                      <p className="text-gray-700 mb-2 text-sm">{entry.notes}</p>
                    )}

                    {entry.victories && (
                      <div className="flex items-start gap-2 bg-emerald-50 p-2 rounded">
                        <Trophy className="w-4 h-4 text-emerald-600 mt-0.5" />
                        <p className="text-sm text-emerald-700 font-medium">{entry.victories}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Evolução Tab */}
        {activeTab === "evolution" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Sua Evolução</h2>
              <p className="text-blue-100">
                Visualize seu progresso e identifique padrões
              </p>
            </div>

            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border-blue-100 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Smile className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Humor Médio</p>
                    <p className="text-3xl font-bold text-gray-900">{avgMood.toFixed(1)}/5</p>
                  </div>
                </div>
                <Progress value={(avgMood / 5) * 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-2">
                  {avgMood >= 4 ? "Excelente!" : avgMood >= 3 ? "Bom progresso" : "Continue firme!"}
                </p>
              </Card>

              <Card className="p-6 border-blue-100 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <TrendingDown className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vontade Média</p>
                    <p className="text-3xl font-bold text-gray-900">{avgCraving.toFixed(1)}/10</p>
                  </div>
                </div>
                <Progress value={(avgCraving / 10) * 100} className="h-2 bg-orange-200" />
                <p className="text-xs text-gray-500 mt-2">
                  {avgCraving <= 3 ? "Muito bem!" : avgCraving <= 6 ? "Progredindo" : "Use as ferramentas de apoio"}
                </p>
              </Card>

              <Card className="p-6 border-blue-100 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Flame className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Streak de Diário</p>
                    <p className="text-3xl font-bold text-gray-900">{diaryStreak}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {diaryStreak >= 7 ? "Incrível consistência!" : "Continue registrando diariamente"}
                </p>
              </Card>
            </div>

            {/* Gráfico de Humor (Simulado com barras) */}
            <Card className="p-6 border-blue-100 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Evolução do Humor (Últimos 5 dias)
              </h3>
              <div className="space-y-3">
                {diaryEntries.slice(0, 5).reverse().map((entry, idx) => (
                  <div key={entry.id} className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 w-24">
                      {entry.date.toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' })}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-end pr-2"
                          style={{ width: `${(entry.mood / 5) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">{entry.mood}/5</span>
                        </div>
                        {getMoodIcon(entry.mood)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Gráfico de Vontade (Simulado com barras) */}
            <Card className="p-6 border-blue-100 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-orange-600" />
                Intensidade da Vontade (Últimos 5 dias)
              </h3>
              <div className="space-y-3">
                {diaryEntries.slice(0, 5).reverse().map((entry) => (
                  <div key={entry.id} className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 w-24">
                      {entry.date.toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' })}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className={`h-8 rounded-lg flex items-center justify-end pr-2 ${
                            entry.cravingLevel <= 3 
                              ? "bg-gradient-to-r from-green-400 to-green-600"
                              : entry.cravingLevel <= 6
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-red-400 to-red-600"
                          }`}
                          style={{ width: `${(entry.cravingLevel / 10) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">{entry.cravingLevel}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Gatilhos */}
            <Card className="p-6 border-blue-100 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Gatilhos Mais Comuns
              </h3>
              {topTriggers.length > 0 ? (
                <div className="space-y-3">
                  {topTriggers.map(([trigger, count], idx) => (
                    <div key={trigger} className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-32">
                        <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                        <span className="text-sm font-medium text-gray-700">{trigger}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-8 rounded-lg bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-end pr-2"
                            style={{ width: `${(count / Math.max(...topTriggers.map(t => t[1]))) * 100}%` }}
                          >
                            <span className="text-white text-xs font-bold">{count}x</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Nenhum gatilho registrado ainda. Continue usando o diário!
                </p>
              )}
            </Card>

            {/* Insights */}
            <Card className="p-6 border-blue-100 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Insights da Sua Jornada
              </h3>
              <div className="space-y-3">
                {avgMood >= 4 && (
                  <div className="flex items-start gap-3 p-3 bg-emerald-100 rounded-lg">
                    <Smile className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <p className="text-sm text-emerald-800">
                      Seu humor está excelente! Continue assim, você está no caminho certo.
                    </p>
                  </div>
                )}
                {avgCraving <= 4 && (
                  <div className="flex items-start gap-3 p-3 bg-green-100 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-green-800">
                      A intensidade da vontade está diminuindo. Isso é um ótimo sinal de progresso!
                    </p>
                  </div>
                )}
                {topTriggers.length > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-orange-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <p className="text-sm text-orange-800">
                      Seu principal gatilho é <strong>{topTriggers[0][0]}</strong>. 
                      Tente criar estratégias específicas para lidar com essa situação.
                    </p>
                  </div>
                )}
                {diaryStreak >= 7 && (
                  <div className="flex items-start gap-3 p-3 bg-purple-100 rounded-lg">
                    <Flame className="w-5 h-5 text-purple-600 mt-0.5" />
                    <p className="text-sm text-purple-800">
                      Parabéns! Você manteve um registro consistente. Isso mostra comprometimento com sua jornada.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Derrote seu Desejo Tab */}
        {activeTab === "craving" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Derrote seu Desejo</h2>
              <p className="text-red-100">
                Ferramentas práticas para superar a vontade de fumar
              </p>
            </div>

            {/* Tabs */}
            <Card className="p-4 border-emerald-100">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={cravingTab === "tip" ? "default" : "outline"}
                  onClick={() => setCravingTab("tip")}
                  className={cravingTab === "tip" ? "bg-emerald-500" : ""}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Dica do Dia
                </Button>
                <Button
                  variant={cravingTab === "hotline" ? "default" : "outline"}
                  onClick={() => setCravingTab("hotline")}
                  className={cravingTab === "hotline" ? "bg-emerald-500" : ""}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Linhas de Parar de Fumar
                </Button>
                <Button
                  variant={cravingTab === "breathing" ? "default" : "outline"}
                  onClick={() => setCravingTab("breathing")}
                  className={cravingTab === "breathing" ? "bg-emerald-500" : ""}
                >
                  <Wind className="w-4 h-4 mr-2" />
                  Respiração Calma
                </Button>
              </div>
            </Card>

            {/* Dica do Dia */}
            {cravingTab === "tip" && (
              <Card className="p-8 border-emerald-100 shadow-lg">
                <div className="text-center max-w-2xl mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Dica do Dia</h3>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    {currentTip}
                  </p>
                  <Button 
                    className="bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => setActiveTab("community")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Ir para Comunidade
                  </Button>
                </div>
              </Card>
            )}

            {/* Linhas de Parar de Fumar */}
            {cravingTab === "hotline" && (
              <div className="space-y-6">
                <Card className="p-8 border-emerald-100 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-blue-100 rounded-xl">
                      <Phone className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">Disque Saúde</h3>
                      <p className="text-gray-600 mb-4">
                        Linha nacional gratuita para parar de fumar. Atendimento 24 horas.
                      </p>
                      <a 
                        href="tel:08006119997" 
                        className="inline-flex items-center gap-2 text-3xl font-bold text-blue-600 hover:text-blue-700"
                      >
                        <Phone className="w-8 h-8" />
                        0800 61 1997
                      </a>
                      <p className="text-sm text-gray-500 mt-2">Ligação gratuita</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-emerald-100 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-green-100 rounded-xl">
                      <ExternalLink className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">Ministério da Saúde</h3>
                      <p className="text-gray-600 mb-4">
                        Acesse informações completas e recursos para parar de fumar.
                      </p>
                      <a 
                        href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/t/tabagismo" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg font-semibold text-green-600 hover:text-green-700 hover:underline"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Visitar site do Ministério da Saúde
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Respiração Calma */}
            {cravingTab === "breathing" && (
              <Card className="p-8 border-emerald-100 shadow-lg">
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Respiração Calma</h3>
                  <p className="text-gray-600 mb-8">
                    Siga o círculo: inspire quando ele cresce, segure quando para, expire quando diminui.
                  </p>

                  {/* Círculo de Respiração Animado */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-64 h-64 flex items-center justify-center">
                      <div 
                        className="absolute rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 transition-all duration-100 flex items-center justify-center"
                        style={{
                          width: `${getBreathingScale() * 200}px`,
                          height: `${getBreathingScale() * 200}px`,
                        }}
                      >
                        <div className="text-white font-bold text-2xl">
                          {breathingActive ? getBreathingText() : "Pronto"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Controles */}
                  <div className="space-y-4">
                    <Button
                      size="lg"
                      onClick={toggleBreathing}
                      className={`w-full max-w-xs ${breathingActive ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"}`}
                    >
                      {breathingActive ? (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          Parar
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Iniciar
                        </>
                      )}
                    </Button>

                    {breathingActive && (
                      <div className="text-sm text-gray-600">
                        <p className="font-semibold mb-2">Ciclo de respiração:</p>
                        <p>• Inspire: 4 segundos</p>
                        <p>• Segure: 2.5 segundos</p>
                        <p>• Expire: 4 segundos</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Health Tab */}
        {activeTab === "health" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Sua Recuperação</h2>
              <p className="text-emerald-100">
                Acompanhe os benefícios à saúde conquistados
              </p>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progresso de Saúde</span>
                  <span>{achievedMilestones} de {healthMilestones.length} marcos</span>
                </div>
                <Progress 
                  value={(achievedMilestones / healthMilestones.length) * 100} 
                  className="h-3 bg-emerald-300"
                />
              </div>
            </div>

            {/* Todos os marcos de saúde */}
            <div className="space-y-4">
              {healthMilestones.map((milestone, index) => (
                <Card 
                  key={index} 
                  className={`p-6 border-2 transition-all ${
                    milestone.achieved 
                      ? "border-emerald-500 bg-emerald-50 shadow-lg" 
                      : "border-gray-200 bg-white opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      milestone.achieved 
                        ? `bg-white ${milestone.color}` 
                        : "bg-gray-200 text-gray-400"
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge 
                          variant={milestone.achieved ? "default" : "outline"}
                          className={milestone.achieved ? "bg-emerald-500" : ""}
                        >
                          {milestone.time}
                        </Badge>
                        {milestone.achieved && (
                          <Badge className="bg-green-500">
                            ✓ Conquistado
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-bold text-lg mb-1">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Suas Conquistas</h2>
              <p className="text-emerald-100 mb-6">
                Celebre cada vitória na sua jornada
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-5xl font-bold">{achievedCount}</p>
                  <p className="text-emerald-100">de {totalAchievements} conquistas</p>
                </div>
                <div className="text-right">
                  <Progress 
                    value={(achievedCount / totalAchievements) * 100} 
                    className="h-3 bg-emerald-300 w-48"
                  />
                  <p className="text-sm text-emerald-100 mt-2">
                    {Math.round((achievedCount / totalAchievements) * 100)}% completo
                  </p>
                </div>
              </div>
            </div>

            {/* Filtros */}
            <Card className="p-4 border-emerald-100">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={achievementFilter === "all" ? "default" : "outline"}
                  onClick={() => setAchievementFilter("all")}
                  className={achievementFilter === "all" ? "bg-emerald-500" : ""}
                  size="sm"
                >
                  Todas ({totalAchievements})
                </Button>
                <Button
                  variant={achievementFilter === "time" ? "default" : "outline"}
                  onClick={() => setAchievementFilter("time")}
                  className={achievementFilter === "time" ? "bg-emerald-500" : ""}
                  size="sm"
                >
                  Tempo ({achievements.filter(a => a.category === "time").length})
                </Button>
                <Button
                  variant={achievementFilter === "life" ? "default" : "outline"}
                  onClick={() => setAchievementFilter("life")}
                  className={achievementFilter === "life" ? "bg-emerald-500" : ""}
                  size="sm"
                >
                  Vida Recuperada ({achievements.filter(a => a.category === "life").length})
                </Button>
                <Button
                  variant={achievementFilter === "cigarettes" ? "default" : "outline"}
                  onClick={() => setAchievementFilter("cigarettes")}
                  className={achievementFilter === "cigarettes" ? "bg-emerald-500" : ""}
                  size="sm"
                >
                  Cigarros ({achievements.filter(a => a.category === "cigarettes").length})
                </Button>
                <Button
                  variant={achievementFilter === "money" ? "default" : "outline"}
                  onClick={() => setAchievementFilter("money")}
                  className={achievementFilter === "money" ? "bg-emerald-500" : ""}
                  size="sm"
                >
                  Dinheiro ({achievements.filter(a => a.category === "money").length})
                </Button>
                <Button
                  variant={achievementFilter === "health" ? "default" : "outline"}
                  onClick={() => setAchievementFilter("health")}
                  className={achievementFilter === "health" ? "bg-emerald-500" : ""}
                  size="sm"
                >
                  Saúde ({achievements.filter(a => a.category === "health").length})
                </Button>
                <Button
                  variant={achievementFilter === "special" ? "default" : "outline"}
                  onClick={() => setAchievementFilter("special")}
                  className={achievementFilter === "special" ? "bg-emerald-500" : ""}
                  size="sm"
                >
                  Especiais ({achievements.filter(a => a.category === "special").length})
                </Button>
                <Button
                  variant={achievementFilter === "social" ? "default" : "outline"}
                  onClick={() => setAchievementFilter("social")}
                  className={achievementFilter === "social" ? "bg-emerald-500" : ""}
                  size="sm"
                >
                  Sociais ({achievements.filter(a => a.category === "social").length})
                </Button>
              </div>
            </Card>

            {/* Grid de conquistas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className={`p-6 border-2 transition-all ${
                    achievement.achieved 
                      ? "border-emerald-500 bg-emerald-50 shadow-lg" 
                      : "border-gray-200 bg-white opacity-60"
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      achievement.achieved ? achievement.color : "bg-gray-300"
                    }`}>
                      <div className="text-white">
                        {achievement.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    {achievement.achieved ? (
                      <div className="space-y-2">
                        <Badge className="bg-emerald-500">✓ Conquistado!</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => handleShareAchievement(achievement)}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Compartilhar
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress 
                          value={(achievement.currentValue / achievement.requirement) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500">
                          {achievement.currentValue.toFixed(0)} / {achievement.requirement} {achievement.unit}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === "community" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Comunidade</h2>
              <p className="text-emerald-100">
                Compartilhe sua jornada e inspire outras pessoas
              </p>
            </div>

            {/* Criar Post */}
            <Card className="p-6 border-emerald-100 shadow-lg">
              <div className="flex gap-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold">
                  VC
                </Avatar>
                <div className="flex-1">
                  <textarea
                    placeholder="Compartilhe sua experiência, conquistas ou peça apoio..."
                    className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                      <Share2 className="w-4 h-4 mr-2" />
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts da Comunidade */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="p-6 border-emerald-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex gap-4">
                    <Avatar className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold">
                      {post.avatar}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900">{post.author}</h4>
                        <Badge className="bg-emerald-100 text-emerald-700">
                          {post.daysClean} dias limpo
                        </Badge>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                      </div>
                      
                      {post.achievement && (
                        <div className={`flex items-center gap-2 mb-3 p-3 rounded-lg ${post.achievement.color} text-white`}>
                          {post.achievement.icon}
                          <span className="font-semibold">Conquistou: {post.achievement.title}</span>
                        </div>
                      )}
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                          <Share2 className="w-4 h-4 mr-2" />
                          Compartilhar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Estatísticas da Comunidade */}
            <Card className="p-6 border-emerald-100 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Juntos Somos Mais Fortes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-600">12,547</p>
                  <p className="text-sm text-gray-600">Membros ativos</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-600">2.3M</p>
                  <p className="text-sm text-gray-600">Cigarros evitados</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-600">R$ 1.8M</p>
                  <p className="text-sm text-gray-600">Economizados juntos</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Friends Tab */}
        {activeTab === "friends" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Amigos</h2>
              <p className="text-emerald-100">
                Conecte-se com pessoas na mesma jornada
              </p>
            </div>

            {/* Solicitações de Amizade */}
            {friendRequests.length > 0 && (
              <Card className="p-6 border-emerald-100 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-600" />
                  Solicitações de Amizade ({friendRequests.length})
                </h3>
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold">
                          {request.avatar}
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-gray-900">{request.from}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="outline" className="text-xs">
                              {request.daysClean} dias limpo
                            </Badge>
                            <span>• {request.mutualFriends} amigos em comum</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{request.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-emerald-500 hover:bg-emerald-600"
                          onClick={() => handleAcceptFriend(request.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Aceitar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectFriend(request.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Recusar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Lista de Amigos */}
            <Card className="p-6 border-emerald-100 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Meus Amigos ({friends.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold">
                          {friend.avatar}
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          friend.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{friend.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {friend.daysClean} dias limpo
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Mensagem
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Sugestões de Amizade */}
            <Card className="p-6 border-emerald-100 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Pessoas que você pode conhecer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-bold">
                      LR
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-gray-900">Lucas Rodrigues</h4>
                      <Badge variant="outline" className="text-xs">
                        234 dias limpo
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                    <UserPlus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white font-bold">
                      BS
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-gray-900">Beatriz Santos</h4>
                      <Badge variant="outline" className="text-xs">
                        67 dias limpo
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                    <UserPlus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Editar Meu Perfil</h2>
              <p className="text-emerald-100">
                Personalize suas informações e configurações de privacidade
              </p>
            </div>

            <Card className="p-8 border-emerald-100 shadow-lg max-w-2xl mx-auto">
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-3xl">
                      {userProfile.name.substring(0, 2).toUpperCase()}
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-emerald-500 hover:bg-emerald-600"
                    >
                      <UserCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-semibold">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    placeholder="Seu nome"
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                {/* Local */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-700 font-semibold">
                    Local
                  </Label>
                  <Input
                    id="location"
                    value={userProfile.location}
                    onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                    placeholder="Cidade, Estado"
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                {/* Sobre mim */}
                <div className="space-y-2">
                  <Label htmlFor="about" className="text-gray-700 font-semibold">
                    Sobre mim
                  </Label>
                  <Textarea
                    id="about"
                    value={userProfile.about}
                    onChange={(e) => setUserProfile({...userProfile, about: e.target.value})}
                    placeholder="Conte um pouco sobre você e sua jornada..."
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 min-h-[100px]"
                  />
                </div>

                {/* Visibilidade do Progresso */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <Label className="text-gray-700 font-semibold text-base">
                    Visibilidade do Progresso Geral
                  </Label>
                  
                  <div className="space-y-3">
                    {/* Público */}
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        userProfile.visibility === "public" 
                          ? "border-emerald-500 bg-emerald-50" 
                          : "border-gray-200 hover:border-emerald-300"
                      }`}
                      onClick={() => setUserProfile({...userProfile, visibility: "public"})}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="visibility"
                          checked={userProfile.visibility === "public"}
                          onChange={() => setUserProfile({...userProfile, visibility: "public"})}
                          className="mt-1 text-emerald-500 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Público</p>
                          <p className="text-sm text-gray-600">
                            Qualquer pessoa pode ver seu progresso e conquistas
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Amigos */}
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        userProfile.visibility === "friends" 
                          ? "border-emerald-500 bg-emerald-50" 
                          : "border-gray-200 hover:border-emerald-300"
                      }`}
                      onClick={() => setUserProfile({...userProfile, visibility: "friends"})}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="visibility"
                          checked={userProfile.visibility === "friends"}
                          onChange={() => setUserProfile({...userProfile, visibility: "friends"})}
                          className="mt-1 text-emerald-500 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Apenas Amigos</p>
                          <p className="text-sm text-gray-600">
                            Somente pessoas que você segue podem ver seu progresso
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Privado */}
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        userProfile.visibility === "private" 
                          ? "border-emerald-500 bg-emerald-50" 
                          : "border-gray-200 hover:border-emerald-300"
                      }`}
                      onClick={() => setUserProfile({...userProfile, visibility: "private"})}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="visibility"
                          checked={userProfile.visibility === "private"}
                          onChange={() => setUserProfile({...userProfile, visibility: "private"})}
                          className="mt-1 text-emerald-500 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Privado</p>
                          <p className="text-sm text-gray-600">
                            Apenas você pode ver seu progresso e conquistas
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão Salvar */}
                <div className="pt-6">
                  <Button 
                    onClick={handleSaveProfile}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-lg font-semibold rounded-full"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-emerald-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Logo size={48} />
              <span className="font-semibold text-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                VamosJuntos!
              </span>
            </div>
            <p className="text-sm">Quit Smoking Together - Sua jornada para uma vida mais saudável</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
