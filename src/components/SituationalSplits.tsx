import React from 'react';
import { SITUATIONAL_SPLITS } from '../data/razorbacksData';
import { Layers, Target, CheckCircle } from 'lucide-react';

export const SituationalSplits: React.FC = () => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm mb-6">
      <div className="pb-3 border-b border-neutral-800 mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-red-500" />
          <span>Down & Distance Situational EPA Splits</span>
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Efficiency breakdown across 1st down, 2nd down, 3rd down conversions, and red zone execution
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SITUATIONAL_SPLITS.map((split) => (
          <div
            key={split.category}
            className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4 space-y-3 hover:border-red-500/40 transition-all"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-red-400" />
                {split.category}
              </span>
              <span className="text-xs font-semibold text-sky-400 font-mono">
                {split.successRate}% Succ.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800">
                <span className="text-neutral-400 block text-[10px] uppercase font-semibold">Offense EPA</span>
                <span className={`font-mono font-bold text-sm ${
                  split.offenseEpa >= 0.1 ? 'text-emerald-400' : split.offenseEpa >= 0 ? 'text-emerald-300' : 'text-rose-400'
                }`}>
                  {split.offenseEpa > 0 ? `+${split.offenseEpa}` : split.offenseEpa}
                </span>
              </div>

              <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800">
                <span className="text-neutral-400 block text-[10px] uppercase font-semibold">Defense EPA</span>
                <span className={`font-mono font-bold text-sm ${
                  split.defenseEpa <= 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {split.defenseEpa > 0 ? `+${split.defenseEpa}` : split.defenseEpa}
                </span>
              </div>
            </div>

            {split.stuffRate !== undefined && split.opportunityRate !== undefined && (
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="bg-neutral-900/60 px-2 py-1.5 rounded border border-neutral-800/80 flex items-center justify-between">
                  <span className="text-neutral-400">Stuff Rate:</span>
                  <span className="font-mono font-bold text-rose-300">{split.stuffRate}%</span>
                </div>
                <div className="bg-neutral-900/60 px-2 py-1.5 rounded border border-neutral-800/80 flex items-center justify-between">
                  <span className="text-neutral-400">Opp Rate:</span>
                  <span className="font-mono font-bold text-emerald-300">{split.opportunityRate}%</span>
                </div>
              </div>
            )}

            {/* Visual Success Bar */}
            <div>
              <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                <span>Success Rate Metric</span>
                <span>{split.successRate}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-emerald-500 rounded-full"
                  style={{ width: `${split.successRate}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
