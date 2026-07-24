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
  stuffRate: number; // % of rushing plays stopped at or behind LOS (lower is better for offense)
  opportunityRate: number; // % of rushing plays gaining >= 4 yards (higher is better for offense)
  defensiveStuffRate: number; // % of opponent rushing plays stuffed at/behind LOS (higher is better)
  defensiveOpportunityRate: number; // % of opponent rushing plays gaining >= 4 yards allowed (lower is better)
  pffOverallGrade?: number;
  pffOffenseGrade?: number;
  pffDefenseGrade?: number;
  pffSpecialTeamsGrade?: number;
  dvoaTotalPct?: number;
  dvoaOffensePct?: number;
  dvoaDefensePct?: number;
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
  stuffRate: number; // % of rush carries stopped at or behind LOS
  opportunityRate: number; // % of rush carries gaining >= 4 yards
  defensiveStuffRate: number; // % of opponent carries stuffed
  defensiveOpportunityRate: number; // % of opponent carries gaining >= 4 yards allowed
  pointsPerDrive?: number; // Offensive points per drive
  defensivePointsPerDrive?: number; // Points allowed per opponent drive
  availableYardsPct?: number; // % of available field position yards gained
  defensiveAvailableYardsPct?: number; // % of available yards allowed to opponents
  explosivePlayPct?: number; // % of plays resulting in explosive gains (>20 pass / >12 rush)
  defensiveExplosivePlayPct?: number; // % of opponent plays resulting in explosive gains
  recruitingRankNational?: number; // Consensus national recruiting class rank (e.g. 22)
  recruitingRankSec?: number; // Consensus SEC recruiting class rank (e.g. 10)
  aggressivenessIndex?: number; // 4th Down Aggressiveness Index (1.00 = FBS avg)
  fourthDownGoRate?: number; // % of 4th & short/go-situations attempted
  fourthDownSuccessRate?: number; // % converted on 4th down attempts
  pffOverallGrade?: number; // Overall PFF Team Grade (0-100)
  pffOffenseGrade?: number; // Offense PFF Grade (0-100)
  pffDefenseGrade?: number; // Defense PFF Grade (0-100)
  pffSpecialTeamsGrade?: number; // Special Teams PFF Grade (0-100)
  pffPassBlockingGrade?: number; // Pass Blocking PFF Grade (0-100)
  pffRunBlockingGrade?: number; // Run Blocking PFF Grade (0-100)
  pffCoverageGrade?: number; // Coverage PFF Grade (0-100)
  pffPassRushGrade?: number; // Pass Rush PFF Grade (0-100)
  dvoaTotalPct?: number; // Total DVOA % relative to FBS average
  dvoaOffensePct?: number; // Offense DVOA %
  dvoaDefensePct?: number; // Defense DVOA % (negative is better for defense)
  dvoaSpecialTeamsPct?: number; // Special Teams DVOA %
  dvoaNationalRank?: number; // National DVOA Rank (e.g. #14)
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
  avgOffensePPD: number;
  avgDefensePPD: number;
  avgOffenseAYPct: number;
  avgDefenseAYPct: number;
  avgExplosivePlayPct: number;
  avgDefensiveExplosivePlayPct: number;
  aggressivenessIndex?: number;
  fourthDownGoRate?: number;
  fourthDownSuccessRate?: number;
  avgPffOverallGrade?: number;
  avgPffOffenseGrade?: number;
  avgPffDefenseGrade?: number;
  avgDvoaTotalPct?: number;
  avgDvoaOffensePct?: number;
  avgDvoaDefensePct?: number;
  highlightSeason: number;
  description: string;
}

export interface SituationalSplit {
  category: string; // e.g. "1st Down", "2nd Down", "3rd Down", "Red Zone", "Garbage Time Excluded"
  offenseEpa: number;
  defenseEpa: number;
  successRate: number;
  stuffRate?: number;
  opportunityRate?: number;
}

export interface FieldZoneData {
  id: string;
  name: string;
  depthLabel: string;
  widthLabel: 'Left' | 'Middle' | 'Right' | 'All Width';
  epaPerPlay: number;
  successRate: number;
  playSharePercent: number;
  playCount: number;
  notes?: string;
}

export interface PlayerEpaLeader {
  id: string;
  name: string;
  number: string;
  position: string;
  phase: 'offense' | 'defense' | 'special_teams';
  season: number | 'ALL';
  seasonLabel: string;
  epaPerPlay: number;
  totalPlays: number;
  successRate: number; // e.g. 52.4% for offense, 68.1% stop rate for defense, 84.5% FG/efficiency for ST
  keyStat: string;
  bestGame: string;
  highlights: string[];
  headshotUrl?: string;
  fieldZones?: FieldZoneData[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
