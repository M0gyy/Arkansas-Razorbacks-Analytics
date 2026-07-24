import React from 'react';
import { SeasonData } from '../types';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

interface QuadrantChartProps {
  seasons: SeasonData[];
  onSelectSeason: (season: number) => void;
}

export const QuadrantChart: React.FC<QuadrantChartProps> = ({ seasons, onSelectSeason }) => {
  const data = seasons.map((s) => ({
    season: s.season,
    offenseEpa: Number(s.offenseEpaPerPlay.toFixed(3)),
    defenseEpa: Number(s.defenseEpaPerPlay.toFixed(3)),
    netEpa: Number(s.netEpaPerPlay.toFixed(3)),
    record: s.record,
    coach: s.headCoach,
    offSuccessRate: s.offenseSuccessRate,
    defSuccessRate: s.defenseSuccessRate,
    natlRank: s.nationalRankNetEpa,
    bowl: s.bowlGame ? `${s.bowlGame}: ${s.bowlResult}` : null,
    size: Math.abs(s.netEpaPerPlay) * 300 + 100
  }));

  const getQuadrantLabel = (off: number, def: number) => {
    if (off >= 0 && def <= 0) return { label: 'QUAD 1: ELITE OVERALL', color: 'text-emerald-400 bg-emerald-950 border-emerald-800' };
    if (off < 0 && def <= 0) return { label: 'QUAD 2: DEFENSIVE BATTLE', color: 'text-amber-400 bg-amber-950 border-amber-800' };
    if (off >= 0 && def > 0) return { label: 'QUAD 3: HIGH-SCORING SHOOTOUT', color: 'text-sky-400 bg-sky-950 border-sky-800' };
    return { label: 'QUAD 4: STRUGGLING', color: 'text-rose-400 bg-rose-950 border-rose-800' };
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      const quad = getQuadrantLabel(d.offenseEpa, d.defenseEpa);

      return (
        <div className="bg-neutral-900/95 border border-neutral-700/80 p-3.5 rounded-xl shadow-2xl text-xs backdrop-blur-md max-w-xs ring-1 ring-white/10">
          <div className="flex items-center justify-between font-bold text-white mb-1 pb-1.5 border-b border-neutral-800">
            <span className="text-sm">{d.season} Razorbacks</span>
            <span className="text-red-400 font-extrabold">{d.record}</span>
          </div>

          <div className="flex items-center justify-between my-2">
            <span className="text-neutral-400 text-[11px]">Coach: <span className="text-neutral-200 font-medium">{d.coach}</span></span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${quad.color}`}>
              {quad.label.split(':')[0]}
            </span>
          </div>

          <div className="space-y-1.5 font-sans">
            <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800/80 space-y-1">
              <div className="text-emerald-400 font-bold flex justify-between gap-4">
                <span>Offense EPA / play:</span>
                <span className="font-mono">{d.offenseEpa > 0 ? `+${d.offenseEpa}` : d.offenseEpa}</span>
              </div>
              <div className="text-neutral-400 text-[10px] flex justify-between">
                <span>Offense Success Rate:</span>
                <span className="font-mono text-neutral-300">{d.offSuccessRate}%</span>
              </div>
            </div>

            <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800/80 space-y-1">
              <div className="text-amber-400 font-bold flex justify-between gap-4">
                <span>Defense EPA Allowed:</span>
                <span className="font-mono">{d.defenseEpa > 0 ? `+${d.defenseEpa}` : d.defenseEpa}</span>
              </div>
              <div className="text-neutral-400 text-[10px] flex justify-between">
                <span>Def Success Rate Allowed:</span>
                <span className="font-mono text-neutral-300">{d.defSuccessRate}%</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-neutral-800 flex justify-between items-center text-red-400 font-bold">
              <span>Net EPA Margin:</span>
              <span className="font-mono text-sm">{d.netEpa > 0 ? `+${d.netEpa}` : d.netEpa}</span>
            </div>

            <div className="text-neutral-400 text-[10px] flex justify-between pt-0.5">
              <span>National Net EPA Rank:</span>
              <span className="font-mono font-bold text-white">#{d.natlRank} in FBS</span>
            </div>

            {d.bowl && (
              <div className="mt-2 pt-1 border-t border-neutral-800 text-[10px] text-amber-300 italic flex items-center gap-1">
                🏆 <span>{d.bowl}</span>
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
        <h3 className="text-base font-bold text-white">Efficiency Matrix (4-Quadrant Model)</h3>
        <p className="text-xs text-neutral-400">Offense EPA vs Defense EPA Allowed (Top-Right = Elite Overall Efficiency)</p>
      </div>

      <div className="h-[300px] w-full relative">
        {/* Quadrant Labels Overlay */}
        <div className="absolute top-2 right-2 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 z-10">
          QUAD 1: ELITE OVERALL
        </div>
        <div className="absolute top-2 left-2 text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60 z-10">
          QUAD 2: DEFENSIVE BATTLE
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/60 z-10">
          QUAD 3: HIGH-SCORING
        </div>
        <div className="absolute bottom-2 left-2 text-[10px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60 z-10">
          QUAD 4: STRUGGLING
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: -20 }}
            onClick={(e: any) => {
              if (e && e.activePayload && e.activePayload[0]) {
                onSelectSeason(e.activePayload[0].payload.season);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis
              type="number"
              dataKey="offenseEpa"
              name="Offense EPA"
              domain={[-0.25, 0.25]}
              stroke="#a3a3a3"
              fontSize={11}
              label={{ value: 'Offense EPA →', position: 'bottom', offset: 0, fill: '#a3a3a3', fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="defenseEpa"
              name="Defense EPA Allowed"
              reversed
              domain={[-0.2, 0.25]}
              stroke="#a3a3a3"
              fontSize={11}
              label={{ value: '← Better Defense (Lower EPA Allowed)', angle: -90, position: 'insideLeft', offset: 25, fill: '#a3a3a3', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="size" range={[80, 240]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={0} stroke="#525252" strokeWidth={1.5} />
            <ReferenceLine y={0} stroke="#525252" strokeWidth={1.5} />
            <Scatter data={data} fill="#ef4444" cursor="pointer" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
