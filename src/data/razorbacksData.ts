import { SeasonData, EraSummary, SituationalSplit } from '../types';

const SEASON_RUSH_ANALYTICS: Record<number, { stuffRate: number; opportunityRate: number; defensiveStuffRate: number; defensiveOpportunityRate: number; pointsPerDrive: number; defensivePointsPerDrive: number; availableYardsPct: number; defensiveAvailableYardsPct: number; explosivePlayPct: number; defensiveExplosivePlayPct: number; aggressivenessIndex: number; fourthDownGoRate: number; fourthDownSuccessRate: number }> = {
  2014: { stuffRate: 15.2, opportunityRate: 51.4, defensiveStuffRate: 20.8, defensiveOpportunityRate: 41.5, pointsPerDrive: 2.18, defensivePointsPerDrive: 1.54, availableYardsPct: 48.5, defensiveAvailableYardsPct: 38.2, explosivePlayPct: 11.2, defensiveExplosivePlayPct: 8.8, aggressivenessIndex: 0.92, fourthDownGoRate: 42.0, fourthDownSuccessRate: 54.5 },
  2015: { stuffRate: 14.1, opportunityRate: 54.8, defensiveStuffRate: 17.5, defensiveOpportunityRate: 45.2, pointsPerDrive: 2.85, defensivePointsPerDrive: 2.38, availableYardsPct: 56.8, defensiveAvailableYardsPct: 47.1, explosivePlayPct: 14.8, defensiveExplosivePlayPct: 12.4, aggressivenessIndex: 0.98, fourthDownGoRate: 45.5, fourthDownSuccessRate: 61.5 },
  2016: { stuffRate: 17.8, opportunityRate: 47.5, defensiveStuffRate: 14.2, defensiveOpportunityRate: 50.1, pointsPerDrive: 2.25, defensivePointsPerDrive: 2.58, availableYardsPct: 49.2, defensiveAvailableYardsPct: 51.0, explosivePlayPct: 12.1, defensiveExplosivePlayPct: 13.2, aggressivenessIndex: 0.94, fourthDownGoRate: 44.0, fourthDownSuccessRate: 50.0 },
  2017: { stuffRate: 19.5, opportunityRate: 42.8, defensiveStuffRate: 13.8, defensiveOpportunityRate: 52.4, pointsPerDrive: 1.88, defensivePointsPerDrive: 2.74, availableYardsPct: 42.1, defensiveAvailableYardsPct: 53.8, explosivePlayPct: 10.4, defensiveExplosivePlayPct: 14.1, aggressivenessIndex: 0.91, fourthDownGoRate: 43.0, fourthDownSuccessRate: 43.0 },
  2018: { stuffRate: 22.4, opportunityRate: 38.1, defensiveStuffRate: 12.5, defensiveOpportunityRate: 54.0, pointsPerDrive: 1.42, defensivePointsPerDrive: 2.82, availableYardsPct: 36.5, defensiveAvailableYardsPct: 54.2, explosivePlayPct: 8.9, defensiveExplosivePlayPct: 14.8, aggressivenessIndex: 1.08, fourthDownGoRate: 50.0, fourthDownSuccessRate: 37.5 },
  2019: { stuffRate: 23.8, opportunityRate: 36.5, defensiveStuffRate: 11.2, defensiveOpportunityRate: 55.8, pointsPerDrive: 1.28, defensivePointsPerDrive: 2.95, availableYardsPct: 34.2, defensiveAvailableYardsPct: 56.5, explosivePlayPct: 7.8, defensiveExplosivePlayPct: 15.6, aggressivenessIndex: 1.02, fourthDownGoRate: 46.0, fourthDownSuccessRate: 39.5 },
  2020: { stuffRate: 18.2, opportunityRate: 46.2, defensiveStuffRate: 16.5, defensiveOpportunityRate: 47.5, pointsPerDrive: 2.05, defensivePointsPerDrive: 2.35, availableYardsPct: 45.8, defensiveAvailableYardsPct: 48.0, explosivePlayPct: 11.8, defensiveExplosivePlayPct: 11.5, aggressivenessIndex: 1.22, fourthDownGoRate: 58.0, fourthDownSuccessRate: 55.0 },
  2021: { stuffRate: 13.8, opportunityRate: 53.6, defensiveStuffRate: 19.4, defensiveOpportunityRate: 42.8, pointsPerDrive: 2.68, defensivePointsPerDrive: 1.85, availableYardsPct: 54.5, defensiveAvailableYardsPct: 42.1, explosivePlayPct: 14.2, defensiveExplosivePlayPct: 9.6, aggressivenessIndex: 1.35, fourthDownGoRate: 68.0, fourthDownSuccessRate: 65.2 },
  2022: { stuffRate: 14.5, opportunityRate: 52.1, defensiveStuffRate: 18.2, defensiveOpportunityRate: 44.1, pointsPerDrive: 2.52, defensivePointsPerDrive: 2.24, availableYardsPct: 52.8, defensiveAvailableYardsPct: 45.8, explosivePlayPct: 13.9, defensiveExplosivePlayPct: 11.8, aggressivenessIndex: 1.38, fourthDownGoRate: 70.0, fourthDownSuccessRate: 62.0 },
  2023: { stuffRate: 21.6, opportunityRate: 39.8, defensiveStuffRate: 15.8, defensiveOpportunityRate: 48.9, pointsPerDrive: 1.82, defensivePointsPerDrive: 2.12, availableYardsPct: 41.5, defensiveAvailableYardsPct: 44.2, explosivePlayPct: 10.1, defensiveExplosivePlayPct: 10.5, aggressivenessIndex: 1.10, fourthDownGoRate: 52.0, fourthDownSuccessRate: 46.0 },
  2024: { stuffRate: 15.6, opportunityRate: 50.2, defensiveStuffRate: 18.5, defensiveOpportunityRate: 43.5, pointsPerDrive: 2.58, defensivePointsPerDrive: 1.98, availableYardsPct: 53.2, defensiveAvailableYardsPct: 42.8, explosivePlayPct: 13.8, defensiveExplosivePlayPct: 9.8, aggressivenessIndex: 1.25, fourthDownGoRate: 62.0, fourthDownSuccessRate: 58.0 },
  2025: { stuffRate: 22.8, opportunityRate: 37.2, defensiveStuffRate: 12.5, defensiveOpportunityRate: 51.5, pointsPerDrive: 1.45, defensivePointsPerDrive: 2.85, availableYardsPct: 35.8, defensiveAvailableYardsPct: 53.5, explosivePlayPct: 8.2, defensiveExplosivePlayPct: 14.2, aggressivenessIndex: 1.18, fourthDownGoRate: 56.0, fourthDownSuccessRate: 42.0 },
};

const SEASON_ADV_GRADES_DVOA: Record<number, {
  overallGrade: number;
  offenseGrade: number;
  defenseGrade: number;
  specialTeamsGrade: number;
  passBlockingGrade: number;
  runBlockingGrade: number;
  coverageGrade: number;
  passRushGrade: number;
  dvoaTotalPct: number;
  dvoaOffensePct: number;
  dvoaDefensePct: number;
  dvoaSpecialTeamsPct: number;
  dvoaNationalRank: number;
}> = {
  2014: { overallGrade: 85.8, offenseGrade: 79.2, defenseGrade: 88.5, specialTeamsGrade: 76.2, passBlockingGrade: 82.0, runBlockingGrade: 84.5, coverageGrade: 87.2, passRushGrade: 85.0, dvoaTotalPct: 14.8, dvoaOffensePct: 10.2, dvoaDefensePct: -12.5, dvoaSpecialTeamsPct: 1.2, dvoaNationalRank: 18 },
  2015: { overallGrade: 88.2, offenseGrade: 89.4, defenseGrade: 75.8, specialTeamsGrade: 74.0, passBlockingGrade: 86.5, runBlockingGrade: 88.0, coverageGrade: 71.5, passRushGrade: 78.0, dvoaTotalPct: 19.5, dvoaOffensePct: 24.8, dvoaDefensePct: 2.1, dvoaSpecialTeamsPct: -1.5, dvoaNationalRank: 12 },
  2016: { overallGrade: 77.4, offenseGrade: 78.1, defenseGrade: 72.5, specialTeamsGrade: 72.8, passBlockingGrade: 74.0, runBlockingGrade: 77.5, coverageGrade: 70.8, passRushGrade: 73.2, dvoaTotalPct: 4.2, dvoaOffensePct: 8.5, dvoaDefensePct: 4.5, dvoaSpecialTeamsPct: 0.2, dvoaNationalRank: 45 },
  2017: { overallGrade: 68.5, offenseGrade: 70.2, defenseGrade: 64.8, specialTeamsGrade: 69.5, passBlockingGrade: 66.5, runBlockingGrade: 69.0, coverageGrade: 62.1, passRushGrade: 65.0, dvoaTotalPct: -9.8, dvoaOffensePct: -2.4, dvoaDefensePct: 10.5, dvoaSpecialTeamsPct: -1.8, dvoaNationalRank: 78 },
  2018: { overallGrade: 58.2, offenseGrade: 59.8, defenseGrade: 57.5, specialTeamsGrade: 64.0, passBlockingGrade: 55.0, runBlockingGrade: 58.2, coverageGrade: 56.0, passRushGrade: 58.0, dvoaTotalPct: -22.5, dvoaOffensePct: -18.2, dvoaDefensePct: 12.8, dvoaSpecialTeamsPct: -2.5, dvoaNationalRank: 104 },
  2019: { overallGrade: 55.4, offenseGrade: 56.2, defenseGrade: 55.1, specialTeamsGrade: 62.5, passBlockingGrade: 52.5, runBlockingGrade: 55.0, coverageGrade: 53.5, passRushGrade: 56.0, dvoaTotalPct: -26.8, dvoaOffensePct: -21.5, dvoaDefensePct: 14.2, dvoaSpecialTeamsPct: -3.1, dvoaNationalRank: 112 },
  2020: { overallGrade: 74.2, offenseGrade: 73.8, defenseGrade: 72.4, specialTeamsGrade: 71.0, passBlockingGrade: 71.0, runBlockingGrade: 74.2, coverageGrade: 72.0, passRushGrade: 71.5, dvoaTotalPct: 2.1, dvoaOffensePct: 3.5, dvoaDefensePct: 3.8, dvoaSpecialTeamsPct: 1.0, dvoaNationalRank: 52 },
  2021: { overallGrade: 89.1, offenseGrade: 87.5, defenseGrade: 84.2, specialTeamsGrade: 78.5, passBlockingGrade: 81.5, runBlockingGrade: 88.5, coverageGrade: 83.5, passRushGrade: 82.0, dvoaTotalPct: 22.4, dvoaOffensePct: 21.2, dvoaDefensePct: -8.5, dvoaSpecialTeamsPct: 2.8, dvoaNationalRank: 14 },
  2022: { overallGrade: 81.5, offenseGrade: 83.2, defenseGrade: 76.5, specialTeamsGrade: 75.2, passBlockingGrade: 78.0, runBlockingGrade: 84.0, coverageGrade: 72.5, passRushGrade: 79.5, dvoaTotalPct: 11.2, dvoaOffensePct: 16.8, dvoaDefensePct: 4.2, dvoaSpecialTeamsPct: 0.8, dvoaNationalRank: 31 },
  2023: { overallGrade: 69.8, offenseGrade: 67.2, defenseGrade: 78.4, specialTeamsGrade: 72.0, passBlockingGrade: 58.5, runBlockingGrade: 66.0, coverageGrade: 79.0, passRushGrade: 76.8, dvoaTotalPct: -6.4, dvoaOffensePct: -8.8, dvoaDefensePct: -1.2, dvoaSpecialTeamsPct: 0.5, dvoaNationalRank: 72 },
  2024: { overallGrade: 83.8, offenseGrade: 85.1, defenseGrade: 79.8, specialTeamsGrade: 76.0, passBlockingGrade: 79.0, runBlockingGrade: 83.5, coverageGrade: 78.5, passRushGrade: 80.2, dvoaTotalPct: 15.2, dvoaOffensePct: 18.5, dvoaDefensePct: -5.2, dvoaSpecialTeamsPct: 1.8, dvoaNationalRank: 24 },
  2025: { overallGrade: 57.8, offenseGrade: 58.5, defenseGrade: 56.4, specialTeamsGrade: 63.2, passBlockingGrade: 54.0, runBlockingGrade: 57.0, coverageGrade: 55.0, passRushGrade: 56.5, dvoaTotalPct: -24.1, dvoaOffensePct: -19.8, dvoaDefensePct: 13.5, dvoaSpecialTeamsPct: -2.2, dvoaNationalRank: 108 },
};

const SEASON_ADVANCED_PASSING_RECEIVING: Record<number, {
  cpoe: number;
  epaCpoeComposite: number;
  yardsPerRouteRun: number;
  passerRatingClean: number;
  passerRatingPressure: number;
  airYardsPerAttempt: number;
  totalAirYards: number;
  pressureRateAllowed: number;
  pressureRateGenerated: number;
  passRushWinRate: number;
  runStopWinRate: number;
  passBlockWinRate: number;
  receiverSeparation: number;
  targetSeparation: number;
  burnRate: number;
  coverageEpaPerPlay: number;
  ryoePerCarry: number;
  yardsAfterContactPerAttempt: number;
  coverageDisruptionRate: number;
  interceptionsCount: number;
  passBreakupsCount: number;
}> = {
  2014: { cpoe: 1.8, epaCpoeComposite: 0.145, yardsPerRouteRun: 2.15, passerRatingClean: 132.4, passerRatingPressure: 84.2, airYardsPerAttempt: 8.8, totalAirYards: 2420, pressureRateAllowed: 28.5, pressureRateGenerated: 38.2, passRushWinRate: 41.5, runStopWinRate: 36.2, passBlockWinRate: 74.5, receiverSeparation: 3.10, targetSeparation: 2.70, burnRate: 7.2, coverageEpaPerPlay: -0.115, ryoePerCarry: 0.65, yardsAfterContactPerAttempt: 3.82, coverageDisruptionRate: 12.8, interceptionsCount: 12, passBreakupsCount: 48 },
  2015: { cpoe: 6.5, epaCpoeComposite: 0.228, yardsPerRouteRun: 2.85, passerRatingClean: 168.2, passerRatingPressure: 112.5, airYardsPerAttempt: 9.6, totalAirYards: 3310, pressureRateAllowed: 24.2, pressureRateGenerated: 34.0, passRushWinRate: 38.0, runStopWinRate: 38.5, passBlockWinRate: 78.2, receiverSeparation: 3.65, targetSeparation: 3.15, burnRate: 6.5, coverageEpaPerPlay: -0.045, ryoePerCarry: 1.12, yardsAfterContactPerAttempt: 4.15, coverageDisruptionRate: 11.2, interceptionsCount: 13, passBreakupsCount: 42 },
  2016: { cpoe: 3.2, epaCpoeComposite: 0.162, yardsPerRouteRun: 2.32, passerRatingClean: 148.5, passerRatingPressure: 88.0, airYardsPerAttempt: 9.2, totalAirYards: 2980, pressureRateAllowed: 31.0, pressureRateGenerated: 32.5, passRushWinRate: 36.2, runStopWinRate: 32.0, passBlockWinRate: 71.0, receiverSeparation: 3.25, targetSeparation: 2.80, burnRate: 8.4, coverageEpaPerPlay: -0.020, ryoePerCarry: 0.48, yardsAfterContactPerAttempt: 3.42, coverageDisruptionRate: 10.5, interceptionsCount: 10, passBreakupsCount: 38 },
  2017: { cpoe: -1.2, epaCpoeComposite: 0.048, yardsPerRouteRun: 1.85, passerRatingClean: 128.0, passerRatingPressure: 72.4, airYardsPerAttempt: 8.5, totalAirYards: 2340, pressureRateAllowed: 35.8, pressureRateGenerated: 28.4, passRushWinRate: 32.0, runStopWinRate: 28.5, passBlockWinRate: 65.2, receiverSeparation: 2.80, targetSeparation: 2.45, burnRate: 10.8, coverageEpaPerPlay: 0.085, ryoePerCarry: -0.15, yardsAfterContactPerAttempt: 2.95, coverageDisruptionRate: 9.2, interceptionsCount: 8, passBreakupsCount: 32 },
  2018: { cpoe: -4.8, epaCpoeComposite: -0.082, yardsPerRouteRun: 1.42, passerRatingClean: 112.5, passerRatingPressure: 58.2, airYardsPerAttempt: 7.9, totalAirYards: 2050, pressureRateAllowed: 39.5, pressureRateGenerated: 26.2, passRushWinRate: 29.5, runStopWinRate: 26.0, passBlockWinRate: 60.5, receiverSeparation: 2.45, targetSeparation: 2.15, burnRate: 12.5, coverageEpaPerPlay: 0.142, ryoePerCarry: -0.45, yardsAfterContactPerAttempt: 2.65, coverageDisruptionRate: 8.0, interceptionsCount: 5, passBreakupsCount: 28 },
  2019: { cpoe: -5.6, epaCpoeComposite: -0.115, yardsPerRouteRun: 1.38, passerRatingClean: 108.2, passerRatingPressure: 54.0, airYardsPerAttempt: 7.6, totalAirYards: 1980, pressureRateAllowed: 41.2, pressureRateGenerated: 25.0, passRushWinRate: 28.0, runStopWinRate: 24.5, passBlockWinRate: 58.0, receiverSeparation: 2.35, targetSeparation: 2.05, burnRate: 13.2, coverageEpaPerPlay: 0.165, ryoePerCarry: -0.58, yardsAfterContactPerAttempt: 2.58, coverageDisruptionRate: 7.5, interceptionsCount: 6, passBreakupsCount: 26 },
  2020: { cpoe: 5.1, epaCpoeComposite: 0.188, yardsPerRouteRun: 2.45, passerRatingClean: 152.0, passerRatingPressure: 98.6, airYardsPerAttempt: 9.4, totalAirYards: 2480, pressureRateAllowed: 30.5, pressureRateGenerated: 35.8, passRushWinRate: 39.0, runStopWinRate: 35.0, passBlockWinRate: 72.8, receiverSeparation: 3.40, targetSeparation: 2.95, burnRate: 7.8, coverageEpaPerPlay: -0.065, ryoePerCarry: 0.52, yardsAfterContactPerAttempt: 3.55, coverageDisruptionRate: 14.5, interceptionsCount: 13, passBreakupsCount: 52 },
  2021: { cpoe: 5.8, epaCpoeComposite: 0.245, yardsPerRouteRun: 3.12, passerRatingClean: 162.8, passerRatingPressure: 118.4, airYardsPerAttempt: 9.8, totalAirYards: 2780, pressureRateAllowed: 26.4, pressureRateGenerated: 39.2, passRushWinRate: 44.2, runStopWinRate: 39.8, passBlockWinRate: 79.5, receiverSeparation: 3.82, targetSeparation: 3.25, burnRate: 5.8, coverageEpaPerPlay: -0.128, ryoePerCarry: 1.25, yardsAfterContactPerAttempt: 4.28, coverageDisruptionRate: 15.2, interceptionsCount: 13, passBreakupsCount: 56 },
  2022: { cpoe: 4.2, epaCpoeComposite: 0.192, yardsPerRouteRun: 2.68, passerRatingClean: 154.2, passerRatingPressure: 102.1, airYardsPerAttempt: 9.2, totalAirYards: 2820, pressureRateAllowed: 28.8, pressureRateGenerated: 37.5, passRushWinRate: 42.0, runStopWinRate: 36.5, passBlockWinRate: 75.2, receiverSeparation: 3.50, targetSeparation: 3.05, burnRate: 7.2, coverageEpaPerPlay: -0.052, ryoePerCarry: 0.95, yardsAfterContactPerAttempt: 3.92, coverageDisruptionRate: 13.8, interceptionsCount: 11, passBreakupsCount: 49 },
  2023: { cpoe: -1.8, epaCpoeComposite: 0.022, yardsPerRouteRun: 1.72, passerRatingClean: 129.5, passerRatingPressure: 68.4, airYardsPerAttempt: 8.2, totalAirYards: 2120, pressureRateAllowed: 37.2, pressureRateGenerated: 33.0, passRushWinRate: 37.5, runStopWinRate: 34.2, passBlockWinRate: 63.5, receiverSeparation: 2.75, targetSeparation: 2.40, burnRate: 9.1, coverageEpaPerPlay: -0.038, ryoePerCarry: -0.12, yardsAfterContactPerAttempt: 3.05, coverageDisruptionRate: 12.0, interceptionsCount: 9, passBreakupsCount: 40 },
  2024: { cpoe: 2.8, epaCpoeComposite: 0.178, yardsPerRouteRun: 2.75, passerRatingClean: 158.4, passerRatingPressure: 96.8, airYardsPerAttempt: 9.5, totalAirYards: 3180, pressureRateAllowed: 27.5, pressureRateGenerated: 38.5, passRushWinRate: 43.0, runStopWinRate: 37.8, passBlockWinRate: 76.8, receiverSeparation: 3.45, targetSeparation: 2.98, burnRate: 6.8, coverageEpaPerPlay: -0.092, ryoePerCarry: 0.88, yardsAfterContactPerAttempt: 3.78, coverageDisruptionRate: 14.0, interceptionsCount: 12, passBreakupsCount: 50 },
  2025: { cpoe: -4.2, epaCpoeComposite: -0.095, yardsPerRouteRun: 1.48, passerRatingClean: 115.0, passerRatingPressure: 61.2, airYardsPerAttempt: 7.8, totalAirYards: 2010, pressureRateAllowed: 38.8, pressureRateGenerated: 27.0, passRushWinRate: 30.2, runStopWinRate: 25.5, passBlockWinRate: 61.2, receiverSeparation: 2.40, targetSeparation: 2.10, burnRate: 12.8, coverageEpaPerPlay: 0.125, ryoePerCarry: -0.52, yardsAfterContactPerAttempt: 2.68, coverageDisruptionRate: 8.8, interceptionsCount: 6, passBreakupsCount: 30 },
};

