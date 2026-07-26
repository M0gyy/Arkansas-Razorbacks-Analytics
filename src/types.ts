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
  overallGrade?: number;
  offenseGrade?: number;
  defenseGrade?: number;
  specialTeamsGrade?: number;
  dvoaTotalPct?: number;
  dvoaOffensePct?: number;
  dvoaDefensePct?: number;
  // Advanced Passing & Receiving Metrics
  cpoe?: number; // Completion Percentage Over Expected (+/- %)
  epaCpoeComposite?: number; // EPA + CPOE Composite score/index
  yardsPerRouteRun?: number; // YPRR for receivers/offense
  passerRatingClean?: number; // Passer rating with clean pocket
  passerRatingPressure?: number; // Passer rating under pass rush pressure
  airYardsPerAttempt?: number; // Average Depth of Target (aDOT) in yards
  totalAirYards?: number; // Total intended air yards
  pressureRateAllowed?: number; // % of offensive dropbacks resulting in QB pressure
  pressureRateGenerated?: number; // % of defensive dropbacks generating pressure
  passRushWinRate?: number; // Pass Rush Win Rate % (PRWR)
  runStopWinRate?: number; // Run Stop Win Rate % (RSWR)
  passBlockWinRate?: number; // Pass Block Win Rate % (PBWR)
  receiverSeparation?: number; // Receiver Separation at catch point (yards)
  targetSeparation?: number; // Target Separation when targeted (yards)
  burnRate?: number; // Coverage Burn Rate %
  coverageEpaPerPlay?: number; // Coverage EPA Per Play Allowed
  ryoePerCarry?: number; // Rush Yards Over Expected Per Carry
  totalRyoe?: number; // Total Rush Yards Over Expected
  yardsAfterContactPerAttempt?: number; // Yards After Contact Per Attempt
  coverageDisruptionRate?: number; // Coverage Disruption & Forced Incompleteness Rate %
  interceptionsCount?: number; // Total Interceptions
  passBreakupsCount?: number; // Total Pass Breakups (PBUs)
  // Traditional Game Statistics
  passingYards?: number;
  rushingYards?: number;
  totalYards?: number;
  oppPassingYards?: number;
  oppRushingYards?: number;
  oppTotalYards?: number;
  firstDowns?: number;
  oppFirstDowns?: number;
  thirdDowns?: string;
  oppThirdDowns?: string;
  fourthDowns?: string;
  turnoversGiven?: number;
  turnoversTaken?: number;
  penaltiesYards?: string;
  timeOfPossession?: string;
  sacksRecorded?: number;
  sacksAllowed?: number;
  completionCount?: number;
  attemptCount?: number;
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
  overallGrade?: number; // Overall Team Grade (0-100)
  offenseGrade?: number; // Offense Grade (0-100)
  defenseGrade?: number; // Defense Grade (0-100)
  specialTeamsGrade?: number; // Special Teams Grade (0-100)
  passBlockingGrade?: number; // Pass Blocking Grade (0-100)
  runBlockingGrade?: number; // Run Blocking Grade (0-100)
  coverageGrade?: number; // Coverage Grade (0-100)
  passRushGrade?: number; // Pass Rush Grade (0-100)
  dvoaTotalPct?: number; // Total DVOA % relative to FBS average
  dvoaOffensePct?: number; // Offense DVOA %
  dvoaDefensePct?: number; // Defense DVOA % (negative is better for defense)
  dvoaSpecialTeamsPct?: number; // Special Teams DVOA %
  dvoaNationalRank?: number; // National DVOA Rank (e.g. #14)
  // Advanced Passing, Receiving & Defense Metrics
  cpoe?: number; // Completion Percentage Over Expected (+/- %)
  epaCpoeComposite?: number; // EPA + CPOE Composite Index/Score
  yardsPerRouteRun?: number; // Yards Per Route Run (YPRR) for team's top receivers
  passerRatingClean?: number; // Clean Pocket Passer Rating
  passerRatingPressure?: number; // Under Pressure Passer Rating
  airYardsPerAttempt?: number; // Average Depth of Target (aDOT) in yards
  totalAirYards?: number; // Total intended air yards
  pressureRateAllowed?: number; // % of offensive dropbacks resulting in QB pressure
  pressureRateGenerated?: number; // % of defensive dropbacks generating pressure
  passRushWinRate?: number; // Pass Rush Win Rate % (PRWR)
  runStopWinRate?: number; // Run Stop Win Rate % (RSWR)
  passBlockWinRate?: number; // Pass Block Win Rate % (PBWR)
  receiverSeparation?: number; // Receiver Separation at catch point (yards)
  targetSeparation?: number; // Target Separation when targeted (yards)
  burnRate?: number; // Coverage Burn Rate %
  coverageEpaPerPlay?: number; // Coverage EPA Per Play Allowed
  ryoePerCarry?: number; // Rush Yards Over Expected Per Carry
  totalRyoe?: number; // Total Rush Yards Over Expected
  yardsAfterContactPerAttempt?: number; // Yards After Contact Per Attempt
  coverageDisruptionRate?: number; // Coverage Disruption & Forced Incompleteness Rate %
  interceptionsCount?: number; // Total Interceptions
  passBreakupsCount?: number; // Total Pass Breakups (PBUs)
  // Traditional Season Statistics
  pointsPerGame?: number;
  defensivePointsPerGame?: number;
  totalYardsPerGame?: number;
  defensiveTotalYardsPerGame?: number;
  oppPassingYardsPerGame?: number;
  oppRushingYardsPerGame?: number;
  yardsPerPlay?: number;
  oppYardsPerPlay?: number;
  thirdDownConvPct?: number;
  oppThirdDownConvPct?: number;
  fourthDownConvPct?: number;
  redZoneTdPct?: number;
  sacksPerGame?: number;
  sacksAllowedPerGame?: number;
  turnoversLostPerGame?: number;
  turnoversGainedPerGame?: number;
  timeOfPossession?: string;
  completionPct?: number;
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
  avgOverallGrade?: number;
  avgOffenseGrade?: number;
  avgDefenseGrade?: number;
  avgDvoaTotalPct?: number;
  avgDvoaOffensePct?: number;
  avgDvoaDefensePct?: number;
  avgPPG?: number;
  avgOppPPG?: number;
  avgTotalYPG?: number;
  avgOppTotalYPG?: number;
  avgYardsPerPlay?: number;
  avgThirdDownPct?: number;
  avgSacksPerGame?: number;
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
  cpoe?: number; // CPOE (+/- %)
  epaCpoeComposite?: number; // EPA + CPOE Composite Index
  yardsPerRouteRun?: number; // YPRR for receivers/TEs
  passerRatingClean?: number; // Clean Pocket Passer Rating for QBs
  passerRatingPressure?: number; // Under Pressure Passer Rating for QBs
  airYardsPerAttempt?: number; // Average Depth of Target (aDOT) in yards
  totalAirYards?: number; // Total Intended Air Yards
  pressureRate?: number; // Pressure Rate % (allowed for QB / generated for pass rusher)
  passRushWinRate?: number; // Pass Rush Win Rate % (PRWR)
  runStopWinRate?: number; // Run Stop Win Rate % (RSWR)
  passBlockWinRate?: number; // Pass Block Win Rate % (PBWR)
  receiverSeparation?: number; // Receiver Separation (yards)
  targetSeparation?: number; // Target Separation (yards)
  burnRate?: number; // Burn Rate %
  coverageEpaPerPlay?: number; // Coverage EPA Allowed
  ryoePerCarry?: number; // RYOE / Carry
  yardsAfterContactPerAttempt?: number; // Yards After Contact / Attempt
  coverageDisruptionRate?: number; // Coverage Disruption & Forced Incompleteness Rate %
  interceptionsCount?: number; // Total Interceptions
  passBreakupsCount?: number; // Total Pass Breakups (PBUs)
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
