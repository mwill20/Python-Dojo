export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Challenge {
  id: number;
  // Metadata
  title: string;
  difficulty: DifficultyLevel;
  order: number;
  
  // Drill Content
  description: string;
  stub: string;
  
  // Deep Learning / Educational Card
  conceptTitle: string;       // (A) The Python Concept
  conceptExplanation: string; // (A) Explanation
  securityContext: string;    // (B) The 'Why' (Agent Security)
  codeBreakdown: string;      // (C) The 'How' (The Code)
  
  // Retro Hook
  prevChallengeId?: number;   // ID of the concept to recall before starting this one
  prevConceptTitle?: string;  // Title of the concept to recall
}

export enum GradingStatus {
  IDLE = 'IDLE',
  GRADING = 'GRADING',
  PASS = 'PASS',
  FAIL = 'FAIL',
  ERROR = 'ERROR'
}

export interface FeedbackData {
  status: GradingStatus;
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type AppPhase = 'RETRO' | 'LEARN' | 'DRILL';
