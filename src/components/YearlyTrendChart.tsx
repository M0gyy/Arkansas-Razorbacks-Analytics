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
import { BarChart3, LineChart as LineIcon, Info } from 'lucide-react';

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

  // Format data for Recharts
  const chartData = seasons.map((s) => ({
    season: s.season,
    Offense: Number(s.offenseEpaPerPlay.toFixed(3)),
    Defense: Number(s.defenseEpaPerPlay.toFixed(3)),
    SpecialTeams: Number(s.specialTeamsEpaPerPlay.toFixed(3)),
    NetTotal: Number(s.netEpaPerPlay.toFixed(3)),
    record: s.record,
    coach: s.headCoach,
    bowl: s.bowlGame ? `${s.bowlGame}: ${s.bowlResult}` : 'No Bowl'
  }));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-neutral-900/95 border border-neutral-700/80 p-3 rounded-lg shadow-xl text-xs max-w-xs backdrop-blur-md">
          <div className="flex items-center justify-between font-bold text-white border-b border-neutral-800 pb-1.5 mb-2">
            <span className="text-sm">{label} Razorbacks</span>
            <span className="text-red-400">{data.record}</span>
          </div>
          <p className="text-neutral-300 font-medium mb-2">Head Coach: {data.coach}</p>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-emerald-400">
              <span>Offense EPA/play:</span>
              <span className="font-mono font-bold">{data.Offense > 0 ? `+${data.Offense}` : data.Offense}</span>
            </div>
            <div className="flex justify-between items-center text-amber-400">
              <span>Defense EPA Allowed:</span>
              <span className="font-mono font-bold">{data.Defense > 0 ? `+${data.Defense}` : data.Defense}</span>
            </div>
            <div className="flex justify-between items-center text-sky-400">
              <span>Special Teams EPA:</span>
              <span className="font-mono font-bold">{data.SpecialTeams > 0 ? `+${data.SpecialTeams}` : data.SpecialTeams}</span>
            </div>
            <div className="flex justify-between items-center text-red-400 pt-1 border-t border-neutral-800">
              <span className="font-bold">Net Total EPA:</span>
              <span className="font-mono font-bold">{data.NetTotal > 0 ? `+${data.NetTotal}` : data.NetTotal}</span>
            </div>
          </div>
          {data.bowl !== 'No Bowl' && (
            <div className="mt-2 pt-1.5 border-t border-neutral-800 text-[11px] text-amber-300 italic">
              🏆 {data.bowl}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Historical EPA Trends (2014–2025)</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Click any point or bar on the chart to jump directly into that season's game logs
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-2">
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
      <div className="h-[360px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart
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
              <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#d4d4d4', fontSize: '12px' }} />
              <ReferenceLine y={0} stroke="#525252" strokeDasharray="3 3" />

              {(selectedUnit === 'net' || selectedUnit === 'offense') && (
                <Line
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
                  type="monotone"
                  dataKey="NetTotal"
                  name="Net Total EPA"
                  stroke="#ef4444"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#ef4444' }}
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

      {/* Chart Footer Guide */}
      <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
        <div className="flex items-center space-x-2">
          <Info className="w-3.5 h-3.5 text-neutral-500" />
          <span>Higher Offense & Special Teams EPA is better. Lower (Negative) Defense EPA Allowed is better.</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-emerald-400 font-semibold">2015 Peak Offense (+0.214)</span>
          <span className="text-amber-400 font-semibold">2014 Peak Defense (-0.115)</span>
          <span className="text-red-400 font-semibold">2021 Peak Net (+0.227)</span>
        </div>
      </div>
    </div>
  );
};
