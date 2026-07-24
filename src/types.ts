export type UnitType = 'offense' | 'defense' | 'special_teams' | 'net';

export interface GameData {
  id: string;
  season: number;
  week: number;
  date: string;
  opponent: string;
  opponentLogo: string;
  isHome: boolean;
  result: 'W' | 'L';
  arkansasScore: number;
  opponentScore: number;
  offenseEpaPerPlay: number;
  defenseEpaPerPlay: number; // lower (more negative) is better for defense
  specialTeamsEpaPerPlay: number;
  netEpaPerPlay: number;
  passEpaPerPlay: number;
  rushEpaPerPlay: number;
  offenseSuccessRate: number; // percentage (0-100)
  defenseSuccessRate: number; // percentage allowed (0-100)
  explosivePlayRate: number; // % of plays gaining >20 pass / >12 rush
  turnoverEpaMargin: number;
  notes?: string;
}

export interface SeasonData {
  season: number;
  record: string;
  headCoach: string;
  offensiveCoordinator: string;
  defensiveCoordinator: string;
  bowlGame?: string;
  bowlResult?: string;
  offenseEpaPerPlay: number;
  defenseEpaPerPlay: number; // negative is good allowed
  specialTeamsEpaPerPlay: number;
  netEpaPerPlay: number;
  passEpaPerPlay: number;
  rushEpaPerPlay: number;
  offenseSuccessRate: number;
  defenseSuccessRate: number;
  secRankOffenseEpa: number;
  secRankDefenseEpa: number;
  nationalRankNetEpa: number;
  totalPlays: number;
  passingYardsPerGame: number;
  rushingYardsPerGame: number;
  turnoverMargin: number;
  games: GameData[];
}

export interface EraSummary {
  eraName: string;
  headCoach: string;
  years: string;
  seasonsCount: number;
  totalGames: number;
  winLossRecord: string;
  winPercentage: number;
  avgOffenseEpa: number;
  avgDefenseEpa: number;
  avgSpecialTeamsEpa: number;
  avgNetEpa: number;
  highlightSeason: number;
  description: string;
}

export interface SituationalSplit {
  category: string; // e.g. "1st Down", "2nd Down", "3rd Down", "Red Zone", "Garbage Time Excluded"
  offenseEpa: number;
  defenseEpa: number;
  successRate: number;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
