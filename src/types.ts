export type PhStatus = 'saludable' | 'transicion' | 'alerta' | 'critico';

export interface PhColorLevel {
  id: string;
  phValue: number;
  colorHex: string;
  colorName: string;
  status: PhStatus;
  statusLabel: string;
  statusBadgeColor: string;
  textColor: string;
  biologicalMeaning: string;
  pantyVisualDescription: string;
  possibleCauses: string[];
  recommendations: string[];
  requiresDoctor: boolean;
}

export interface PhLog {
  id: string;
  timestamp: string;
  phValue: number;
  colorHex: string;
  colorName: string;
  cycleDay?: number;
  cyclePhase?: string;
  symptoms: string[];
  notes?: string;
  aiAnalysis?: string;
}

export interface MenstrualCycleData {
  lastPeriodStart: string; // YYYY-MM-DD
  cycleLengthDays: number; // e.g., 28
  periodDurationDays: number; // e.g., 5
  logs: CycleLog[];
}

export interface CycleLog {
  date: string;
  flow?: 'ninguno' | 'ligero' | 'moderado' | 'abundante';
  symptoms?: string[];
  mood?: string;
  temperature?: number;
}

export interface CommunityComment {
  id: string;
  author: string;
  isAnonymous: boolean;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  isAnonymous: boolean;
  avatar: string;
  timestamp: string;
  category: 'experiencia_panty' | 'salud_ph' | 'ciclo' | 'biotecnologia' | 'preguntas';
  title: string;
  content: string;
  likes: number;
  userLiked?: boolean;
  comments: CommunityComment[];
  verifiedBiotechReview?: string;
}

export interface ClinicLocation {
  id: string;
  name: string;
  type: 'publico' | 'privado' | 'urgencias' | 'especialidad';
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  schedule: string;
  emergency24h: boolean;
  services: string[];
  lat: number;
  lng: number;
  rating: number;
  reviewsCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickQuestions?: string[];
}
