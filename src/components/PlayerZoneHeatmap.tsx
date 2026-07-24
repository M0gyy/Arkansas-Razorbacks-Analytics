import React, { useState, useMemo } from 'react';
import { PlayerEpaLeader, FieldZoneData } from '../types';
import { Target, Zap, Shield, Sparkles, Activity, Layers, ArrowUpRight, Award, Info } from 'lucide-react';

interface PlayerZoneHeatmapProps {
  players: PlayerEpaLeader[];
  selectedPlayerId?: string;
  onSelectPlayer?: (playerId: string) => void;
  compact?: boolean;
}

type MetricMode = 'epa' | 'success' | 'usage';

export const PlayerZoneHeatmap: React.FC<PlayerZoneHeatmapProps> = ({
  players,
  selectedPlayerId,
  onSelectPlayer,
  compact = false
}) => {
  const [activePlayerId, setActivePlayerId] = useState<string>(
    selectedPlayerId || players[0]?.id || 'off-brandon-allen-2015'
  );
  const [metricMode, setMetricMode] = useState<MetricMode>('epa');
  const [selectedZone, setSelectedZone] = useState<FieldZoneData | null>(null);

  // Sync internal player state when external selectedPlayerId changes
  React.useEffect(() => {
    if (selectedPlayerId) {
      setActivePlayerId(selectedPlayerId);
    }
  }, [selectedPlayerId]);

  const currentPlayer = useMemo(() => {
    return players.find(p => p.id === activePlayerId) || players[0];
  }, [players, activePlayerId]);

  const handlePlayerChange = (id: string) => {
    setActivePlayerId(id);
    if (onSelectPlayer) {
      onSelectPlayer(id);
    }
    setSelectedZone(null);
  };

  const zones = currentPlayer?.fieldZones || [];

  // Helper to color-code field zone heatmap cells based on value
  const getZoneStyle = (zone: FieldZoneData) => {
    if (metricMode === 'epa') {
      const val = zone.epaPerPlay;
      if (currentPlayer.phase === 'defense') {
        // Defense: lower (more negative) is better points saved
        if (val <= -0.35) return 'bg-rose-900/90 text-rose-100 border-rose-500 shadow-rose-950/50 shadow-md';
        if (val <= -0.20) return 'bg-amber-900/80 text-amber-100 border-amber-600/80';
        return 'bg-neutral-900/80 text-neutral-300 border-neutral-700/60';
      } else {
        // Offense / Special Teams: higher positive is better
        if (val >= 0.45) return 'bg-emerald-900/90 text-emerald-100 border-emerald-400 shadow-emerald-950/60 shadow-lg font-bold';
        if (val >= 0.25) return 'bg-emerald-950/80 text-emerald-200 border-emerald-600/70';
        if (val >= 0.10) return 'bg-teal-950/70 text-teal-200 border-teal-700/60';
        return 'bg-neutral-900/80 text-neutral-300 border-neutral-700/60';
      }
    } else if (metricMode === 'success') {
      const val = zone.successRate;
      if (val >= 65) return 'bg-emerald-900/90 text-emerald-100 border-emerald-400 shadow-emerald-950/50 shadow-md';
      if (val >= 52) return 'bg-teal-950/80 text-teal-200 border-teal-600/70';
      return 'bg-neutral-900/80 text-neutral-300 border-neutral-700/60';
    } else {
      // Usage Share %
      const val = zone.playSharePercent;
      if (val >= 20) return 'bg-amber-900/90 text-amber-100 border-amber-500 shadow-amber-950/50 shadow-md';
      if (val >= 10) return 'bg-amber-950/80 text-amber-200 border-amber-700/60';
      return 'bg-neutral-900/80 text-neutral-300 border-neutral-700/60';
    }
  };

  // Find most impactful zone
  const topZone = useMemo(() => {
    if (!zones.length) return null;
    return [...zones].sort((a, b) => {
      if (currentPlayer.phase === 'defense') return a.epaPerPlay - b.epaPerPlay;
      return b.epaPerPlay - a.epaPerPlay;
    })[0];
  }, [zones, currentPlayer]);

  // Width directional breakdown (Left, Middle, Right)
  const widthBreakdown = useMemo(() => {
    const leftZones = zones.filter(z => z.widthLabel === 'Left');
    const middleZones = zones.filter(z => z.widthLabel === 'Middle');
    const rightZones = zones.filter(z => z.widthLabel === 'Right');

    const avg = (arr: FieldZoneData[]) => {
      if (!arr.length) return 0;
      return arr.reduce((acc, z) => acc + z.epaPerPlay, 0) / arr.length;
    };

    return {
      left: avg(leftZones),
      middle: avg(middleZones),
      right: avg(rightZones)
    };
  }, [zones]);

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-2xl">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-red-950 text-red-400 border border-red-800/50">
              <Target className="w-4 h-4 text-red-400" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Field Zone Efficiency Heatmap</span>
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Expected Points Added distribution across field depth and directional width channels.
          </p>
        </div>

        {/* Controls: Player Dropdown & Metric Mode Switch */}
        <div className="flex flex-wrap items-center gap-2">
          {!compact && (
            <select
              value={activePlayerId}
              onChange={(e) => handlePlayerChange(e.target.value)}
              className="bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-700/80 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              {players.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.position} - {p.seasonLabel})
                </option>
              ))}
            </select>
          )}

          {/* Metric Selector Pills */}
          <div className="flex items-center space-x-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setMetricMode('epa')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                metricMode === 'epa' ? 'bg-red-800 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              EPA / Play
            </button>
            <button
              onClick={() => setMetricMode('success')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                metricMode === 'success' ? 'bg-emerald-800 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Success %
            </button>
            <button
              onClick={() => setMetricMode('usage')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                metricMode === 'usage' ? 'bg-amber-800 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Target %
            </button>
          </div>
        </div>
      </div>

      {/* Active Player Card Summary Banner */}
      {currentPlayer && (
        <div className="mt-4 bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-900 to-neutral-900 border border-red-500/40 flex items-center justify-center font-bold text-sm text-white">
              {currentPlayer.number}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm">{currentPlayer.name}</span>
                <span className="bg-neutral-800 text-red-300 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-neutral-700">
                  {currentPlayer.position}
                </span>
                <span className="text-xs text-neutral-400">{currentPlayer.seasonLabel}</span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">{currentPlayer.keyStat}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-right">
            <div>
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">Total EPA Impact</div>
              <div
                className={`text-base font-black ${
                  currentPlayer.phase === 'offense'
                    ? 'text-emerald-400'
                    : currentPlayer.phase === 'defense'
                    ? 'text-amber-400'
                    : 'text-sky-400'
                }`}
              >
                {currentPlayer.epaPerPlay > 0 ? `+${currentPlayer.epaPerPlay.toFixed(3)}` : currentPlayer.epaPerPlay.toFixed(3)}
              </div>
            </div>
            {topZone && (
              <div className="hidden sm:block pl-3 border-l border-neutral-800">
                <div className="text-[10px] text-emerald-400 uppercase font-semibold flex items-center space-x-1">
                  <Award className="w-3 h-3 text-emerald-400" />
                  <span>Peak Efficiency Zone</span>
                </div>
                <div className="text-xs font-bold text-white mt-0.5">{topZone.name}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Football Field Visual Heatmap Layout */}
      <div className="mt-4 relative bg-emerald-950/30 rounded-2xl border-2 border-emerald-900/60 p-3 overflow-hidden shadow-inner">
        
        {/* Field Grass Texture Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#064e3b15_1px,transparent_1px)] bg-[size:100%_24px] pointer-events-none" />
        
        {/* Top Endzone - Opponent Endzone */}
        <div className="bg-red-950/90 border border-red-800/80 rounded-xl p-2.5 text-center mb-3 relative overflow-hidden">
          <div className="text-xs font-black tracking-widest text-red-300 uppercase flex items-center justify-center space-x-2">
            <span>★ END ZONE ★</span>
          </div>
        </div>

        {/* Directional Yard Lines Indicator */}
        <div className="flex items-center justify-between text-[10px] text-emerald-400/80 font-mono font-bold uppercase tracking-wider px-2 mb-2">
          <span>← LEFT BOUNDARY</span>
          <span>FIELD DIRECTION ▲</span>
          <span>RIGHT BOUNDARY →</span>
        </div>

        {/* Field Heatmap Zones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 relative z-10">
          {zones.map((zone) => {
            const isSelected = selectedZone?.id === zone.id;
            const zoneStyle = getZoneStyle(zone);

            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${zoneStyle} ${
                  isSelected ? 'ring-2 ring-red-500 scale-[1.02] z-20 shadow-2xl' : 'hover:scale-[1.01]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 bg-neutral-950/60 px-1.5 py-0.5 rounded border border-neutral-800">
                      {zone.depthLabel} • {zone.widthLabel}
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-400">
                      {zone.playCount} snaps ({zone.playSharePercent}%)
                    </span>
                  </div>

                  <h4 className="text-xs font-bold mt-1.5 line-clamp-1">{zone.name}</h4>
                </div>

                <div className="mt-3 flex items-end justify-between pt-2 border-t border-white/10">
                  <div>
                    <div className="text-[9px] uppercase font-semibold text-neutral-400">EPA / Play</div>
                    <div className="text-sm font-black tracking-tight">
                      {zone.epaPerPlay > 0 ? `+${zone.epaPerPlay.toFixed(3)}` : zone.epaPerPlay.toFixed(3)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[9px] uppercase font-semibold text-neutral-400">Success %</div>
                    <div className="text-xs font-bold">{zone.successRate}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Endzone - Razorbacks Home Field Line */}
        <div className="mt-3 bg-neutral-900/90 border border-neutral-800 rounded-xl p-2 text-center text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
          LINE OF SCRIMMAGE / RAZORBACK BACKFIELD
        </div>

      </div>

      {/* Selected Zone Deep Dive Card */}
      {selectedZone ? (
        <div className="mt-4 bg-neutral-900 border border-red-900/60 p-4 rounded-xl relative animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded bg-red-950 text-red-400 border border-red-800">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-sm font-bold text-white">{selectedZone.name} Detailed Breakdown</h4>
            </div>
            <button
              onClick={() => setSelectedZone(null)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 text-xs">
            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 text-center">
              <div className="text-[10px] text-neutral-400 font-semibold uppercase">Zone EPA</div>
              <div className="text-sm font-black text-emerald-400 mt-0.5">
                {selectedZone.epaPerPlay > 0 ? `+${selectedZone.epaPerPlay.toFixed(3)}` : selectedZone.epaPerPlay.toFixed(3)}
              </div>
            </div>

            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 text-center">
              <div className="text-[10px] text-neutral-400 font-semibold uppercase">Success Rate</div>
              <div className="text-sm font-black text-white mt-0.5">{selectedZone.successRate}%</div>
            </div>

            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 text-center">
              <div className="text-[10px] text-neutral-400 font-semibold uppercase">Target / Snap Share</div>
              <div className="text-sm font-black text-amber-400 mt-0.5">{selectedZone.playSharePercent}%</div>
            </div>

            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 text-center">
              <div className="text-[10px] text-neutral-400 font-semibold uppercase">Total Plays</div>
              <div className="text-sm font-black text-neutral-200 mt-0.5">{selectedZone.playCount} plays</div>
            </div>
          </div>

          {selectedZone.notes && (
            <p className="text-xs text-neutral-300 mt-3 italic bg-neutral-950/80 p-2.5 rounded-lg border border-neutral-800">
              "{selectedZone.notes}"
            </p>
          )}
        </div>
      ) : (
        /* Directional Field Width Bar Summary */
        <div className="mt-4 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/80 text-xs">
          <div className="flex items-center justify-between text-neutral-400 text-[11px] font-semibold mb-2">
            <span>Directional Pass / Run Channel Breakdown (Avg EPA):</span>
            <span className="text-neutral-500">Click any zone above for detailed tactical notes</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
              <span className="text-[10px] text-neutral-400 font-bold uppercase block">Left Channel</span>
              <span className="text-xs font-black text-emerald-400 mt-0.5 block">
                {widthBreakdown.left > 0 ? `+${widthBreakdown.left.toFixed(3)}` : widthBreakdown.left.toFixed(3)}
              </span>
            </div>

            <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
              <span className="text-[10px] text-neutral-400 font-bold uppercase block">Middle Channel</span>
              <span className="text-xs font-black text-emerald-400 mt-0.5 block">
                {widthBreakdown.middle > 0 ? `+${widthBreakdown.middle.toFixed(3)}` : widthBreakdown.middle.toFixed(3)}
              </span>
            </div>

            <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800">
              <span className="text-[10px] text-neutral-400 font-bold uppercase block">Right Channel</span>
              <span className="text-xs font-black text-emerald-400 mt-0.5 block">
                {widthBreakdown.right > 0 ? `+${widthBreakdown.right.toFixed(3)}` : widthBreakdown.right.toFixed(3)}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
