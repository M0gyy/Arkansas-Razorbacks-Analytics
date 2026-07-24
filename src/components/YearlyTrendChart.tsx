import React, { useState } from 'react';
import { SeasonData, UnitType } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { BarChart3, LineChart as LineIcon, Info, Award, TrendingUp } from 'lucide-react';

interface YearlyTrendChartProps {
  seasons: SeasonData[];
  selectedUnit: UnitType;
  onSelectSeason: (season: number) => void;
}

export const YearlyTrendChart: React.FC<YearlyTrendChartProps> = ({
  seasons,
  selectedUnit,
  onSelectSeason
}) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [showRecruiting, setShowRecruiting] = useState<boolean>(true);

  // Format data for Recharts
  const chartData = seasons.map((s) => {
    const bestG = s.games.length > 0 ? [...s.games].sort((a,b) => b.netEpaPerPlay - a.netEpaPerPlay)[0] : null;
    return {
      season: s.season,
      Offense: Number(s.offenseEpaPerPlay.toFixed(3)),
      Defense: Number(s.defenseEpaPerPlay.toFixed(3)),
      SpecialTeams: Number(s.specialTeamsEpaPerPlay.toFixed(3)),
      NetTotal: Number(s.netEpaPerPlay.toFixed(3)),
      recruitingNatl: s.recruitingRankNational ?? 28,
      recruitingSec: s.recruitingRankSec ?? 10,
      passEpa: Number(s.passEpaPerPlay.toFixed(3)),
      rushEpa: Number(s.rushEpaPerPlay.toFixed(3)),
      offSuccessRate: s.offenseSuccessRate,
      defSuccessRate: s.defenseSuccessRate,
      secOffRank: s.secRankOffenseEpa,
      secDefRank: s.secRankDefenseEpa,
      natlNetRank: s.nationalRankNetEpa,
      totalPlays: s.totalPlays,
      record: s.record,
      coach: s.headCoach,
      oc: s.offensiveCoordinator,
      dc: s.defensiveCoordinator,
      bowl: s.bowlGame ? `${s.bowlGame}: ${s.bowlResult}` : 'No Bowl',
      bestGame: bestG ? `${bestG.isHome ? 'vs' : '@'} ${bestG.opponent} (${bestG.result} ${bestG.arkansasScore}-${bestG.opponentScore})` : null,
      bestGameEpa: bestG ? bestG.netEpaPerPlay : 0
    };
  });

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-neutral-900/95 border border-neutral-700/80 p-3.5 rounded-xl shadow-2xl text-xs max-w-sm backdrop-blur-md ring-1 ring-white/10">
          <div className="flex items-center justify-between font-bold text-white border-b border-neutral-800 pb-1.5 mb-2">
            <span className="text-sm font-extrabold">{label} Razorbacks</span>
            <span className="text-red-400 font-extrabold text-sm">{data.record}</span>
          </div>
          
          <div className="text-neutral-400 text-[11px] mb-2 font-medium">
            Coach: <span className="text-white">{data.coach}</span> | OC: <span className="text-emerald-300">{data.oc}</span>
          </div>

          <div className="space-y-1.5 font-sans">
            <div className="bg-purple-950/60 p-2 rounded-lg border border-purple-800/60 space-y-1">
              <div className="flex justify-between items-center text-purple-300 font-bold">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  Recruiting Class Rank:
                </span>
                <span className="font-mono text-purple-200 font-extrabold">
                  Natl #{data.recruitingNatl} | SEC #{data.recruitingSec}
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-purple-300/80">
                <span>Talent Tier: {data.recruitingNatl <= 25 ? 'Top 25 Class' : 'Tier 3 / Transition'}</span>
                <span>Net EPA Rank: #{data.natlNetRank}</span>
              </div>
            </div>

            <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800/80 space-y-1">
              <div className="flex justify-between items-center text-emerald-400 font-bold">
                <span>Offense EPA / play:</span>
                <span className="font-mono">{data.Offense > 0 ? `+${data.Offense}` : data.Offense}</span>
              </div>
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>Pass: <strong className="text-teal-300 font-mono">+{data.passEpa}</strong> | Rush: <strong className="text-teal-300 font-mono">+{data.rushEpa}</strong></span>
                <span>Succ Rate: <strong className="text-sky-300 font-mono">{data.offSuccessRate}%</strong></span>
              </div>
            </div>

            <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800/80 space-y-1">
              <div className="flex justify-between items-center text-amber-400 font-bold">
                <span>Defense EPA Allowed:</span>
                <span className="font-mono">{data.Defense > 0 ? `+${data.Defense}` : data.Defense}</span>
              </div>
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>DC: <strong className="text-neutral-200">{data.dc}</strong></span>
                <span>Def Succ Allowed: <strong className="text-amber-300 font-mono">{data.defSuccessRate}%</strong></span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sky-400 px-1 text-[11px]">
              <span>Special Teams EPA:</span>
              <span className="font-mono font-bold">{data.SpecialTeams > 0 ? `+${data.SpecialTeams}` : data.SpecialTeams}</span>
            </div>

            <div className="flex justify-between items-center text-red-400 font-bold pt-1.5 border-t border-neutral-800 px-1 text-xs">
              <span>Net Total EPA / play:</span>
              <span className="font-mono font-extrabold text-sm">{data.NetTotal > 0 ? `+${data.NetTotal}` : data.NetTotal}</span>
            </div>

            <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-1 border-t border-neutral-900 px-1">
              <span>National Net Rank: <strong className="text-white font-mono">#{data.natlNetRank}</strong></span>
              <span>SEC Off Rank: <strong className="text-emerald-400 font-mono">#{data.secOffRank}</strong> | Def: <strong className="text-amber-400 font-mono">#{data.secDefRank}</strong></span>
            </div>

            {data.bestGame && (
              <div className="mt-2 pt-1.5 border-t border-neutral-800 text-[10px] text-neutral-300">
                <span className="text-neutral-400 block font-semibold uppercase">Signature Game Performance:</span>
                <span className="text-emerald-300 font-medium">
                  {data.bestGame} ({data.bestGameEpa > 0 ? `+${data.bestGameEpa}` : data.bestGameEpa} Net EPA)
                </span>
              </div>
            )}

            {data.bowl !== 'No Bowl' && (
              <div className="mt-1 pt-1 text-xs text-amber-300 italic flex items-center gap-1 font-semibold">
                🏆 {data.bowl}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Historical EPA Trends & Recruiting Correlation (2014–2025)</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-0.5">
            Compare incoming 247Sports recruiting class rankings directly against on-field efficiency
          </p>
        </div>

        {/* View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowRecruiting(!showRecruiting)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
              showRecruiting
                ? 'bg-purple-900/70 text-purple-200 border-purple-500/80 shadow-inner'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-neutral-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Recruiting Rank Overlay {showRecruiting ? '(ON)' : '(OFF)'}</span>
          </button>

          <div className="bg-neutral-950 p-1 rounded-lg border border-neutral-800 flex items-center space-x-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center space-x-1 transition-all ${
                chartType === 'line' ? 'bg-red-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LineIcon className="w-3.5 h-3.5" />
              <span>Lines</span>
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center space-x-1 transition-all ${
                chartType === 'bar' ? 'bg-red-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Net Bars</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="h-[370px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart
              data={chartData}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  onSelectSeason(e.activePayload[0].payload.season);
                }
              }}
              margin={{ top: 10, right: showRecruiting ? 25 : 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="season" stroke="#a3a3a3" fontSize={12} tickLine={false} />
              
              {/* Primary Y-Axis for EPA */}
              <YAxis
                yAxisId="epa"
                stroke="#a3a3a3"
                fontSize={12}
                tickLine={false}
                domain={[-0.45, 0.35]}
                tickFormatter={(val) => val.toFixed(2)}
              />

              {/* Secondary Y-Axis for Recruiting Class Rank (Reversed so #15 is higher than #40) */}
              {showRecruiting && (
                <YAxis
                  yAxisId="recruiting"
                  orientation="right"
                  stroke="#c084fc"
                  fontSize={11}
                  tickLine={false}
                  reversed={true}
                  domain={[15, 40]}
                  tickFormatter={(val) => `#${val}`}
                />
              )}

              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#d4d4d4', fontSize: '12px' }} />
              <ReferenceLine yAxisId="epa" y={0} stroke="#525252" strokeDasharray="3 3" />

              {(selectedUnit === 'net' || selectedUnit === 'offense') && (
                <Line
                  yAxisId="epa"
                  type="monotone"
                  dataKey="Offense"
                  name="Offense EPA / play"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981' }}
                  activeDot={{ r: 7 }}
                />
              )}

              {(selectedUnit === 'net' || selectedUnit === 'defense') && (
                <Line
                  yAxisId="epa"
                  type="monotone"
                  dataKey="Defense"
                  name="Defense EPA Allowed"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#f59e0b' }}
                  activeDot={{ r: 7 }}
                />
              )}

              {(selectedUnit === 'net' || selectedUnit === 'special_teams') && (
                <Line
                  yAxisId="epa"
                  type="monotone"
                  dataKey="SpecialTeams"
                  name="Special Teams EPA"
                  stroke="#0284c7"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#0284c7' }}
                  activeDot={{ r: 6 }}
                />
              )}

              {selectedUnit === 'net' && (
                <Line
                  yAxisId="epa"
                  type="monotone"
                  dataKey="NetTotal"
                  name="Net Total EPA"
                  stroke="#ef4444"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#ef4444' }}
                />
              )}

              {showRecruiting && (
                <Line
                  yAxisId="recruiting"
                  type="monotone"
                  dataKey="recruitingNatl"
                  name="National Recruiting Rank (Reversed Y-Axis)"
                  stroke="#c084fc"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  dot={{ r: 5, fill: '#a855f7' }}
                  activeDot={{ r: 8 }}
                />
              )}
            </LineChart>
          ) : (
            <BarChart
              data={chartData}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  onSelectSeason(e.activePayload[0].payload.season);
                }
              }}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="season" stroke="#a3a3a3" fontSize={12} tickLine={false} />
              <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#525252" />
              <Bar dataKey="NetTotal" name="Net EPA / play">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.NetTotal >= 0 ? '#10b981' : '#f43f5e'}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Talent & On-Field Correlation Banner */}
      <div className="mt-4 pt-3.5 border-t border-neutral-800/80 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
        <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-purple-300">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          <span>Talent Acquisition vs On-Field EPA Correlation Insights</span>
        </div>
        <p className="text-[11px] text-neutral-300 leading-relaxed">
          <strong className="text-purple-300 font-medium">Top 25 Recruiting Window:</strong> Seasons backed by consecutive top-25 national recruiting classes (e.g. 2015 #22, 2021 #25, 2023 #22) correlated directly with offensive EPA spikes (+0.214 in 2015, +0.158 in 2021). 
          Conversely, coaching transition classes dropping outside the top 30 (such as 2018 #36 and 2025 #31) resulted in noticeable roster attrition and sharp on-field EPA declines (-0.319 in 2018 and -0.245 in 2025).
        </p>
      </div>

      {/* Chart Footer Guide */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
        <div className="flex items-center space-x-2">
          <Info className="w-3.5 h-3.5 text-neutral-500" />
          <span>Right Y-Axis is reversed so higher recruiting talent appears higher on the chart.</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-purple-400 font-semibold">Best Class: 2015/2023 (#22 Natl)</span>
          <span className="text-emerald-400 font-semibold">2015 Peak Offense (+0.214)</span>
          <span className="text-red-400 font-semibold">2021 Peak Net (+0.227)</span>
        </div>
      </div>
    </div>
  );
};
