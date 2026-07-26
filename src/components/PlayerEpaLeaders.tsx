import React, { useState, useMemo } from 'react';
import { PLAYER_EPA_LEADERS } from '../data/playerEpaData';
import { PlayerEpaLeader } from '../types';
import { PlayerZoneHeatmap } from './PlayerZoneHeatmap';
import { Award, Shield, Zap, Target, Search, Filter, Sparkles, ChevronRight, UserCheck, BarChart2, CheckCircle2, Trophy, HelpCircle, X, Layers } from 'lucide-react';

interface PlayerEpaLeadersProps {
  selectedSeason?: number | 'ALL';
  onSelectSeason?: (season: number | 'ALL') => void;
}

export const PlayerEpaLeaders: React.FC<PlayerEpaLeadersProps> = ({
  selectedSeason = 'ALL',
  onSelectSeason
}) => {
  const [phaseFilter, setPhaseFilter] = useState<'ALL' | 'offense' | 'defense' | 'special_teams'>('ALL');
  const [positionFilter, setPositionFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'heatmap'>('cards');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerEpaLeader | null>(null);
  const [showInfoBanner, setShowInfoBanner] = useState<boolean>(true);

  // Filtered players
  const filteredPlayers = useMemo(() => {
    return PLAYER_EPA_LEADERS.filter((player) => {
      // Phase check
      if (phaseFilter !== 'ALL' && player.phase !== phaseFilter) return false;

      // Season check
      if (selectedSeason !== 'ALL' && player.season !== selectedSeason && player.season !== 'ALL') {
        return false;
      }

      // Position category check
      if (positionFilter !== 'ALL') {
        if (positionFilter === 'QB' && player.position !== 'QB') return false;
        if (positionFilter === 'RB' && player.position !== 'RB' && !player.position.includes('RB')) return false;
        if (positionFilter === 'CATCHERS' && !['WR', 'TE'].includes(player.position)) return false;
        if (positionFilter === 'FRONT7' && !['DE', 'DE/EDGE', 'LB'].includes(player.position)) return false;
        if (positionFilter === 'SECONDARY' && !['CB', 'S', 'DB'].includes(player.position)) return false;
        if (positionFilter === 'SPECIALISTS' && !['K', 'P', 'P / Holder', 'KR', 'KR / RB'].includes(player.position)) return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = player.name.toLowerCase().includes(q);
        const matchesPos = player.position.toLowerCase().includes(q);
        const matchesKeyStat = player.keyStat.toLowerCase().includes(q);
        const matchesHighlights = player.highlights.some(h => h.toLowerCase().includes(q));
        if (!matchesName && !matchesPos && !matchesKeyStat && !matchesHighlights) return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort logic: Offense & ST -> higher EPA is better. Defense -> lower (more negative) is better.
      if (a.phase === 'defense' && b.phase === 'defense') {
        return a.epaPerPlay - b.epaPerPlay; // lower EPA first (e.g. -0.285 before -0.198)
      }
      return Math.abs(b.epaPerPlay) - Math.abs(a.epaPerPlay);
    });
  }, [phaseFilter, selectedSeason, positionFilter, searchQuery]);

  // Phase badges count
  const offenseCount = PLAYER_EPA_LEADERS.filter(p => p.phase === 'offense').length;
  const defenseCount = PLAYER_EPA_LEADERS.filter(p => p.phase === 'defense').length;
  const stCount = PLAYER_EPA_LEADERS.filter(p => p.phase === 'special_teams').length;

  return (
    <section id="player-epa-leaders" className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 md:p-6 shadow-xl mb-8">
      
      {/* Title & Phase Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-neutral-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-red-950 text-red-400 border border-red-800/40">
              <Trophy className="w-5 h-5 text-red-400" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Player EPA Leaders <span className="text-red-500 font-extrabold text-sm ml-1">(2014–Present)</span>
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Expected Points Added per play impact at the individual player level across Offense, Defense, and Special Teams.
          </p>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center space-x-1.5 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 self-start lg:self-auto">
          <button
            onClick={() => setPhaseFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              phaseFilter === 'ALL'
                ? 'bg-red-700 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>All Phases</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-neutral-900 rounded-full border border-neutral-700">
              {PLAYER_EPA_LEADERS.length}
            </span>
          </button>

          <button
            onClick={() => setPhaseFilter('offense')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              phaseFilter === 'offense'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Offense</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-emerald-950 rounded-full border border-emerald-800">
              {offenseCount}
            </span>
          </button>

          <button
            onClick={() => setPhaseFilter('defense')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              phaseFilter === 'defense'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/50'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Defense</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-amber-950 rounded-full border border-amber-800">
              {defenseCount}
            </span>
          </button>

          <button
            onClick={() => setPhaseFilter('special_teams')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              phaseFilter === 'special_teams'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-sky-400 hover:text-sky-300 hover:bg-sky-950/50'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Special Teams</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-sky-950 rounded-full border border-sky-800">
              {stCount}
            </span>
          </button>
        </div>
      </div>

      {/* Info Banner Explaining EPA Context */}
      {showInfoBanner && (
        <div className="mt-4 bg-neutral-950/80 border border-neutral-800 rounded-xl p-3.5 text-xs text-neutral-300 flex items-start justify-between gap-3">
          <div className="flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Understanding Player EPA Metrics:</span>
              <ul className="mt-1 space-y-0.5 text-neutral-400 text-[11px] list-disc list-inside">
                <li><strong className="text-emerald-400">Offense & Special Teams:</strong> Higher positive (+EPA/play) indicates expected points added per touch, pass, target, or return.</li>
                <li><strong className="text-amber-400">Defense:</strong> Higher negative (-EPA/play impact) indicates points prevented on opponent snaps when on the field or forcing disruptions/stops.</li>
              </ul>
            </div>
          </div>
          <button
            onClick={() => setShowInfoBanner(false)}
            className="text-neutral-500 hover:text-neutral-300 p-1 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Secondary Controls Bar: Position Filter, Search Bar, View Mode Toggle */}
      <div className="mt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
        
        {/* Filter Pills / Position Buttons */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs text-neutral-400 font-medium px-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Position:</span>
          </span>
          <button
            onClick={() => setPositionFilter('ALL')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              positionFilter === 'ALL' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setPositionFilter('QB')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              positionFilter === 'QB' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            QBs
          </button>
          <button
            onClick={() => setPositionFilter('RB')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              positionFilter === 'RB' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            RBs
          </button>
          <button
            onClick={() => setPositionFilter('CATCHERS')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              positionFilter === 'CATCHERS' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            WRs & TEs
          </button>
          <button
            onClick={() => setPositionFilter('FRONT7')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              positionFilter === 'FRONT7' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Pass Rush & LBs
          </button>
          <button
            onClick={() => setPositionFilter('SECONDARY')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              positionFilter === 'SECONDARY' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Secondary
          </button>
          <button
            onClick={() => setPositionFilter('SPECIALISTS')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              positionFilter === 'SPECIALISTS' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Specialists
          </button>
        </div>

        {/* Search & View Mode Toggle */}
        <div className="flex items-center space-x-2">
          {/* Search Box */}
          <div className="relative flex-1 md:w-52">
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search player, year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center space-x-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setViewMode('cards')}
              title="Card Grid View"
              className={`p-1.5 rounded text-xs transition-colors flex items-center space-x-1 ${
                viewMode === 'cards' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              title="Table View"
              className={`p-1.5 rounded text-xs transition-colors flex items-center space-x-1 ${
                viewMode === 'table' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              title="Field Zone Heatmap"
              className={`p-1.5 rounded text-xs transition-colors flex items-center space-x-1 ${
                viewMode === 'heatmap' ? 'bg-red-800 text-white font-bold shadow' : 'text-red-400/80 hover:text-red-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Field Heatmap</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Display View */}
      {filteredPlayers.length === 0 ? (
        <div className="py-12 text-center text-neutral-400 bg-neutral-950/40 rounded-xl border border-neutral-800/60 mt-4">
          <UserCheck className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="font-semibold text-sm">No player EPA leaders match your current filters.</p>
          <p className="text-xs text-neutral-500 mt-1">Try resetting the position, phase, or search filters.</p>
          <button
            onClick={() => {
              setPhaseFilter('ALL');
              setPositionFilter('ALL');
              setSearchQuery('');
            }}
            className="mt-3 px-3 py-1.5 bg-red-800/80 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'heatmap' ? (
        <div className="mt-5">
          <PlayerZoneHeatmap
            players={filteredPlayers}
            selectedPlayerId={selectedPlayer?.id}
            onSelectPlayer={(id) => {
              const p = PLAYER_EPA_LEADERS.find(pl => pl.id === id);
              if (p) setSelectedPlayer(p);
            }}
          />
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {filteredPlayers.map((player) => {
            const isOffense = player.phase === 'offense';
            const isDefense = player.phase === 'defense';
            
            return (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="bg-neutral-950/90 border border-neutral-800 hover:border-red-900/80 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-red-950/30 group cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                {/* Phase Accent Strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isOffense
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : isDefense
                      ? 'bg-gradient-to-r from-amber-500 to-red-500'
                      : 'bg-gradient-to-r from-sky-500 to-blue-400'
                  }`}
                />

                <div>
                  {/* Top Row: Name, Position Badge & Season */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-sm text-neutral-200 shrink-0 group-hover:border-red-500/50 transition-colors">
                        {player.number}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-red-400 transition-colors flex items-center space-x-1.5">
                          <span>{player.name}</span>
                        </h3>
                        <div className="flex items-center space-x-1.5 text-xs text-neutral-400 mt-0.5">
                          <span className="bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded text-xs font-semibold uppercase">
                            {player.position}
                          </span>
                          <span>•</span>
                          <span className="text-neutral-300 font-medium">{player.seasonLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* EPA Badge */}
                    <div className="text-right shrink-0">
                      <div
                        className={`px-2.5 py-1 rounded-lg text-sm font-black tracking-tight border inline-flex items-center space-x-1 ${
                          isOffense
                            ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60'
                            : isDefense
                            ? 'bg-amber-950/90 text-amber-300 border-amber-700/60'
                            : 'bg-sky-950/90 text-sky-300 border-sky-700/60'
                        }`}
                      >
                        <span>{player.epaPerPlay > 0 ? `+${player.epaPerPlay.toFixed(3)}` : player.epaPerPlay.toFixed(3)}</span>
                        <span className="text-xs font-semibold opacity-80">EPA</span>
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                        {isOffense ? 'per play' : isDefense ? 'def impact' : 'per play'}
                      </div>
                    </div>
                  </div>

                  {/* Key Stat Box */}
                  <div className="mt-3.5 bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800/80">
                    <div className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Stat Line</div>
                    <div className="text-sm font-bold text-neutral-100 mt-0.5">{player.keyStat}</div>
                  </div>

                  {/* Advanced Metrics Badges if present */}
                  {(player.cpoe !== undefined || player.yardsPerRouteRun !== undefined || player.passerRatingClean !== undefined || player.airYardsPerAttempt !== undefined || player.passRushWinRate !== undefined || player.coverageDisruptionRate !== undefined) && (
                    <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[11px] font-mono bg-neutral-900/60 p-2 rounded-lg border border-neutral-800">
                      {player.cpoe !== undefined && player.cpoe !== 0 && (
                        <div>
                          <span className="text-neutral-500 block text-[9px] uppercase font-sans">CPOE</span>
                          <span className="text-emerald-400 font-bold">{player.cpoe > 0 ? `+${player.cpoe}%` : `${player.cpoe}%`}</span>
                        </div>
                      )}
                      {player.yardsPerRouteRun !== undefined && player.yardsPerRouteRun > 0 && (
                        <div>
                          <span className="text-neutral-500 block text-[9px] uppercase font-sans">YPRR</span>
                          <span className="text-amber-300 font-bold">{player.yardsPerRouteRun} YPRR</span>
                        </div>
                      )}
                      {player.passerRatingClean !== undefined && (
                        <div>
                          <span className="text-neutral-500 block text-[9px] uppercase font-sans">Clean / Pressure</span>
                          <span className="text-sky-300 font-bold">{player.passerRatingClean} / {player.passerRatingPressure}</span>
                        </div>
                      )}
                      {player.airYardsPerAttempt !== undefined && (
                        <div>
                          <span className="text-neutral-500 block text-[9px] uppercase font-sans">aDOT / Air Yds</span>
                          <span className="text-purple-300 font-bold">{player.airYardsPerAttempt}y ({player.totalAirYards})</span>
                        </div>
                      )}
                      {player.passRushWinRate !== undefined && (
                        <div>
                          <span className="text-neutral-500 block text-[9px] uppercase font-sans">Pass Rush Win %</span>
                          <span className="text-amber-400 font-bold">{player.passRushWinRate}% ({player.pressureRate}% Press)</span>
                        </div>
                      )}
                      {player.coverageDisruptionRate !== undefined && (
                        <div>
                          <span className="text-neutral-500 block text-[9px] uppercase font-sans">Cov Disruption</span>
                          <span className="text-red-400 font-bold">{player.coverageDisruptionRate}% Rate</span>
                        </div>
                      )}
                      {(player.interceptionsCount !== undefined || player.passBreakupsCount !== undefined) && (
                        <div>
                          <span className="text-neutral-500 block text-[9px] uppercase font-sans">INTs / PBUs</span>
                          <span className="text-emerald-400 font-bold">{player.interceptionsCount ?? 0} INT / {player.passBreakupsCount ?? 0} PBU</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Highlight Quote / Note */}
                  <p className="text-sm text-neutral-300 mt-3 line-clamp-2 italic">
                    "{player.highlights[0]}"
                  </p>
                </div>

                {/* Card Footer Button */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 group-hover:text-red-400">
                  <span className="text-xs font-medium flex items-center space-x-1 text-neutral-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Success Rate: {player.successRate}%</span>
                  </span>
                  <span className="flex items-center space-x-1 text-sm font-semibold">
                    <span>View Spotlight</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="bg-neutral-900/90 text-neutral-300 uppercase text-xs tracking-wider border-b border-neutral-800 font-bold">
              <tr>
                <th className="py-3.5 px-4">Player / Pos</th>
                <th className="py-3.5 px-4">Phase</th>
                <th className="py-3.5 px-4">Season</th>
                <th className="py-3.5 px-4 text-right">EPA / Play</th>
                <th className="py-3.5 px-4 text-right">Success / Stop %</th>
                <th className="py-3.5 px-4">Key Stat Line</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filteredPlayers.map((player) => {
                const isOffense = player.phase === 'offense';
                const isDefense = player.phase === 'defense';
                return (
                  <tr
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    className="hover:bg-neutral-900/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-base group-hover:text-red-400 flex items-center space-x-2">
                        <span className="text-neutral-400 text-sm font-medium">{player.number}</span>
                        <span>{player.name}</span>
                        <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded text-xs font-semibold">
                          {player.position}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                          isOffense
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : isDefense
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-sky-950 text-sky-300 border border-sky-800'
                        }`}
                      >
                        {player.phase.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-300 font-medium">
                      {player.seasonLabel}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-sm">
                      <span
                        className={
                          isOffense
                            ? 'text-emerald-400'
                            : isDefense
                            ? 'text-amber-400'
                            : 'text-sky-400'
                        }
                      >
                        {player.epaPerPlay > 0 ? `+${player.epaPerPlay.toFixed(3)}` : player.epaPerPlay.toFixed(3)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-neutral-200 text-sm">
                      {player.successRate}%
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300 text-sm max-w-xs truncate">
                      {player.keyStat}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="text-red-400 hover:text-red-300 font-bold text-xs sm:text-sm inline-flex items-center space-x-1 cursor-pointer">
                        <span>Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed Spotlight Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1.5 bg-neutral-800 rounded-full cursor-pointer z-30"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start space-x-3.5 pr-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-900 to-neutral-950 border border-red-500/40 flex items-center justify-center font-black text-xl text-white shadow-lg">
                {selectedPlayer.number}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-white">{selectedPlayer.name}</h3>
                  <span className="bg-neutral-800 text-red-300 border border-neutral-700 text-xs font-semibold px-2 py-0.5 rounded">
                    {selectedPlayer.position}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Arkansas Razorbacks • {selectedPlayer.seasonLabel}
                </p>
              </div>
            </div>

            {/* EPA Metrics KPI Cards */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Expected Points Added</div>
                <div
                  className={`text-2xl font-black mt-0.5 ${
                    selectedPlayer.phase === 'offense'
                      ? 'text-emerald-400'
                      : selectedPlayer.phase === 'defense'
                      ? 'text-amber-400'
                      : 'text-sky-400'
                  }`}
                >
                  {selectedPlayer.epaPerPlay > 0 ? `+${selectedPlayer.epaPerPlay.toFixed(3)}` : selectedPlayer.epaPerPlay.toFixed(3)}
                </div>
                <div className="text-[10px] text-neutral-500">per play impact</div>
              </div>

              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Success / Stop Rate</div>
                <div className="text-2xl font-black text-white mt-0.5">
                  {selectedPlayer.successRate}%
                </div>
                <div className="text-[10px] text-neutral-500">positive play rate</div>
              </div>
            </div>

            {/* Key Stat Line */}
            <div className="mt-4 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wide">Season Stat Summary</div>
              <p className="text-sm font-semibold text-white mt-1">{selectedPlayer.keyStat}</p>
            </div>

            {/* Advanced Passing / Receiving Metrics Breakdown if present */}
            {(selectedPlayer.cpoe !== undefined || selectedPlayer.yardsPerRouteRun !== undefined || selectedPlayer.passerRatingClean !== undefined || selectedPlayer.airYardsPerAttempt !== undefined) && (
              <div className="mt-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wide mb-2 flex items-center justify-between">
                  <span>Advanced Analytics</span>
                  <span className="text-[10px] text-neutral-400 font-normal">Tracking Data</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {selectedPlayer.cpoe !== undefined && (
                    <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                      <div className="text-[10px] text-neutral-400 uppercase font-sans">CPOE</div>
                      <div className="text-sm font-bold text-emerald-400">{selectedPlayer.cpoe > 0 ? `+${selectedPlayer.cpoe}%` : `${selectedPlayer.cpoe}%`}</div>
                    </div>
                  )}
                  {selectedPlayer.yardsPerRouteRun !== undefined && (
                    <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                      <div className="text-[10px] text-neutral-400 uppercase font-sans">YPRR</div>
                      <div className="text-sm font-bold text-amber-300">{selectedPlayer.yardsPerRouteRun} Yds</div>
                    </div>
                  )}
                  {selectedPlayer.passerRatingClean !== undefined && (
                    <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                      <div className="text-[10px] text-neutral-400 uppercase font-sans">Clean / Pressure</div>
                      <div className="text-sm font-bold text-sky-300">{selectedPlayer.passerRatingClean} / {selectedPlayer.passerRatingPressure}</div>
                    </div>
                  )}
                  {selectedPlayer.airYardsPerAttempt !== undefined && (
                    <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                      <div className="text-[10px] text-neutral-400 uppercase font-sans">aDOT / Air Yds</div>
                      <div className="text-sm font-bold text-purple-300">{selectedPlayer.airYardsPerAttempt}y ({selectedPlayer.totalAirYards})</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Signature Game Performance */}
            <div className="mt-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">Signature Performance</div>
              <p className="text-xs text-neutral-200 mt-1 font-medium">{selectedPlayer.bestGame}</p>
            </div>

            {/* Field Zone Heatmap Embedded in Spotlight */}
            <div className="mt-4">
              <PlayerZoneHeatmap players={[selectedPlayer]} selectedPlayerId={selectedPlayer.id} compact={true} />
            </div>

            {/* Highlights List */}
            <div className="mt-4">
              <div className="text-xs font-bold text-neutral-300 mb-2">Key Highlights & EPA Milestones:</div>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {selectedPlayer.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Close Action */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
              >
                Close Spotlight
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