const SEASON_TRADITIONAL_STATS: Record<number, {
  pointsPerGame: number;
  defensivePointsPerGame: number;
  totalYardsPerGame: number;
  defensiveTotalYardsPerGame: number;
  oppPassingYardsPerGame: number;
  oppRushingYardsPerGame: number;
  yardsPerPlay: number;
  oppYardsPerPlay: number;
  thirdDownConvPct: number;
  oppThirdDownConvPct: number;
  fourthDownConvPct: number;
  redZoneTdPct: number;
  sacksPerGame: number;
  sacksAllowedPerGame: number;
  turnoversLostPerGame: number;
  turnoversGainedPerGame: number;
  timeOfPossession: string;
  completionPct: number;
}> = {
  2014: { pointsPerGame: 31.9, defensivePointsPerGame: 19.2, totalYardsPerGame: 406.8, defensiveTotalYardsPerGame: 323.0, oppPassingYardsPerGame: 167.5, oppRushingYardsPerGame: 155.5, yardsPerPlay: 5.82, oppYardsPerPlay: 4.88, thirdDownConvPct: 44.8, oppThirdDownConvPct: 36.2, fourthDownConvPct: 54.5, redZoneTdPct: 68.5, sacksPerGame: 2.15, sacksAllowedPerGame: 1.08, turnoversLostPerGame: 1.15, turnoversGainedPerGame: 1.54, timeOfPossession: '33:42', completionPct: 56.4 },
  2015: { pointsPerGame: 35.9, defensivePointsPerGame: 27.4, totalYardsPerGame: 465.5, defensiveTotalYardsPerGame: 392.8, oppPassingYardsPerGame: 275.2, oppRushingYardsPerGame: 117.6, yardsPerPlay: 6.84, oppYardsPerPlay: 5.75, thirdDownConvPct: 50.2, oppThirdDownConvPct: 42.5, fourthDownConvPct: 61.5, redZoneTdPct: 74.2, sacksPerGame: 1.62, sacksAllowedPerGame: 1.08, turnoversLostPerGame: 0.92, turnoversGainedPerGame: 1.15, timeOfPossession: '34:18', completionPct: 65.8 },
  2016: { pointsPerGame: 30.3, defensivePointsPerGame: 31.1, totalYardsPerGame: 428.4, defensiveTotalYardsPerGame: 426.2, oppPassingYardsPerGame: 220.8, oppRushingYardsPerGame: 205.4, yardsPerPlay: 6.22, oppYardsPerPlay: 6.55, thirdDownConvPct: 42.5, oppThirdDownConvPct: 45.1, fourthDownConvPct: 50.0, redZoneTdPct: 65.0, sacksPerGame: 1.92, sacksAllowedPerGame: 2.69, turnoversLostPerGame: 1.62, turnoversGainedPerGame: 1.08, timeOfPossession: '32:55', completionPct: 61.2 },
  2017: { pointsPerGame: 28.8, defensivePointsPerGame: 36.2, totalYardsPerGame: 373.2, defensiveTotalYardsPerGame: 438.5, oppPassingYardsPerGame: 232.0, oppRushingYardsPerGame: 206.5, yardsPerPlay: 5.58, oppYardsPerPlay: 6.28, thirdDownConvPct: 38.6, oppThirdDownConvPct: 46.8, fourthDownConvPct: 43.0, redZoneTdPct: 60.5, sacksPerGame: 1.58, sacksAllowedPerGame: 2.92, turnoversLostPerGame: 1.50, turnoversGainedPerGame: 1.17, timeOfPossession: '31:20', completionPct: 57.5 },
  2018: { pointsPerGame: 21.7, defensivePointsPerGame: 34.8, totalYardsPerGame: 335.7, defensiveTotalYardsPerGame: 413.2, oppPassingYardsPerGame: 232.5, oppRushingYardsPerGame: 180.7, yardsPerPlay: 5.12, oppYardsPerPlay: 6.10, thirdDownConvPct: 32.4, oppThirdDownConvPct: 44.5, fourthDownConvPct: 37.5, redZoneTdPct: 52.0, sacksPerGame: 2.17, sacksAllowedPerGame: 2.83, turnoversLostPerGame: 2.17, turnoversGainedPerGame: 1.25, timeOfPossession: '29:45', completionPct: 54.8 },
  2019: { pointsPerGame: 21.4, defensivePointsPerGame: 36.8, totalYardsPerGame: 340.1, defensiveTotalYardsPerGame: 450.7, oppPassingYardsPerGame: 229.2, oppRushingYardsPerGame: 221.5, yardsPerPlay: 5.08, oppYardsPerPlay: 6.42, thirdDownConvPct: 31.8, oppThirdDownConvPct: 45.8, fourthDownConvPct: 39.5, redZoneTdPct: 50.0, sacksPerGame: 1.75, sacksAllowedPerGame: 3.17, turnoversLostPerGame: 1.83, turnoversGainedPerGame: 1.17, timeOfPossession: '28:30', completionPct: 52.5 },
  2020: { pointsPerGame: 25.7, defensivePointsPerGame: 34.9, totalYardsPerGame: 391.5, defensiveTotalYardsPerGame: 451.7, oppPassingYardsPerGame: 259.6, oppRushingYardsPerGame: 192.1, yardsPerPlay: 5.65, oppYardsPerPlay: 5.95, thirdDownConvPct: 34.2, oppThirdDownConvPct: 41.8, fourthDownConvPct: 55.0, redZoneTdPct: 62.0, sacksPerGame: 2.40, sacksAllowedPerGame: 3.40, turnoversLostPerGame: 1.50, turnoversGainedPerGame: 1.80, timeOfPossession: '26:40', completionPct: 62.0 },
  2021: { pointsPerGame: 30.9, defensivePointsPerGame: 22.9, totalYardsPerGame: 441.7, defensiveTotalYardsPerGame: 367.6, oppPassingYardsPerGame: 213.8, oppRushingYardsPerGame: 153.8, yardsPerPlay: 6.38, oppYardsPerPlay: 5.35, thirdDownConvPct: 42.1, oppThirdDownConvPct: 33.1, fourthDownConvPct: 65.2, redZoneTdPct: 69.5, sacksPerGame: 1.92, sacksAllowedPerGame: 2.31, turnoversLostPerGame: 0.85, turnoversGainedPerGame: 1.23, timeOfPossession: '31:12', completionPct: 65.2 },
  2022: { pointsPerGame: 32.5, defensivePointsPerGame: 30.6, totalYardsPerGame: 471.4, defensiveTotalYardsPerGame: 465.2, oppPassingYardsPerGame: 294.7, oppRushingYardsPerGame: 170.5, yardsPerPlay: 6.42, oppYardsPerPlay: 6.22, thirdDownConvPct: 45.2, oppThirdDownConvPct: 42.8, fourthDownConvPct: 62.0, redZoneTdPct: 67.8, sacksPerGame: 3.23, sacksAllowedPerGame: 2.38, turnoversLostPerGame: 1.38, turnoversGainedPerGame: 1.38, timeOfPossession: '30:05', completionPct: 67.5 },
  2023: { pointsPerGame: 26.6, defensivePointsPerGame: 27.9, totalYardsPerGame: 326.5, defensiveTotalYardsPerGame: 357.2, oppPassingYardsPerGame: 202.8, oppRushingYardsPerGame: 154.4, yardsPerPlay: 5.15, oppYardsPerPlay: 5.48, thirdDownConvPct: 37.8, oppThirdDownConvPct: 38.5, fourthDownConvPct: 46.0, redZoneTdPct: 58.2, sacksPerGame: 2.42, sacksAllowedPerGame: 3.92, turnoversLostPerGame: 1.50, turnoversGainedPerGame: 1.42, timeOfPossession: '31:45', completionPct: 64.0 },
  2024: { pointsPerGame: 31.8, defensivePointsPerGame: 24.2, totalYardsPerGame: 452.4, defensiveTotalYardsPerGame: 362.5, oppPassingYardsPerGame: 218.4, oppRushingYardsPerGame: 144.1, yardsPerPlay: 6.55, oppYardsPerPlay: 5.32, thirdDownConvPct: 46.5, oppThirdDownConvPct: 37.2, fourthDownConvPct: 58.0, redZoneTdPct: 71.0, sacksPerGame: 2.50, sacksAllowedPerGame: 2.17, turnoversLostPerGame: 1.25, turnoversGainedPerGame: 1.58, timeOfPossession: '32:10', completionPct: 66.8 },
  2025: { pointsPerGame: 20.2, defensivePointsPerGame: 30.5, totalYardsPerGame: 330.5, defensiveTotalYardsPerGame: 412.0, oppPassingYardsPerGame: 235.0, oppRushingYardsPerGame: 177.0, yardsPerPlay: 5.10, oppYardsPerPlay: 6.05, thirdDownConvPct: 34.5, oppThirdDownConvPct: 45.2, fourthDownConvPct: 42.0, redZoneTdPct: 52.5, sacksPerGame: 1.83, sacksAllowedPerGame: 3.25, turnoversLostPerGame: 1.83, turnoversGainedPerGame: 1.17, timeOfPossession: '29:15', completionPct: 58.0 },
};

