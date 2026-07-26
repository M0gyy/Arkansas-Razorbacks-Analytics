import React, { useState, useMemo } from 'react';
import { GameData, SeasonData } from '../types';
import { Search, Trophy, ArrowUpDown, ChevronDown, ChevronUp, Download, BarChart3, Zap, ShieldAlert, Clock, Flag } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface GameExplorerProps {
  seasons: SeasonData[];
  selectedSeason: number | 'ALL';
  onSelectSeason: (season: number | 'ALL') => void;
}

export const GameExplorer: React.FC<GameExplorerProps> = ({
  seasons,
  selectedSeason,
  onSelectSeason
}) => {
  const [viewMode, setViewMode] = useState<'epa' | 'traditional'>('epa');
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState<'ALL' | 'W' | 'L'>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'netEpa' | 'offenseEpa' | 'defenseEpa' | 'totalYards' | 'points'>('date');
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);

  // Flatten games list
  const allGames = useMemo(() => {
    let gamesList: (GameData & { seasonCoach: string })[] = [];
    seasons.forEach((s) => {
      s.games.forEach((g) => {
        gamesList.push({ ...g, seasonCoach: s.headCoach });
      });
    });
    return gamesList;
  }, [seasons]);

  // Filter games based on season, search, and win/loss
  const filteredGames = useMemo(() => {
    return allGames
      .filter((g) => {
        if (selectedSeason !== 'ALL' && g.season !== selectedSeason) return false;
        if (resultFilter !== 'ALL' && g.result !== resultFilter) return false;
        if (
          searchQuery &&
          !g.opponent.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !g.notes?.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'netEpa') return b.netEpaPerPlay - a.netEpaPerPlay;
        if (sortBy === 'offenseEpa') return b.offenseEpaPerPlay - a.offenseEpaPerPlay;
        if (sortBy === 'defenseEpa') return a.defenseEpaPerPlay - b.defenseEpaPerPlay; // lower is better
        if (sortBy === 'totalYards') return (b.totalYards || 0) - (a.totalYards || 0);
        if (sortBy === 'points') return b.arkansasScore - a.arkansasScore;
        return `${b.season}-${b.week}`.localeCompare(`${a.season}-${a.week}`);
      });
  }, [allGames, selectedSeason, resultFilter, searchQuery, sortBy]);

  const handleDownloadCSV = () => {
    if (filteredGames.length === 0) return;

    const headers = [
      'Season',
      'Week',
      'Date',
      'Opponent',
      'Location',
      'Result',
      'Arkansas Score',
      'Opponent Score',
      'Total Yards',
      'Passing Yards',
      'Rushing Yards',
      'Opponent Total Yards',
      'Opponent Pass Yards',
      'Opponent Rush Yards',
      'First Downs',
      '3rd Down Conv (%)',
      'Turnovers Lost',
      'Turnovers Forced',
      'Sacks Recorded',
      'Sacks Allowed',
      'Penalties Yards',
      'Time of Possession',
      'Offense EPA/Play',
      'Defense EPA/Play',
      'Special Teams EPA/Play',
      'Net EPA/Play',
      'Pass EPA/Play',
      'Rush EPA/Play',
      'Offense Success Rate (%)',
      'Defense Success Rate (%)',
      'Explosive Play Rate (%)',
      'Turnover EPA Margin',
      'Head Coach',
      'Notes'
    ];

    const rows = filteredGames.map((g) => [
      g.season,
      g.week,
      `"${g.date}"`,
      `"${g.opponent.replace(/"/g, '""')}"`,
      g.isHome ? 'Home' : 'Away',
      g.result,
      g.arkansasScore,
      g.opponentScore,
      g.totalYards || 0,
      g.passingYards || 0,
      g.rushingYards || 0,
      g.oppTotalYards || 0,
      g.oppPassingYards || 0,
      g.oppRushingYards || 0,
      g.firstDowns || 0,
      g.thirdDownConv || '0/0',
      g.turnoversGiven || 0,
      g.turnoversTaken || 0,
      g.sacksRecorded || 0,
      g.sacksAllowed || 0,
      `"${g.penaltiesYards || '0-0'}"`,
      `"${g.timeOfPossession || '30:00'}"`,
      g.offenseEpaPerPlay,
      g.defenseEpaPerPlay,
      g.specialTeamsEpaPerPlay,
      g.netEpaPerPlay,
      g.passEpaPerPlay,
      g.rushEpaPerPlay,
      g.offenseSuccessRate,
      g.defenseSuccessRate,
      g.explosivePlayRate,
      g.turnoverEpaMargin,
      `"${g.seasonCoach.replace(/"/g, '""')}"`,
      `"${(g.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const seasonSuffix = selectedSeason === 'ALL' ? 'all_seasons' : `${selectedSeason}_season`;
    link.setAttribute('download', `arkansas_football_stats_${seasonSuffix}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm mb-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-neutral-800 gap-4 mb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-red-500" />
            <span>Game Log & Box Scores</span>
            <span className="text-xs font-semibold text-neutral-300 bg-neutral-800 px-2.5 py-0.5 rounded-full">
              {filteredGames.length} Games
            </span>
          </h2>
          <p className="text-sm text-neutral-400 mt-0.5">
            Statistical EPA per play and traditional box scores for every Razorback game since 2014
          </p>
        </div>

        {/* View Mode Toggle & Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* EPA vs Traditional View Switch */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setViewMode('epa')}
              className={`px-2.5 py-1.5 rounded font-semibold transition-all flex items-center gap-1 ${
                viewMode === 'epa'
                  ? 'bg-red-950 text-red-300 border border-red-800/80 shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>EPA Analytics</span>
            </button>
            <button
              onClick={() => setViewMode('traditional')}
              className={`px-2.5 py-1.5 rounded font-semibold transition-all flex items-center gap-1 ${
                viewMode === 'traditional'
                  ? 'bg-red-950 text-red-300 border border-red-800/80 shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Traditional Stats</span>
            </button>
          </div>

          {/* Season Filter Dropdown */}
          <select
            value={selectedSeason}
            onChange={(e) => onSelectSeason(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="bg-neutral-800 border border-neutral-700 text-xs sm:text-sm font-semibold text-white px-3 py-2 rounded-lg focus:outline-none"
          >
            <option value="ALL">All Seasons</option>
            {seasons.map((s) => (
              <option key={s.season} value={s.season}>
                {s.season} ({s.record})
              </option>
            ))}
          </select>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search opponent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-xs sm:text-sm text-white pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-red-500 w-32 sm:w-40"
            />
          </div>

          {/* Win/Loss Filter */}
          <div className="flex items-center space-x-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs sm:text-sm">
            <button
              onClick={() => setResultFilter('ALL')}
              className={`px-2.5 py-1 rounded transition-all ${
                resultFilter === 'ALL' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setResultFilter('W')}
              className={`px-2.5 py-1 rounded transition-all ${
                resultFilter === 'W' ? 'bg-emerald-900/80 text-emerald-300 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Wins
            </button>
            <button
              onClick={() => setResultFilter('L')}
              className={`px-2.5 py-1 rounded transition-all ${
                resultFilter === 'L' ? 'bg-rose-900/80 text-rose-300 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Losses
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-1 bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-neutral-300">
            <ArrowUpDown className="w-4 h-4 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-medium text-white focus:outline-none cursor-pointer"
            >
              <option value="date" className="bg-neutral-900">Sort: Date</option>
              <option value="netEpa" className="bg-neutral-900">Sort: Net EPA</option>
              <option value="offenseEpa" className="bg-neutral-900">Sort: Offense EPA</option>
              <option value="defenseEpa" className="bg-neutral-900">Sort: Defense EPA</option>
              <option value="totalYards" className="bg-neutral-900">Sort: Total Yards</option>
              <option value="points" className="bg-neutral-900">Sort: Points Scored</option>
            </select>
          </div>

          {/* Download CSV Button */}
          <button
            onClick={handleDownloadCSV}
            disabled={filteredGames.length === 0}
            className="flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg transition-all shadow-sm shrink-0"
            title="Export filtered game statistics and box scores to CSV"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Games List Grid/Table */}
      <div className="space-y-3">
        {filteredGames.length === 0 ? (
          <div className="text-center py-12 text-neutral-500 text-sm">
            No games found matching your search criteria.
          </div>
        ) : (
          filteredGames.map((game) => {
            const isExpanded = expandedGameId === game.id;
            const isWin = game.result === 'W';

            return (
              <div
                key={game.id}
                className={`bg-neutral-950 border transition-all rounded-xl overflow-hidden ${
                  isExpanded
                    ? 'border-red-500/60 shadow-lg shadow-red-950/20'
                    : 'border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                {/* Main Card Row */}
                <div
                  onClick={() => setExpandedGameId(isExpanded ? null : game.id)}
                  className="p-4 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left Column: Opponent & Score */}
                  <div className="flex items-center space-x-3.5">
                    <TeamLogo teamName={game.opponent} fallbackEmoji={game.opponentLogo} size="md" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isWin ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950 text-rose-300 border border-rose-800/60'
                        }`}>
                          {game.result} {game.arkansasScore} - {game.opponentScore}
                        </span>
                        <h3 className="text-base font-bold text-white">
                          {game.isHome ? 'vs' : '@'} {game.opponent}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">
                        {game.season} Week {game.week} • {game.date} • Coach: {game.seasonCoach}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: EPA Metrics OR Traditional Metrics depending on viewMode */}
                  {viewMode === 'epa' ? (
                    <div className="grid grid-cols-3 gap-3 md:gap-6 text-center border-t md:border-t-0 border-neutral-800 pt-3 md:pt-0">
                      <div>
                        <span className="text-xs uppercase font-bold text-neutral-500 block">Offense EPA</span>
                        <span className={`text-base font-mono font-extrabold ${
                          game.offenseEpaPerPlay >= 0.1 ? 'text-emerald-400' : game.offenseEpaPerPlay >= 0 ? 'text-emerald-300' : 'text-rose-400'
                        }`}>
                          {game.offenseEpaPerPlay > 0 ? `+${game.offenseEpaPerPlay}` : game.offenseEpaPerPlay}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs uppercase font-bold text-neutral-500 block">Defense EPA</span>
                        <span className={`text-base font-mono font-extrabold ${
                          game.defenseEpaPerPlay <= 0 ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {game.defenseEpaPerPlay > 0 ? `+${game.defenseEpaPerPlay}` : game.defenseEpaPerPlay}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs uppercase font-bold text-neutral-500 block">Net Total</span>
                        <span className={`text-base font-mono font-extrabold ${
                          game.netEpaPerPlay >= 0 ? 'text-red-400' : 'text-neutral-400'
                        }`}>
                          {game.netEpaPerPlay > 0 ? `+${game.netEpaPerPlay}` : game.netEpaPerPlay}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-6 text-center border-t md:border-t-0 border-neutral-800 pt-3 md:pt-0 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-500 block">Total Yards</span>
                        <span className="text-sm font-mono font-extrabold text-white">
                          {game.totalYards || 0} <span className="text-neutral-500 text-[10px]">vs {game.oppTotalYards || 0}</span>
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-500 block">Pass / Rush</span>
                        <span className="text-xs font-mono font-bold text-sky-300">
                          {game.passingYards || 0}p / {game.rushingYards || 0}r
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-500 block">3rd Down</span>
                        <span className="text-xs font-mono font-bold text-teal-300">
                          {game.thirdDownConv || 'N/A'}
                        </span>
                      </div>

                      <div className="hidden sm:block">
                        <span className="text-[10px] uppercase font-bold text-neutral-500 block">Turnovers</span>
                        <span className={`text-xs font-mono font-bold ${
                          (game.turnoversTaken || 0) >= (game.turnoversGiven || 0) ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {(game.turnoversTaken || 0) - (game.turnoversGiven || 0) > 0
                            ? `+${(game.turnoversTaken || 0) - (game.turnoversGiven || 0)}`
                            : (game.turnoversTaken || 0) - (game.turnoversGiven || 0)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Right Column: Expand Icon */}
                  <div className="flex items-center justify-end">
                    <button className="text-neutral-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center space-x-1">
                      <span className="hidden sm:inline font-medium">{isExpanded ? 'Hide Box Score' : 'Full Box Score'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Box Score Breakdown */}
                {isExpanded && (
                  <div className="bg-neutral-900/90 border-t border-neutral-800 p-4 text-xs sm:text-sm space-y-4">
                    
                    {/* Traditional Side-by-Side Box Score Comparison Table */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                          <BarChart3 className="w-4 h-4 text-red-400" />
                          Official Box Score Breakdown
                        </span>
                        <span className="text-[11px] text-neutral-400">Arkansas vs {game.opponent}</span>
                      </div>

                      <div className="bg-neutral-950 rounded-lg border border-neutral-800 overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-neutral-800 bg-neutral-900/60 text-neutral-400">
                              <th className="py-2.5 px-3 font-semibold">Stat Category</th>
                              <th className="py-2.5 px-3 font-semibold text-red-400 text-center">
                                <div className="inline-flex items-center gap-1.5 justify-center">
                                  <TeamLogo teamName="Arkansas" size="xs" />
                                  <span>Arkansas Razorbacks</span>
                                </div>
                              </th>
                              <th className="py-2.5 px-3 font-semibold text-amber-400 text-center">
                                <div className="inline-flex items-center gap-1.5 justify-center">
                                  <TeamLogo teamName={game.opponent} fallbackEmoji={game.opponentLogo} size="xs" />
                                  <span>{game.opponent}</span>
                                </div>
                              </th>
                              <th className="py-2.5 px-3 font-semibold text-neutral-400 text-right">Edge / Margin</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-800/60 font-mono">
                            {/* Points */}
                            <tr>
                              <td className="py-2 px-3 font-sans font-medium text-neutral-300">Final Score</td>
                              <td className="py-2 px-3 text-center font-bold text-white">{game.arkansasScore}</td>
                              <td className="py-2 px-3 text-center font-bold text-white">{game.opponentScore}</td>
                              <td className="py-2 px-3 text-right">
                                <span className={`font-bold ${isWin ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {isWin ? `+${game.arkansasScore - game.opponentScore}` : `${game.arkansasScore - game.opponentScore}`}
                                </span>
                              </td>
                            </tr>
                            {/* First Downs */}
                            <tr>
                              <td className="py-2 px-3 font-sans font-medium text-neutral-300">First Downs</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.firstDowns || 0}</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.oppFirstDowns || 0}</td>
                              <td className="py-2 px-3 text-right text-neutral-400">
                                {(game.firstDowns || 0) - (game.oppFirstDowns || 0) > 0 ? `+${(game.firstDowns || 0) - (game.oppFirstDowns || 0)}` : (game.firstDowns || 0) - (game.oppFirstDowns || 0)}
                              </td>
                            </tr>
                            {/* Total Yards */}
                            <tr className="bg-neutral-900/30">
                              <td className="py-2 px-3 font-sans font-bold text-white">Total Offense Yards</td>
                              <td className="py-2 px-3 text-center font-bold text-red-300">{game.totalYards || 0}</td>
                              <td className="py-2 px-3 text-center font-bold text-amber-300">{game.oppTotalYards || 0}</td>
                              <td className="py-2 px-3 text-right">
                                <span className={`font-bold ${(game.totalYards || 0) >= (game.oppTotalYards || 0) ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {(game.totalYards || 0) - (game.oppTotalYards || 0) > 0 ? `+${(game.totalYards || 0) - (game.oppTotalYards || 0)}` : (game.totalYards || 0) - (game.oppTotalYards || 0)} yds
                                </span>
                              </td>
                            </tr>
                            {/* Passing Yards */}
                            <tr>
                              <td className="py-2 px-3 font-sans font-medium text-neutral-300">Passing Yards</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.passingYards || 0} yds</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.oppPassingYards || 0} yds</td>
                              <td className="py-2 px-3 text-right text-neutral-400">
                                {(game.passingYards || 0) - (game.oppPassingYards || 0) > 0 ? `+${(game.passingYards || 0) - (game.oppPassingYards || 0)}` : (game.passingYards || 0) - (game.oppPassingYards || 0)}
                              </td>
                            </tr>
                            {/* Rushing Yards */}
                            <tr>
                              <td className="py-2 px-3 font-sans font-medium text-neutral-300">Rushing Yards</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.rushingYards || 0} yds</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.oppRushingYards || 0} yds</td>
                              <td className="py-2 px-3 text-right text-neutral-400">
                                {(game.rushingYards || 0) - (game.oppRushingYards || 0) > 0 ? `+${(game.rushingYards || 0) - (game.oppRushingYards || 0)}` : (game.rushingYards || 0) - (game.oppRushingYards || 0)}
                              </td>
                            </tr>
                            {/* 3rd Down Conversions */}
                            <tr className="bg-neutral-900/30">
                              <td className="py-2 px-3 font-sans font-medium text-neutral-300">3rd Down Conversions</td>
                              <td className="py-2 px-3 text-center font-semibold text-emerald-300">{game.thirdDownConv || 'N/A'}</td>
                              <td className="py-2 px-3 text-center font-semibold text-amber-300">{game.oppThirdDownConv || 'N/A'}</td>
                              <td className="py-2 px-3 text-right text-neutral-400">-</td>
                            </tr>
                            {/* Turnovers */}
                            <tr>
                              <td className="py-2 px-3 font-sans font-medium text-neutral-300">Turnovers (Lost / Taken)</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.turnoversGiven || 0} lost</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.turnoversTaken || 0} lost</td>
                              <td className="py-2 px-3 text-right font-bold">
                                <span className={(game.turnoversTaken || 0) - (game.turnoversGiven || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                                  {(game.turnoversTaken || 0) - (game.turnoversGiven || 0) > 0 ? `+${(game.turnoversTaken || 0) - (game.turnoversGiven || 0)}` : (game.turnoversTaken || 0) - (game.turnoversGiven || 0)} margin
                                </span>
                              </td>
                            </tr>
                            {/* Sacks */}
                            <tr>
                              <td className="py-2 px-3 font-sans font-medium text-neutral-300">Sacks (Recorded / Allowed)</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.sacksRecorded || 0} sacks</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.sacksAllowed || 0} sacks</td>
                              <td className="py-2 px-3 text-right text-neutral-400">
                                {(game.sacksRecorded || 0) - (game.sacksAllowed || 0) > 0 ? `+${(game.sacksRecorded || 0) - (game.sacksAllowed || 0)}` : (game.sacksRecorded || 0) - (game.sacksAllowed || 0)}
                              </td>
                            </tr>
                            {/* Penalties & TOP */}
                            <tr className="bg-neutral-900/30">
                              <td className="py-2 px-3 font-sans font-medium text-neutral-300">Penalties (Yards) • TOP</td>
                              <td className="py-2 px-3 text-center text-neutral-200">{game.penaltiesYards || 'N/A'} • {game.timeOfPossession || '30:00'}</td>
                              <td className="py-2 px-3 text-center text-neutral-200">5-45 • 30:00</td>
                              <td className="py-2 px-3 text-right text-neutral-400">TOP {game.timeOfPossession}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Advanced EPA & Efficiency Context Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                      <div>
                        <span className="text-neutral-400 block font-medium text-xs">Offense EPA / play</span>
                        <span className="text-emerald-400 font-mono font-bold text-base">
                          {game.offenseEpaPerPlay > 0 ? `+${game.offenseEpaPerPlay}` : game.offenseEpaPerPlay}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-medium text-xs">Defense EPA / play</span>
                        <span className="text-amber-400 font-mono font-bold text-base">
                          {game.defenseEpaPerPlay > 0 ? `+${game.defenseEpaPerPlay}` : game.defenseEpaPerPlay}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-medium text-xs">Offense Success Rate</span>
                        <span className="text-sky-300 font-mono font-bold text-base">
                          {game.offenseSuccessRate}%
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-medium text-xs">Explosive Play Rate</span>
                        <span className="text-amber-300 font-mono font-bold text-base">
                          {game.explosivePlayRate}%
                        </span>
                      </div>
                    </div>

                    {/* Pressure Rate, Pass Rush Win Rate & Coverage Disruption */}
                    {(game.passRushWinRate !== undefined || game.coverageDisruptionRate !== undefined) && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-950/80 p-3 rounded-lg border border-neutral-800 text-xs">
                        <div>
                          <span className="text-neutral-400 block font-medium">Pass Rush Win Rate</span>
                          <span className="text-amber-400 font-mono font-bold text-sm">
                            {game.passRushWinRate ?? 38.0}%
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block font-medium">Pressure Rate (Gen / Allowed)</span>
                          <span className="text-sky-300 font-mono font-bold text-sm">
                            {game.pressureRateGenerated ?? 35.0}% / {game.pressureRateAllowed ?? 28.0}%
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block font-medium">Coverage Disruption Rate</span>
                          <span className="text-red-400 font-mono font-bold text-sm">
                            {game.coverageDisruptionRate ?? 12.5}%
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block font-medium">Interceptions / PBUs</span>
                          <span className="text-emerald-400 font-mono font-bold text-sm">
                            {game.interceptionsCount ?? 1} INT / {game.passBreakupsCount ?? 4} PBU
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

