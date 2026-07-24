import React, { useState } from 'react';
import { SeasonData, UnitType } from '../types';
import { resolveComparisonEntity, getSecAverageSeason, getDiv1AverageSeason } from '../data/benchmarkData';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { ArrowLeftRight, Trophy, Zap, Shield, Target, Sparkles, Award, Globe } from 'lucide-react';

interface SeasonComparisonViewProps {
  seasons: SeasonData[];
  seasonA: string | number;
  seasonB: string | number;
  selectedUnit: UnitType;
  onSelectSeasonA: (season: string | number) => void;
  onSelectSeasonB: (season: string | number) => void;
  availableSeasons: number[];
}

export const SeasonComparisonView: React.FC<SeasonComparisonViewProps> = ({
  seasons,
  seasonA,
  seasonB,
  selectedUnit,
  onSelectSeasonA,
  onSelectSeasonB,
  availableSeasons
}) => {
  const [metricType, setMetricType] = useState<'net' | 'offense' | 'defense' | 'special_teams'>('net');

  const seasonAData = resolveComparisonEntity(seasonA);
  const seasonBData = resolveComparisonEntity(seasonB);

  const currentYearA = seasonAData.season;
  const secAvgA = getSecAverageSeason(currentYearA);
  const div1AvgA = getDiv1AverageSeason(currentYearA);

  // Max number of games between the two seasons
  const maxGames = Math.max(seasonAData.games.length, seasonBData.games.length);

  // Construct game-by-game comparison array
  const comparisonChartData = Array.from({ length: maxGames }).map((_, idx) => {
    const gA = seasonAData.games[idx];
    const gB = seasonBData.games[idx];

    let valA = 0;
    let valB = 0;

    if (gA) {
      if (metricType === 'offense') valA = gA.offenseEpaPerPlay;
      else if (metricType === 'defense') valA = gA.defenseEpaPerPlay;
      else if (metricType === 'special_teams') valA = gA.specialTeamsEpaPerPlay;
      else valA = gA.netEpaPerPlay;
    }

    if (gB) {
      if (metricType === 'offense') valB = gB.offenseEpaPerPlay;
      else if (metricType === 'defense') valB = gB.defenseEpaPerPlay;
      else if (metricType === 'special_teams') valB = gB.specialTeamsEpaPerPlay;
      else valB = gB.netEpaPerPlay;
    }

    return {
      gameNum: `Gm ${idx + 1}`,
      gameIndex: idx + 1,
      // Season A data
      [`seasonA_Epa`]: Number(valA.toFixed(3)),
      seasonAOpponent: gA ? `${gA.opponent} (${gA.result} ${gA.arkansasScore}-${gA.opponentScore})` : 'N/A',
      seasonAOppName: gA ? gA.opponent : 'N/A',
      seasonAScore: gA ? `${gA.result} ${gA.arkansasScore}-${gA.opponentScore}` : '-',
      seasonAHomeAway: gA ? (gA.isHome ? 'vs' : '@') : '',
      seasonAPassEpa: gA ? gA.passEpaPerPlay : 0,
      seasonARushEpa: gA ? gA.rushEpaPerPlay : 0,
      seasonASuccRate: gA ? gA.offenseSuccessRate : 0,

      // Season B data
      [`seasonB_Epa`]: Number(valB.toFixed(3)),
      seasonBOpponent: gB ? `${gB.opponent} (${gB.result} ${gB.arkansasScore}-${gB.opponentScore})` : 'N/A',
      seasonBOppName: gB ? gB.opponent : 'N/A',
      seasonBScore: gB ? `${gB.result} ${gB.arkansasScore}-${gB.opponentScore}` : '-',
      seasonBHomeAway: gB ? (gB.isHome ? 'vs' : '@') : '',
      seasonBPassEpa: gB ? gB.passEpaPerPlay : 0,
      seasonBRushEpa: gB ? gB.rushEpaPerPlay : 0,
      seasonBSuccRate: gB ? gB.offenseSuccessRate : 0,
    };
  });

  // Custom Tooltip for overlay chart
  const CustomComparisonTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const epaA = data.seasonA_Epa;
      const epaB = data.seasonB_Epa;
      const diff = Number((epaA - epaB).toFixed(3));

      return (
        <div className="bg-neutral-900/95 border border-neutral-700/80 p-3.5 rounded-xl shadow-2xl text-xs max-w-sm backdrop-blur-md ring-1 ring-white/10">
          <div className="font-bold text-white border-b border-neutral-800 pb-1.5 mb-2 flex items-center justify-between">
            <span className="text-sm font-extrabold text-red-400">{label} Trajectory Comparison</span>
            <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
              {metricType.replace('_', ' ')} EPA
            </span>
          </div>

          <div className="space-y-2">
            {/* Season A Row */}
            <div className="bg-neutral-950 p-2.5 rounded-lg border border-red-900/50 space-y-1">
              <div className="flex justify-between items-center font-bold text-red-400">
                <span className="truncate max-w-[170px]">{seasonAData.displayName}:</span>
                <span className="font-mono text-sm">{epaA > 0 ? `+${epaA}` : epaA}</span>
              </div>
              <div className="text-[11px] text-neutral-200 font-medium">
                {data.seasonAHomeAway} {data.seasonAOpponent}
              </div>
              <div className="text-[10px] text-neutral-400 flex justify-between pt-0.5 border-t border-neutral-900 font-mono">
                <span>Pass: +{data.seasonAPassEpa} | Rush: +{data.seasonARushEpa}</span>
                <span>Succ: {data.seasonASuccRate}%</span>
              </div>
            </div>

            {/* Season B Row */}
            <div className="bg-neutral-950 p-2.5 rounded-lg border border-cyan-900/50 space-y-1">
              <div className="flex justify-between items-center font-bold text-cyan-400">
                <span className="truncate max-w-[170px]">{seasonBData.displayName}:</span>
                <span className="font-mono text-sm">{epaB > 0 ? `+${epaB}` : epaB}</span>
              </div>
              <div className="text-[11px] text-neutral-200 font-medium">
                {data.seasonBHomeAway} {data.seasonBOpponent}
              </div>
              <div className="text-[10px] text-neutral-400 flex justify-between pt-0.5 border-t border-neutral-900 font-mono">
                <span>Pass: +{data.seasonBPassEpa} | Rush: +{data.seasonBRushEpa}</span>
                <span>Succ: {data.seasonBSuccRate}%</span>
              </div>
            </div>

            {/* Advantage Indicator */}
            <div className="pt-1 flex items-center justify-between text-[11px] font-bold border-t border-neutral-800">
              <span className="text-neutral-400">Head-to-Head Margin:</span>
              {diff > 0 ? (
                <span className="text-red-400 font-mono">Option A +{diff}</span>
              ) : diff < 0 ? (
                <span className="text-cyan-400 font-mono">Option B +{Math.abs(diff)}</span>
              ) : (
                <span className="text-neutral-400">Tied (0.000)</span>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Helper function to check leader
  const getBetter = (valA: number, valB: number, isDefense = false) => {
    if (valA === valB) return 'equal';
    if (isDefense) {
      return valA < valB ? 'A' : 'B'; // For defense, lower EPA allowed is better
    }
    return valA > valB ? 'A' : 'B';
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 md:p-6 shadow-xl mb-8">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-neutral-800 gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-xl bg-red-950 text-red-400 border border-red-800/50">
              <ArrowLeftRight className="w-5 h-5 text-red-400" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
                <span>Season Comparison Overlay</span>
                <span className="text-xs bg-red-900/80 text-red-200 px-2.5 py-0.5 rounded-full font-semibold border border-red-700/50">
                  {seasonAData.displayName} vs {seasonBData.displayName}
                </span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Overlaying EPA trajectories, conference benchmarks, and Division 1 national averages.
              </p>
            </div>
          </div>
        </div>

        {/* Season Pickers in Card Header */}
        <div className="flex flex-wrap items-center gap-2 bg-neutral-950 p-2 rounded-xl border border-neutral-800">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="text-xs font-bold text-neutral-300">Option A:</span>
            <select
              value={String(seasonA)}
              onChange={(e) => onSelectSeasonA(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 text-xs font-bold text-red-400 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            >
              <optgroup label="🐗 Razorback Seasons">
                {availableSeasons.map((year) => (
                  <option key={`A-ARK-${year}`} value={year} className="bg-neutral-900 text-white">
                    {year} Razorbacks ({seasons.find(s => s.season === year)?.record})
                  </option>
                ))}
              </optgroup>
              <optgroup label="🏆 Average SEC Team">
                {availableSeasons.map((year) => (
                  <option key={`A-SEC-${year}`} value={`${year}-SEC`} className="bg-neutral-900 text-amber-300">
                    {year} Average SEC Team
                  </option>
                ))}
              </optgroup>
              <optgroup label="🏈 Average Div 1 (FBS) Team">
                {availableSeasons.map((year) => (
                  <option key={`A-DIV1-${year}`} value={`${year}-DIV1`} className="bg-neutral-900 text-cyan-300">
                    {year} Average Div 1 (FBS) Team
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <span className="text-xs font-extrabold text-neutral-500 px-1">VS</span>

          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-bold text-neutral-300">Option B:</span>
            <select
              value={String(seasonB)}
              onChange={(e) => onSelectSeasonB(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 text-xs font-bold text-cyan-400 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            >
              <optgroup label="🐗 Razorback Seasons">
                {availableSeasons.map((year) => (
                  <option key={`B-ARK-${year}`} value={year} className="bg-neutral-900 text-white">
                    {year} Razorbacks ({seasons.find(s => s.season === year)?.record})
                  </option>
                ))}
              </optgroup>
              <optgroup label="🏆 Average SEC Team">
                {availableSeasons.map((year) => (
                  <option key={`B-SEC-${year}`} value={`${year}-SEC`} className="bg-neutral-900 text-amber-300">
                    {year} Average SEC Team
                  </option>
                ))}
              </optgroup>
              <optgroup label="🏈 Average Div 1 (FBS) Team">
                {availableSeasons.map((year) => (
                  <option key={`B-DIV1-${year}`} value={`${year}-DIV1`} className="bg-neutral-900 text-cyan-300">
                    {year} Average Div 1 (FBS) Team
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Benchmark Shortcuts */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-neutral-400">Quick Compare Shortcuts ({currentYearA}):</span>
        <button
          onClick={() => onSelectSeasonB(`${currentYearA}-SEC`)}
          className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center space-x-1 cursor-pointer ${
            String(seasonB) === `${currentYearA}-SEC`
              ? 'bg-amber-950 text-amber-300 border-amber-600 shadow-sm'
              : 'bg-neutral-950 hover:bg-neutral-800 text-amber-400 border-neutral-800'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>vs {currentYearA} SEC Average</span>
        </button>

        <button
          onClick={() => onSelectSeasonB(`${currentYearA}-DIV1`)}
          className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center space-x-1 cursor-pointer ${
            String(seasonB) === `${currentYearA}-DIV1`
              ? 'bg-cyan-950 text-cyan-300 border-cyan-600 shadow-sm'
              : 'bg-neutral-950 hover:bg-neutral-800 text-cyan-400 border-neutral-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>vs {currentYearA} Div 1 (FBS) Average</span>
        </button>
      </div>

      {/* Metric Phase Selector for Line Chart */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-950/70 p-3 rounded-xl border border-neutral-800">
        <div className="text-xs font-bold text-neutral-300 flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-red-400" />
          <span>Game-by-Game EPA Trajectory</span>
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setMetricType('net')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              metricType === 'net' ? 'bg-red-700 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Net Total EPA
          </button>
          <button
            onClick={() => setMetricType('offense')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              metricType === 'offense' ? 'bg-emerald-700 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Offense EPA
          </button>
          <button
            onClick={() => setMetricType('defense')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              metricType === 'defense' ? 'bg-amber-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Defense EPA
          </button>
          <button
            onClick={() => setMetricType('special_teams')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              metricType === 'special_teams' ? 'bg-sky-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Special Teams EPA
          </button>
        </div>
      </div>

      {/* Overlay Chart */}
      <div className="h-[340px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comparisonChartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis dataKey="gameNum" stroke="#a3a3a3" fontSize={12} tickLine={false} />
            <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} />
            <Tooltip content={<CustomComparisonTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#d4d4d4', fontSize: '12px' }} />
            <ReferenceLine y={0} stroke="#525252" strokeDasharray="3 3" />

            {/* Line for Option A (Crimson Red) */}
            <Line
              type="monotone"
              dataKey="seasonA_Epa"
              name={seasonAData.displayName}
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 5, fill: '#ef4444' }}
              activeDot={{ r: 8 }}
            />

            {/* Line for Option B (Cyan) */}
            <Line
              type="monotone"
              dataKey="seasonB_Epa"
              name={seasonBData.displayName}
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 5, fill: '#06b6d4' }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Side-by-Side KPI Comparison Cards */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Head-to-Head Comparison Summary</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Record & Coach */}
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
            <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Record & Profile</div>
            
            <div className="mt-2 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-1.5 border-b border-neutral-900">
                <span className="font-bold text-red-400 truncate max-w-[120px]">{seasonAData.displayName.split(' ')[0]} A:</span>
                <div className="text-right">
                  <span className="font-extrabold text-white text-sm">{seasonAData.record}</span>
                  <div className="text-[10px] text-neutral-400 truncate max-w-[130px]">{seasonAData.headCoach}</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-cyan-400 truncate max-w-[120px]">{seasonBData.displayName.split(' ')[0]} B:</span>
                <div className="text-right">
                  <span className="font-extrabold text-white text-sm">{seasonBData.record}</span>
                  <div className="text-[10px] text-neutral-400 truncate max-w-[130px]">{seasonBData.headCoach}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Offense EPA */}
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
            <div className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider flex items-center justify-between">
              <span>Offense EPA / Play</span>
              <Zap className="w-3.5 h-3.5" />
            </div>

            <div className="mt-2 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-1.5 border-b border-neutral-900">
                <span className="font-bold text-neutral-300 truncate max-w-[110px]">{seasonAData.displayName.split(' ')[0]}:</span>
                <span className={`font-mono font-bold text-sm ${getBetter(seasonAData.offenseEpaPerPlay, seasonBData.offenseEpaPerPlay) === 'A' ? 'text-emerald-400 font-black' : 'text-neutral-300'}`}>
                  +{seasonAData.offenseEpaPerPlay.toFixed(3)}
                  {getBetter(seasonAData.offenseEpaPerPlay, seasonBData.offenseEpaPerPlay) === 'A' && ' 👑'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-300 truncate max-w-[110px]">{seasonBData.displayName.split(' ')[0]}:</span>
                <span className={`font-mono font-bold text-sm ${getBetter(seasonAData.offenseEpaPerPlay, seasonBData.offenseEpaPerPlay) === 'B' ? 'text-emerald-400 font-black' : 'text-neutral-300'}`}>
                  +{seasonBData.offenseEpaPerPlay.toFixed(3)}
                  {getBetter(seasonAData.offenseEpaPerPlay, seasonBData.offenseEpaPerPlay) === 'B' && ' 👑'}
                </span>
              </div>
            </div>
          </div>

          {/* Defense EPA */}
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
            <div className="text-[11px] font-medium text-amber-400 uppercase tracking-wider flex items-center justify-between">
              <span>Defense EPA Allowed</span>
              <Shield className="w-3.5 h-3.5" />
            </div>

            <div className="mt-2 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-1.5 border-b border-neutral-900">
                <span className="font-bold text-neutral-300 truncate max-w-[110px]">{seasonAData.displayName.split(' ')[0]}:</span>
                <span className={`font-mono font-bold text-sm ${getBetter(seasonAData.defenseEpaPerPlay, seasonBData.defenseEpaPerPlay, true) === 'A' ? 'text-emerald-400 font-black' : 'text-neutral-300'}`}>
                  {seasonAData.defenseEpaPerPlay > 0 ? `+${seasonAData.defenseEpaPerPlay.toFixed(3)}` : seasonAData.defenseEpaPerPlay.toFixed(3)}
                  {getBetter(seasonAData.defenseEpaPerPlay, seasonBData.defenseEpaPerPlay, true) === 'A' && ' 👑'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-300 truncate max-w-[110px]">{seasonBData.displayName.split(' ')[0]}:</span>
                <span className={`font-mono font-bold text-sm ${getBetter(seasonAData.defenseEpaPerPlay, seasonBData.defenseEpaPerPlay, true) === 'B' ? 'text-emerald-400 font-black' : 'text-neutral-300'}`}>
                  {seasonBData.defenseEpaPerPlay > 0 ? `+${seasonBData.defenseEpaPerPlay.toFixed(3)}` : seasonBData.defenseEpaPerPlay.toFixed(3)}
                  {getBetter(seasonAData.defenseEpaPerPlay, seasonBData.defenseEpaPerPlay, true) === 'B' && ' 👑'}
                </span>
              </div>
            </div>
          </div>

          {/* Net EPA */}
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
            <div className="text-[11px] font-medium text-red-400 uppercase tracking-wider flex items-center justify-between">
              <span>Net Total EPA / Play</span>
              <Target className="w-3.5 h-3.5" />
            </div>

            <div className="mt-2 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-1.5 border-b border-neutral-900">
                <span className="font-bold text-neutral-300 truncate max-w-[110px]">{seasonAData.displayName.split(' ')[0]}:</span>
                <span className={`font-mono font-bold text-sm ${getBetter(seasonAData.netEpaPerPlay, seasonBData.netEpaPerPlay) === 'A' ? 'text-emerald-400 font-black' : 'text-neutral-300'}`}>
                  {seasonAData.netEpaPerPlay > 0 ? `+${seasonAData.netEpaPerPlay.toFixed(3)}` : seasonAData.netEpaPerPlay.toFixed(3)}
                  {getBetter(seasonAData.netEpaPerPlay, seasonBData.netEpaPerPlay) === 'A' && ' 👑'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-300 truncate max-w-[110px]">{seasonBData.displayName.split(' ')[0]}:</span>
                <span className={`font-mono font-bold text-sm ${getBetter(seasonAData.netEpaPerPlay, seasonBData.netEpaPerPlay) === 'B' ? 'text-emerald-400 font-black' : 'text-neutral-300'}`}>
                  {seasonBData.netEpaPerPlay > 0 ? `+${seasonBData.netEpaPerPlay.toFixed(3)}` : seasonBData.netEpaPerPlay.toFixed(3)}
                  {getBetter(seasonAData.netEpaPerPlay, seasonBData.netEpaPerPlay) === 'B' && ' 👑'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Reference Section for {currentYearA} */}
      <div className="mt-6 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
        <div className="flex items-center justify-between mb-3 border-b border-neutral-900 pb-2">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {currentYearA} Benchmark Matrix (Arkansas vs SEC Avg vs Div 1 Avg)
            </h4>
          </div>
          <span className="text-[10px] text-neutral-400">NCAA Play-by-Play Calibrated</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Arkansas Row */}
          <div className="bg-neutral-900 p-3 rounded-lg border border-red-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-red-400">{currentYearA} Arkansas Razorbacks</span>
                <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-800 font-bold">
                  {seasons.find(s => s.season === currentYearA)?.record || '7-6'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">Head Coach: {seasons.find(s => s.season === currentYearA)?.headCoach}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-800 grid grid-cols-2 gap-1.5 text-[11px]">
              <div><span className="text-neutral-400">Net EPA:</span> <strong className="font-mono text-white">{(seasons.find(s => s.season === currentYearA)?.netEpaPerPlay ?? 0) > 0 ? `+${seasons.find(s => s.season === currentYearA)?.netEpaPerPlay}` : seasons.find(s => s.season === currentYearA)?.netEpaPerPlay}</strong></div>
              <div><span className="text-neutral-400">Off EPA:</span> <strong className="font-mono text-emerald-400">+{seasons.find(s => s.season === currentYearA)?.offenseEpaPerPlay}</strong></div>
              <div><span className="text-neutral-400">Def EPA:</span> <strong className="font-mono text-amber-400">{(seasons.find(s => s.season === currentYearA)?.defenseEpaPerPlay ?? 0) > 0 ? `+${seasons.find(s => s.season === currentYearA)?.defenseEpaPerPlay}` : seasons.find(s => s.season === currentYearA)?.defenseEpaPerPlay}</strong></div>
              <div><span className="text-neutral-400">Succ %:</span> <strong className="font-mono text-white">{seasons.find(s => s.season === currentYearA)?.offenseSuccessRate}%</strong></div>
            </div>
          </div>

          {/* SEC Average Row */}
          <div className="bg-neutral-900 p-3 rounded-lg border border-amber-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-400">{currentYearA} Average SEC Team</span>
                <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800 font-bold">
                  7-5 (SEC Avg)
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">SEC Conference Average</p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-800 grid grid-cols-2 gap-1.5 text-[11px]">
              <div><span className="text-neutral-400">Net EPA:</span> <strong className="font-mono text-amber-300">+{secAvgA.netEpaPerPlay}</strong></div>
              <div><span className="text-neutral-400">Off EPA:</span> <strong className="font-mono text-emerald-400">+{secAvgA.offenseEpaPerPlay}</strong></div>
              <div><span className="text-neutral-400">Def EPA:</span> <strong className="font-mono text-amber-400">+{secAvgA.defenseEpaPerPlay}</strong></div>
              <div><span className="text-neutral-400">Succ %:</span> <strong className="font-mono text-amber-300">{secAvgA.offenseSuccessRate}%</strong></div>
            </div>
          </div>

          {/* Division 1 Average Row */}
          <div className="bg-neutral-900 p-3 rounded-lg border border-cyan-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-cyan-400">{currentYearA} Average Div 1 Team</span>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800 font-bold">
                  6-6 (D1 FBS Avg)
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">National FBS Average Baseline</p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-800 grid grid-cols-2 gap-1.5 text-[11px]">
              <div><span className="text-neutral-400">Net EPA:</span> <strong className="font-mono text-cyan-300">{div1AvgA.netEpaPerPlay.toFixed(3)}</strong></div>
              <div><span className="text-neutral-400">Off EPA:</span> <strong className="font-mono text-emerald-400">+{div1AvgA.offenseEpaPerPlay}</strong></div>
              <div><span className="text-neutral-400">Def EPA:</span> <strong className="font-mono text-amber-400">+{div1AvgA.defenseEpaPerPlay}</strong></div>
              <div><span className="text-neutral-400">Succ %:</span> <strong className="font-mono text-cyan-300">{div1AvgA.offenseSuccessRate}%</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Game-by-Game Comparison Table */}
      <div className="mt-6">
        <div className="text-xs font-bold text-neutral-300 mb-2 flex items-center space-x-1.5">
          <Award className="w-4 h-4 text-red-400" />
          <span>Game-by-Game Differential Grid ({seasonAData.displayName} vs {seasonBData.displayName})</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-900/90 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800 font-bold">
              <tr>
                <th className="py-2.5 px-3">Gm #</th>
                <th className="py-2.5 px-3 text-red-400">{seasonAData.displayName}</th>
                <th className="py-2.5 px-3 text-red-400 text-right">Option A Net EPA</th>
                <th className="py-2.5 px-3 text-cyan-400">{seasonBData.displayName}</th>
                <th className="py-2.5 px-3 text-cyan-400 text-right">Option B Net EPA</th>
                <th className="py-2.5 px-3 text-center">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {comparisonChartData.map((row, i) => {
                const epaA = row.seasonA_Epa;
                const epaB = row.seasonB_Epa;
                const advantage = epaA > epaB ? 'A' : epaB > epaA ? 'B' : 'TIE';

                return (
                  <tr key={i} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-neutral-400">{row.gameNum}</td>
                    <td className="py-2.5 px-3 font-medium text-white">{row.seasonAOpponent}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-red-400">
                      {epaA > 0 ? `+${epaA}` : epaA}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-white">{row.seasonBOpponent}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-cyan-400">
                      {epaB > 0 ? `+${epaB}` : epaB}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold">
                      {advantage === 'A' ? (
                        <span className="text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800 text-[10px]">
                          Option A (+{(epaA - epaB).toFixed(3)})
                        </span>
                      ) : advantage === 'B' ? (
                        <span className="text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 text-[10px]">
                          Option B (+{(epaB - epaA).toFixed(3)})
                        </span>
                      ) : (
                        <span className="text-neutral-500 text-[10px]">EQUAL</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