const RAW_RAZORBACKS_SEASONS: any[] = [
  {
    season: 2014,
    record: '7-6',
    headCoach: 'Bret Bielema',
    offensiveCoordinator: 'Jim Chaney',
    defensiveCoordinator: 'Robb Smith',
    bowlGame: 'Texas Bowl',
    bowlResult: 'W 31-7 vs Texas',
    offenseEpaPerPlay: 0.082,
    defenseEpaPerPlay: -0.115,
    specialTeamsEpaPerPlay: 0.012,
    netEpaPerPlay: 0.209,
    passEpaPerPlay: 0.065,
    rushEpaPerPlay: 0.098,
    offenseSuccessRate: 44.8,
    defenseSuccessRate: 36.2,
    secRankOffenseEpa: 6,
    secRankDefenseEpa: 3,
    nationalRankNetEpa: 22,
    recruitingRankNational: 28,
    recruitingRankSec: 11,
    totalPlays: 942,
    passingYardsPerGame: 188.8,
    rushingYardsPerGame: 218.0,
    turnoverMargin: 5,
    games: [
      { id: '2014-1', season: 2014, week: 1, date: 'Aug 30', opponent: 'Auburn', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 21, opponentScore: 45, offenseEpaPerPlay: -0.04, defenseEpaPerPlay: 0.28, specialTeamsEpaPerPlay: -0.08, netEpaPerPlay: -0.40, passEpaPerPlay: -0.12, rushEpaPerPlay: 0.03, offenseSuccessRate: 38.5, defenseSuccessRate: 52.0, explosivePlayRate: 8.2, turnoverEpaMargin: -4.2 },
      { id: '2014-2', season: 2014, week: 2, date: 'Sep 6', opponent: 'Nicholls State', opponentLogo: '⚔️', isHome: true, result: 'W', arkansasScore: 73, opponentScore: 7, offenseEpaPerPlay: 0.62, defenseEpaPerPlay: -0.38, specialTeamsEpaPerPlay: 0.12, netEpaPerPlay: 1.12, passEpaPerPlay: 0.71, rushEpaPerPlay: 0.55, offenseSuccessRate: 64.0, defenseSuccessRate: 22.0, explosivePlayRate: 21.5, turnoverEpaMargin: 8.5 },
      { id: '2014-3', season: 2014, week: 3, date: 'Sep 13', opponent: 'Texas Tech', opponentLogo: '🔫', isHome: false, result: 'W', arkansasScore: 49, opponentScore: 28, offenseEpaPerPlay: 0.38, defenseEpaPerPlay: 0.02, specialTeamsEpaPerPlay: 0.05, netEpaPerPlay: 0.41, passEpaPerPlay: 0.22, rushEpaPerPlay: 0.46, offenseSuccessRate: 56.2, defenseSuccessRate: 41.5, explosivePlayRate: 15.8, turnoverEpaMargin: 3.1 },
      { id: '2014-4', season: 2014, week: 4, date: 'Sep 20', opponent: 'Northern Illinois', opponentLogo: '🐺', isHome: true, result: 'W', arkansasScore: 52, opponentScore: 14, offenseEpaPerPlay: 0.32, defenseEpaPerPlay: -0.21, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.55, passEpaPerPlay: 0.35, rushEpaPerPlay: 0.29, offenseSuccessRate: 51.0, defenseSuccessRate: 31.0, explosivePlayRate: 13.0, turnoverEpaMargin: 5.0 },
      { id: '2014-5', season: 2014, week: 5, date: 'Sep 27', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 28, opponentScore: 35, offenseEpaPerPlay: 0.12, defenseEpaPerPlay: 0.18, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.10, passEpaPerPlay: 0.08, rushEpaPerPlay: 0.15, offenseSuccessRate: 46.0, defenseSuccessRate: 48.0, explosivePlayRate: 11.2, turnoverEpaMargin: -2.1 },
      { id: '2014-6', season: 2014, week: 7, date: 'Oct 11', opponent: 'Alabama', opponentLogo: '🐘', isHome: true, result: 'L', arkansasScore: 13, opponentScore: 14, offenseEpaPerPlay: -0.02, defenseEpaPerPlay: -0.08, specialTeamsEpaPerPlay: -0.15, netEpaPerPlay: -0.09, passEpaPerPlay: -0.10, rushEpaPerPlay: 0.04, offenseSuccessRate: 39.0, defenseSuccessRate: 35.0, explosivePlayRate: 6.5, turnoverEpaMargin: -3.8 },
      { id: '2014-7', season: 2014, week: 8, date: 'Oct 18', opponent: 'Georgia', opponentLogo: '🐶', isHome: true, result: 'L', arkansasScore: 32, opponentScore: 45, offenseEpaPerPlay: 0.08, defenseEpaPerPlay: 0.24, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: -0.15, passEpaPerPlay: 0.14, rushEpaPerPlay: 0.03, offenseSuccessRate: 43.0, defenseSuccessRate: 50.0, explosivePlayRate: 10.1, turnoverEpaMargin: -6.2 },
      { id: '2014-8', season: 2014, week: 9, date: 'Oct 25', opponent: 'UAB', opponentLogo: '🐉', isHome: true, result: 'W', arkansasScore: 45, opponentScore: 17, offenseEpaPerPlay: 0.28, defenseEpaPerPlay: -0.14, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.45, passEpaPerPlay: 0.31, rushEpaPerPlay: 0.26, offenseSuccessRate: 52.0, defenseSuccessRate: 33.0, explosivePlayRate: 14.2, turnoverEpaMargin: 4.0 },
      { id: '2014-9', season: 2014, week: 10, date: 'Nov 1', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: false, result: 'L', arkansasScore: 10, opponentScore: 17, offenseEpaPerPlay: -0.08, defenseEpaPerPlay: -0.06, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.04, passEpaPerPlay: -0.15, rushEpaPerPlay: -0.01, offenseSuccessRate: 36.0, defenseSuccessRate: 37.0, explosivePlayRate: 5.5, turnoverEpaMargin: -1.5 },
      { id: '2014-10', season: 2014, week: 12, date: 'Nov 15', opponent: 'LSU', opponentLogo: '🐯', isHome: true, result: 'W', arkansasScore: 17, opponentScore: 0, offenseEpaPerPlay: 0.01, defenseEpaPerPlay: -0.32, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.37, passEpaPerPlay: -0.05, rushEpaPerPlay: 0.06, offenseSuccessRate: 41.0, defenseSuccessRate: 24.0, explosivePlayRate: 7.8, turnoverEpaMargin: 2.5 },
      { id: '2014-11', season: 2014, week: 13, date: 'Nov 22', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: true, result: 'W', arkansasScore: 30, opponentScore: 0, offenseEpaPerPlay: 0.11, defenseEpaPerPlay: -0.35, specialTeamsEpaPerPlay: 0.06, netEpaPerPlay: 0.52, passEpaPerPlay: 0.08, rushEpaPerPlay: 0.13, offenseSuccessRate: 44.0, defenseSuccessRate: 22.0, explosivePlayRate: 9.0, turnoverEpaMargin: 11.2 },
      { id: '2014-12', season: 2014, week: 14, date: 'Nov 28', opponent: 'Missouri', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 14, opponentScore: 21, offenseEpaPerPlay: -0.06, defenseEpaPerPlay: -0.02, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.09, passEpaPerPlay: -0.11, rushEpaPerPlay: -0.02, offenseSuccessRate: 37.0, defenseSuccessRate: 39.0, explosivePlayRate: 6.0, turnoverEpaMargin: -2.0 },
      { id: '2014-13', season: 2014, week: 15, date: 'Dec 29', opponent: 'Texas', opponentLogo: '🤘', isHome: false, result: 'W', arkansasScore: 31, opponentScore: 7, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: -0.42, specialTeamsEpaPerPlay: 0.05, netEpaPerPlay: 0.65, passEpaPerPlay: 0.15, rushEpaPerPlay: 0.20, offenseSuccessRate: 48.0, defenseSuccessRate: 18.0, explosivePlayRate: 12.0, turnoverEpaMargin: 7.8 }
    ]
  },
  {
    season: 2015,
    record: '8-5',
    headCoach: 'Bret Bielema',
    offensiveCoordinator: 'Dan Enos',
    defensiveCoordinator: 'Robb Smith',
    bowlGame: 'Liberty Bowl',
    bowlResult: 'W 45-23 vs Kansas State',
    offenseEpaPerPlay: 0.214,
    defenseEpaPerPlay: 0.045,
    specialTeamsEpaPerPlay: -0.008,
    netEpaPerPlay: 0.161,
    passEpaPerPlay: 0.285,
    rushEpaPerPlay: 0.142,
    offenseSuccessRate: 48.2,
    defenseSuccessRate: 43.5,
    secRankOffenseEpa: 2,
    secRankDefenseEpa: 11,
    nationalRankNetEpa: 28,
    recruitingRankNational: 22,
    recruitingRankSec: 10,
    totalPlays: 918,
    passingYardsPerGame: 268.2,
    rushingYardsPerGame: 197.3,
    turnoverMargin: 2,
    games: [
      { id: '2015-1', season: 2015, week: 1, date: 'Sep 5', opponent: 'UTEP', opponentLogo: '⛏️', isHome: true, result: 'W', arkansasScore: 48, opponentScore: 13, offenseEpaPerPlay: 0.45, defenseEpaPerPlay: -0.15, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.62, passEpaPerPlay: 0.58, rushEpaPerPlay: 0.32, offenseSuccessRate: 58.0, defenseSuccessRate: 31.0, explosivePlayRate: 18.2, turnoverEpaMargin: 4.1 },
      { id: '2015-2', season: 2015, week: 2, date: 'Sep 12', opponent: 'Toledo', opponentLogo: '🚀', isHome: true, result: 'L', arkansasScore: 12, opponentScore: 16, offenseEpaPerPlay: 0.02, defenseEpaPerPlay: -0.05, specialTeamsEpaPerPlay: -0.18, netEpaPerPlay: -0.11, passEpaPerPlay: 0.05, rushEpaPerPlay: -0.01, offenseSuccessRate: 42.0, defenseSuccessRate: 38.0, explosivePlayRate: 7.5, turnoverEpaMargin: -5.2 },
      { id: '2015-3', season: 2015, week: 3, date: 'Sep 19', opponent: 'Texas Tech', opponentLogo: '🔫', isHome: true, result: 'L', arkansasScore: 24, opponentScore: 35, offenseEpaPerPlay: 0.15, defenseEpaPerPlay: 0.28, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.15, passEpaPerPlay: 0.18, rushEpaPerPlay: 0.12, offenseSuccessRate: 45.0, defenseSuccessRate: 52.0, explosivePlayRate: 11.0, turnoverEpaMargin: -3.0 },
      { id: '2015-4', season: 2015, week: 4, date: 'Sep 26', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 21, opponentScore: 28, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: 0.22, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: -0.03, passEpaPerPlay: 0.22, rushEpaPerPlay: 0.14, offenseSuccessRate: 47.0, defenseSuccessRate: 49.0, explosivePlayRate: 12.5, turnoverEpaMargin: -1.2 },
      { id: '2015-5', season: 2015, week: 5, date: 'Oct 3', opponent: 'Tennessee', opponentLogo: '🍊', isHome: false, result: 'W', arkansasScore: 24, opponentScore: 20, offenseEpaPerPlay: 0.12, defenseEpaPerPlay: 0.02, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.14, passEpaPerPlay: 0.16, rushEpaPerPlay: 0.09, offenseSuccessRate: 44.0, defenseSuccessRate: 41.0, explosivePlayRate: 9.8, turnoverEpaMargin: 2.0 },
      { id: '2015-6', season: 2015, week: 6, date: 'Oct 10', opponent: 'Alabama', opponentLogo: '🐘', isHome: false, result: 'L', arkansasScore: 14, opponentScore: 27, offenseEpaPerPlay: -0.05, defenseEpaPerPlay: 0.12, specialTeamsEpaPerPlay: -0.08, netEpaPerPlay: -0.25, passEpaPerPlay: -0.02, rushEpaPerPlay: -0.09, offenseSuccessRate: 35.0, defenseSuccessRate: 45.0, explosivePlayRate: 5.0, turnoverEpaMargin: -5.1 },
      { id: '2015-7', season: 2015, week: 8, date: 'Oct 24', opponent: 'Auburn', opponentLogo: '🐯', isHome: true, result: 'W', arkansasScore: 54, opponentScore: 46, offenseEpaPerPlay: 0.35, defenseEpaPerPlay: 0.28, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.09, passEpaPerPlay: 0.41, rushEpaPerPlay: 0.29, offenseSuccessRate: 54.0, defenseSuccessRate: 50.0, explosivePlayRate: 16.0, turnoverEpaMargin: 1.5 },
      { id: '2015-8', season: 2015, week: 9, date: 'Oct 31', opponent: 'UT Martin', opponentLogo: '🦅', isHome: true, result: 'W', arkansasScore: 63, opponentScore: 28, offenseEpaPerPlay: 0.48, defenseEpaPerPlay: 0.08, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.43, passEpaPerPlay: 0.55, rushEpaPerPlay: 0.41, offenseSuccessRate: 60.0, defenseSuccessRate: 42.0, explosivePlayRate: 19.0, turnoverEpaMargin: 3.5 },
      { id: '2015-9', season: 2015, week: 10, date: 'Nov 7', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: false, result: 'W', arkansasScore: 53, opponentScore: 52, offenseEpaPerPlay: 0.42, defenseEpaPerPlay: 0.39, specialTeamsEpaPerPlay: 0.05, netEpaPerPlay: 0.08, passEpaPerPlay: 0.52, rushEpaPerPlay: 0.31, offenseSuccessRate: 57.0, defenseSuccessRate: 56.0, explosivePlayRate: 17.5, turnoverEpaMargin: 2.1 },
      { id: '2015-10', season: 2015, week: 11, date: 'Nov 14', opponent: 'LSU', opponentLogo: '🐯', isHome: false, result: 'W', arkansasScore: 31, opponentScore: 14, offenseEpaPerPlay: 0.25, defenseEpaPerPlay: -0.12, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: 0.38, passEpaPerPlay: 0.28, rushEpaPerPlay: 0.22, offenseSuccessRate: 49.0, defenseSuccessRate: 34.0, explosivePlayRate: 13.0, turnoverEpaMargin: 4.8 },
      { id: '2015-11', season: 2015, week: 12, date: 'Nov 21', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: true, result: 'L', arkansasScore: 50, opponentScore: 51, offenseEpaPerPlay: 0.39, defenseEpaPerPlay: 0.41, specialTeamsEpaPerPlay: -0.12, netEpaPerPlay: -0.14, passEpaPerPlay: 0.48, rushEpaPerPlay: 0.30, offenseSuccessRate: 55.0, defenseSuccessRate: 58.0, explosivePlayRate: 16.5, turnoverEpaMargin: -2.0 },
      { id: '2015-12', season: 2015, week: 13, date: 'Nov 27', opponent: 'Missouri', opponentLogo: '🐯', isHome: true, result: 'W', arkansasScore: 28, opponentScore: 3, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: -0.28, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.48, passEpaPerPlay: 0.21, rushEpaPerPlay: 0.15, offenseSuccessRate: 46.0, defenseSuccessRate: 26.0, explosivePlayRate: 10.5, turnoverEpaMargin: 5.0 },
      { id: '2015-13', season: 2015, week: 15, date: 'Jan 2', opponent: 'Kansas State', opponentLogo: '🌾', isHome: false, result: 'W', arkansasScore: 45, opponentScore: 23, offenseEpaPerPlay: 0.38, defenseEpaPerPlay: -0.05, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.47, passEpaPerPlay: 0.42, rushEpaPerPlay: 0.35, offenseSuccessRate: 56.0, defenseSuccessRate: 37.0, explosivePlayRate: 15.0, turnoverEpaMargin: 6.2 }
    ]
  },
  {
    season: 2016,
    record: '7-6',
    headCoach: 'Bret Bielema',
    offensiveCoordinator: 'Dan Enos',
    defensiveCoordinator: 'Robb Smith',
    bowlGame: 'Belk Bowl',
    bowlResult: 'L 24-35 vs Virginia Tech',
    offenseEpaPerPlay: 0.095,
    defenseEpaPerPlay: 0.128,
    specialTeamsEpaPerPlay: -0.015,
    netEpaPerPlay: -0.048,
    passEpaPerPlay: 0.142,
    rushEpaPerPlay: 0.048,
    offenseSuccessRate: 43.1,
    defenseSuccessRate: 47.8,
    secRankOffenseEpa: 5,
    secRankDefenseEpa: 13,
    nationalRankNetEpa: 64,
    recruitingRankNational: 23,
    recruitingRankSec: 10,
    totalPlays: 902,
    passingYardsPerGame: 264.2,
    rushingYardsPerGame: 164.2,
    turnoverMargin: -3,
    games: [
      { id: '2016-1', season: 2016, week: 1, date: 'Sep 3', opponent: 'Louisiana Tech', opponentLogo: '🐶', isHome: true, result: 'W', arkansasScore: 21, opponentScore: 20, offenseEpaPerPlay: 0.04, defenseEpaPerPlay: 0.01, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: 0.01, passEpaPerPlay: 0.11, rushEpaPerPlay: -0.03, offenseSuccessRate: 40.0, defenseSuccessRate: 41.0, explosivePlayRate: 8.0, turnoverEpaMargin: 0.5 },
      { id: '2016-2', season: 2016, week: 2, date: 'Sep 10', opponent: 'TCU', opponentLogo: '🐸', isHome: false, result: 'W', arkansasScore: 41, opponentScore: 38, offenseEpaPerPlay: 0.22, defenseEpaPerPlay: 0.18, specialTeamsEpaPerPlay: 0.08, netEpaPerPlay: 0.12, passEpaPerPlay: 0.28, rushEpaPerPlay: 0.16, offenseSuccessRate: 48.0, defenseSuccessRate: 47.0, explosivePlayRate: 13.5, turnoverEpaMargin: 2.1 },
      { id: '2016-3', season: 2016, week: 3, date: 'Sep 17', opponent: 'Texas State', opponentLogo: '🐱', isHome: true, result: 'W', arkansasScore: 42, opponentScore: 3, offenseEpaPerPlay: 0.35, defenseEpaPerPlay: -0.25, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: 0.61, passEpaPerPlay: 0.41, rushEpaPerPlay: 0.29, offenseSuccessRate: 53.0, defenseSuccessRate: 28.0, explosivePlayRate: 15.0, turnoverEpaMargin: 5.0 },
      { id: '2016-4', season: 2016, week: 4, date: 'Sep 24', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 24, opponentScore: 45, offenseEpaPerPlay: 0.12, defenseEpaPerPlay: 0.35, specialTeamsEpaPerPlay: -0.08, netEpaPerPlay: -0.31, passEpaPerPlay: 0.21, rushEpaPerPlay: 0.03, offenseSuccessRate: 44.0, defenseSuccessRate: 56.0, explosivePlayRate: 11.0, turnoverEpaMargin: -6.5 },
      { id: '2016-5', season: 2016, week: 5, date: 'Oct 1', opponent: 'Alcorn State', opponentLogo: '💜', isHome: true, result: 'W', arkansasScore: 52, opponentScore: 10, offenseEpaPerPlay: 0.41, defenseEpaPerPlay: -0.18, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.61, passEpaPerPlay: 0.48, rushEpaPerPlay: 0.34, offenseSuccessRate: 57.0, defenseSuccessRate: 32.0, explosivePlayRate: 17.0, turnoverEpaMargin: 4.5 },
      { id: '2016-6', season: 2016, week: 6, date: 'Oct 8', opponent: 'Alabama', opponentLogo: '🐘', isHome: true, result: 'L', arkansasScore: 30, opponentScore: 49, offenseEpaPerPlay: 0.05, defenseEpaPerPlay: 0.38, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.38, passEpaPerPlay: 0.15, rushEpaPerPlay: -0.05, offenseSuccessRate: 41.0, defenseSuccessRate: 58.0, explosivePlayRate: 9.5, turnoverEpaMargin: -8.0 },
      { id: '2016-7', season: 2016, week: 7, date: 'Oct 15', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: true, result: 'W', arkansasScore: 34, opponentScore: 30, offenseEpaPerPlay: 0.21, defenseEpaPerPlay: 0.15, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.08, passEpaPerPlay: 0.25, rushEpaPerPlay: 0.17, offenseSuccessRate: 49.0, defenseSuccessRate: 46.0, explosivePlayRate: 12.0, turnoverEpaMargin: 3.0 },
      { id: '2016-8', season: 2016, week: 8, date: 'Oct 22', opponent: 'Auburn', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 3, opponentScore: 56, offenseEpaPerPlay: -0.28, defenseEpaPerPlay: 0.52, specialTeamsEpaPerPlay: -0.06, netEpaPerPlay: -0.86, passEpaPerPlay: -0.22, rushEpaPerPlay: -0.34, offenseSuccessRate: 26.0, defenseSuccessRate: 68.0, explosivePlayRate: 2.1, turnoverEpaMargin: -10.2 },
      { id: '2016-9', season: 2016, week: 10, date: 'Nov 5', opponent: 'Florida', opponentLogo: '🐊', isHome: true, result: 'W', arkansasScore: 31, opponentScore: 10, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: -0.22, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.44, passEpaPerPlay: 0.22, rushEpaPerPlay: 0.14, offenseSuccessRate: 47.0, defenseSuccessRate: 29.0, explosivePlayRate: 11.5, turnoverEpaMargin: 6.0 },
      { id: '2016-10', season: 2016, week: 11, date: 'Nov 12', opponent: 'LSU', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 10, opponentScore: 38, offenseEpaPerPlay: -0.15, defenseEpaPerPlay: 0.32, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.51, passEpaPerPlay: -0.08, rushEpaPerPlay: -0.22, offenseSuccessRate: 32.0, defenseSuccessRate: 55.0, explosivePlayRate: 4.5, turnoverEpaMargin: -5.5 },
      { id: '2016-11', season: 2016, week: 12, date: 'Nov 19', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: false, result: 'W', arkansasScore: 58, opponentScore: 42, offenseEpaPerPlay: 0.42, defenseEpaPerPlay: 0.35, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: 0.08, passEpaPerPlay: 0.48, rushEpaPerPlay: 0.36, offenseSuccessRate: 58.0, defenseSuccessRate: 54.0, explosivePlayRate: 18.0, turnoverEpaMargin: 2.0 },
      { id: '2016-12', season: 2016, week: 13, date: 'Nov 25', opponent: 'Missouri', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 24, opponentScore: 28, offenseEpaPerPlay: 0.12, defenseEpaPerPlay: 0.19, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.09, passEpaPerPlay: 0.15, rushEpaPerPlay: 0.09, offenseSuccessRate: 45.0, defenseSuccessRate: 48.0, explosivePlayRate: 10.0, turnoverEpaMargin: -2.5 },
      { id: '2016-13', season: 2016, week: 15, date: 'Dec 29', opponent: 'Virginia Tech', opponentLogo: '🦃', isHome: false, result: 'L', arkansasScore: 24, opponentScore: 35, offenseEpaPerPlay: -0.02, defenseEpaPerPlay: 0.22, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.29, passEpaPerPlay: -0.08, rushEpaPerPlay: 0.04, offenseSuccessRate: 38.0, defenseSuccessRate: 50.0, explosivePlayRate: 7.0, turnoverEpaMargin: -7.0 }
    ]
  },
  {
    season: 2017,
    record: '4-8',
    headCoach: 'Bret Bielema',
    offensiveCoordinator: 'Dan Enos',
    defensiveCoordinator: 'Paul Rhoads',
    offenseEpaPerPlay: -0.021,
    defenseEpaPerPlay: 0.142,
    specialTeamsEpaPerPlay: -0.032,
    netEpaPerPlay: -0.195,
    passEpaPerPlay: 0.012,
    rushEpaPerPlay: -0.054,
    offenseSuccessRate: 39.5,
    defenseSuccessRate: 48.9,
    secRankOffenseEpa: 11,
    secRankDefenseEpa: 13,
    nationalRankNetEpa: 98,
    recruitingRankNational: 27,
    recruitingRankSec: 10,
    totalPlays: 846,
    passingYardsPerGame: 218.8,
    rushingYardsPerGame: 168.0,
    turnoverMargin: -5,
    games: [
      { id: '2017-1', season: 2017, week: 1, date: 'Aug 31', opponent: 'Florida A&M', opponentLogo: '🐍', isHome: true, result: 'W', arkansasScore: 49, opponentScore: 7, offenseEpaPerPlay: 0.38, defenseEpaPerPlay: -0.22, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.62, passEpaPerPlay: 0.42, rushEpaPerPlay: 0.34, offenseSuccessRate: 55.0, defenseSuccessRate: 29.0, explosivePlayRate: 15.0, turnoverEpaMargin: 4.0 },
      { id: '2017-2', season: 2017, week: 2, date: 'Sep 9', opponent: 'TCU', opponentLogo: '🐸', isHome: true, result: 'L', arkansasScore: 7, opponentScore: 28, offenseEpaPerPlay: -0.22, defenseEpaPerPlay: 0.15, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.42, passEpaPerPlay: -0.28, rushEpaPerPlay: -0.16, offenseSuccessRate: 29.0, defenseSuccessRate: 46.0, explosivePlayRate: 3.5, turnoverEpaMargin: -4.5 },
      { id: '2017-3', season: 2017, week: 4, date: 'Sep 23', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 43, opponentScore: 50, offenseEpaPerPlay: 0.28, defenseEpaPerPlay: 0.38, specialTeamsEpaPerPlay: -0.08, netEpaPerPlay: -0.18, passEpaPerPlay: 0.32, rushEpaPerPlay: 0.24, offenseSuccessRate: 52.0, defenseSuccessRate: 57.0, explosivePlayRate: 14.0, turnoverEpaMargin: -1.0 },
      { id: '2017-4', season: 2017, week: 5, date: 'Sep 30', opponent: 'New Mexico State', opponentLogo: '🤠', isHome: true, result: 'W', arkansasScore: 42, opponentScore: 24, offenseEpaPerPlay: 0.25, defenseEpaPerPlay: 0.08, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: 0.18, passEpaPerPlay: 0.31, rushEpaPerPlay: 0.19, offenseSuccessRate: 50.0, defenseSuccessRate: 42.0, explosivePlayRate: 12.0, turnoverEpaMargin: 2.0 },
      { id: '2017-5', season: 2017, week: 6, date: 'Oct 7', opponent: 'South Carolina', opponentLogo: '🐔', isHome: false, result: 'L', arkansasScore: 22, opponentScore: 48, offenseEpaPerPlay: -0.18, defenseEpaPerPlay: 0.28, specialTeamsEpaPerPlay: -0.06, netEpaPerPlay: -0.52, passEpaPerPlay: -0.22, rushEpaPerPlay: -0.14, offenseSuccessRate: 31.0, defenseSuccessRate: 52.0, explosivePlayRate: 4.0, turnoverEpaMargin: -9.5 },
      { id: '2017-6', season: 2017, week: 7, date: 'Oct 14', opponent: 'Alabama', opponentLogo: '🐘', isHome: false, result: 'L', arkansasScore: 9, opponentScore: 41, offenseEpaPerPlay: -0.25, defenseEpaPerPlay: 0.34, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.63, passEpaPerPlay: -0.28, rushEpaPerPlay: -0.22, offenseSuccessRate: 28.0, defenseSuccessRate: 55.0, explosivePlayRate: 3.0, turnoverEpaMargin: -6.0 },
      { id: '2017-7', season: 2017, week: 8, date: 'Oct 21', opponent: 'Auburn', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 20, opponentScore: 52, offenseEpaPerPlay: -0.12, defenseEpaPerPlay: 0.45, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.62, passEpaPerPlay: -0.08, rushEpaPerPlay: -0.16, offenseSuccessRate: 34.0, defenseSuccessRate: 62.0, explosivePlayRate: 5.5, turnoverEpaMargin: -4.0 },
      { id: '2017-8', season: 2017, week: 9, date: 'Oct 28', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: false, result: 'W', arkansasScore: 38, opponentScore: 37, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: 0.25, specialTeamsEpaPerPlay: 0.05, netEpaPerPlay: -0.02, passEpaPerPlay: 0.22, rushEpaPerPlay: 0.14, offenseSuccessRate: 48.0, defenseSuccessRate: 51.0, explosivePlayRate: 11.0, turnoverEpaMargin: 3.5 },
      { id: '2017-9', season: 2017, week: 10, date: 'Nov 4', opponent: 'Coastal Carolina', opponentLogo: '🦅', isHome: true, result: 'W', arkansasScore: 39, opponentScore: 38, offenseEpaPerPlay: 0.15, defenseEpaPerPlay: 0.22, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.09, passEpaPerPlay: 0.18, rushEpaPerPlay: 0.12, offenseSuccessRate: 46.0, defenseSuccessRate: 49.0, explosivePlayRate: 9.5, turnoverEpaMargin: -1.0 },
      { id: '2017-10', season: 2017, week: 11, date: 'Nov 11', opponent: 'LSU', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 10, opponentScore: 33, offenseEpaPerPlay: -0.18, defenseEpaPerPlay: 0.26, specialTeamsEpaPerPlay: -0.03, netEpaPerPlay: -0.47, passEpaPerPlay: -0.21, rushEpaPerPlay: -0.15, offenseSuccessRate: 32.0, defenseSuccessRate: 51.0, explosivePlayRate: 4.2, turnoverEpaMargin: -3.5 },
      { id: '2017-11', season: 2017, week: 12, date: 'Nov 18', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: true, result: 'L', arkansasScore: 21, opponentScore: 28, offenseEpaPerPlay: 0.02, defenseEpaPerPlay: 0.12, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.12, passEpaPerPlay: 0.05, rushEpaPerPlay: -0.01, offenseSuccessRate: 41.0, defenseSuccessRate: 44.0, explosivePlayRate: 7.0, turnoverEpaMargin: -2.0 },
      { id: '2017-12', season: 2017, week: 13, date: 'Nov 24', opponent: 'Missouri', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 45, opponentScore: 48, offenseEpaPerPlay: 0.28, defenseEpaPerPlay: 0.36, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.12, passEpaPerPlay: 0.32, rushEpaPerPlay: 0.24, offenseSuccessRate: 51.0, defenseSuccessRate: 56.0, explosivePlayRate: 13.0, turnoverEpaMargin: -1.5 }
    ]
  },
  {
    season: 2018,
    record: '2-10',
    headCoach: 'Chad Morris',
    offensiveCoordinator: 'Joe Craddock',
    defensiveCoordinator: 'John Chavis',
    offenseEpaPerPlay: -0.118,
    defenseEpaPerPlay: 0.156,
    specialTeamsEpaPerPlay: -0.045,
    netEpaPerPlay: -0.319,
    passEpaPerPlay: -0.145,
    rushEpaPerPlay: -0.091,
    offenseSuccessRate: 36.2,
    defenseSuccessRate: 49.8,
    secRankOffenseEpa: 14,
    secRankDefenseEpa: 14,
    nationalRankNetEpa: 118,
    recruitingRankNational: 36,
    recruitingRankSec: 12,
    totalPlays: 812,
    passingYardsPerGame: 192.3,
    rushingYardsPerGame: 144.3,
    turnoverMargin: -8,
    games: [
      { id: '2018-1', season: 2018, week: 1, date: 'Sep 1', opponent: 'Eastern Illinois', opponentLogo: '🐾', isHome: true, result: 'W', arkansasScore: 55, opponentScore: 20, offenseEpaPerPlay: 0.32, defenseEpaPerPlay: 0.01, specialTeamsEpaPerPlay: 0.05, netEpaPerPlay: 0.36, passEpaPerPlay: 0.38, rushEpaPerPlay: 0.26, offenseSuccessRate: 54.0, defenseSuccessRate: 38.0, explosivePlayRate: 14.0, turnoverEpaMargin: 5.5 },
      { id: '2018-2', season: 2018, week: 2, date: 'Sep 8', opponent: 'Colorado State', opponentLogo: '🐏', isHome: false, result: 'L', arkansasScore: 27, opponentScore: 34, offenseEpaPerPlay: 0.02, defenseEpaPerPlay: 0.18, specialTeamsEpaPerPlay: -0.08, netEpaPerPlay: -0.24, passEpaPerPlay: -0.04, rushEpaPerPlay: 0.08, offenseSuccessRate: 40.0, defenseSuccessRate: 48.0, explosivePlayRate: 8.0, turnoverEpaMargin: -4.0 },
      { id: '2018-3', season: 2018, week: 3, date: 'Sep 15', opponent: 'North Texas', opponentLogo: '🦅', isHome: true, result: 'L', arkansasScore: 17, opponentScore: 44, offenseEpaPerPlay: -0.28, defenseEpaPerPlay: 0.25, specialTeamsEpaPerPlay: -0.18, netEpaPerPlay: -0.71, passEpaPerPlay: -0.35, rushEpaPerPlay: -0.21, offenseSuccessRate: 28.0, defenseSuccessRate: 51.0, explosivePlayRate: 3.0, turnoverEpaMargin: -12.0 },
      { id: '2018-4', season: 2018, week: 4, date: 'Sep 22', opponent: 'Auburn', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 3, opponentScore: 34, offenseEpaPerPlay: -0.32, defenseEpaPerPlay: 0.18, specialTeamsEpaPerPlay: -0.12, netEpaPerPlay: -0.62, passEpaPerPlay: -0.38, rushEpaPerPlay: -0.26, offenseSuccessRate: 25.0, defenseSuccessRate: 48.0, explosivePlayRate: 2.0, turnoverEpaMargin: -7.5 },
      { id: '2018-5', season: 2018, week: 5, date: 'Sep 29', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 17, opponentScore: 24, offenseEpaPerPlay: -0.08, defenseEpaPerPlay: 0.05, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.15, passEpaPerPlay: -0.12, rushEpaPerPlay: -0.04, offenseSuccessRate: 36.0, defenseSuccessRate: 41.0, explosivePlayRate: 6.0, turnoverEpaMargin: -1.5 },
      { id: '2018-6', season: 2018, week: 6, date: 'Oct 6', opponent: 'Alabama', opponentLogo: '🐘', isHome: true, result: 'L', arkansasScore: 31, opponentScore: 65, offenseEpaPerPlay: 0.05, defenseEpaPerPlay: 0.58, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.58, passEpaPerPlay: 0.12, rushEpaPerPlay: -0.02, offenseSuccessRate: 41.0, defenseSuccessRate: 68.0, explosivePlayRate: 9.0, turnoverEpaMargin: -6.0 },
      { id: '2018-7', season: 2018, week: 7, date: 'Oct 13', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: true, result: 'L', arkansasScore: 33, opponentScore: 37, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: 0.28, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.12, passEpaPerPlay: 0.15, rushEpaPerPlay: 0.21, offenseSuccessRate: 48.0, defenseSuccessRate: 53.0, explosivePlayRate: 12.0, turnoverEpaMargin: -2.0 },
      { id: '2018-8', season: 2018, week: 8, date: 'Oct 20', opponent: 'Tulsa', opponentLogo: '🌀', isHome: true, result: 'W', arkansasScore: 23, opponentScore: 0, offenseEpaPerPlay: 0.04, defenseEpaPerPlay: -0.28, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.34, passEpaPerPlay: 0.02, rushEpaPerPlay: 0.06, offenseSuccessRate: 39.0, defenseSuccessRate: 26.0, explosivePlayRate: 6.5, turnoverEpaMargin: 4.0 },
      { id: '2018-9', season: 2018, week: 9, date: 'Oct 27', opponent: 'Vanderbilt', opponentLogo: '⚓', isHome: true, result: 'L', arkansasScore: 31, opponentScore: 45, offenseEpaPerPlay: 0.08, defenseEpaPerPlay: 0.29, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.25, passEpaPerPlay: 0.11, rushEpaPerPlay: 0.05, offenseSuccessRate: 42.0, defenseSuccessRate: 54.0, explosivePlayRate: 9.0, turnoverEpaMargin: -3.5 },
      { id: '2018-10', season: 2018, week: 11, date: 'Nov 10', opponent: 'LSU', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 10, opponentScore: 24, offenseEpaPerPlay: -0.18, defenseEpaPerPlay: 0.08, specialTeamsEpaPerPlay: -0.03, netEpaPerPlay: -0.29, passEpaPerPlay: -0.22, rushEpaPerPlay: -0.14, offenseSuccessRate: 31.0, defenseSuccessRate: 42.0, explosivePlayRate: 4.0, turnoverEpaMargin: -2.0 },
      { id: '2018-11', season: 2018, week: 12, date: 'Nov 17', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: false, result: 'L', arkansasScore: 6, opponentScore: 52, offenseEpaPerPlay: -0.38, defenseEpaPerPlay: 0.42, specialTeamsEpaPerPlay: -0.06, netEpaPerPlay: -0.86, passEpaPerPlay: -0.42, rushEpaPerPlay: -0.34, offenseSuccessRate: 22.0, defenseSuccessRate: 61.0, explosivePlayRate: 1.5, turnoverEpaMargin: -9.0 },
      { id: '2018-12', season: 2018, week: 13, date: 'Nov 23', opponent: 'Missouri', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 0, opponentScore: 38, offenseEpaPerPlay: -0.42, defenseEpaPerPlay: 0.31, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.78, passEpaPerPlay: -0.48, rushEpaPerPlay: -0.36, offenseSuccessRate: 20.0, defenseSuccessRate: 55.0, explosivePlayRate: 1.0, turnoverEpaMargin: -8.0 }
    ]
  },
  {
    season: 2019,
    record: '2-10',
    headCoach: 'Chad Morris / Barry Lunney Jr.',
    offensiveCoordinator: 'Joe Craddock',
    defensiveCoordinator: 'John Chavis',
    offenseEpaPerPlay: -0.165,
    defenseEpaPerPlay: 0.182,
    specialTeamsEpaPerPlay: -0.052,
    netEpaPerPlay: -0.399,
    passEpaPerPlay: -0.198,
    rushEpaPerPlay: -0.132,
    offenseSuccessRate: 34.8,
    defenseSuccessRate: 51.2,
    secRankOffenseEpa: 14,
    secRankDefenseEpa: 14,
    nationalRankNetEpa: 124,
    recruitingRankNational: 23,
    recruitingRankSec: 10,
    totalPlays: 798,
    passingYardsPerGame: 192.9,
    rushingYardsPerGame: 147.2,
    turnoverMargin: -9,
    games: [
      { id: '2019-1', season: 2019, week: 1, date: 'Aug 31', opponent: 'Portland State', opponentLogo: '🌲', isHome: true, result: 'W', arkansasScore: 20, opponentScore: 13, offenseEpaPerPlay: -0.05, defenseEpaPerPlay: -0.12, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: 0.05, passEpaPerPlay: -0.08, rushEpaPerPlay: -0.02, offenseSuccessRate: 38.0, defenseSuccessRate: 34.0, explosivePlayRate: 5.0, turnoverEpaMargin: 1.0 },
      { id: '2019-2', season: 2019, week: 2, date: 'Sep 7', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: false, result: 'L', arkansasScore: 17, opponentScore: 31, offenseEpaPerPlay: -0.12, defenseEpaPerPlay: 0.18, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.34, passEpaPerPlay: -0.15, rushEpaPerPlay: -0.09, offenseSuccessRate: 35.0, defenseSuccessRate: 48.0, explosivePlayRate: 6.0, turnoverEpaMargin: -3.0 },
      { id: '2019-3', season: 2019, week: 3, date: 'Sep 14', opponent: 'Colorado State', opponentLogo: '🐏', isHome: true, result: 'W', arkansasScore: 55, opponentScore: 34, offenseEpaPerPlay: 0.32, defenseEpaPerPlay: 0.12, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.18, passEpaPerPlay: 0.38, rushEpaPerPlay: 0.26, offenseSuccessRate: 52.0, defenseSuccessRate: 45.0, explosivePlayRate: 14.5, turnoverEpaMargin: 3.0 },
      { id: '2019-4', season: 2019, week: 4, date: 'Sep 21', opponent: 'San Jose State', opponentLogo: '⚔️', isHome: true, result: 'L', arkansasScore: 24, opponentScore: 31, offenseEpaPerPlay: -0.18, defenseEpaPerPlay: 0.14, specialTeamsEpaPerPlay: -0.08, netEpaPerPlay: -0.40, passEpaPerPlay: -0.22, rushEpaPerPlay: -0.14, offenseSuccessRate: 33.0, defenseSuccessRate: 46.0, explosivePlayRate: 4.5, turnoverEpaMargin: -11.0 },
      { id: '2019-5', season: 2019, week: 5, date: 'Sep 28', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 27, opponentScore: 31, offenseEpaPerPlay: 0.08, defenseEpaPerPlay: 0.16, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.10, passEpaPerPlay: 0.11, rushEpaPerPlay: 0.05, offenseSuccessRate: 42.0, defenseSuccessRate: 47.0, explosivePlayRate: 8.5, turnoverEpaMargin: -1.0 },
      { id: '2019-6', season: 2019, week: 6, date: 'Oct 12', opponent: 'Kentucky', opponentLogo: '🐱', isHome: false, result: 'L', arkansasScore: 20, opponentScore: 24, offenseEpaPerPlay: -0.08, defenseEpaPerPlay: 0.08, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.20, passEpaPerPlay: -0.12, rushEpaPerPlay: -0.04, offenseSuccessRate: 36.0, defenseSuccessRate: 43.0, explosivePlayRate: 5.5, turnoverEpaMargin: -2.0 },
      { id: '2019-7', season: 2019, week: 7, date: 'Oct 19', opponent: 'Auburn', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 10, opponentScore: 51, offenseEpaPerPlay: -0.25, defenseEpaPerPlay: 0.42, specialTeamsEpaPerPlay: -0.08, netEpaPerPlay: -0.75, passEpaPerPlay: -0.31, rushEpaPerPlay: -0.19, offenseSuccessRate: 29.0, defenseSuccessRate: 60.0, explosivePlayRate: 3.0, turnoverEpaMargin: -8.0 },
      { id: '2019-8', season: 2019, week: 8, date: 'Oct 26', opponent: 'Alabama', opponentLogo: '🐘', isHome: false, result: 'L', arkansasScore: 7, opponentScore: 48, offenseEpaPerPlay: -0.32, defenseEpaPerPlay: 0.38, specialTeamsEpaPerPlay: -0.06, netEpaPerPlay: -0.76, passEpaPerPlay: -0.38, rushEpaPerPlay: -0.26, offenseSuccessRate: 26.0, defenseSuccessRate: 58.0, explosivePlayRate: 2.0, turnoverEpaMargin: -7.5 },
      { id: '2019-9', season: 2019, week: 9, date: 'Nov 2', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: true, result: 'L', arkansasScore: 24, opponentScore: 54, offenseEpaPerPlay: -0.05, defenseEpaPerPlay: 0.45, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.55, passEpaPerPlay: -0.08, rushEpaPerPlay: -0.02, offenseSuccessRate: 38.0, defenseSuccessRate: 62.0, explosivePlayRate: 7.0, turnoverEpaMargin: -4.0 },
      { id: '2019-10', season: 2019, week: 10, date: 'Nov 9', opponent: 'Western Kentucky', opponentLogo: '🔴', isHome: true, result: 'L', arkansasScore: 19, opponentScore: 45, offenseEpaPerPlay: -0.22, defenseEpaPerPlay: 0.35, specialTeamsEpaPerPlay: -0.08, netEpaPerPlay: -0.65, passEpaPerPlay: -0.28, rushEpaPerPlay: -0.16, offenseSuccessRate: 30.0, defenseSuccessRate: 56.0, explosivePlayRate: 3.5, turnoverEpaMargin: -8.5 },
      { id: '2019-11', season: 2019, week: 12, date: 'Nov 23', opponent: 'LSU', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 20, opponentScore: 56, offenseEpaPerPlay: -0.15, defenseEpaPerPlay: 0.48, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.67, passEpaPerPlay: -0.18, rushEpaPerPlay: -0.12, offenseSuccessRate: 33.0, defenseSuccessRate: 64.0, explosivePlayRate: 5.0, turnoverEpaMargin: -5.0 },
      { id: '2019-12', season: 2019, week: 13, date: 'Nov 29', opponent: 'Missouri', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 14, opponentScore: 24, offenseEpaPerPlay: -0.21, defenseEpaPerPlay: 0.12, specialTeamsEpaPerPlay: -0.03, netEpaPerPlay: -0.36, passEpaPerPlay: -0.25, rushEpaPerPlay: -0.17, offenseSuccessRate: 31.0, defenseSuccessRate: 44.0, explosivePlayRate: 4.0, turnoverEpaMargin: -3.0 }
    ]
  },
  {
    season: 2020,
    record: '3-7',
    headCoach: 'Sam Pittman',
    offensiveCoordinator: 'Kendal Briles',
    defensiveCoordinator: 'Barry Odom',
    offenseEpaPerPlay: 0.015,
    defenseEpaPerPlay: 0.062,
    specialTeamsEpaPerPlay: 0.018,
    netEpaPerPlay: -0.029,
    passEpaPerPlay: 0.052,
    rushEpaPerPlay: -0.022,
    offenseSuccessRate: 41.2,
    defenseSuccessRate: 44.8,
    secRankOffenseEpa: 9,
    secRankDefenseEpa: 7,
    nationalRankNetEpa: 58,
    recruitingRankNational: 29,
    recruitingRankSec: 10,
    totalPlays: 712,
    passingYardsPerGame: 240.2,
    rushingYardsPerGame: 151.3,
    turnoverMargin: 5,
    games: [
      { id: '2020-1', season: 2020, week: 1, date: 'Sep 26', opponent: 'Georgia', opponentLogo: '🐶', isHome: true, result: 'L', arkansasScore: 10, opponentScore: 37, offenseEpaPerPlay: -0.28, defenseEpaPerPlay: 0.15, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.48, passEpaPerPlay: -0.25, rushEpaPerPlay: -0.31, offenseSuccessRate: 27.0, defenseSuccessRate: 46.0, explosivePlayRate: 3.0, turnoverEpaMargin: -8.0 },
      { id: '2020-2', season: 2020, week: 2, date: 'Oct 3', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: false, result: 'W', arkansasScore: 21, opponentScore: 14, offenseEpaPerPlay: 0.02, defenseEpaPerPlay: -0.18, specialTeamsEpaPerPlay: 0.05, netEpaPerPlay: 0.25, passEpaPerPlay: 0.06, rushEpaPerPlay: -0.02, offenseSuccessRate: 40.0, defenseSuccessRate: 32.0, explosivePlayRate: 8.0, turnoverEpaMargin: 7.2 },
      { id: '2020-3', season: 2020, week: 3, date: 'Oct 10', opponent: 'Auburn', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 28, opponentScore: 30, offenseEpaPerPlay: 0.14, defenseEpaPerPlay: 0.18, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.06, passEpaPerPlay: 0.21, rushEpaPerPlay: 0.07, offenseSuccessRate: 46.0, defenseSuccessRate: 48.0, explosivePlayRate: 11.0, turnoverEpaMargin: 1.0 },
      { id: '2020-4', season: 2020, week: 4, date: 'Oct 17', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: true, result: 'W', arkansasScore: 33, opponentScore: 21, offenseEpaPerPlay: 0.08, defenseEpaPerPlay: -0.12, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.24, passEpaPerPlay: 0.12, rushEpaPerPlay: 0.04, offenseSuccessRate: 43.0, defenseSuccessRate: 36.0, explosivePlayRate: 9.5, turnoverEpaMargin: 12.5 },
      { id: '2020-5', season: 2020, week: 5, date: 'Oct 31', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 31, opponentScore: 42, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: 0.28, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: -0.09, passEpaPerPlay: 0.24, rushEpaPerPlay: 0.12, offenseSuccessRate: 48.0, defenseSuccessRate: 53.0, explosivePlayRate: 12.5, turnoverEpaMargin: -1.0 },
      { id: '2020-6', season: 2020, week: 6, date: 'Nov 7', opponent: 'Tennessee', opponentLogo: '🍊', isHome: true, result: 'W', arkansasScore: 24, opponentScore: 13, offenseEpaPerPlay: 0.05, defenseEpaPerPlay: -0.15, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.23, passEpaPerPlay: 0.09, rushEpaPerPlay: 0.01, offenseSuccessRate: 42.0, defenseSuccessRate: 33.0, explosivePlayRate: 8.5, turnoverEpaMargin: 4.0 },
      { id: '2020-7', season: 2020, week: 7, date: 'Nov 14', opponent: 'Florida', opponentLogo: '🐊', isHome: false, result: 'L', arkansasScore: 35, opponentScore: 63, offenseEpaPerPlay: 0.22, defenseEpaPerPlay: 0.52, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: -0.29, passEpaPerPlay: 0.28, rushEpaPerPlay: 0.16, offenseSuccessRate: 49.0, defenseSuccessRate: 65.0, explosivePlayRate: 14.0, turnoverEpaMargin: -2.0 },
      { id: '2020-8', season: 2020, week: 8, date: 'Nov 21', opponent: 'LSU', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 24, opponentScore: 27, offenseEpaPerPlay: 0.02, defenseEpaPerPlay: 0.08, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: -0.04, passEpaPerPlay: 0.05, rushEpaPerPlay: -0.01, offenseSuccessRate: 41.0, defenseSuccessRate: 43.0, explosivePlayRate: 7.5, turnoverEpaMargin: 0.5 },
      { id: '2020-9', season: 2020, week: 9, date: 'Dec 5', opponent: 'Missouri', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 48, opponentScore: 50, offenseEpaPerPlay: 0.35, defenseEpaPerPlay: 0.38, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: -0.01, passEpaPerPlay: 0.42, rushEpaPerPlay: 0.28, offenseSuccessRate: 54.0, defenseSuccessRate: 56.0, explosivePlayRate: 16.0, turnoverEpaMargin: 1.5 },
      { id: '2020-10', season: 2020, week: 10, date: 'Dec 12', opponent: 'Alabama', opponentLogo: '🐘', isHome: true, result: 'L', arkansasScore: 3, opponentScore: 52, offenseEpaPerPlay: -0.32, defenseEpaPerPlay: 0.45, specialTeamsEpaPerPlay: -0.06, netEpaPerPlay: -0.83, passEpaPerPlay: -0.38, rushEpaPerPlay: -0.26, offenseSuccessRate: 24.0, defenseSuccessRate: 61.0, explosivePlayRate: 2.0, turnoverEpaMargin: -8.0 }
    ]
  },
  {
    season: 2021,
    record: '9-4',
    headCoach: 'Sam Pittman',
    offensiveCoordinator: 'Kendal Briles',
    defensiveCoordinator: 'Barry Odom',
    bowlGame: 'Outback Bowl',
    bowlResult: 'W 24-10 vs Penn State',
    offenseEpaPerPlay: 0.158,
    defenseEpaPerPlay: -0.028,
    specialTeamsEpaPerPlay: 0.041,
    netEpaPerPlay: 0.227,
    passEpaPerPlay: 0.185,
    rushEpaPerPlay: 0.131,
    offenseSuccessRate: 46.5,
    defenseSuccessRate: 39.2,
    secRankOffenseEpa: 4,
    secRankDefenseEpa: 5,
    nationalRankNetEpa: 18,
    recruitingRankNational: 25,
    recruitingRankSec: 9,
    totalPlays: 914,
    passingYardsPerGame: 213.9,
    rushingYardsPerGame: 227.8,
    turnoverMargin: 6,
    games: [
      { id: '2021-1', season: 2021, week: 1, date: 'Sep 4', opponent: 'Rice', opponentLogo: '🌾', isHome: true, result: 'W', arkansasScore: 38, opponentScore: 17, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: -0.12, specialTeamsEpaPerPlay: 0.05, netEpaPerPlay: 0.35, passEpaPerPlay: 0.22, rushEpaPerPlay: 0.14, offenseSuccessRate: 47.0, defenseSuccessRate: 34.0, explosivePlayRate: 11.5, turnoverEpaMargin: 5.0 },
      { id: '2021-2', season: 2021, week: 2, date: 'Sep 11', opponent: 'Texas', opponentLogo: '🤘', isHome: true, result: 'W', arkansasScore: 40, opponentScore: 21, offenseEpaPerPlay: 0.28, defenseEpaPerPlay: -0.18, specialTeamsEpaPerPlay: 0.08, netEpaPerPlay: 0.54, passEpaPerPlay: 0.25, rushEpaPerPlay: 0.31, offenseSuccessRate: 52.0, defenseSuccessRate: 30.0, explosivePlayRate: 15.0, turnoverEpaMargin: 6.5 },
      { id: '2021-3', season: 2021, week: 3, date: 'Sep 18', opponent: 'Georgia Southern', opponentLogo: '🦅', isHome: true, result: 'W', arkansasScore: 45, opponentScore: 10, offenseEpaPerPlay: 0.35, defenseEpaPerPlay: -0.22, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.59, passEpaPerPlay: 0.41, rushEpaPerPlay: 0.29, offenseSuccessRate: 55.0, defenseSuccessRate: 28.0, explosivePlayRate: 16.0, turnoverEpaMargin: 4.0 },
      { id: '2021-4', season: 2021, week: 4, date: 'Sep 25', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'W', arkansasScore: 20, opponentScore: 10, offenseEpaPerPlay: 0.12, defenseEpaPerPlay: -0.25, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.41, passEpaPerPlay: 0.18, rushEpaPerPlay: 0.06, offenseSuccessRate: 44.0, defenseSuccessRate: 26.0, explosivePlayRate: 10.0, turnoverEpaMargin: 5.5 },
      { id: '2021-5', season: 2021, week: 5, date: 'Oct 2', opponent: 'Georgia', opponentLogo: '🐶', isHome: false, result: 'L', arkansasScore: 0, opponentScore: 37, offenseEpaPerPlay: -0.38, defenseEpaPerPlay: 0.28, specialTeamsEpaPerPlay: -0.12, netEpaPerPlay: -0.78, passEpaPerPlay: -0.42, rushEpaPerPlay: -0.34, offenseSuccessRate: 22.0, defenseSuccessRate: 52.0, explosivePlayRate: 1.0, turnoverEpaMargin: -9.0 },
      { id: '2021-6', season: 2021, week: 6, date: 'Oct 9', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: false, result: 'L', arkansasScore: 51, opponentScore: 52, offenseEpaPerPlay: 0.45, defenseEpaPerPlay: 0.48, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.05, passEpaPerPlay: 0.48, rushEpaPerPlay: 0.42, offenseSuccessRate: 58.0, defenseSuccessRate: 60.0, explosivePlayRate: 18.0, turnoverEpaMargin: 0.0 },
      { id: '2021-7', season: 2021, week: 7, date: 'Oct 16', opponent: 'Auburn', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 23, opponentScore: 38, offenseEpaPerPlay: 0.05, defenseEpaPerPlay: 0.22, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.19, passEpaPerPlay: 0.08, rushEpaPerPlay: 0.02, offenseSuccessRate: 41.0, defenseSuccessRate: 49.0, explosivePlayRate: 8.0, turnoverEpaMargin: -4.0 },
      { id: '2021-8', season: 2021, week: 8, date: 'Oct 23', opponent: 'UAPB', opponentLogo: '🦁', isHome: true, result: 'W', arkansasScore: 45, opponentScore: 3, offenseEpaPerPlay: 0.42, defenseEpaPerPlay: -0.32, specialTeamsEpaPerPlay: 0.08, netEpaPerPlay: 0.82, passEpaPerPlay: 0.48, rushEpaPerPlay: 0.36, offenseSuccessRate: 58.0, defenseSuccessRate: 22.0, explosivePlayRate: 18.5, turnoverEpaMargin: 7.0 },
      { id: '2021-9', season: 2021, week: 10, date: 'Nov 6', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: true, result: 'W', arkansasScore: 31, opponentScore: 28, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: 0.12, specialTeamsEpaPerPlay: 0.06, netEpaPerPlay: 0.12, passEpaPerPlay: 0.22, rushEpaPerPlay: 0.14, offenseSuccessRate: 48.0, defenseSuccessRate: 45.0, explosivePlayRate: 12.0, turnoverEpaMargin: 2.0 },
      { id: '2021-10', season: 2021, week: 11, date: 'Nov 13', opponent: 'LSU', opponentLogo: '🐯', isHome: false, result: 'W', arkansasScore: 16, opponentScore: 13, offenseEpaPerPlay: 0.02, defenseEpaPerPlay: -0.15, specialTeamsEpaPerPlay: 0.08, netEpaPerPlay: 0.25, passEpaPerPlay: 0.04, rushEpaPerPlay: 0.00, offenseSuccessRate: 39.0, defenseSuccessRate: 32.0, explosivePlayRate: 6.0, turnoverEpaMargin: 5.0 },
      { id: '2021-11', season: 2021, week: 12, date: 'Nov 20', opponent: 'Alabama', opponentLogo: '🐘', isHome: false, result: 'L', arkansasScore: 35, opponentScore: 42, offenseEpaPerPlay: 0.28, defenseEpaPerPlay: 0.35, specialTeamsEpaPerPlay: 0.05, netEpaPerPlay: -0.02, passEpaPerPlay: 0.32, rushEpaPerPlay: 0.24, offenseSuccessRate: 51.0, defenseSuccessRate: 56.0, explosivePlayRate: 14.5, turnoverEpaMargin: 1.0 },
      { id: '2021-12', season: 2021, week: 13, date: 'Nov 26', opponent: 'Missouri', opponentLogo: '🐯', isHome: true, result: 'W', arkansasScore: 34, opponentScore: 17, offenseEpaPerPlay: 0.22, defenseEpaPerPlay: -0.08, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.34, passEpaPerPlay: 0.26, rushEpaPerPlay: 0.18, offenseSuccessRate: 49.0, defenseSuccessRate: 36.0, explosivePlayRate: 13.0, turnoverEpaMargin: 4.5 },
      { id: '2021-13', season: 2021, week: 15, date: 'Jan 1', opponent: 'Penn State', opponentLogo: '🦁', isHome: false, result: 'W', arkansasScore: 24, opponentScore: 10, offenseEpaPerPlay: 0.15, defenseEpaPerPlay: -0.22, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.40, passEpaPerPlay: 0.08, rushEpaPerPlay: 0.22, offenseSuccessRate: 46.0, defenseSuccessRate: 29.0, explosivePlayRate: 11.0, turnoverEpaMargin: 6.0 }
    ]
  },
  {
    season: 2022,
    record: '7-6',
    headCoach: 'Sam Pittman',
    offensiveCoordinator: 'Kendal Briles',
    defensiveCoordinator: 'Barry Odom',
    bowlGame: 'Liberty Bowl',
    bowlResult: 'W 55-53 (3OT) vs Kansas',
    offenseEpaPerPlay: 0.132,
    defenseEpaPerPlay: 0.088,
    specialTeamsEpaPerPlay: 0.022,
    netEpaPerPlay: 0.066,
    passEpaPerPlay: 0.165,
    rushEpaPerPlay: 0.098,
    offenseSuccessRate: 45.1,
    defenseSuccessRate: 45.8,
    secRankOffenseEpa: 5,
    secRankDefenseEpa: 11,
    nationalRankNetEpa: 41,
    recruitingRankNational: 28,
    recruitingRankSec: 10,
    totalPlays: 948,
    passingYardsPerGame: 234.6,
    rushingYardsPerGame: 236.7,
    turnoverMargin: 1,
    games: [
      { id: '2022-1', season: 2022, week: 1, date: 'Sep 3', opponent: 'Cincinnati', opponentLogo: '🐾', isHome: true, result: 'W', arkansasScore: 31, opponentScore: 24, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: 0.02, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.19, passEpaPerPlay: 0.21, rushEpaPerPlay: 0.15, offenseSuccessRate: 48.0, defenseSuccessRate: 41.0, explosivePlayRate: 12.0, turnoverEpaMargin: 3.0 },
      { id: '2022-2', season: 2022, week: 2, date: 'Sep 10', opponent: 'South Carolina', opponentLogo: '🐔', isHome: true, result: 'W', arkansasScore: 44, opponentScore: 30, offenseEpaPerPlay: 0.28, defenseEpaPerPlay: 0.15, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.15, passEpaPerPlay: 0.25, rushEpaPerPlay: 0.31, offenseSuccessRate: 52.0, defenseSuccessRate: 47.0, explosivePlayRate: 14.5, turnoverEpaMargin: 2.5 },
      { id: '2022-3', season: 2022, week: 3, date: 'Sep 17', opponent: 'Missouri State', opponentLogo: '🐻', isHome: true, result: 'W', arkansasScore: 38, opponentScore: 27, offenseEpaPerPlay: 0.22, defenseEpaPerPlay: 0.12, specialTeamsEpaPerPlay: 0.08, netEpaPerPlay: 0.18, passEpaPerPlay: 0.31, rushEpaPerPlay: 0.13, offenseSuccessRate: 49.0, defenseSuccessRate: 45.0, explosivePlayRate: 13.0, turnoverEpaMargin: 1.0 },
      { id: '2022-4', season: 2022, week: 4, date: 'Sep 24', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 21, opponentScore: 23, offenseEpaPerPlay: 0.08, defenseEpaPerPlay: 0.05, specialTeamsEpaPerPlay: -0.12, netEpaPerPlay: -0.09, passEpaPerPlay: 0.12, rushEpaPerPlay: 0.04, offenseSuccessRate: 42.0, defenseSuccessRate: 42.0, explosivePlayRate: 8.0, turnoverEpaMargin: -8.0 },
      { id: '2022-5', season: 2022, week: 5, date: 'Oct 1', opponent: 'Alabama', opponentLogo: '🐘', isHome: true, result: 'L', arkansasScore: 26, opponentScore: 49, offenseEpaPerPlay: 0.05, defenseEpaPerPlay: 0.38, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: -0.32, passEpaPerPlay: 0.08, rushEpaPerPlay: 0.02, offenseSuccessRate: 41.0, defenseSuccessRate: 58.0, explosivePlayRate: 9.0, turnoverEpaMargin: -4.0 },
      { id: '2022-6', season: 2022, week: 6, date: 'Oct 8', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: false, result: 'L', arkansasScore: 17, opponentScore: 40, offenseEpaPerPlay: -0.08, defenseEpaPerPlay: 0.32, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.42, passEpaPerPlay: -0.12, rushEpaPerPlay: -0.04, offenseSuccessRate: 36.0, defenseSuccessRate: 55.0, explosivePlayRate: 5.5, turnoverEpaMargin: -5.0 },
      { id: '2022-7', season: 2022, week: 7, date: 'Oct 15', opponent: 'BYU', opponentLogo: '🤙', isHome: false, result: 'W', arkansasScore: 52, opponentScore: 35, offenseEpaPerPlay: 0.42, defenseEpaPerPlay: 0.22, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.22, passEpaPerPlay: 0.48, rushEpaPerPlay: 0.36, offenseSuccessRate: 58.0, defenseSuccessRate: 50.0, explosivePlayRate: 18.0, turnoverEpaMargin: 4.0 },
      { id: '2022-8', season: 2022, week: 9, date: 'Oct 29', opponent: 'Auburn', opponentLogo: '🐯', isHome: false, result: 'W', arkansasScore: 41, opponentScore: 27, offenseEpaPerPlay: 0.31, defenseEpaPerPlay: 0.11, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.23, passEpaPerPlay: 0.28, rushEpaPerPlay: 0.34, offenseSuccessRate: 54.0, defenseSuccessRate: 44.0, explosivePlayRate: 15.0, turnoverEpaMargin: 3.0 },
      { id: '2022-9', season: 2022, week: 10, date: 'Nov 5', opponent: 'Liberty', opponentLogo: '🦅', isHome: true, result: 'L', arkansasScore: 19, opponentScore: 21, offenseEpaPerPlay: -0.05, defenseEpaPerPlay: -0.02, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.07, passEpaPerPlay: -0.08, rushEpaPerPlay: -0.02, offenseSuccessRate: 38.0, defenseSuccessRate: 38.0, explosivePlayRate: 6.0, turnoverEpaMargin: -3.5 },
      { id: '2022-10', season: 2022, week: 11, date: 'Nov 12', opponent: 'LSU', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 10, opponentScore: 13, offenseEpaPerPlay: -0.18, defenseEpaPerPlay: -0.12, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: -0.04, passEpaPerPlay: -0.22, rushEpaPerPlay: -0.14, offenseSuccessRate: 32.0, defenseSuccessRate: 34.0, explosivePlayRate: 4.0, turnoverEpaMargin: -2.0 },
      { id: '2022-11', season: 2022, week: 12, date: 'Nov 19', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: true, result: 'W', arkansasScore: 42, opponentScore: 27, offenseEpaPerPlay: 0.32, defenseEpaPerPlay: 0.12, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.24, passEpaPerPlay: 0.35, rushEpaPerPlay: 0.29, offenseSuccessRate: 53.0, defenseSuccessRate: 45.0, explosivePlayRate: 16.0, turnoverEpaMargin: 5.0 },
      { id: '2022-12', season: 2022, week: 13, date: 'Nov 25', opponent: 'Missouri', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 27, opponentScore: 29, offenseEpaPerPlay: 0.08, defenseEpaPerPlay: 0.14, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.08, passEpaPerPlay: 0.11, rushEpaPerPlay: 0.05, offenseSuccessRate: 43.0, defenseSuccessRate: 46.0, explosivePlayRate: 9.0, turnoverEpaMargin: -1.0 },
      { id: '2022-13', season: 2022, week: 15, date: 'Dec 28', opponent: 'Kansas', opponentLogo: '🐦', isHome: false, result: 'W', arkansasScore: 55, opponentScore: 53, offenseEpaPerPlay: 0.41, defenseEpaPerPlay: 0.38, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.05, passEpaPerPlay: 0.45, rushEpaPerPlay: 0.38, offenseSuccessRate: 57.0, defenseSuccessRate: 56.0, explosivePlayRate: 17.0, turnoverEpaMargin: 2.0 }
    ]
  },
  {
    season: 2023,
    record: '4-8',
    headCoach: 'Sam Pittman',
    offensiveCoordinator: 'Dan Enos / Kenny Guiton',
    defensiveCoordinator: 'Travis Williams',
    offenseEpaPerPlay: -0.064,
    defenseEpaPerPlay: 0.021,
    specialTeamsEpaPerPlay: 0.005,
    netEpaPerPlay: -0.080,
    passEpaPerPlay: -0.042,
    rushEpaPerPlay: -0.086,
    offenseSuccessRate: 38.8,
    defenseSuccessRate: 41.5,
    secRankOffenseEpa: 12,
    secRankDefenseEpa: 8,
    nationalRankNetEpa: 78,
    recruitingRankNational: 22,
    recruitingRankSec: 10,
    totalPlays: 784,
    passingYardsPerGame: 187.5,
    rushingYardsPerGame: 139.0,
    turnoverMargin: 1,
    games: [
      { id: '2023-1', season: 2023, week: 1, date: 'Sep 2', opponent: 'Western Carolina', opponentLogo: '🐱', isHome: true, result: 'W', arkansasScore: 56, opponentScore: 13, offenseEpaPerPlay: 0.35, defenseEpaPerPlay: -0.18, specialTeamsEpaPerPlay: 0.05, netEpaPerPlay: 0.58, passEpaPerPlay: 0.41, rushEpaPerPlay: 0.29, offenseSuccessRate: 56.0, defenseSuccessRate: 31.0, explosivePlayRate: 15.0, turnoverEpaMargin: 8.0 },
      { id: '2023-2', season: 2023, week: 2, date: 'Sep 9', opponent: 'Kent State', opponentLogo: '⚡', isHome: true, result: 'W', arkansasScore: 28, opponentScore: 6, offenseEpaPerPlay: 0.08, defenseEpaPerPlay: -0.25, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.35, passEpaPerPlay: 0.05, rushEpaPerPlay: 0.11, offenseSuccessRate: 42.0, defenseSuccessRate: 28.0, explosivePlayRate: 7.0, turnoverEpaMargin: 4.0 },
      { id: '2023-3', season: 2023, week: 3, date: 'Sep 16', opponent: 'BYU', opponentLogo: '🤙', isHome: true, result: 'L', arkansasScore: 31, opponentScore: 38, offenseEpaPerPlay: 0.02, defenseEpaPerPlay: 0.15, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.18, passEpaPerPlay: 0.04, rushEpaPerPlay: 0.00, offenseSuccessRate: 40.0, defenseSuccessRate: 47.0, explosivePlayRate: 8.5, turnoverEpaMargin: -4.0 },
      { id: '2023-4', season: 2023, week: 4, date: 'Sep 23', opponent: 'LSU', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 31, opponentScore: 34, offenseEpaPerPlay: 0.18, defenseEpaPerPlay: 0.25, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: -0.06, passEpaPerPlay: 0.22, rushEpaPerPlay: 0.14, offenseSuccessRate: 48.0, defenseSuccessRate: 51.0, explosivePlayRate: 11.0, turnoverEpaMargin: 0.0 },
      { id: '2023-5', season: 2023, week: 5, date: 'Sep 30', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 22, opponentScore: 34, offenseEpaPerPlay: -0.12, defenseEpaPerPlay: 0.08, specialTeamsEpaPerPlay: -0.08, netEpaPerPlay: -0.28, passEpaPerPlay: -0.15, rushEpaPerPlay: -0.09, offenseSuccessRate: 34.0, defenseSuccessRate: 42.0, explosivePlayRate: 5.0, turnoverEpaMargin: -5.5 },
      { id: '2023-6', season: 2023, week: 6, date: 'Oct 7', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: false, result: 'L', arkansasScore: 20, opponentScore: 27, offenseEpaPerPlay: -0.08, defenseEpaPerPlay: 0.05, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: -0.11, passEpaPerPlay: -0.05, rushEpaPerPlay: -0.11, offenseSuccessRate: 36.0, defenseSuccessRate: 41.0, explosivePlayRate: 6.0, turnoverEpaMargin: -1.0 },
      { id: '2023-7', season: 2023, week: 7, date: 'Oct 14', opponent: 'Alabama', opponentLogo: '🐘', isHome: false, result: 'L', arkansasScore: 21, opponentScore: 24, offenseEpaPerPlay: -0.02, defenseEpaPerPlay: 0.06, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: -0.05, passEpaPerPlay: 0.01, rushEpaPerPlay: -0.05, offenseSuccessRate: 39.0, defenseSuccessRate: 42.0, explosivePlayRate: 7.5, turnoverEpaMargin: 1.0 },
      { id: '2023-8', season: 2023, week: 8, date: 'Oct 21', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: true, result: 'L', arkansasScore: 3, opponentScore: 7, offenseEpaPerPlay: -0.32, defenseEpaPerPlay: -0.18, specialTeamsEpaPerPlay: -0.01, netEpaPerPlay: -0.15, passEpaPerPlay: -0.38, rushEpaPerPlay: -0.26, offenseSuccessRate: 25.0, defenseSuccessRate: 31.0, explosivePlayRate: 2.0, turnoverEpaMargin: -3.0 },
      { id: '2023-9', season: 2023, week: 10, date: 'Nov 4', opponent: 'Florida', opponentLogo: '🐊', isHome: false, result: 'W', arkansasScore: 39, opponentScore: 36, offenseEpaPerPlay: 0.22, defenseEpaPerPlay: 0.18, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.06, passEpaPerPlay: 0.28, rushEpaPerPlay: 0.16, offenseSuccessRate: 49.0, defenseSuccessRate: 48.0, explosivePlayRate: 12.5, turnoverEpaMargin: 2.5 },
      { id: '2023-10', season: 2023, week: 11, date: 'Nov 11', opponent: 'Auburn', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 10, opponentScore: 48, offenseEpaPerPlay: -0.28, defenseEpaPerPlay: 0.42, specialTeamsEpaPerPlay: -0.05, netEpaPerPlay: -0.75, passEpaPerPlay: -0.32, rushEpaPerPlay: -0.24, offenseSuccessRate: 27.0, defenseSuccessRate: 60.0, explosivePlayRate: 3.0, turnoverEpaMargin: -7.0 },
      { id: '2023-11', season: 2023, week: 12, date: 'Nov 18', opponent: 'FIU', opponentLogo: '🐾', isHome: true, result: 'W', arkansasScore: 44, opponentScore: 20, offenseEpaPerPlay: 0.28, defenseEpaPerPlay: -0.05, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.37, passEpaPerPlay: 0.35, rushEpaPerPlay: 0.21, offenseSuccessRate: 52.0, defenseSuccessRate: 37.0, explosivePlayRate: 14.0, turnoverEpaMargin: 4.5 },
      { id: '2023-12', season: 2023, week: 13, date: 'Nov 24', opponent: 'Missouri', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 14, opponentScore: 48, offenseEpaPerPlay: -0.22, defenseEpaPerPlay: 0.38, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.64, passEpaPerPlay: -0.25, rushEpaPerPlay: -0.19, offenseSuccessRate: 30.0, defenseSuccessRate: 58.0, explosivePlayRate: 4.0, turnoverEpaMargin: -6.0 }
    ]
  },
  {
    season: 2024,
    record: '7-6',
    headCoach: 'Sam Pittman',
    offensiveCoordinator: 'Bobby Petrino',
    defensiveCoordinator: 'Travis Williams',
    bowlGame: 'AutoZone Liberty Bowl',
    bowlResult: 'W 34-27 vs Duke',
    offenseEpaPerPlay: 0.125,
    defenseEpaPerPlay: 0.018,
    specialTeamsEpaPerPlay: 0.012,
    netEpaPerPlay: 0.119,
    passEpaPerPlay: 0.168,
    rushEpaPerPlay: 0.082,
    offenseSuccessRate: 44.8,
    defenseSuccessRate: 41.2,
    secRankOffenseEpa: 5,
    secRankDefenseEpa: 7,
    nationalRankNetEpa: 34,
    recruitingRankNational: 29,
    recruitingRankSec: 11,
    totalPlays: 896,
    passingYardsPerGame: 258.4,
    rushingYardsPerGame: 191.2,
    turnoverMargin: 3,
    games: [
      { id: '2024-1', season: 2024, week: 1, date: 'Aug 29', opponent: 'UAPB', opponentLogo: '🦁', isHome: true, result: 'W', arkansasScore: 70, opponentScore: 0, offenseEpaPerPlay: 0.65, defenseEpaPerPlay: -0.42, specialTeamsEpaPerPlay: 0.08, netEpaPerPlay: 1.15, passEpaPerPlay: 0.72, rushEpaPerPlay: 0.58, offenseSuccessRate: 68.0, defenseSuccessRate: 18.0, explosivePlayRate: 22.0, turnoverEpaMargin: 9.0 },
      { id: '2024-2', season: 2024, week: 2, date: 'Sep 7', opponent: 'Oklahoma State', opponentLogo: '🤠', isHome: false, result: 'L', arkansasScore: 31, opponentScore: 39, offenseEpaPerPlay: 0.22, defenseEpaPerPlay: 0.18, specialTeamsEpaPerPlay: -0.12, netEpaPerPlay: -0.08, passEpaPerPlay: 0.28, rushEpaPerPlay: 0.16, offenseSuccessRate: 50.0, defenseSuccessRate: 47.0, explosivePlayRate: 14.0, turnoverEpaMargin: -6.5 },
      { id: '2024-3', season: 2024, week: 3, date: 'Sep 14', opponent: 'UAB', opponentLogo: '🐉', isHome: true, result: 'W', arkansasScore: 37, opponentScore: 27, offenseEpaPerPlay: 0.21, defenseEpaPerPlay: 0.08, specialTeamsEpaPerPlay: 0.02, netEpaPerPlay: 0.15, passEpaPerPlay: 0.25, rushEpaPerPlay: 0.17, offenseSuccessRate: 49.0, defenseSuccessRate: 42.0, explosivePlayRate: 12.0, turnoverEpaMargin: 1.5 },
      { id: '2024-4', season: 2024, week: 4, date: 'Sep 21', opponent: 'Auburn', opponentLogo: '🐯', isHome: false, result: 'W', arkansasScore: 24, opponentScore: 14, offenseEpaPerPlay: 0.08, defenseEpaPerPlay: -0.15, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.27, passEpaPerPlay: 0.12, rushEpaPerPlay: 0.04, offenseSuccessRate: 42.0, defenseSuccessRate: 33.0, explosivePlayRate: 9.0, turnoverEpaMargin: 6.0 },
      { id: '2024-5', season: 2024, week: 5, date: 'Sep 28', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 17, opponentScore: 21, offenseEpaPerPlay: -0.02, defenseEpaPerPlay: -0.04, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: 0.00, passEpaPerPlay: 0.01, rushEpaPerPlay: -0.05, offenseSuccessRate: 39.0, defenseSuccessRate: 37.0, explosivePlayRate: 7.0, turnoverEpaMargin: -2.0 },
      { id: '2024-6', season: 2024, week: 6, date: 'Oct 5', opponent: 'Tennessee', opponentLogo: '🍊', isHome: true, result: 'W', arkansasScore: 19, opponentScore: 14, offenseEpaPerPlay: 0.05, defenseEpaPerPlay: -0.18, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.26, passEpaPerPlay: 0.08, rushEpaPerPlay: 0.02, offenseSuccessRate: 41.0, defenseSuccessRate: 31.0, explosivePlayRate: 8.0, turnoverEpaMargin: 4.5 },
      { id: '2024-7', season: 2024, week: 8, date: 'Oct 19', opponent: 'LSU', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 10, opponentScore: 34, offenseEpaPerPlay: -0.18, defenseEpaPerPlay: 0.25, specialTeamsEpaPerPlay: -0.04, netEpaPerPlay: -0.47, passEpaPerPlay: -0.12, rushEpaPerPlay: -0.24, offenseSuccessRate: 32.0, defenseSuccessRate: 51.0, explosivePlayRate: 4.0, turnoverEpaMargin: -5.0 },
      { id: '2024-8', season: 2024, week: 9, date: 'Oct 26', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: false, result: 'W', arkansasScore: 58, opponentScore: 25, offenseEpaPerPlay: 0.48, defenseEpaPerPlay: 0.08, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.43, passEpaPerPlay: 0.55, rushEpaPerPlay: 0.41, offenseSuccessRate: 61.0, defenseSuccessRate: 42.0, explosivePlayRate: 19.0, turnoverEpaMargin: 5.5 },
      { id: '2024-9', season: 2024, week: 10, date: 'Nov 2', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: true, result: 'L', arkansasScore: 31, opponentScore: 63, offenseEpaPerPlay: 0.12, defenseEpaPerPlay: 0.55, specialTeamsEpaPerPlay: 0.01, netEpaPerPlay: -0.42, passEpaPerPlay: 0.18, rushEpaPerPlay: 0.06, offenseSuccessRate: 45.0, defenseSuccessRate: 67.0, explosivePlayRate: 11.0, turnoverEpaMargin: -3.0 },
      { id: '2024-10', season: 2024, week: 12, date: 'Nov 16', opponent: 'Texas', opponentLogo: '🤘', isHome: true, result: 'L', arkansasScore: 10, opponentScore: 20, offenseEpaPerPlay: -0.12, defenseEpaPerPlay: -0.05, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.09, passEpaPerPlay: -0.08, rushEpaPerPlay: -0.16, offenseSuccessRate: 34.0, defenseSuccessRate: 36.0, explosivePlayRate: 5.0, turnoverEpaMargin: -2.5 },
      { id: '2024-11', season: 2024, week: 13, date: 'Nov 23', opponent: 'Louisiana Tech', opponentLogo: '🐶', isHome: true, result: 'W', arkansasScore: 35, opponentScore: 14, offenseEpaPerPlay: 0.25, defenseEpaPerPlay: -0.12, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.40, passEpaPerPlay: 0.29, rushEpaPerPlay: 0.21, offenseSuccessRate: 52.0, defenseSuccessRate: 33.0, explosivePlayRate: 13.5, turnoverEpaMargin: 3.5 },
      { id: '2024-12', season: 2024, week: 14, date: 'Nov 30', opponent: 'Missouri', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 21, opponentScore: 28, offenseEpaPerPlay: 0.02, defenseEpaPerPlay: 0.11, specialTeamsEpaPerPlay: -0.01, netEpaPerPlay: -0.10, passEpaPerPlay: 0.05, rushEpaPerPlay: -0.01, offenseSuccessRate: 40.0, defenseSuccessRate: 44.0, explosivePlayRate: 7.5, turnoverEpaMargin: -1.0 },
      { id: '2024-13', season: 2024, week: 15, date: 'Jan 2', opponent: 'Duke', opponentLogo: '😈', isHome: false, result: 'W', arkansasScore: 34, opponentScore: 27, offenseEpaPerPlay: 0.24, defenseEpaPerPlay: 0.08, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.20, passEpaPerPlay: 0.28, rushEpaPerPlay: 0.20, offenseSuccessRate: 50.0, defenseSuccessRate: 42.0, explosivePlayRate: 12.5, turnoverEpaMargin: 4.0 }
    ]
  },
  {
    season: 2025,
    record: '2-10',
    headCoach: 'Sam Pittman',
    offensiveCoordinator: 'Bobby Petrino',
    defensiveCoordinator: 'Travis Williams',
    offenseEpaPerPlay: -0.085,
    defenseEpaPerPlay: 0.145,
    specialTeamsEpaPerPlay: -0.015,
    netEpaPerPlay: -0.245,
    passEpaPerPlay: -0.065,
    rushEpaPerPlay: -0.105,
    offenseSuccessRate: 36.2,
    defenseSuccessRate: 48.5,
    secRankOffenseEpa: 15,
    secRankDefenseEpa: 14,
    nationalRankNetEpa: 112,
    recruitingRankNational: 31,
    recruitingRankSec: 12,
    totalPlays: 780,
    passingYardsPerGame: 205.0,
    rushingYardsPerGame: 125.5,
    turnoverMargin: -8,
    games: [
      { id: '2025-1', season: 2025, week: 1, date: 'Aug 30', opponent: 'Missouri State', opponentLogo: '🐻', isHome: true, result: 'W', arkansasScore: 38, opponentScore: 10, offenseEpaPerPlay: 0.28, defenseEpaPerPlay: -0.15, specialTeamsEpaPerPlay: 0.04, netEpaPerPlay: 0.47, passEpaPerPlay: 0.32, rushEpaPerPlay: 0.22, offenseSuccessRate: 52.0, defenseSuccessRate: 30.0, explosivePlayRate: 14.0, turnoverEpaMargin: 5.0 },
      { id: '2025-2', season: 2025, week: 2, date: 'Sep 6', opponent: 'Arkansas State', opponentLogo: '🐺', isHome: true, result: 'W', arkansasScore: 31, opponentScore: 17, offenseEpaPerPlay: 0.20, defenseEpaPerPlay: -0.08, specialTeamsEpaPerPlay: 0.03, netEpaPerPlay: 0.31, passEpaPerPlay: 0.25, rushEpaPerPlay: 0.14, offenseSuccessRate: 48.0, defenseSuccessRate: 35.0, explosivePlayRate: 12.0, turnoverEpaMargin: 3.0 },
      { id: '2025-3', season: 2025, week: 3, date: 'Sep 13', opponent: 'Memphis', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 24, opponentScore: 31, offenseEpaPerPlay: -0.05, defenseEpaPerPlay: 0.12, specialTeamsEpaPerPlay: -0.01, netEpaPerPlay: -0.18, passEpaPerPlay: -0.02, rushEpaPerPlay: -0.08, offenseSuccessRate: 38.0, defenseSuccessRate: 46.0, explosivePlayRate: 7.5, turnoverEpaMargin: -2.0 },
      { id: '2025-4', season: 2025, week: 4, date: 'Sep 20', opponent: 'Notre Dame', opponentLogo: '☘️', isHome: true, result: 'L', arkansasScore: 17, opponentScore: 38, offenseEpaPerPlay: -0.22, defenseEpaPerPlay: 0.28, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.52, passEpaPerPlay: -0.18, rushEpaPerPlay: -0.25, offenseSuccessRate: 31.0, defenseSuccessRate: 54.0, explosivePlayRate: 5.0, turnoverEpaMargin: -5.0 },
      { id: '2025-5', season: 2025, week: 5, date: 'Sep 27', opponent: 'Texas A&M', opponentLogo: '👍', isHome: false, result: 'L', arkansasScore: 17, opponentScore: 27, offenseEpaPerPlay: -0.12, defenseEpaPerPlay: 0.15, specialTeamsEpaPerPlay: -0.01, netEpaPerPlay: -0.28, passEpaPerPlay: -0.08, rushEpaPerPlay: -0.15, offenseSuccessRate: 35.0, defenseSuccessRate: 48.0, explosivePlayRate: 6.5, turnoverEpaMargin: -3.0 },
      { id: '2025-6', season: 2025, week: 7, date: 'Oct 11', opponent: 'Tennessee', opponentLogo: '🍊', isHome: false, result: 'L', arkansasScore: 14, opponentScore: 31, offenseEpaPerPlay: -0.18, defenseEpaPerPlay: 0.22, specialTeamsEpaPerPlay: -0.01, netEpaPerPlay: -0.41, passEpaPerPlay: -0.15, rushEpaPerPlay: -0.20, offenseSuccessRate: 33.0, defenseSuccessRate: 52.0, explosivePlayRate: 5.5, turnoverEpaMargin: -4.0 },
      { id: '2025-7', season: 2025, week: 8, date: 'Oct 18', opponent: 'Auburn', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 17, opponentScore: 35, offenseEpaPerPlay: -0.15, defenseEpaPerPlay: 0.25, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.42, passEpaPerPlay: -0.12, rushEpaPerPlay: -0.18, offenseSuccessRate: 34.0, defenseSuccessRate: 53.0, explosivePlayRate: 6.0, turnoverEpaMargin: -4.5 },
      { id: '2025-8', season: 2025, week: 9, date: 'Oct 25', opponent: 'Ole Miss', opponentLogo: '🦈', isHome: false, result: 'L', arkansasScore: 24, opponentScore: 45, offenseEpaPerPlay: -0.02, defenseEpaPerPlay: 0.35, specialTeamsEpaPerPlay: -0.01, netEpaPerPlay: -0.38, passEpaPerPlay: 0.02, rushEpaPerPlay: -0.06, offenseSuccessRate: 39.0, defenseSuccessRate: 58.0, explosivePlayRate: 8.0, turnoverEpaMargin: -3.5 },
      { id: '2025-9', season: 2025, week: 10, date: 'Nov 1', opponent: 'Mississippi State', opponentLogo: '🐶', isHome: true, result: 'L', arkansasScore: 14, opponentScore: 28, offenseEpaPerPlay: -0.20, defenseEpaPerPlay: 0.18, specialTeamsEpaPerPlay: -0.01, netEpaPerPlay: -0.39, passEpaPerPlay: -0.16, rushEpaPerPlay: -0.22, offenseSuccessRate: 32.0, defenseSuccessRate: 50.0, explosivePlayRate: 5.0, turnoverEpaMargin: -4.0 },
      { id: '2025-10', season: 2025, week: 12, date: 'Nov 15', opponent: 'LSU', opponentLogo: '🐯', isHome: false, result: 'L', arkansasScore: 17, opponentScore: 34, offenseEpaPerPlay: -0.16, defenseEpaPerPlay: 0.22, specialTeamsEpaPerPlay: -0.01, netEpaPerPlay: -0.39, passEpaPerPlay: -0.12, rushEpaPerPlay: -0.19, offenseSuccessRate: 33.0, defenseSuccessRate: 51.0, explosivePlayRate: 5.5, turnoverEpaMargin: -3.5 },
      { id: '2025-11', season: 2025, week: 13, date: 'Nov 22', opponent: 'Missouri', opponentLogo: '🐯', isHome: true, result: 'L', arkansasScore: 21, opponentScore: 38, offenseEpaPerPlay: -0.08, defenseEpaPerPlay: 0.25, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.34, passEpaPerPlay: -0.05, rushEpaPerPlay: -0.11, offenseSuccessRate: 37.0, defenseSuccessRate: 54.0, explosivePlayRate: 7.0, turnoverEpaMargin: -3.0 },
      { id: '2025-12', season: 2025, week: 14, date: 'Nov 29', opponent: 'Texas', opponentLogo: '🤘', isHome: false, result: 'L', arkansasScore: 10, opponentScore: 31, offenseEpaPerPlay: -0.25, defenseEpaPerPlay: 0.22, specialTeamsEpaPerPlay: -0.02, netEpaPerPlay: -0.48, passEpaPerPlay: -0.22, rushEpaPerPlay: -0.28, offenseSuccessRate: 29.0, defenseSuccessRate: 52.0, explosivePlayRate: 4.0, turnoverEpaMargin: -5.0 }
    ]
  }
];

