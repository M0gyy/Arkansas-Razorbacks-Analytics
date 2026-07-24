import React from 'react';
import { SeasonData } from '../types';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

interface PassVsRushChartProps {
  seasons: SeasonData[];
}

export const PassVsRushChart: React.FC<PassVsRushChartProps> = ({ seasons }) => {
  const data = seasons.map((s) => ({
    season: s.season,
    record: s.record,
    headCoach: s.headCoach,
    OC: s.offensiveCoordinator,
    PassEPA: Number(s.passEpaPerPlay.toFixed(3)),
    RushEPA: Number(s.rushEpaPerPlay.toFixed(3)),
    OffenseEPA: Number(s.offenseEpaPerPlay.toFixed(3)),
    SuccessRate: s.offenseSuccessRate,
    passYdsPG: s.passingYardsPerGame,
    rushYdsPG: s.rushingYardsPerGame,
    secRankOff: s.secRankOffenseEpa,
    bestGame: s.games.length > 0 ? [...s.games].sort((a,b) => b.offenseEpaPerPlay - a.offenseEpaPerPlay)[0] : null
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-neutral-900/95 border border-neutral-700 p-3.5 rounded-xl shadow-2xl text-xs backdrop-blur-md max-w-xs ring-1 ring-white/10">
          <div className="flex items-center justify-between font-bold text-white mb-1 pb-1.5 border-b border-neutral-800">
            <span className="text-sm">{label} Razorbacks</span>
            <span className="text-red-400 font-extrabold">{d.record}</span>
          </div>
          <div className="text-neutral-400 text-[11px] mb-2.5">
            Coach: <span className="text-neutral-200">{d.headCoach}</span> • OC: <span className="text-emerald-300 font-semibold">{d.OC}</span>
          </div>

          <div className="space-y-1.5 font-sans">
            <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800/80 space-y-1">
              <div className="text-emerald-400 font-bold flex justify-between gap-4">
                <span>Pass EPA / play:</span>
                <span className="font-mono">{d.PassEPA > 0 ? `+${d.PassEPA}` : d.PassEPA}</span>
              </div>
              <div className="text-neutral-400 text-[10px] flex justify-between">
                <span>Pass Volume:</span>
                <span className="font-mono text-neutral-300">{d.passYdsPG} yds/gm</span>
              </div>
            </div>

            <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800/80 space-y-1">
              <div className="text-teal-400 font-bold flex justify-between gap-4">
                <span>Rush EPA / play:</span>
                <span className="font-mono">{d.RushEPA > 0 ? `+${d.RushEPA}` : d.RushEPA}</span>
              </div>
              <div className="text-neutral-400 text-[10px] flex justify-between">
                <span>Rush Volume:</span>
                <span className="font-mono text-neutral-300">{d.rushYdsPG} yds/gm</span>
              </div>
            </div>

            <div className="pt-1.5 space-y-1">
              <div className="text-sky-300 flex justify-between gap-4 font-semibold">
                <span>Offense Success Rate:</span>
                <span className="font-mono font-bold text-white">{d.SuccessRate}%</span>
              </div>
              <div className="text-neutral-300 flex justify-between gap-4 text-[11px]">
                <span>Total Offense EPA/play:</span>
                <span className="font-mono font-bold text-emerald-400">{d.OffenseEPA > 0 ? `+${d.OffenseEPA}` : d.OffenseEPA}</span>
              </div>
              <div className="text-amber-400 text-[10px] flex justify-between">
                <span>SEC Offense Rank:</span>
                <span className="font-mono font-bold">#{d.secRankOff} in SEC</span>
              </div>
            </div>

            {d.bestGame && (
              <div className="mt-2 pt-1.5 border-t border-neutral-800 text-[10px] text-neutral-300">
                <span className="text-neutral-400 block font-semibold uppercase">Peak Game Output:</span>
                <span className="text-emerald-300 font-medium">
                  {d.bestGame.isHome ? 'vs' : '@'} {d.bestGame.opponent} ({d.bestGame.result} {d.bestGame.arkansasScore}-{d.bestGame.opponentScore}) — +{d.bestGame.offenseEpaPerPlay} Off EPA
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm">
      <div className="pb-3 border-b border-neutral-800 mb-4">
        <h3 className="text-base font-bold text-white">Passing vs Rushing Efficiency (EPA & Success Rate)</h3>
        <p className="text-xs text-neutral-400">Comparing play-type EPA splits alongside overall offensive success rate</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis dataKey="season" stroke="#a3a3a3" fontSize={12} tickLine={false} />
            <YAxis yAxisId="epa" stroke="#a3a3a3" fontSize={12} tickLine={false} />
            <YAxis yAxisId="rate" orientation="right" domain={[20, 70]} stroke="#38bdf8" fontSize={12} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
            <ReferenceLine y={0} yAxisId="epa" stroke="#525252" />
            
            <Bar yAxisId="epa" dataKey="PassEPA" name="Passing EPA/play" fill="#10b981" radius={[3, 3, 0, 0]} />
            <Bar yAxisId="epa" dataKey="RushEPA" name="Rushing EPA/play" fill="#14b8a6" radius={[3, 3, 0, 0]} />
            <Line yAxisId="rate" type="monotone" dataKey="SuccessRate" name="Success Rate %" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
