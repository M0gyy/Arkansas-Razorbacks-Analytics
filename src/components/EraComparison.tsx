import React from 'react';
import { ERAS_SUMMARY, RAZORBACKS_SEASONS } from '../data/razorbacksData';
import { Award, Flame, UserCheck, CheckCircle2 } from 'lucide-react';

export const EraComparison: React.FC = () => {
  // Calculate Offensive Coordinator stats
  const ocMap: Record<string, { seasons: number[]; totalOffEpa: number; totalPassEpa: number; totalRushEpa: number; gamesCount: number }> = {};

  RAZORBACKS_SEASONS.forEach((s) => {
    const oc = s.offensiveCoordinator;
    if (!ocMap[oc]) {
      ocMap[oc] = { seasons: [], totalOffEpa: 0, totalPassEpa: 0, totalRushEpa: 0, gamesCount: 0 };
    }
    ocMap[oc].seasons.push(s.season);
    ocMap[oc].totalOffEpa += s.offenseEpaPerPlay;
    ocMap[oc].totalPassEpa += s.passEpaPerPlay;
    ocMap[oc].totalRushEpa += s.rushEpaPerPlay;
    ocMap[oc].gamesCount += s.games.length;
  });

  const ocStats = Object.keys(ocMap).map((oc) => {
    const data = ocMap[oc];
    const count = data.seasons.length;
    return {
      oc,
      years: data.seasons.join(', '),
      avgOffEpa: data.totalOffEpa / count,
      avgPassEpa: data.totalPassEpa / count,
      avgRushEpa: data.totalRushEpa / count,
      gamesCount: data.gamesCount
    };
  }).sort((a, b) => b.avgOffEpa - a.avgOffEpa);

  return (
    <div className="space-y-6 mb-6">
      
      {/* 1. HEAD COACH ERAS COMPARISON */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm">
        <div className="pb-3 border-b border-neutral-800 mb-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <span>Head Coaching Era Comparison (2014–Present)</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Statistical breakdown of offensive efficiency, defensive performance, and win percentage by era
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ERAS_SUMMARY.map((era) => (
            <div
              key={era.eraName}
              className="bg-neutral-950 border border-neutral-800/90 rounded-xl p-4 flex flex-col justify-between hover:border-red-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded border border-red-800/60">
                    {era.years}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400">
                    {era.winLossRecord} ({era.winPercentage.toFixed(1)}%)
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{era.eraName}</h3>
                <p className="text-xs text-neutral-400 mb-4 line-clamp-3">{era.description}</p>

                <div className="space-y-2 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800/80 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Avg Offense EPA:</span>
                    <span className={`font-mono font-bold ${era.avgOffenseEpa >= 0.05 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {era.avgOffenseEpa > 0 ? `+${era.avgOffenseEpa.toFixed(3)}` : era.avgOffenseEpa.toFixed(3)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Avg Defense EPA Allowed:</span>
                    <span className={`font-mono font-bold ${era.avgDefenseEpa <= 0.05 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {era.avgDefenseEpa > 0 ? `+${era.avgDefenseEpa.toFixed(3)}` : era.avgDefenseEpa.toFixed(3)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t border-neutral-800">
                    <span className="text-white font-semibold">Avg Net Total EPA:</span>
                    <span className={`font-mono font-extrabold ${era.avgNetEpa >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {era.avgNetEpa > 0 ? `+${era.avgNetEpa.toFixed(3)}` : era.avgNetEpa.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-amber-300">
                <span>Peak Season: {era.highlightSeason}</span>
                <Award className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. OFFENSIVE COORDINATOR RANKINGS */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm">
        <div className="pb-3 border-b border-neutral-800 mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Offensive Coordinators Efficiency Rankings</span>
          </h3>
          <p className="text-xs text-neutral-400">Comparing play callers by average Offensive EPA per play during their tenure</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                <th className="pb-2 font-semibold">Play Caller / OC</th>
                <th className="pb-2 font-semibold">Seasons</th>
                <th className="pb-2 font-semibold text-right">Avg Offense EPA</th>
                <th className="pb-2 font-semibold text-right">Passing EPA</th>
                <th className="pb-2 font-semibold text-right">Rushing EPA</th>
                <th className="pb-2 font-semibold text-right">Efficiency Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
              {ocStats.map((item, idx) => (
                <tr key={item.oc} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-2.5 font-bold text-white flex items-center space-x-2">
                    <span className="text-neutral-500 font-mono">#{idx + 1}</span>
                    <span>{item.oc}</span>
                  </td>
                  <td className="py-2.5 text-neutral-400">{item.years}</td>
                  <td className="py-2.5 text-right font-mono font-extrabold text-emerald-400">
                    {item.avgOffEpa > 0 ? `+${item.avgOffEpa.toFixed(3)}` : item.avgOffEpa.toFixed(3)}
                  </td>
                  <td className="py-2.5 text-right font-mono text-teal-300">
                    {item.avgPassEpa > 0 ? `+${item.avgPassEpa.toFixed(3)}` : item.avgPassEpa.toFixed(3)}
                  </td>
                  <td className="py-2.5 text-right font-mono text-sky-300">
                    {item.avgRushEpa > 0 ? `+${item.avgRushEpa.toFixed(3)}` : item.avgRushEpa.toFixed(3)}
                  </td>
                  <td className="py-2.5 text-right font-medium">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      item.avgOffEpa >= 0.1 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' :
                      item.avgOffEpa >= 0 ? 'bg-teal-950 text-teal-300' : 'bg-rose-950 text-rose-300'
                    }`}>
                      {item.avgOffEpa >= 0.13 ? 'Elite Playcaller' : item.avgOffEpa >= 0.05 ? 'Solid SEC Offense' : 'Struggling'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
