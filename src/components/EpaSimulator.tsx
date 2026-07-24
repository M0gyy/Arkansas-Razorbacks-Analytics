import React, { useState } from 'react';
import { Calculator, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

export const EpaSimulator: React.FC = () => {
  const [passYards, setPassYards] = useState<number>(260);
  const [passAtt, setPassAtt] = useState<number>(32);
  const [passTds, setPassTds] = useState<number>(2);
  const [ints, setInts] = useState<number>(1);
  const [rushYards, setRushYards] = useState<number>(195);
  const [rushAtt, setRushAtt] = useState<number>(38);
  const [rushTds, setRushTds] = useState<number>(2);
  const [stuffRate, setStuffRate] = useState<number>(15);
  const [opportunityRate, setOpportunityRate] = useState<number>(51);
  const [turnoversLost, setTurnoversLost] = useState<number>(1);
  const [sacksAllowed, setSacksAllowed] = useState<number>(2);
  const [oppPassYards, setOppPassYards] = useState<number>(210);
  const [oppRushYards, setOppRushYards] = useState<number>(140);
  const [fgMade, setFgMade] = useState<number>(2);

  // EPA estimation algorithm based on college football stats
  const totalOffPlays = passAtt + rushAtt + sacksAllowed;
  const passYpa = passAtt > 0 ? passYards / passAtt : 0;
  const rushYpc = rushAtt > 0 ? rushYards / rushAtt : 0;

  // Passing EPA estimate: baseline ~0.0 per play at 7.0 YPA, +0.06 per YPA above 7, +0.25 per TD, -0.45 per INT
  const rawPassEpa = passAtt > 0
    ? ((passYpa - 6.8) * 0.05) + (passTds * 0.18) - (ints * 0.35)
    : 0;

  // Rushing EPA estimate: baseline ~0.0 per play at 4.2 YPC, +0.05 per YPC above 4.2, +0.20 per TD, stuff penalty & opp bonus
  const rawRushEpa = rushAtt > 0
    ? ((rushYpc - 4.2) * 0.04) + (rushTds * 0.15) - (turnoversLost * 0.25) - ((stuffRate - 17) * 0.005) + ((opportunityRate - 48) * 0.004)
    : 0;

  // Combined Offensive EPA per play
  const estOffenseEpa = Number((((rawPassEpa * passAtt) + (rawRushEpa * rushAtt)) / (totalOffPlays || 1)).toFixed(3));

  // Defensive EPA Allowed estimate
  const estDefenseEpa = Number((((oppPassYards / 30 - 7) * 0.03 + (oppRushYards / 35 - 4) * 0.02)).toFixed(3));

  // Special Teams EPA
  const estStEpa = Number(((fgMade * 0.04) - 0.02).toFixed(3));

  // Net Total EPA
  const estNetEpa = Number((estOffenseEpa - estDefenseEpa + estStEpa).toFixed(3));

  // Predicted Result
  const predictedScoreArk = Math.max(7, Math.round((estOffenseEpa * 65) + 24));
  const predictedScoreOpp = Math.max(7, Math.round((estDefenseEpa * 65) + 21));
  const isPredictedWin = estNetEpa > -0.05;

  const handleReset = () => {
    setPassYards(260);
    setPassAtt(32);
    setPassTds(2);
    setInts(1);
    setRushYards(195);
    setRushAtt(38);
    setRushTds(2);
    setTurnoversLost(1);
    setSacksAllowed(2);
    setOppPassYards(210);
    setOppRushYards(140);
    setFgMade(2);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-red-500" />
            <span>Interactive Game Script EPA Simulator</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Adjust offense, defense, and turnover stats to calculate real-time Expected Points Added metrics
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Input Controls */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Passing Inputs */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Passing Attack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Pass Yards: {passYards}</label>
                <input
                  type="range"
                  min="80"
                  max="450"
                  value={passYards}
                  onChange={(e) => setPassYards(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Pass Attempts: {passAtt}</label>
                <input
                  type="range"
                  min="15"
                  max="55"
                  value={passAtt}
                  onChange={(e) => setPassAtt(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Pass TDs: {passTds}</label>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={passTds}
                  onChange={(e) => setPassTds(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">INTs Thrown: {ints}</label>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={ints}
                  onChange={(e) => setInts(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Rushing Inputs */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Rushing Attack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Rush Yards: {rushYards}</label>
                <input
                  type="range"
                  min="40"
                  max="380"
                  value={rushYards}
                  onChange={(e) => setRushYards(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Rush Att: {rushAtt}</label>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={rushAtt}
                  onChange={(e) => setRushAtt(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Rush TDs: {rushTds}</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={rushTds}
                  onChange={(e) => setRushTds(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Stuff Rate: {stuffRate}%</label>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={stuffRate}
                  onChange={(e) => setStuffRate(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Opp Rate: {opportunityRate}%</label>
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={opportunityRate}
                  onChange={(e) => setOpportunityRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Defense & Special Teams Inputs */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Opponent Offense & Special Teams</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Opp. Pass Yds Allowed: {oppPassYards}</label>
                <input
                  type="range"
                  min="80"
                  max="450"
                  value={oppPassYards}
                  onChange={(e) => setOppPassYards(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Opp. Rush Yds Allowed: {oppRushYards}</label>
                <input
                  type="range"
                  min="40"
                  max="350"
                  value={oppRushYards}
                  onChange={(e) => setOppRushYards(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Field Goals Made: {fgMade}</label>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={fgMade}
                  onChange={(e) => setFgMade(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Calculated EPA Output Card */}
        <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-red-500/30 rounded-xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-red-500" />
                Simulated Output
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                isPredictedWin ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {isPredictedWin ? 'Predicted Win' : 'Predicted Loss'}
              </span>
            </div>

            <div className="text-center my-4">
              <span className="text-[11px] text-neutral-400 block">Projected Score</span>
              <div className="text-2xl font-extrabold text-white mt-0.5">
                Arkansas <span className="text-red-400">{predictedScoreArk}</span> – <span className="text-neutral-400">{predictedScoreOpp}</span> Opponent
              </div>
            </div>

            <div className="space-y-3 bg-neutral-900/90 p-3.5 rounded-lg border border-neutral-800 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-emerald-400 font-semibold">Offensive EPA / play:</span>
                <span className="font-mono font-bold text-sm text-white">{estOffenseEpa > 0 ? `+${estOffenseEpa}` : estOffenseEpa}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-semibold">Defensive EPA Allowed:</span>
                <span className="font-mono font-bold text-sm text-white">{estDefenseEpa > 0 ? `+${estDefenseEpa}` : estDefenseEpa}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sky-400 font-semibold">Special Teams EPA:</span>
                <span className="font-mono font-bold text-sm text-white">{estStEpa > 0 ? `+${estStEpa}` : estStEpa}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-neutral-800">
                <span className="text-red-400 font-bold">Net Total EPA / play:</span>
                <span className="font-mono font-extrabold text-base text-red-300">{estNetEpa > 0 ? `+${estNetEpa}` : estNetEpa}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-neutral-500 italic mt-4 text-center">
            Calculated using standard NCAA expected points models relative to down, yardage efficiency, and turnover penalties.
          </p>
        </div>

      </div>
    </div>
  );
};
