import React, { useState } from 'react';
import { ERAS_SUMMARY, RAZORBACKS_SEASONS } from '../data/razorbacksData';
import { Award, Flame, UserCheck, Shield, Zap, Target, BarChart2, Layers, Info } from 'lucide-react';

export const EraComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'coaches' | 'oc' | 'dc'>('all');

  // Calculate Offensive Coordinator stats
  const ocMap: Record<string, {
    seasons: number[];
    totalOffEpa: number;
    totalPassEpa: number;
    totalRushEpa: number;
    totalPPD: number;
    totalAYPct: number;
    totalExplosivePct: number;
    totalAggressiveness: number;
    total4thGo: number;
    total4thConv: number;
    gamesCount: number;
  }> = {};

  // Calculate Defensive Coordinator stats
  const dcMap: Record<string, {
    seasons: number[];
    totalDefEpa: number;
    totalDefPPD: number;
    totalDefAYPct: number;
    totalDefExplosivePct: number;
    totalDefStuffRate: number;
    gamesCount: number;
  }> = {};

  RAZORBACKS_SEASONS.forEach((s) => {
    // OC Stats
    const oc = s.offensiveCoordinator;
    if (!ocMap[oc]) {
      ocMap[oc] = {
        seasons: [],
        totalOffEpa: 0,
        totalPassEpa: 0,
        totalRushEpa: 0,
        totalPPD: 0,
        totalAYPct: 0,
        totalExplosivePct: 0,
        totalAggressiveness: 0,
        total4thGo: 0,
        total4thConv: 0,
        gamesCount: 0
      };
    }
    ocMap[oc].seasons.push(s.season);
    ocMap[oc].totalOffEpa += s.offenseEpaPerPlay;
    ocMap[oc].totalPassEpa += s.passEpaPerPlay;
    ocMap[oc].totalRushEpa += s.rushEpaPerPlay;
    ocMap[oc].totalPPD += s.pointsPerDrive ?? 2.15;
    ocMap[oc].totalAYPct += s.availableYardsPct ?? 45.0;
    ocMap[oc].totalExplosivePct += s.explosivePlayPct ?? 12.0;
    ocMap[oc].totalAggressiveness += s.aggressivenessIndex ?? 1.0;
    ocMap[oc].total4thGo += s.fourthDownGoRate ?? 50.0;
    ocMap[oc].total4thConv += s.fourthDownSuccessRate ?? 50.0;
    ocMap[oc].gamesCount += s.games.length;

    // DC Stats
    const dc = s.defensiveCoordinator;
    if (!dcMap[dc]) {
      dcMap[dc] = {
        seasons: [],
        totalDefEpa: 0,
        totalDefPPD: 0,
        totalDefAYPct: 0,
        totalDefExplosivePct: 0,
        totalDefStuffRate: 0,
        gamesCount: 0
      };
    }
    dcMap[dc].seasons.push(s.season);
    dcMap[dc].totalDefEpa += s.defenseEpaPerPlay;
    dcMap[dc].totalDefPPD += s.defensivePointsPerDrive ?? 2.15;
    dcMap[dc].totalDefAYPct += s.defensiveAvailableYardsPct ?? 45.0;
    dcMap[dc].totalDefExplosivePct += s.defensiveExplosivePlayPct ?? 12.0;
    dcMap[dc].totalDefStuffRate += s.defensiveStuffRate;
    dcMap[dc].gamesCount += s.games.length;
  });

  const ocStats = Object.keys(ocMap).map((oc) => {
    const data = ocMap[oc];
    const count = data.seasons.length;
    return {
      oc,
      years: data.seasons.length === 1 ? `${data.seasons[0]}` : `${Math.min(...data.seasons)}–${Math.max(...data.seasons)}`,
      seasonsList: data.seasons.join(', '),
      avgOffEpa: data.totalOffEpa / count,
      avgPassEpa: data.totalPassEpa / count,
      avgRushEpa: data.totalRushEpa / count,
      avgPPD: data.totalPPD / count,
      avgAYPct: data.totalAYPct / count,
      avgExplosivePct: data.totalExplosivePct / count,
      avgAggressiveness: data.totalAggressiveness / count,
      avg4thGo: data.total4thGo / count,
      avg4thConv: data.total4thConv / count,
      gamesCount: data.gamesCount
    };
  }).sort((a, b) => b.avgPPD - a.avgPPD);

  const dcStats = Object.keys(dcMap).map((dc) => {
    const data = dcMap[dc];
    const count = data.seasons.length;
    return {
      dc,
      years: data.seasons.length === 1 ? `${data.seasons[0]}` : `${Math.min(...data.seasons)}–${Math.max(...data.seasons)}`,
      seasonsList: data.seasons.join(', '),
      avgDefEpa: data.totalDefEpa / count,
      avgDefPPD: data.totalDefPPD / count,
      avgDefAYPct: data.totalDefAYPct / count,
      avgDefExplosivePct: data.totalDefExplosivePct / count,
      avgDefStuffRate: data.totalDefStuffRate / count,
      gamesCount: data.gamesCount
    };
  }).sort((a, b) => a.avgDefPPD - b.avgDefPPD); // Lower defensive PPD allowed is better!

  return (
    <div className="space-y-6 mb-8">
      
      {/* Navigation Sub-Tabs & Metric Legend Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
            <Flame className="w-5 h-5 text-red-500" />
            <span>Coaching Eras & Coordinator Analytics</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Cross-era evaluation by Points Per Drive (PPD), Available Yards % (AY%), and Explosive Play Rate.
          </p>
        </div>

        {/* Category Selector Buttons */}
        <div className="flex items-center space-x-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'all' ? 'bg-red-800 text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Views
          </button>
          <button
            onClick={() => setActiveTab('coaches')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'coaches' ? 'bg-red-800 text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Head Coaches
          </button>
          <button
            onClick={() => setActiveTab('oc')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'oc' ? 'bg-red-800 text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Offensive Coordinators
          </button>
          <button
            onClick={() => setActiveTab('dc')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'dc' ? 'bg-red-800 text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Defensive Coordinators
          </button>
        </div>
      </div>

      {/* Advanced Metric Definition Glossary Pill Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl">
          <div className="font-bold text-amber-400 flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Points Per Drive (PPD)</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Average points scored per offensive possession (or allowed on defense). SEC average is ~2.15 PPD.
          </p>
        </div>

        <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl">
          <div className="font-bold text-emerald-400 flex items-center space-x-1">
            <Target className="w-3.5 h-3.5" />
            <span>Available Yards % (AY%)</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Percentage of total available field position yards earned from starting line to goal.
          </p>
        </div>

        <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl">
          <div className="font-bold text-sky-400 flex items-center space-x-1">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Explosive Play %</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Percentage of plays resulting in gains of &gt;20 passing yards or &gt;12 rushing yards.
          </p>
        </div>

        <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl">
          <div className="font-bold text-purple-400 flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-purple-400" />
            <span>Aggressiveness Index</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Ratio measuring willingness to attempt 4th down conversions &amp; 2-pt plays (1.00 = FBS baseline, &gt;1.15 = aggressive).
          </p>
        </div>
      </div>

      {/* 1. HEAD COACH ERAS COMPARISON */}
      {(activeTab === 'all' || activeTab === 'coaches') && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm">
          <div className="pb-3 border-b border-neutral-800 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-500" />
                <span>Head Coaching Era Core Efficiency (2014–2025)</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Comparing Bret Bielema, Chad Morris, and Sam Pittman eras across PPD, AY%, Explosive Rate, and Aggressiveness Index
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ERAS_SUMMARY.map((era) => (
              <div
                key={era.eraName}
                className="bg-neutral-950 border border-neutral-800/90 rounded-xl p-4 flex flex-col justify-between hover:border-red-500/40 transition-all shadow-md"
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
                  <p className="text-xs text-neutral-400 mb-4 line-clamp-2">{era.description}</p>

                  {/* Primary Metrics Group: PPD, AY%, Explosive Rate */}
                  <div className="space-y-2 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 text-xs">
                    
                    {/* Points Per Drive */}
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">Offense Points/Drive:</span>
                      <span className={`font-mono font-bold ${era.avgOffensePPD >= 2.30 ? 'text-emerald-400' : era.avgOffensePPD >= 2.0 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {era.avgOffensePPD.toFixed(2)} pts
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">Defense PPD Allowed:</span>
                      <span className={`font-mono font-bold ${era.avgDefensePPD <= 2.10 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {era.avgDefensePPD.toFixed(2)} pts
                      </span>
                    </div>

                    {/* Available Yards % */}
                    <div className="flex justify-between items-center pt-1.5 border-t border-neutral-800/80">
                      <span className="text-neutral-400 font-medium">Offense Available Yds %:</span>
                      <span className="font-mono font-bold text-emerald-300">
                        {era.avgOffenseAYPct.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">Defense AY % Allowed:</span>
                      <span className="font-mono font-bold text-amber-300">
                        {era.avgDefenseAYPct.toFixed(1)}%
                      </span>
                    </div>

                    {/* Explosive Play % */}
                    <div className="flex justify-between items-center pt-1.5 border-t border-neutral-800/80">
                      <span className="text-neutral-400 font-medium">Offense Explosive Rate:</span>
                      <span className="font-mono font-bold text-sky-400">
                        {era.avgExplosivePlayPct.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">Defense Explosive Allowed:</span>
                      <span className="font-mono font-bold text-rose-300">
                        {era.avgDefensiveExplosivePlayPct.toFixed(1)}%
                      </span>
                    </div>

                    {/* Aggressiveness Index & 4th Down Figure Block */}
                    <div className="pt-2 border-t border-purple-900/50 space-y-1.5 bg-purple-950/30 -mx-3 -mb-1 px-3 pb-2 rounded-b-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300 font-bold flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-purple-400" />
                          Aggressiveness Index:
                        </span>
                        <span className={`font-mono font-black px-2 py-0.5 rounded text-xs border ${
                          (era.aggressivenessIndex ?? 1.0) >= 1.20
                            ? 'bg-purple-900/80 text-purple-200 border-purple-500/80'
                            : (era.aggressivenessIndex ?? 1.0) >= 1.0
                            ? 'bg-amber-950 text-amber-300 border-amber-800/60'
                            : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                        }`}>
                          {(era.aggressivenessIndex ?? 1.0).toFixed(2)}
                          <span className="text-[10px] ml-1 font-normal opacity-90">
                            {(era.aggressivenessIndex ?? 1.0) >= 1.20 ? 'High' : (era.aggressivenessIndex ?? 1.0) >= 1.0 ? 'Moderate' : 'Conservative'}
                          </span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-neutral-950/80 p-1.5 rounded border border-neutral-800/80 font-mono">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400 text-[10px]">4th Go Rate:</span>
                          <span className="font-bold text-purple-300">{era.fourthDownGoRate?.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400 text-[10px]">4th Conv %:</span>
                          <span className="font-bold text-emerald-400">{era.fourthDownSuccessRate?.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Net Total EPA */}
                    <div className="flex justify-between items-center pt-2 border-t border-neutral-700/80">
                      <span className="text-white font-bold">Avg Net EPA/Play:</span>
                      <span className={`font-mono font-black ${era.avgNetEpa >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {era.avgNetEpa > 0 ? `+${era.avgNetEpa.toFixed(3)}` : era.avgNetEpa.toFixed(3)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-amber-300 font-medium">
                  <span>Peak Season: {era.highlightSeason}</span>
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dedicated Coaching Aggressiveness Index Analysis Panel */}
      <div className="bg-neutral-900 border border-purple-900/60 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-purple-900/50 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-purple-400" />
              <span>4th Down Coaching Aggressiveness Index &amp; Conversion Efficiency</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Measuring risk-taking on 4th &amp; short / go-situations relative to expected NCAA baseline models (1.00 = National Avg)
            </p>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-purple-950 text-purple-300 text-xs font-mono font-bold rounded-full border border-purple-800/60">
            Analytics Index
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Sam Pittman Era</span>
              <span className="font-mono text-purple-300 font-extrabold bg-purple-950 px-2 py-0.5 rounded border border-purple-800/60">
                1.25 Index (High)
              </span>
            </div>
            <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '83%' }}></div>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Highly aggressive 4th-down philosophy led by Kendal Briles (1.32 peak in 2021-22). Frequently went for 4th &amp; short in midfield utilizing KJ Jefferson heavy power sets, yielding a <strong>54.7% conversion success rate</strong>.
            </p>
          </div>

          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Chad Morris Era</span>
              <span className="font-mono text-amber-300 font-extrabold bg-amber-950 px-2 py-0.5 rounded border border-amber-800/60">
                1.05 Index (Moderate)
              </span>
            </div>
            <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Moderate 4th down attempt rate (48.0%), but crippled by execution failures—converting only <strong>38.5%</strong> of 4th down attempts, resulting in frequent negative turnover margin spikes.
            </p>
          </div>

          <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Bret Bielema Era</span>
              <span className="font-mono text-neutral-300 font-extrabold bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                0.94 Index (Conservative)
              </span>
            </div>
            <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden">
              <div className="bg-neutral-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Traditional pro-style decision-making with lower 4th-down go rate (43.6%), but strong physical execution when attempting (<strong>52.3% conversion rate</strong> backed by Alex Collins and Brandon Allen).
            </p>
          </div>
        </div>
      </div>

      {/* 2. OFFENSIVE COORDINATOR COMPARISON */}
      {(activeTab === 'all' || activeTab === 'oc') && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm">
          <div className="pb-3 border-b border-neutral-800 mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Offensive Coordinators Efficiency &amp; Aggressiveness Rankings</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Ranked by Points Per Drive (PPD), Available Yards % (AY%), Explosive Play %, and Aggressiveness Index
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                  <th className="pb-2 font-semibold">Play Caller / OC</th>
                  <th className="pb-2 font-semibold">Tenure</th>
                  <th className="pb-2 font-semibold text-right">Points / Drive</th>
                  <th className="pb-2 font-semibold text-right">Available Yds %</th>
                  <th className="pb-2 font-semibold text-right">Explosive %</th>
                  <th className="pb-2 font-semibold text-right">Aggressiveness</th>
                  <th className="pb-2 font-semibold text-right">4th Go Rate</th>
                  <th className="pb-2 font-semibold text-right">4th Conv %</th>
                  <th className="pb-2 font-semibold text-right">Offense EPA</th>
                  <th className="pb-2 font-semibold text-right">Efficiency Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                {ocStats.map((item, idx) => (
                  <tr key={item.oc} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-2.5 font-bold text-white flex items-center space-x-2">
                      <span className="text-neutral-500 font-mono">#{idx + 1}</span>
                      <span className="text-sm">{item.oc}</span>
                    </td>
                    <td className="py-2.5 text-neutral-400 font-mono">{item.years}</td>
                    
                    {/* Points Per Drive */}
                    <td className="py-2.5 text-right font-mono font-black text-amber-400 text-sm">
                      {item.avgPPD.toFixed(2)} pts
                    </td>

                    {/* Available Yards % */}
                    <td className="py-2.5 text-right font-mono font-bold text-emerald-300">
                      {item.avgAYPct.toFixed(1)}%
                    </td>

                    {/* Explosive Play % */}
                    <td className="py-2.5 text-right font-mono font-bold text-sky-400">
                      {item.avgExplosivePct.toFixed(1)}%
                    </td>

                    {/* Aggressiveness Index */}
                    <td className="py-2.5 text-right font-mono font-bold text-purple-300">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        item.avgAggressiveness >= 1.25 ? 'bg-purple-950 text-purple-200 border border-purple-700/60 font-black' :
                        item.avgAggressiveness >= 1.05 ? 'bg-amber-950 text-amber-300' : 'bg-neutral-800 text-neutral-300'
                      }`}>
                        {item.avgAggressiveness.toFixed(2)}
                      </span>
                    </td>

                    {/* 4th Down Go Rate */}
                    <td className="py-2.5 text-right font-mono text-purple-300/90">
                      {item.avg4thGo.toFixed(1)}%
                    </td>

                    {/* 4th Down Conversion % */}
                    <td className="py-2.5 text-right font-mono font-bold text-emerald-400">
                      {item.avg4thConv.toFixed(1)}%
                    </td>

                    {/* Offense EPA */}
                    <td className="py-2.5 text-right font-mono font-extrabold text-emerald-400">
                      {item.avgOffEpa > 0 ? `+${item.avgOffEpa.toFixed(3)}` : item.avgOffEpa.toFixed(3)}
                    </td>

                    <td className="py-2.5 text-right font-medium">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        item.avgPPD >= 2.50 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-bold' :
                        item.avgPPD >= 2.10 ? 'bg-teal-950 text-teal-300' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {item.avgPPD >= 2.50 ? 'Elite SEC Playcaller' : item.avgPPD >= 2.10 ? 'Solid Offense' : 'Struggling'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. DEFENSIVE COORDINATOR COMPARISON */}
      {(activeTab === 'all' || activeTab === 'dc') && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm">
          <div className="pb-3 border-b border-neutral-800 mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Defensive Coordinators Performance Rankings</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Ranked by Defensive Points Per Drive Allowed (lower is better), AY% Allowed, and Explosive Rate Allowed
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                  <th className="pb-2 font-semibold">Defensive Coordinator</th>
                  <th className="pb-2 font-semibold">Tenure</th>
                  <th className="pb-2 font-semibold text-right">Points/Drive Allowed</th>
                  <th className="pb-2 font-semibold text-right">AY% Allowed</th>
                  <th className="pb-2 font-semibold text-right">Explosive % Allowed</th>
                  <th className="pb-2 font-semibold text-right">Stuff Rate %</th>
                  <th className="pb-2 font-semibold text-right">Defense EPA Allowed</th>
                  <th className="pb-2 font-semibold text-right">Defensive Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                {dcStats.map((item, idx) => (
                  <tr key={item.dc} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-2.5 font-bold text-white flex items-center space-x-2">
                      <span className="text-neutral-500 font-mono">#{idx + 1}</span>
                      <span className="text-sm">{item.dc}</span>
                    </td>
                    <td className="py-2.5 text-neutral-400 font-mono">{item.years}</td>

                    {/* Defensive Points Per Drive Allowed (Lower is better) */}
                    <td className="py-2.5 text-right font-mono font-black text-amber-400 text-sm">
                      {item.avgDefPPD.toFixed(2)} pts
                    </td>

                    {/* AY % Allowed */}
                    <td className="py-2.5 text-right font-mono font-bold text-emerald-300">
                      {item.avgDefAYPct.toFixed(1)}%
                    </td>

                    {/* Explosive Allowed % */}
                    <td className="py-2.5 text-right font-mono font-bold text-rose-300">
                      {item.avgDefExplosivePct.toFixed(1)}%
                    </td>

                    {/* Stuff Rate % */}
                    <td className="py-2.5 text-right font-mono text-teal-300">
                      {item.avgDefStuffRate.toFixed(1)}%
                    </td>

                    {/* Defensive EPA */}
                    <td className="py-2.5 text-right font-mono font-extrabold text-emerald-400">
                      {item.avgDefEpa > 0 ? `+${item.avgDefEpa.toFixed(3)}` : item.avgDefEpa.toFixed(3)}
                    </td>

                    <td className="py-2.5 text-right font-medium">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        item.avgDefPPD <= 2.05 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-bold' :
                        item.avgDefPPD <= 2.30 ? 'bg-amber-950 text-amber-300' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {item.avgDefPPD <= 2.05 ? 'Lockdown Defense' : item.avgDefPPD <= 2.30 ? 'Solid Unit' : 'High PPD Allowed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