// Process raw seasons to inject full stuff rate, opportunity rate, efficiency grades, and DVOA data across all seasons and games
export const RAZORBACKS_SEASONS: SeasonData[] = RAW_RAZORBACKS_SEASONS.map((seasonObj) => {
  const seasonStats = SEASON_RUSH_ANALYTICS[seasonObj.season] || {
    stuffRate: 16.5,
    opportunityRate: 48.0,
    defensiveStuffRate: 17.5,
    defensiveOpportunityRate: 46.0,
    pointsPerDrive: 2.15,
    defensivePointsPerDrive: 2.15,
    availableYardsPct: 45.0,
    defensiveAvailableYardsPct: 45.0,
    explosivePlayPct: 12.0,
    defensiveExplosivePlayPct: 12.0,
    aggressivenessIndex: 1.0,
    fourthDownGoRate: 50.0,
    fourthDownSuccessRate: 50.0
  };

  const gradesDvoaStats = SEASON_ADV_GRADES_DVOA[seasonObj.season] || {
    overallGrade: 72.0,
    offenseGrade: 72.0,
    defenseGrade: 72.0,
    specialTeamsGrade: 70.0,
    passBlockingGrade: 70.0,
    runBlockingGrade: 72.0,
    coverageGrade: 70.0,
    passRushGrade: 70.0,
    dvoaTotalPct: 0.0,
    dvoaOffensePct: 0.0,
    dvoaDefensePct: 0.0,
    dvoaSpecialTeamsPct: 0.0,
    dvoaNationalRank: 60
  };

  const tradStats = SEASON_TRADITIONAL_STATS[seasonObj.season] || {
    pointsPerGame: 28.0,
    defensivePointsPerGame: 28.0,
    totalYardsPerGame: 390.0,
    defensiveTotalYardsPerGame: 390.0,
    oppPassingYardsPerGame: 220.0,
    oppRushingYardsPerGame: 170.0,
    yardsPerPlay: 5.80,
    oppYardsPerPlay: 5.80,
    thirdDownConvPct: 40.0,
    oppThirdDownConvPct: 40.0,
    fourthDownConvPct: 50.0,
    redZoneTdPct: 62.0,
    sacksPerGame: 2.0,
    sacksAllowedPerGame: 2.0,
    turnoversLostPerGame: 1.4,
    turnoversGainedPerGame: 1.4,
    timeOfPossession: '30:00',
    completionPct: 60.0
  };

  const advPassStats = SEASON_ADVANCED_PASSING_RECEIVING[seasonObj.season] || {
    cpoe: 0.0,
    yardsPerRouteRun: 2.0,
    passerRatingClean: 130.0,
    passerRatingPressure: 80.0,
    airYardsPerAttempt: 8.5,
    totalAirYards: 2400,
    pressureRateAllowed: 30.0,
    pressureRateGenerated: 34.0,
    passRushWinRate: 38.0,
    coverageDisruptionRate: 12.0,
    interceptionsCount: 10,
    passBreakupsCount: 42
  };

  const processedGames = seasonObj.games.map((g: any) => {
    const rushEpa = g.rushEpaPerPlay ?? 0;
    const defEpa = g.defenseEpaPerPlay ?? 0;
    const netEpa = g.netEpaPerPlay ?? 0;
    const offEpa = g.offenseEpaPerPlay ?? 0;
    const passEpa = g.passEpaPerPlay ?? 0;

    const gameStuffRate = Math.max(5.0, Math.min(35.0, Number((seasonStats.stuffRate - rushEpa * 14 + ((g.week % 3) - 1) * 0.9).toFixed(1))));
    const gameOppRate = Math.max(20.0, Math.min(75.0, Number((seasonStats.opportunityRate + rushEpa * 20 + ((g.week % 4) - 1.5) * 1.3).toFixed(1))));
    const gameDefStuffRate = Math.max(5.0, Math.min(35.0, Number((seasonStats.defensiveStuffRate - defEpa * 16 + ((g.week % 2) - 0.5) * 1.1).toFixed(1))));
    const gameDefOppRate = Math.max(20.0, Math.min(75.0, Number((seasonStats.defensiveOpportunityRate + defEpa * 22 - ((g.week % 3) - 1) * 0.9).toFixed(1))));

    const gameOverallGrade = Math.max(45.0, Math.min(99.0, Number((gradesDvoaStats.overallGrade + netEpa * 24 + (g.result === 'W' ? 3.5 : -3.5)).toFixed(1))));
    const gameOffenseGrade = Math.max(45.0, Math.min(99.0, Number((gradesDvoaStats.offenseGrade + offEpa * 22).toFixed(1))));
    const gameDefenseGrade = Math.max(45.0, Math.min(99.0, Number((gradesDvoaStats.defenseGrade - defEpa * 22).toFixed(1))));
    const gameDvoaTotal = Number((gradesDvoaStats.dvoaTotalPct + netEpa * 32).toFixed(1));
    const gameDvoaOffense = Number((gradesDvoaStats.dvoaOffensePct + offEpa * 28).toFixed(1));
    const gameDvoaDefense = Number((gradesDvoaStats.dvoaDefensePct + defEpa * 28).toFixed(1));

    // Advanced Passing / Receiving & Defense Metrics
    const gameCpoe = Number((advPassStats.cpoe + passEpa * 15 + ((g.week % 3) - 1) * 1.2).toFixed(1));
    const gameYprr = Number((advPassStats.yardsPerRouteRun + passEpa * 1.6 + ((g.week % 2) - 0.5) * 0.25).toFixed(2));
    const gameRatingClean = Math.max(40.0, Math.min(158.3, Number((advPassStats.passerRatingClean + passEpa * 38).toFixed(1))));
    const gameRatingPressure = Math.max(20.0, Math.min(140.0, Number((advPassStats.passerRatingPressure + passEpa * 30).toFixed(1))));
    const gameAdot = Number((advPassStats.airYardsPerAttempt + passEpa * 1.4).toFixed(1));
    const gamePressAllowed = Math.max(12.0, Math.min(55.0, Number((advPassStats.pressureRateAllowed - passEpa * 12.0).toFixed(1))));
    const gamePressGen = Math.max(15.0, Math.min(60.0, Number((advPassStats.pressureRateGenerated - defEpa * 14.0).toFixed(1))));
    const gameRushWinRate = Math.max(18.0, Math.min(65.0, Number((advPassStats.passRushWinRate - defEpa * 12.0).toFixed(1))));
    const gameCovDisrupt = Math.max(4.0, Math.min(28.0, Number((advPassStats.coverageDisruptionRate - defEpa * 6.5).toFixed(1))));

    // Traditional game stats calculations
    const passYards = Math.max(80, Math.round((g.passEpaPerPlay > 0 ? seasonObj.passingYardsPerGame + g.passEpaPerPlay * 110 : seasonObj.passingYardsPerGame + g.passEpaPerPlay * 85) + ((g.week % 5) - 2) * 12));
    const rushYards = Math.max(40, Math.round((g.rushEpaPerPlay > 0 ? seasonObj.rushingYardsPerGame + g.rushEpaPerPlay * 100 : seasonObj.rushingYardsPerGame + g.rushEpaPerPlay * 75) + ((g.week % 3) - 1) * 10));
    const totalYards = passYards + rushYards;
    const gameAirYards = Math.round(passYards * (0.58 + passEpa * 0.12));

    const oppPassYards = Math.max(70, Math.round((g.defenseEpaPerPlay > 0 ? tradStats.oppPassingYardsPerGame + g.defenseEpaPerPlay * 100 : tradStats.oppPassingYardsPerGame + g.defenseEpaPerPlay * 80) + ((g.week % 4) - 2) * 12));
    const oppRushYards = Math.max(35, Math.round((g.defenseEpaPerPlay > 0 ? tradStats.oppRushingYardsPerGame + g.defenseEpaPerPlay * 90 : tradStats.oppRushingYardsPerGame + g.defenseEpaPerPlay * 70) + ((g.week % 3) - 1) * 8));
    const oppTotalYards = oppPassYards + oppRushYards;

    const firstDowns = Math.max(10, Math.round(totalYards / 18.5));
    const oppFirstDowns = Math.max(8, Math.round(oppTotalYards / 19.0));

    const convMade = Math.max(2, Math.round(g.offenseSuccessRate / 7.2));
    const convAtt = convMade + Math.max(4, Math.round((100 - g.offenseSuccessRate) / 5.8));
    const thirdDowns = `${convMade}-${convAtt}`;

    const oppConvMade = Math.max(2, Math.round(g.defenseSuccessRate / 7.5));
    const oppConvAtt = oppConvMade + Math.max(4, Math.round((100 - g.defenseSuccessRate) / 6.0));
    const oppThirdDowns = `${oppConvMade}-${oppConvAtt}`;

    const turnoversGiven = g.turnoverEpaMargin < 0 ? Math.min(5, Math.ceil(Math.abs(g.turnoverEpaMargin) / 2.2)) : Math.max(0, (g.week % 2));
    const turnoversTaken = g.turnoverEpaMargin > 0 ? Math.min(6, Math.ceil(g.turnoverEpaMargin / 2.0)) : Math.max(0, ((g.week + 1) % 2));

    const penaltiesCount = 4 + (g.week % 4);
    const penaltiesYards = `${penaltiesCount}-${penaltiesCount * 9}`;
    const topMins = 27 + (g.result === 'W' ? 3 : -2) + (g.week % 3);
    const timeOfPossession = `${topMins}:${(g.week * 13) % 60 < 10 ? '0' : ''}${(g.week * 13) % 60}`;

    return {
      ...g,
      stuffRate: gameStuffRate,
      opportunityRate: gameOppRate,
      defensiveStuffRate: gameDefStuffRate,
      defensiveOpportunityRate: gameDefOppRate,
      overallGrade: gameOverallGrade,
      offenseGrade: gameOffenseGrade,
      defenseGrade: gameDefenseGrade,
      dvoaTotalPct: gameDvoaTotal,
      dvoaOffensePct: gameDvoaOffense,
      dvoaDefensePct: gameDvoaDefense,
      cpoe: gameCpoe,
      yardsPerRouteRun: gameYprr,
      passerRatingClean: gameRatingClean,
      passerRatingPressure: gameRatingPressure,
      airYardsPerAttempt: gameAdot,
      totalAirYards: gameAirYards,
      pressureRateAllowed: gamePressAllowed,
      pressureRateGenerated: gamePressGen,
      passRushWinRate: gameRushWinRate,
      runStopWinRate: (advPassStats as any).runStopWinRate ?? 34.2,
      passBlockWinRate: (advPassStats as any).passBlockWinRate ?? 72.8,
      receiverSeparation: (advPassStats as any).receiverSeparation ?? 3.22,
      targetSeparation: (advPassStats as any).targetSeparation ?? 2.85,
      burnRate: (advPassStats as any).burnRate ?? 8.4,
      coverageEpaPerPlay: (advPassStats as any).coverageEpaPerPlay ?? -0.082,
      ryoePerCarry: (advPassStats as any).ryoePerCarry ?? 0.68,
      yardsAfterContactPerAttempt: (advPassStats as any).yardsAfterContactPerAttempt ?? 3.52,
      epaCpoeComposite: (advPassStats as any).epaCpoeComposite ?? 0.142,
      coverageDisruptionRate: gameCovDisrupt,
      interceptionsCount: turnoversTaken,
      passBreakupsCount: Math.max(1, Math.round(advPassStats.passBreakupsCount / 12 + (defEpa < 0 ? 1 : 0))),
      passingYards: passYards,
      rushingYards: rushYards,
      totalYards: totalYards,
      oppPassingYards: oppPassYards,
      oppRushingYards: oppRushYards,
      oppTotalYards: oppTotalYards,
      firstDowns: firstDowns,
      oppFirstDowns: oppFirstDowns,
      thirdDowns: thirdDowns,
      oppThirdDowns: oppThirdDowns,
      fourthDowns: g.result === 'W' ? '1-1' : '1-3',
      turnoversGiven: turnoversGiven,
      turnoversTaken: turnoversTaken,
      penaltiesYards: penaltiesYards,
      timeOfPossession: timeOfPossession,
      sacksRecorded: Math.max(0, Math.round(tradStats.sacksPerGame + (g.result === 'W' ? 1 : -1) + (g.week % 2))),
      sacksAllowed: Math.max(0, Math.round(tradStats.sacksAllowedPerGame + (g.result === 'L' ? 1 : 0) + (g.week % 2)))
    };
  });

  return {
    ...seasonObj,
    stuffRate: seasonStats.stuffRate,
    opportunityRate: seasonStats.opportunityRate,
    defensiveStuffRate: seasonStats.defensiveStuffRate,
    defensiveOpportunityRate: seasonStats.defensiveOpportunityRate,
    pointsPerDrive: seasonStats.pointsPerDrive,
    defensivePointsPerDrive: seasonStats.defensivePointsPerDrive,
    availableYardsPct: seasonStats.availableYardsPct,
    defensiveAvailableYardsPct: seasonStats.defensiveAvailableYardsPct,
    explosivePlayPct: seasonStats.explosivePlayPct,
    defensiveExplosivePlayPct: seasonStats.defensiveExplosivePlayPct,
    aggressivenessIndex: seasonStats.aggressivenessIndex,
    fourthDownGoRate: seasonStats.fourthDownGoRate,
    fourthDownSuccessRate: seasonStats.fourthDownSuccessRate,
    ...gradesDvoaStats,
    ...advPassStats,
    ...tradStats,
    games: processedGames
  };
});

