import React from 'react';
import { SeasonData } from '../types';
import { Shield, Zap, Award, Activity, TrendingUp, TrendingDown, Gauge, Flame } from 'lucide-react';

interface MetricsOverviewProps {
  seasons: SeasonData[];
  selectedSeason: number | 'ALL';
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ seasons, selectedSeason }) => {
  const isAll = selectedSeason === 'ALL';
  const activeData = isAll
    ? seasons
    : seasons.filter((s) => s.season === selectedSeason);

  // Calculate averages or selected season values
  const count = activeData.length || 1;
  const avgOffEpa = activeData.reduce((acc, s) => acc + s.offenseEpaPerPlay, 0) / count;
  const avgDefEpa = activeData.reduce((acc, s) => acc + s.defenseEpaPerPlay, 0) / count;
  const avgStEpa = activeData.reduce((acc, s) => acc + s.specialTeamsEpaPerPlay, 0) / count;
  const avgNetEpa = activeData.reduce((acc, s) => acc + s.netEpaPerPlay, 0) / count;
  const avgPassEpa = activeData.reduce((acc, s) => acc + s.passEpaPerPlay, 0) / count;
  const avgRushEpa = activeData.reduce((acc, s) => acc + s.rushEpaPerPlay, 0) / count;
  const avgSuccessRate = activeData.reduce((acc, s) => acc + s.offenseSuccessRate, 0) / count;
  const totalPlays = activeData.reduce((acc, s) => acc + s.totalPlays, 0);

  const avgStuffRate = activeData.reduce((acc, s) => acc + s.stuffRate, 0) / count;
  const avgOpportunityRate = activeData.reduce((acc, s) => acc + s.opportunityRate, 0) / count;
  const avgDefStuffRate = activeData.reduce((acc, s) => acc + s.defensiveStuffRate, 0) / count;
  const avgDefOppRate = activeData.reduce((acc, s) => acc + s.defensiveOpportunityRate, 0) / count;

  const selectedSeasonData = !isAll ? activeData[0] : null;

  return (
    <div className="space-y-4 mb-6">
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
    </div>
  );
};

