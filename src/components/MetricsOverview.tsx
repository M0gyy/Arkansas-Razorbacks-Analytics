import React, { useState } from 'react';
import { SeasonData } from '../types';
import { Shield, ShieldAlert, Zap, Award, Activity, TrendingUp, TrendingDown, Flame, BarChart3, Target, Clock, Trophy } from 'lucide-react';

interface MetricsOverviewProps {
  seasons: SeasonData[];
  selectedSeason: number | 'ALL';
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ seasons, selectedSeason }) => {
  const [viewMode, setViewMode] = useState<'advanced' | 'all15' | 'passing' | 'traditional'>('advanced');

  const isAll = selectedSeason === 'ALL';
  const activeData = isAll
    ? seasons
    : seasons.filter((s) => s.season === selectedSeason);

  // Calculate averages or selected season values
  const count = activeData.length || 1;

  // Advanced EPA & Performance stats
  const avgOffEpa = activeData.reduce((acc, s) => acc + s.offenseEpaPerPlay, 0) / count;
  const avgDefEpa = activeData.reduce((acc, s) => acc + s.defenseEpaPerPlay, 0) / count;
  const avgStEpa = activeData.reduce((acc, s) => acc + s.specialTeamsEpaPerPlay, 0) / count;
  const avgNetEpa = activeData.reduce((acc, s) => acc + s.netEpaPerPlay, 0) / count;
  const avgPassEpa = activeData.reduce((acc, s) => acc + s.passEpaPerPlay, 0) / count;
  const avgRushEpa = activeData.reduce((acc, s) => acc + s.rushEpaPerPlay, 0) / count;
  const avgSuccessRate = activeData.reduce((acc, s) => acc + s.offenseSuccessRate, 0) / count;
  const avgDefSuccessRate = activeData.reduce((acc, s) => acc + s.defenseSuccessRate, 0) / count;
  const totalPlays = activeData.reduce((acc, s) => acc + s.totalPlays, 0);

  const avgStuffRate = activeData.reduce((acc, s) => acc + s.stuffRate, 0) / count;
  const avgOpportunityRate = activeData.reduce((acc, s) => acc + s.opportunityRate, 0) / count;
  const avgDefStuffRate = activeData.reduce((acc, s) => acc + s.defensiveStuffRate, 0) / count;
  const avgDefOppRate = activeData.reduce((acc, s) => acc + s.defensiveOpportunityRate, 0) / count;

  // 15 Core Advanced Analytics Categories
  const avgCpoe = activeData.reduce((acc, s) => acc + (s.cpoe ?? 0), 0) / count;
  const avgEpaCpoeComposite = activeData.reduce((acc, s) => acc + (s.epaCpoeComposite ?? 0.142), 0) / count;
  const avgRyoePerCarry = activeData.reduce((acc, s) => acc + (s.ryoePerCarry ?? 0.68), 0) / count;
  const avgYacPerAttempt = activeData.reduce((acc, s) => acc + (s.yardsAfterContactPerAttempt ?? 3.52), 0) / count;
  const avgRunStopWinRate = activeData.reduce((acc, s) => acc + (s.runStopWinRate ?? 34.2), 0) / count;
  const avgPassBlockWinRate = activeData.reduce((acc, s) => acc + (s.passBlockWinRate ?? 72.8), 0) / count;
  const avgReceiverSeparation = activeData.reduce((acc, s) => acc + (s.receiverSeparation ?? 3.22), 0) / count;
  const avgTargetSeparation = activeData.reduce((acc, s) => acc + (s.targetSeparation ?? 2.85), 0) / count;
  const avgBurnRate = activeData.reduce((acc, s) => acc + (s.burnRate ?? 8.4), 0) / count;
  const avgCoverageEpa = activeData.reduce((acc, s) => acc + (s.coverageEpaPerPlay ?? -0.082), 0) / count;

  // Advanced Passing & Receiving Stats
  const avgYprr = activeData.reduce((acc, s) => acc + (s.yardsPerRouteRun ?? 2.1), 0) / count;
  const avgCleanRating = activeData.reduce((acc, s) => acc + (s.passerRatingClean ?? 145.0), 0) / count;
  const avgPressureRating = activeData.reduce((acc, s) => acc + (s.passerRatingPressure ?? 85.0), 0) / count;
  const avgAdot = activeData.reduce((acc, s) => acc + (s.airYardsPerAttempt ?? 8.8), 0) / count;
  const avgTotalAirYards = activeData.reduce((acc, s) => acc + (s.totalAirYards ?? 2500), 0) / count;
  const avgPressAllowed = activeData.reduce((acc, s) => acc + (s.pressureRateAllowed ?? 31.0), 0) / count;
  const avgPressGen = activeData.reduce((acc, s) => acc + (s.pressureRateGenerated ?? 33.5), 0) / count;
  const avgRushWinRate = activeData.reduce((acc, s) => acc + (s.passRushWinRate ?? 37.0), 0) / count;
  const avgCovDisrupt = activeData.reduce((acc, s) => acc + (s.coverageDisruptionRate ?? 12.0), 0) / count;
  const avgInts = activeData.reduce((acc, s) => acc + (s.interceptionsCount ?? 10), 0) / count;
  const avgPbus = activeData.reduce((acc, s) => acc + (s.passBreakupsCount ?? 42), 0) / count;

  // Traditional Statistics
  const avgPpg = activeData.reduce((acc, s) => acc + (s.pointsPerGame || 28.0), 0) / count;
  const avgOppPpg = activeData.reduce((acc, s) => acc + (s.defensivePointsPerGame || 28.0), 0) / count;
  const avgTotalYpg = activeData.reduce((acc, s) => acc + (s.totalYardsPerGame || 400.0), 0) / count;
  const avgOppTotalYpg = activeData.reduce((acc, s) => acc + (s.defensiveTotalYardsPerGame || 400.0), 0) / count;
  const avgPassYpg = activeData.reduce((acc, s) => acc + s.passingYardsPerGame, 0) / count;
  const avgRushYpg = activeData.reduce((acc, s) => acc + s.rushingYardsPerGame, 0) / count;
  const avgOppPassYpg = activeData.reduce((acc, s) => acc + (s.oppPassingYardsPerGame || 220.0), 0) / count;
  const avgOppRushYpg = activeData.reduce((acc, s) => acc + (s.oppRushingYardsPerGame || 170.0), 0) / count;
  const avgYpp = activeData.reduce((acc, s) => acc + (s.yardsPerPlay || 5.8), 0) / count;
  const avgOppYpp = activeData.reduce((acc, s) => acc + (s.oppYardsPerPlay || 5.8), 0) / count;
  const avgThirdDownPct = activeData.reduce((acc, s) => acc + (s.thirdDownConvPct || 40.0), 0) / count;
  const avgOppThirdDownPct = activeData.reduce((acc, s) => acc + (s.oppThirdDownConvPct || 40.0), 0) / count;
  const avgSacks = activeData.reduce((acc, s) => acc + (s.sacksPerGame || 2.2), 0) / count;
  const avgSacksAllowed = activeData.reduce((acc, s) => acc + (s.sacksAllowedPerGame || 2.2), 0) / count;
  const avgTurnoverMargin = activeData.reduce((acc, s) => acc + s.turnoverMargin, 0) / count;
  const avgCompletionPct = activeData.reduce((acc, s) => acc + (s.completionPct || 60.0), 0) / count;

  const selectedSeasonData = !isAll ? activeData[0] : null;

  return (
    <div className="space-y-4 mb-6">
      
      {/* Category Toggle Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 shadow-xs gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 pl-2">
            Metric Display Mode
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs w-full sm:w-auto">
          <button
            onClick={() => setViewMode('advanced')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'advanced'
                ? 'bg-red-950 text-red-300 border border-red-800/80 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Advanced EPA & Analytics</span>
          </button>
          <button
            onClick={() => setViewMode('all15')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'all15'
                ? 'bg-red-950 text-red-300 border border-red-800/80 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-red-400" />
            <span>15 Advanced Categories</span>
          </button>
          <button
            onClick={() => setViewMode('passing')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'passing'
                ? 'bg-red-950 text-red-300 border border-red-800/80 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>CPOE, YPRR & Air Yards</span>
          </button>
          <button
            onClick={() => setViewMode('traditional')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'traditional'
                ? 'bg-red-950 text-red-300 border border-red-800/80 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Traditional Stats</span>
          </button>
        </div>
      </div>

      {viewMode === 'advanced' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. OFFENSIVE EPA CARD */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Zap className="w-4.5 h-4.5 text-emerald-400" />
                  Offensive EPA
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                  avgOffEpa >= 0.1 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80' : 'bg-neutral-800 text-neutral-300'
                }`}>
                  {avgOffEpa >= 0.1 ? 'Above Avg' : avgOffEpa >= 0 ? 'Moderate' : 'Below SEC Avg'}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgOffEpa > 0 ? `+${avgOffEpa.toFixed(3)}` : avgOffEpa.toFixed(3)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">/ play</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-sm text-neutral-300 font-medium">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">Pass: {avgPassEpa > 0 ? `+${avgPassEpa.toFixed(2)}` : avgPassEpa.toFixed(2)}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-teal-300">Rush: {avgRushEpa > 0 ? `+${avgRushEpa.toFixed(2)}` : avgRushEpa.toFixed(2)}</span>
                </div>
                <span className="text-neutral-400">{avgSuccessRate.toFixed(1)}% Succ</span>
              </div>
            </div>

            {/* 2. DEFENSIVE EPA CARD */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Shield className="w-4.5 h-4.5 text-amber-400" />
                  Defense EPA Allowed
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                  avgDefEpa <= 0 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80' : 'bg-rose-950 text-rose-300 border border-rose-800/80'
                }`}>
                  {avgDefEpa <= 0 ? 'Negative (Good)' : 'Positive (High)'}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgDefEpa > 0 ? `+${avgDefEpa.toFixed(3)}` : avgDefEpa.toFixed(3)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">allowed / play</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-sm text-neutral-300 font-medium">
                <div className="flex items-center space-x-1">
                  {avgDefEpa <= 0 ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" /> Suppressing EPA
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> Giving Up Value
                    </span>
                  )}
                </div>
                <span className="text-neutral-400">
                  {selectedSeasonData ? `SEC Rank #${selectedSeasonData.secRankDefenseEpa}` : '12 Seasons'}
                </span>
              </div>
            </div>

            {/* 3. SPECIAL TEAMS EPA CARD */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Activity className="w-4.5 h-4.5 text-sky-400" />
                  Special Teams EPA
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
                  Field Position
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgStEpa > 0 ? `+${avgStEpa.toFixed(3)}` : avgStEpa.toFixed(3)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">/ play</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-sm text-neutral-300 font-medium">
                <span className="text-sky-300">Punts, Return & FG</span>
                <span className="text-neutral-400">{totalPlays.toLocaleString()} plays</span>
              </div>
            </div>

            {/* 4. NET EPA & RANK CARD */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Award className="w-4.5 h-4.5 text-red-400" />
                  Net Total EPA
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-red-950 text-red-300 border border-red-800/80">
                  Efficiency Margin
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgNetEpa > 0 ? `+${avgNetEpa.toFixed(3)}` : avgNetEpa.toFixed(3)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">Net EPA</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-sm text-neutral-300 font-medium">
                {selectedSeasonData ? (
                  <>
                    <span className="text-red-300">{selectedSeasonData.record} ({selectedSeasonData.headCoach})</span>
                    <span className="text-neutral-400">Natl #{selectedSeasonData.nationalRankNetEpa}</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-300">Peak: 2021 (+0.227)</span>
                    <span className="text-neutral-400">2014–2025</span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Rushing & Trench Analytics Banner: Stuff Rate & Opportunity Rate */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-neutral-800 pb-3 md:pb-0 md:pr-4">
              <div className="p-2.5 bg-red-950/80 border border-red-800/60 rounded-xl text-red-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Trench & Line Play Metrics</span>
                  <span className="bg-neutral-800 text-neutral-300 text-[10px] px-2 py-0.5 rounded">Rushing Control</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {isAll ? '12-Season Averages' : `${selectedSeason} Season`} • Line of scrimmage dominance & 4+ yard run efficiency
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 text-xs">
              
              {/* Stuff Rate */}
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="font-semibold text-neutral-300">Stuff Rate</span>
                  <span className="text-[9px] text-neutral-500 uppercase">Offense (≤0 yd)</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`font-mono font-bold text-base ${
                    avgStuffRate <= 15.5 ? 'text-emerald-400' : avgStuffRate <= 19.0 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {avgStuffRate.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {avgStuffRate <= 15.5 ? 'Elite O-Line' : avgStuffRate <= 19.0 ? 'Average' : 'High TFLs'}
                  </span>
                </div>
              </div>

              {/* Opportunity Rate */}
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="font-semibold text-neutral-300">Opportunity Rate</span>
                  <span className="text-[9px] text-neutral-500 uppercase">Offense (≥4 yd)</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`font-mono font-bold text-base ${
                    avgOpportunityRate >= 50.0 ? 'text-emerald-400' : avgOpportunityRate >= 43.0 ? 'text-teal-300' : 'text-rose-400'
                  }`}>
                    {avgOpportunityRate.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {avgOpportunityRate >= 50.0 ? 'Strong Blocking' : 'Moderate'}
                  </span>
                </div>
              </div>

              {/* Defensive Stuff Rate */}
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="font-semibold text-neutral-300">Def Stuff Rate</span>
                  <span className="text-[9px] text-neutral-500 uppercase">Def TFL/Stuffs</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`font-mono font-bold text-base ${
                    avgDefStuffRate >= 18.0 ? 'text-emerald-400' : 'text-amber-300'
                  }`}>
                    {avgDefStuffRate.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {avgDefStuffRate >= 18.0 ? 'Disruptive Front' : 'Standard'}
                  </span>
                </div>
              </div>

              {/* Defensive Opportunity Rate */}
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="font-semibold text-neutral-300">Def Opp Allowed</span>
                  <span className="text-[9px] text-neutral-500 uppercase">Opponent ≥4yd</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`font-mono font-bold text-base ${
                    avgDefOppRate <= 44.0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {avgDefOppRate.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {avgDefOppRate <= 44.0 ? 'Stout D-Line' : 'Gashing Allowed'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </>
      ) : viewMode === 'all15' ? (
        /* 15 ADVANCED CATEGORIES GRID SHOWCASE */
        <div className="space-y-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white uppercase tracking-wider">
                  15 Core Advanced Analytics Categories
                </span>
                <span className="bg-red-950 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded border border-red-800">
                  Full Analytics Suite
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Comprehensive tracking metrics covering EPA, CPOE, Composite Efficiency, Line Win Rates, Separation, and Coverage EPA.
              </p>
            </div>
            <div className="text-xs text-neutral-400 font-mono bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
              {isAll ? '12-Season Averages (2014-2025)' : `${selectedSeason} Season Metrics`}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* 1. Expected Points Added (EPA) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> 1. Expected Points Added (EPA)
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">EPA/Play</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgOffEpa > 0 ? `+${avgOffEpa.toFixed(3)}` : avgOffEpa.toFixed(3)} <span className="text-xs text-neutral-400 font-normal">Offense</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80 flex justify-between">
                <span>Pass: {avgPassEpa > 0 ? `+${avgPassEpa.toFixed(2)}` : avgPassEpa.toFixed(2)}</span>
                <span>Rush: {avgRushEpa > 0 ? `+${avgRushEpa.toFixed(2)}` : avgRushEpa.toFixed(2)}</span>
                <span className="text-amber-400">Def: {avgDefEpa > 0 ? `+${avgDefEpa.toFixed(2)}` : avgDefEpa.toFixed(2)}</span>
              </div>
            </div>

            {/* 2. Completion Percentage Over Expected (CPOE) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> 2. CPOE
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">Accuracy</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgCpoe >= 0 ? `+${avgCpoe.toFixed(1)}%` : `${avgCpoe.toFixed(1)}%`}
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Completion % relative to pass difficulty baseline.
              </p>
            </div>

            {/* 3. EPA + CPOE Composite */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> 3. EPA + CPOE Composite
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">Composite</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgEpaCpoeComposite.toFixed(3)}
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Combined efficiency metric weighting EPA & CPOE.
              </p>
            </div>

            {/* 4. Success Rate */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> 4. Success Rate
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Consistency</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgSuccessRate.toFixed(1)}% <span className="text-xs text-neutral-400 font-normal">Offense</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80 flex justify-between">
                <span>Def Allowed: <span className="text-amber-400 font-mono">{avgDefSuccessRate.toFixed(1)}%</span></span>
                <span>Margin: <span className="text-emerald-400 font-mono">{(avgSuccessRate - avgDefSuccessRate) > 0 ? `+${(avgSuccessRate - avgDefSuccessRate).toFixed(1)}%` : `${(avgSuccessRate - avgDefSuccessRate).toFixed(1)}%`}</span></span>
              </div>
            </div>

            {/* 5. Rush Yards Over Expected (RYOE) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> 5. RYOE (Rush Yards Over Expected)
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Rush Vision</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgRyoePerCarry >= 0 ? `+${avgRyoePerCarry.toFixed(2)}` : avgRyoePerCarry.toFixed(2)} <span className="text-xs text-neutral-400 font-normal">Yds / carry</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Rushing yards gained beyond expected blocking model.
              </p>
            </div>

            {/* 6. Yards After Contact Per Attempt */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> 6. Yards After Contact / Att
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">Elusiveness</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgYacPerAttempt.toFixed(2)} <span className="text-xs text-neutral-400 font-normal">YAC / Att</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Average rushing yards created after initial contact.
              </p>
            </div>

            {/* 7. Stuffed Rate */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> 7. Stuffed Rate
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">LOS Stops</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgStuffRate.toFixed(1)}% <span className="text-xs text-neutral-400 font-normal">Offense</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80 flex justify-between">
                <span>Defensive Stuffs: <span className="text-emerald-400 font-mono">{avgDefStuffRate.toFixed(1)}%</span></span>
              </div>
            </div>

            {/* 8. Pass Rush Win Rate (PRWR) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> 8. Pass Rush Win Rate (PRWR)
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">D-Line</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgRushWinRate.toFixed(1)}%
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Pass rushers beating block within 2.5 seconds.
              </p>
            </div>

            {/* 9. Run Stop Win Rate (RSWR) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> 9. Run Stop Win Rate (RSWR)
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Run D</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgRunStopWinRate.toFixed(1)}%
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Run defenders shedding block to stop runner &lt;3 yds.
              </p>
            </div>

            {/* 10. Pass Block Win Rate (PBWR) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> 10. Pass Block Win Rate (PBWR)
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">O-Line</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgPassBlockWinRate.toFixed(1)}%
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Pass blockers holding block for at least 2.5 seconds.
              </p>
            </div>

            {/* 11. Pressure Rate */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> 11. Pressure Rate
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Pocket Pressure</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgPressAllowed.toFixed(1)}% <span className="text-xs text-neutral-400 font-normal">Allowed</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80 flex justify-between">
                <span>Def Generated: <span className="text-emerald-400 font-mono">{avgPressGen.toFixed(1)}%</span></span>
              </div>
            </div>

            {/* 12. Receiver Separation */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> 12. Receiver Separation
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">Openness</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgReceiverSeparation.toFixed(2)} <span className="text-xs text-neutral-400 font-normal">Yards</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Average yards of space from nearest defender at catch point.
              </p>
            </div>

            {/* 13. Target Separation */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> 13. Target Separation
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Throw Window</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgTargetSeparation.toFixed(2)} <span className="text-xs text-neutral-400 font-normal">Yards</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Distance between receiver and defender at ball arrival.
              </p>
            </div>

            {/* 14. Burn Rate */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> 14. Burn Rate
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">Coverage Vulnerability</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgBurnRate.toFixed(1)}%
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                % of targeted coverage snaps yielding 5+ yd separation or explosive play.
              </p>
            </div>

            {/* 15. Coverage EPA */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> 15. Coverage EPA
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">Pass Defense EPA</span>
              </div>
              <div className="text-2xl font-black font-mono text-white my-1">
                {avgCoverageEpa > 0 ? `+${avgCoverageEpa.toFixed(3)}` : avgCoverageEpa.toFixed(3)} <span className="text-xs text-neutral-400 font-normal">/ pass play</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-2 pt-2 border-t border-neutral-800/80">
                Expected Points Added allowed per pass coverage dropback.
              </p>
            </div>
          </div>
        </div>
      ) : viewMode === 'passing' ? (
        /* ADVANCED PASSING & RECEIVING VIEW */
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. CPOE CARD */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Target className="w-4.5 h-4.5 text-sky-400" />
                  CPOE (Accuracy)
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                  avgCpoe >= 0 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80' : 'bg-rose-950 text-rose-300 border border-rose-800/80'
                }`}>
                  {avgCpoe >= 0 ? 'Above Expected' : 'Below Expected'}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgCpoe >= 0 ? `+${avgCpoe.toFixed(1)}%` : `${avgCpoe.toFixed(1)}%`}
                </span>
                <span className="text-sm text-neutral-400 font-medium">CPOE</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300 font-medium">
                <span className="text-neutral-400">Completion % Over Expected</span>
                <span className="text-sky-300 font-semibold">{avgCompletionPct.toFixed(1)}% Raw Comp</span>
              </div>
            </div>

            {/* 2. YARDS PER ROUTE RUN (YPRR) CARD */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Flame className="w-4.5 h-4.5 text-amber-400" />
                  Yards Per Route Run
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                  avgYprr >= 2.2 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80' : 'bg-neutral-800 text-neutral-300'
                }`}>
                  {avgYprr >= 2.5 ? 'Elite Tier' : avgYprr >= 2.0 ? 'High SEC Avg' : 'Standard'}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgYprr.toFixed(2)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">YPRR</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300 font-medium">
                <span className="text-amber-300">Target Efficiency</span>
                <span className="text-neutral-400">WR / TE Route Volume</span>
              </div>
            </div>

            {/* 3. CLEAN VS PRESSURE PASSER RATING */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Shield className="w-4.5 h-4.5 text-emerald-400" />
                  Clean vs Pressure Rating
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
                  Pressure Split
                </span>
              </div>

              <div className="flex items-baseline space-x-3 my-2">
                <div>
                  <div className="text-[10px] text-emerald-400 font-bold uppercase">Clean Pocket</div>
                  <span className="text-2xl font-black text-white font-mono">{avgCleanRating.toFixed(1)}</span>
                </div>
                <div className="text-neutral-600 font-light text-xl">/</div>
                <div>
                  <div className="text-[10px] text-rose-400 font-bold uppercase">Under Pressure</div>
                  <span className="text-2xl font-black text-neutral-300 font-mono">{avgPressureRating.toFixed(1)}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300 font-medium">
                <span className="text-rose-400">Pressure Drop-off: -{(avgCleanRating - avgPressureRating).toFixed(1)} pts</span>
              </div>
            </div>

            {/* 4. AIR YARDS & ADOT */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Activity className="w-4.5 h-4.5 text-purple-400" />
                  Air Yards & aDOT
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800/80">
                  Depth of Target
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgAdot.toFixed(1)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">yds aDOT</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300 font-medium">
                <span className="text-purple-300">{avgTotalAirYards.toLocaleString()} Air Yds</span>
                <span className="text-neutral-400">Intended Downfield Depth</span>
              </div>
            </div>

            {/* 5. PRESSURE RATE & PASS RUSH WIN RATE */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Zap className="w-4.5 h-4.5 text-amber-400" />
                  Pass Rush Win & Pressure Rate
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-800/80">
                  Pass Rush Analytics
                </span>
              </div>

              <div className="flex items-baseline space-x-3 my-2">
                <div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase">Pass Rush Win %</div>
                  <span className="text-2xl font-black text-white font-mono">{avgRushWinRate.toFixed(1)}%</span>
                </div>
                <div className="text-neutral-600 font-light text-xl">/</div>
                <div>
                  <div className="text-[10px] text-sky-400 font-bold uppercase">Def Pressure %</div>
                  <span className="text-2xl font-black text-sky-300 font-mono">{avgPressGen.toFixed(1)}%</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300 font-medium">
                <span className="text-amber-300">Off Pressure Allowed: {avgPressAllowed.toFixed(1)}%</span>
                <span className="text-neutral-400">Under 2.5s Pressure</span>
              </div>
            </div>

            {/* 6. COVERAGE DISRUPTION & INTERCEPTIONS */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4.5 h-4.5 text-red-400" />
                  Coverage Disruption & INTs
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-red-950 text-red-300 border border-red-800/80">
                  Pass Defense
                </span>
              </div>

              <div className="flex items-baseline space-x-3 my-2">
                <div>
                  <div className="text-[10px] text-red-400 font-bold uppercase">Disruption %</div>
                  <span className="text-2xl font-black text-white font-mono">{avgCovDisrupt.toFixed(1)}%</span>
                </div>
                <div className="text-neutral-600 font-light text-xl">/</div>
                <div>
                  <div className="text-[10px] text-emerald-400 font-bold uppercase">INTs / PBUs</div>
                  <span className="text-2xl font-black text-emerald-300 font-mono">{Math.round(avgInts)} / {Math.round(avgPbus)}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300 font-medium">
                <span className="text-red-300">Forced Incompleteness</span>
                <span className="text-neutral-400">INTs + PBUs + Tight Windows</span>
              </div>
            </div>

          </div>

          {/* Advanced Passing Detailed Metric Explanation Banner */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-neutral-800 pb-3 md:pb-0 md:pr-4">
              <div className="p-2.5 bg-sky-950/80 border border-sky-800/60 rounded-xl text-sky-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Advanced Passing Breakdown</span>
                  <span className="bg-sky-950 text-sky-300 border border-sky-800/60 text-[10px] px-2 py-0.5 rounded">Advanced Analytics Standards</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {isAll ? '12-Season Passing & Receiving Efficiency' : `${selectedSeason} Season Advanced Passing Metrics`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 text-xs">
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-neutral-400 text-[11px] font-semibold block">CPOE Standard</span>
                <span className="font-mono font-bold text-sm text-emerald-400">
                  {avgCpoe >= 0 ? `+${avgCpoe.toFixed(1)}%` : `${avgCpoe.toFixed(1)}%`}
                </span>
                <span className="text-[10px] text-neutral-500 block">Relative to SEC QB baseline</span>
              </div>

              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-neutral-400 text-[11px] font-semibold block">Receiving YPRR</span>
                <span className="font-mono font-bold text-sm text-amber-300">
                  {avgYprr.toFixed(2)} Yds
                </span>
                <span className="text-[10px] text-neutral-500 block">Per route run on pass plays</span>
              </div>

              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-neutral-400 text-[11px] font-semibold block">Pressure Delta</span>
                <span className="font-mono font-bold text-sm text-rose-400">
                  -{(avgCleanRating - avgPressureRating).toFixed(1)} Rating
                </span>
                <span className="text-[10px] text-neutral-500 block">Clean vs Pressure gap</span>
              </div>

              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-neutral-400 text-[11px] font-semibold block">Air Yard Share</span>
                <span className="font-mono font-bold text-sm text-purple-300">
                  {avgAdot.toFixed(1)} Yds/Target
                </span>
                <span className="text-[10px] text-neutral-500 block">Average Depth of Target</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* TRADITIONAL STATISTICS VIEW */
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. SCORING OFFENSE vs DEFENSE */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Trophy className="w-4.5 h-4.5 text-amber-400" />
                  Scoring (PPG)
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                  avgPpg - avgOppPpg >= 0 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80' : 'bg-rose-950 text-rose-300 border border-rose-800/80'
                }`}>
                  {avgPpg - avgOppPpg >= 0 ? `+${(avgPpg - avgOppPpg).toFixed(1)} Diff` : `${(avgPpg - avgOppPpg).toFixed(1)} Diff`}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgPpg.toFixed(1)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">PPG</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-sm text-neutral-300 font-medium">
                <span className="text-rose-400">Opp: {avgOppPpg.toFixed(1)} PPG</span>
                <span className="text-neutral-400">{isAll ? '12 Seasons' : `${selectedSeason} Season`}</span>
              </div>
            </div>

            {/* 2. TOTAL OFFENSE & PASS/RUSH SPLIT */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <BarChart3 className="w-4.5 h-4.5 text-sky-400" />
                  Total Offense
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
                  {avgYpp.toFixed(2)} YPP
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgTotalYpg.toFixed(1)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">YPG</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-sm text-neutral-300 font-medium">
                <span className="text-sky-300">Pass: {avgPassYpg.toFixed(0)}</span>
                <span className="text-teal-300">Rush: {avgRushYpg.toFixed(0)}</span>
                <span className="text-neutral-400">{avgCompletionPct.toFixed(1)}% Comp</span>
              </div>
            </div>

            {/* 3. TOTAL DEFENSE ALLOWED */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Shield className="w-4.5 h-4.5 text-emerald-400" />
                  Total Defense
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
                  {avgOppYpp.toFixed(2)} YPP Allowed
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgOppTotalYpg.toFixed(1)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">YPG Allowed</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-sm text-neutral-300 font-medium">
                <span className="text-emerald-400">Pass: {avgOppPassYpg.toFixed(0)}</span>
                <span className="text-emerald-300">Rush: {avgOppRushYpg.toFixed(0)}</span>
              </div>
            </div>

            {/* 4. THIRD DOWN & TURNOVERS */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Target className="w-4.5 h-4.5 text-red-400" />
                  3rd Down & Line
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                  avgTurnoverMargin >= 0 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  TO: {avgTurnoverMargin > 0 ? `+${avgTurnoverMargin.toFixed(1)}` : avgTurnoverMargin.toFixed(1)}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-black text-white tracking-tight font-mono">
                  {avgThirdDownPct.toFixed(1)}%
                </span>
                <span className="text-sm text-neutral-400 font-medium">3rd Conv</span>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-sm text-neutral-300 font-medium">
                <span className="text-neutral-400">Def 3rd: {avgOppThirdDownPct.toFixed(1)}%</span>
                <span className="text-red-300">Sacks: {avgSacks.toFixed(1)}</span>
              </div>
            </div>

          </div>

          {/* Traditional Detailed Box Score Summary */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-neutral-800 pb-3 md:pb-0 md:pr-4">
              <div className="p-2.5 bg-sky-950/80 border border-sky-800/60 rounded-xl text-sky-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Traditional Stat Summary</span>
                  <span className="bg-neutral-800 text-neutral-300 text-[10px] px-2 py-0.5 rounded">Standard Box Score</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {isAll ? '12-Season Traditional Averages' : `${selectedSeason} Season Stats`} • Points, Yardage, Conversions & Sacks
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 text-xs">
              
              {/* Yardage Differential */}
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="font-semibold text-neutral-300">Net Yardage</span>
                  <span className="text-[9px] text-neutral-500 uppercase">Yards / Gm</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`font-mono font-bold text-base ${
                    avgTotalYpg - avgOppTotalYpg >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {avgTotalYpg - avgOppTotalYpg >= 0 ? `+${(avgTotalYpg - avgOppTotalYpg).toFixed(1)}` : (avgTotalYpg - avgOppTotalYpg).toFixed(1)}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {avgTotalYpg.toFixed(0)} vs {avgOppTotalYpg.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Pass/Rush Ratio */}
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="font-semibold text-neutral-300">Offense Balance</span>
                  <span className="text-[9px] text-neutral-500 uppercase">Pass %</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono font-bold text-base text-sky-300">
                    {((avgPassYpg / (avgTotalYpg || 1)) * 100).toFixed(0)}% Pass
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {(100 - (avgPassYpg / (avgTotalYpg || 1)) * 100).toFixed(0)}% Rush
                  </span>
                </div>
              </div>

              {/* Sacks & Pressure */}
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="font-semibold text-neutral-300">Sack Margin</span>
                  <span className="text-[9px] text-neutral-500 uppercase">Made - Allowed</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`font-mono font-bold text-base ${
                    avgSacks - avgSacksAllowed >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {avgSacks - avgSacksAllowed >= 0 ? `+${(avgSacks - avgSacksAllowed).toFixed(1)}` : (avgSacks - avgSacksAllowed).toFixed(1)}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {avgSacks.toFixed(1)} made
                  </span>
                </div>
              </div>

              {/* Turnover Margin */}
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span className="font-semibold text-neutral-300">Turnover Diff</span>
                  <span className="text-[9px] text-neutral-500 uppercase">Season Total</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`font-mono font-bold text-base ${
                    avgTurnoverMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {avgTurnoverMargin > 0 ? `+${avgTurnoverMargin.toFixed(1)}` : avgTurnoverMargin.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {avgTurnoverMargin >= 0 ? 'Positive Margin' : 'Negative Margin'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </>
      )}

    </div>
  );
};


