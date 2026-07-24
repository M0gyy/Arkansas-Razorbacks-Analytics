import React from 'react';
import { SeasonData } from '../types';
import { Shield, Zap, Award, Activity, TrendingUp, TrendingDown } from 'lucide-react';

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

  const selectedSeasonData = !isAll ? activeData[0] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. OFFENSIVE EPA CARD */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            Offensive EPA / Play
          </span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
            avgOffEpa >= 0.1 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' : 'bg-neutral-800 text-neutral-300'
          }`}>
            {avgOffEpa >= 0.1 ? 'Above Average' : avgOffEpa >= 0 ? 'Moderate' : 'Below SEC Avg'}
          </span>
        </div>

        <div className="flex items-baseline space-x-2 my-1">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {avgOffEpa > 0 ? `+${avgOffEpa.toFixed(3)}` : avgOffEpa.toFixed(3)}
          </span>
          <span className="text-xs text-neutral-400">EPA / play</span>
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-400 font-semibold">Pass: {avgPassEpa > 0 ? `+${avgPassEpa.toFixed(2)}` : avgPassEpa.toFixed(2)}</span>
            <span className="text-neutral-600">•</span>
            <span className="text-teal-300 font-semibold">Rush: {avgRushEpa > 0 ? `+${avgRushEpa.toFixed(2)}` : avgRushEpa.toFixed(2)}</span>
          </div>
          <span className="text-neutral-400">{avgSuccessRate.toFixed(1)}% Succ.</span>
        </div>
      </div>

      {/* 2. DEFENSIVE EPA CARD */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-amber-500/50 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-400" />
            Defensive EPA Allowed
          </span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
            avgDefEpa <= 0 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950 text-rose-300 border border-rose-800/60'
          }`}>
            {avgDefEpa <= 0 ? 'Negative (Good)' : 'Positive (High)'}
          </span>
        </div>

        <div className="flex items-baseline space-x-2 my-1">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {avgDefEpa > 0 ? `+${avgDefEpa.toFixed(3)}` : avgDefEpa.toFixed(3)}
          </span>
          <span className="text-xs text-neutral-400">EPA allowed</span>
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
          <div className="flex items-center space-x-1">
            {avgDefEpa <= 0 ? (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <TrendingDown className="w-3.5 h-3.5" /> Suppressing EPA
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> Giving Up Value
              </span>
            )}
          </div>
          <span className="text-neutral-400">
            {selectedSeasonData ? `SEC Rank #${selectedSeasonData.secRankDefenseEpa}` : '12 Seasons'}
          </span>
        </div>
      </div>

      {/* 3. SPECIAL TEAMS EPA CARD */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-sky-500/50 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-sky-400" />
            Special Teams EPA
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
            Field Position / FG
          </span>
        </div>

        <div className="flex items-baseline space-x-2 my-1">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {avgStEpa > 0 ? `+${avgStEpa.toFixed(3)}` : avgStEpa.toFixed(3)}
          </span>
          <span className="text-xs text-neutral-400">EPA / play</span>
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
          <span className="text-sky-300 font-semibold">Punts, Return & FG</span>
          <span className="text-neutral-400">{totalPlays.toLocaleString()} total plays</span>
        </div>
      </div>

      {/* 4. NET EPA & RANK CARD */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-red-500/50 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-red-400" />
            Net Total EPA Efficiency
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800/60">
            Overall Margin
          </span>
        </div>

        <div className="flex items-baseline space-x-2 my-1">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {avgNetEpa > 0 ? `+${avgNetEpa.toFixed(3)}` : avgNetEpa.toFixed(3)}
          </span>
          <span className="text-xs text-neutral-400">Net EPA / play</span>
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
          {selectedSeasonData ? (
            <>
              <span className="font-semibold text-red-300">{selectedSeasonData.record} ({selectedSeasonData.headCoach})</span>
              <span className="text-neutral-400">National #{selectedSeasonData.nationalRankNetEpa}</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-red-300">Peak: 2021 (+0.227)</span>
              <span className="text-neutral-400">2014–2025 Aggregate</span>
            </>
          )}
        </div>
      </div>

    </div>
  );
};
