import React, { useState, useMemo } from 'react';
import { GameData, SeasonData } from '../types';
import { Search, Filter, Trophy, ArrowUpDown, ChevronDown, ChevronUp, Download } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState<'ALL' | 'W' | 'L'>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'netEpa' | 'offenseEpa' | 'defenseEpa'>('date');
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
    link.setAttribute('download', `arkansas_football_epa_${seasonSuffix}.csv`);
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
            <span>Game-by-Game EPA Log</span>
            <span className="text-xs font-semibold text-neutral-300 bg-neutral-800 px-2.5 py-0.5 rounded-full">
              {filteredGames.length} Games
            </span>
          </h2>
          <p className="text-sm text-neutral-400 mt-0.5">
            Statistical EPA per play breakdown for every Arkansas football game since 2014
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
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
              className="bg-neutral-800 border border-neutral-700 text-xs sm:text-sm text-white pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-red-500 w-36 sm:w-44"
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
            </select>
          </div>

          {/* Download CSV Button */}
          <button
            onClick={handleDownloadCSV}
            disabled={filteredGames.length === 0}
            className="flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg transition-all shadow-sm shrink-0"
            title="Export filtered EPA game data to CSV"
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
                    <div className="text-2xl w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                      {game.opponentLogo}
                    </div>
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

                  {/* Middle Column: Key EPA Metrics */}
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

                  {/* Right Column: Expand Icon */}
                  <div className="flex items-center justify-end">
                    <button className="text-neutral-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center space-x-1">
                      <span className="hidden sm:inline font-medium">{isExpanded ? 'Hide Details' : 'View Breakdown'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Detailed Play Analysis */}
                {isExpanded && (
                  <div className="bg-neutral-900/90 border-t border-neutral-800 p-4 text-xs sm:text-sm space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                      <div>
                        <span className="text-neutral-400 block font-medium text-xs">Passing EPA/play</span>
                        <span className="text-emerald-400 font-mono font-bold text-base">
                          {game.passEpaPerPlay > 0 ? `+${game.passEpaPerPlay}` : game.passEpaPerPlay}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-medium text-xs">Rushing EPA/play</span>
                        <span className="text-teal-400 font-mono font-bold text-base">
                          {game.rushEpaPerPlay > 0 ? `+${game.rushEpaPerPlay}` : game.rushEpaPerPlay}
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-neutral-300">
                      <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800">
                        <span className="text-neutral-400 font-semibold block text-xs">Special Teams EPA</span>
                        <span className="font-mono font-bold text-sky-400 text-sm">
                          {game.specialTeamsEpaPerPlay > 0 ? `+${game.specialTeamsEpaPerPlay}` : game.specialTeamsEpaPerPlay}
                        </span>
                      </div>
                      <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800">
                        <span className="text-neutral-400 font-semibold block text-xs">Stuff Rate / Opp Rate</span>
                        <div className="font-mono font-bold text-sm flex items-center gap-2 mt-0.5">
                          <span className="text-rose-400" title="Stuff Rate (run <=0 yds)">
                            Stuff: {game.stuffRate ?? 16.5}%
                          </span>
                          <span className="text-neutral-600">•</span>
                          <span className="text-emerald-400" title="Opportunity Rate (run >=4 yds)">
                            Opp: {game.opportunityRate ?? 48.0}%
                          </span>
                        </div>
                      </div>
                      <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800">
                        <span className="text-neutral-400 font-semibold block text-xs">Turnover EPA Margin</span>
                        <span className={`font-mono font-bold text-sm ${
                          game.turnoverEpaMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {game.turnoverEpaMargin > 0 ? `+${game.turnoverEpaMargin}` : game.turnoverEpaMargin} points
                        </span>
                      </div>
                    </div>
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