export const ERAS_SUMMARY: EraSummary[] = [
  {
    eraName: 'Bret Bielema Era',
    headCoach: 'Bret Bielema',
    years: '2014 – 2017',
    seasonsCount: 4,
    totalGames: 52,
    winLossRecord: '26-26',
    winPercentage: 50.0,
    avgOffenseEpa: 0.092,
    avgDefenseEpa: 0.050,
    avgSpecialTeamsEpa: -0.011,
    avgNetEpa: 0.031,
    avgOffensePPD: 2.29,
    avgDefensePPD: 2.31,
    avgOffenseAYPct: 49.2,
    avgDefenseAYPct: 47.5,
    avgExplosivePlayPct: 12.1,
    avgDefensiveExplosivePlayPct: 12.1,
    aggressivenessIndex: 0.94,
    fourthDownGoRate: 43.6,
    fourthDownSuccessRate: 52.3,
    avgPPG: 31.7,
    avgOppPPG: 28.5,
    avgTotalYPG: 418.5,
    avgOppTotalYPG: 395.1,
    avgYardsPerPlay: 6.06,
    avgThirdDownPct: 44.0,
    avgSacksPerGame: 1.82,
    highlightSeason: 2015,
    description: 'Characterized by heavy pro-style running with Alex Collins & Jonathan Williams, traditional 4th down decision-making, Brandon Allen under Dan Enos (2015), and elite defense in 2014.'
  },
  {
    eraName: 'Chad Morris Era',
    headCoach: 'Chad Morris',
    years: '2018 – 2019',
    seasonsCount: 2,
    totalGames: 24,
    winLossRecord: '4-20',
    winPercentage: 16.7,
    avgOffenseEpa: -0.141,
    avgDefenseEpa: 0.169,
    avgSpecialTeamsEpa: -0.048,
    avgNetEpa: -0.358,
    avgOffensePPD: 1.35,
    avgDefensePPD: 2.89,
    avgOffenseAYPct: 35.4,
    avgDefenseAYPct: 55.4,
    avgExplosivePlayPct: 8.4,
    avgDefensiveExplosivePlayPct: 15.2,
    aggressivenessIndex: 1.05,
    fourthDownGoRate: 48.0,
    fourthDownSuccessRate: 38.5,
    avgPPG: 21.6,
    avgOppPPG: 35.8,
    avgTotalYPG: 337.9,
    avgOppTotalYPG: 432.0,
    avgYardsPerPlay: 5.10,
    avgThirdDownPct: 32.1,
    avgSacksPerGame: 1.96,
    highlightSeason: 2018,
    description: 'Failed transition to up-tempo spread offense resulting in severe offensive inefficiencies, high risk/low reward 4th down decisions (38.5% conversion), and zero SEC victories.'
  },
  {
    eraName: 'Sam Pittman Era',
    headCoach: 'Sam Pittman',
    years: '2020 – 2025',
    seasonsCount: 6,
    totalGames: 73,
    winLossRecord: '32-41',
    winPercentage: 43.8,
    avgOffenseEpa: 0.055,
    avgDefenseEpa: 0.048,
    avgSpecialTeamsEpa: 0.005,
    avgNetEpa: 0.007,
    avgOffensePPD: 2.18,
    avgDefensePPD: 2.23,
    avgOffenseAYPct: 47.3,
    avgDefenseAYPct: 46.1,
    avgExplosivePlayPct: 12.0,
    avgDefensiveExplosivePlayPct: 11.2,
    aggressivenessIndex: 1.25,
    fourthDownGoRate: 61.0,
    fourthDownSuccessRate: 54.7,
    avgPPG: 29.6,
    avgOppPPG: 28.5,
    avgTotalYPG: 414.0,
    avgOppTotalYPG: 409.4,
    avgYardsPerPlay: 5.87,
    avgThirdDownPct: 40.1,
    avgSacksPerGame: 2.31,
    highlightSeason: 2021,
    description: 'Highly aggressive 4th-down go-for-it strategy (1.25 Aggressiveness Index) heavily utilizing KJ Jefferson power runs, highlighted by the 9-4 Outback Bowl championship season.'
  }
];

export const SITUATIONAL_SPLITS: SituationalSplit[] = [
  { category: '1st Down Plays', offenseEpa: 0.112, defenseEpa: -0.015, successRate: 48.5, stuffRate: 15.1, opportunityRate: 51.2 },
  { category: '2nd Down Plays', offenseEpa: 0.085, defenseEpa: 0.022, successRate: 44.2, stuffRate: 17.8, opportunityRate: 46.5 },
  { category: '3rd & Short (1-3 yds)', offenseEpa: 0.285, defenseEpa: -0.120, successRate: 64.8, stuffRate: 9.2, opportunityRate: 68.4 },
  { category: '3rd & Long (7+ yds)', offenseEpa: -0.045, defenseEpa: 0.118, successRate: 31.0, stuffRate: 28.5, opportunityRate: 24.1 },
  { category: 'Red Zone (Inside 20)', offenseEpa: 0.245, defenseEpa: 0.045, successRate: 58.2, stuffRate: 12.4, opportunityRate: 55.8 },
  { category: 'Garbage Time Excluded', offenseEpa: 0.078, defenseEpa: 0.028, successRate: 43.8, stuffRate: 16.5, opportunityRate: 48.2 }
];
