import React, { useState, useMemo } from 'react';
import { PlayerDeparture } from '../types';
import { DEPARTURES_DATA, getDepartureSummaryBySeason } from '../data/departuresData';
import { 
  UserMinus, 
  Trophy, 
  TrendingDown, 
  Search, 
  Filter, 
  Code, 
  ShieldAlert, 
  Layers, 
  Zap, 
  ArrowUpRight, 
  BarChart3, 
  Check, 
  Copy,
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface DeparturesViewProps {
  selectedSeason: number | 'ALL';
  onSelectSeason: (season: number | 'ALL') => void;
}

export function DeparturesView({ selectedSeason, onSelectSeason }: DeparturesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('ALL');
  const [exitTypeFilter, setExitTypeFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'snaps' | 'epa' | 'name' | 'season'>('snaps');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [copiedApi, setCopiedApi] = useState(false);
  const [expandedPlayerId, setExpandedPlayerId] = useState<string | null>(null);

  const availableSeasons = useMemo(() => {
    return Array.from(new Set(DEPARTURES_DATA.map((d) => d.season))).sort((a, b) => b - a);
  }, []);

  const summaries = useMemo(() => {
    return getDepartureSummaryBySeason();
  }, []);

  // Filtered player departures
  const filteredDepartures = useMemo(() => {
    return DEPARTURES_DATA.filter((item) => {
      // Season filter
      if (selectedSeason !== 'ALL' && item.season !== selectedSeason) {
        return false;
      }
      // Position filter
      if (positionFilter !== 'ALL') {
        if (positionFilter === 'DB/S') {
          if (!['DB', 'S'].includes(item.position)) return false;
        } else if (item.position !== positionFilter) {
          return false;
        }
      }
      // Exit type filter
      if (exitTypeFilter !== 'ALL') {
        if (!item.exit_type.toLowerCase().includes(exitTypeFilter.toLowerCase())) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.player_name.toLowerCase().includes(q);
        const matchPos = item.position.toLowerCase().includes(q);
        const matchDest = item.destination.toLowerCase().includes(q);
        const matchNotes = item.notes.toLowerCase().includes(q);
        if (!matchName && !matchPos && !matchDest && !matchNotes) return false;
      }
      return true;
    }).sort((a, b) => {
      let valA: any = a[sortBy === 'snaps' ? 'snap_count' : sortBy === 'epa' ? 'total_epa_impact' : sortBy === 'season' ? 'season' : 'player_name'];
      let valB: any = b[sortBy === 'snaps' ? 'snap_count' : sortBy === 'epa' ? 'total_epa_impact' : sortBy === 'season' ? 'season' : 'player_name'];

      if (sortBy === 'name') {
        return sortOrder === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
      }
      if (sortBy === 'epa') {
        valA = Math.abs(a.total_epa_impact);
        valB = Math.abs(b.total_epa_impact);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [selectedSeason, positionFilter, exitTypeFilter, searchQuery, sortBy, sortOrder]);

  // Metric aggregates for current view
  const currentMetrics = useMemo(() => {
    const list = selectedSeason === 'ALL' 
      ? DEPARTURES_DATA 
      : DEPARTURES_DATA.filter(d => d.season === selectedSeason);

    const totalSnaps = list.reduce((sum, d) => sum + d.snap_count, 0);
    const offList = list.filter(d => ['QB', 'RB', 'WR', 'TE', 'OL'].includes(d.position));
    const defList = list.filter(d => ['DL', 'LB', 'DB', 'S'].includes(d.position));

    const totalOffEpa = offList.reduce((sum, d) => sum + d.total_epa_impact, 0);
    const totalDefEpa = defList.reduce((sum, d) => sum + d.total_epa_impact, 0);

    const draftCount = list.filter(d => d.exit_type.toLowerCase().includes('draft')).length;
    const portalCount = list.filter(d => d.exit_type.toLowerCase().includes('portal') || d.exit_type.toLowerCase().includes('transfer')).length;
    const gradCount = list.filter(d => d.exit_type.toLowerCase().includes('grad')).length;

    return {
      totalDepartures: list.length,
      totalSnaps,
      avgSnapsPerPlayer: list.length ? Math.round(totalSnaps / list.length) : 0,
      totalOffEpa: Number(totalOffEpa.toFixed(1)),
      totalDefEpa: Number(totalDefEpa.toFixed(1)),
      draftCount,
      portalCount,
      gradCount,
    };
  }, [selectedSeason]);

  // Position group breakdown
  const positionBreakdown = useMemo(() => {
    const list = selectedSeason === 'ALL' 
      ? DEPARTURES_DATA 
      : DEPARTURES_DATA.filter(d => d.season === selectedSeason);

    const groups: Record<string, { count: number; snaps: number; epa: number }> = {
      'Quarterbacks & Backs': { count: 0, snaps: 0, epa: 0 },
      'Receivers & Tight Ends': { count: 0, snaps: 0, epa: 0 },
      'Offensive Line': { count: 0, snaps: 0, epa: 0 },
      'Defensive Line': { count: 0, snaps: 0, epa: 0 },
      'Linebackers': { count: 0, snaps: 0, epa: 0 },
      'Secondary (DB/Safety)': { count: 0, snaps: 0, epa: 0 },
    };

    list.forEach((d) => {
      let g = 'Secondary (DB/Safety)';
      if (['QB', 'RB'].includes(d.position)) g = 'Quarterbacks & Backs';
      else if (['WR', 'TE'].includes(d.position)) g = 'Receivers & Tight Ends';
      else if (d.position === 'OL') g = 'Offensive Line';
      else if (d.position === 'DL') g = 'Defensive Line';
      else if (d.position === 'LB') g = 'Linebackers';

      groups[g].count += 1;
      groups[g].snaps += d.snap_count;
      groups[g].epa += d.total_epa_impact;
    });

    return Object.entries(groups).map(([name, data]) => ({
      name,
      ...data,
      epaFormatted: Number(data.epa.toFixed(1)),
    }));
  }, [selectedSeason]);

  const maxSnapsInList = useMemo(() => {
    return Math.max(...filteredDepartures.map(d => d.snap_count), 900);
  }, [filteredDepartures]);

  // Construct REST API test string
  const activeApiUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedSeason !== 'ALL') params.append('season', String(selectedSeason));
    if (positionFilter !== 'ALL') params.append('position', positionFilter);
    if (exitTypeFilter !== 'ALL') params.append('exit_type', exitTypeFilter);
    const queryString = params.toString();
    return `/api/v1/departures${queryString ? `?${queryString}` : ''}`;
  }, [selectedSeason, positionFilter, exitTypeFilter]);

  const handleCopyApi = () => {
    navigator.clipboard.writeText(`curl -s "http://localhost:3000${activeApiUrl}"`);
    setCopiedApi(true);
    setTimeout(() => setCopiedApi(false), 2000);
  };

  return (
    <div id="departures-container" className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-neutral-900 border border-red-900/40 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-6 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-red-900/50 border border-red-700/50 px-3 py-1 rounded-full text-xs font-semibold text-red-200">
              <UserMinus className="w-3.5 h-3.5 text-red-400" />
              <span>Historical Attrition & Roster Transition Engine (2014–2025)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Arkansas Razorbacks Departure & Production Lost Database
            </h1>
            <p className="text-neutral-400 text-sm max-w-3xl leading-relaxed">
              Track snaps, expected points added (EPA), and production lost to the NFL Draft, Transfer Portal, and Graduation across every Arkansas football season since 2014.
            </p>
          </div>

          {/* Quick Season Pill Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-neutral-950/80 p-2 rounded-xl border border-neutral-800 shrink-0">
            <button
              onClick={() => onSelectSeason('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedSeason === 'ALL'
                  ? 'bg-red-800 text-white shadow'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              All (2014–25)
            </button>
            {availableSeasons.map((yr) => (
              <button
                key={`dep-yr-${yr}`}
                onClick={() => onSelectSeason(yr)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedSeason === yr
                    ? 'bg-red-800 text-white shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Snaps Lost */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Snaps Lost to Departure</span>
            <Layers className="w-4 h-4 text-red-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">
              {currentMetrics.totalSnaps.toLocaleString()}
            </span>
            <span className="text-xs text-neutral-400">snaps</span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-400 flex items-center space-x-1">
            <span className="text-neutral-300 font-semibold">{currentMetrics.totalDepartures} players</span>
            <span>• Avg {currentMetrics.avgSnapsPerPlayer} snaps/player</span>
          </div>
        </div>

        {/* Metric 2: Offensive EPA Impact Lost */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Offensive EPA Lost</span>
            <TrendingDown className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-amber-300">
              +{currentMetrics.totalOffEpa}
            </span>
            <span className="text-xs text-amber-400/80">EPA impact</span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-400">
            Production lost from offensive scoring plays
          </div>
        </div>

        {/* Metric 3: Defensive Disruption Lost */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Defensive Disruption Lost</span>
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-cyan-300">
              {currentMetrics.totalDefEpa}
            </span>
            <span className="text-xs text-cyan-400/80">EPA stopped</span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-400">
            Defensive stops & sacks lost from front line
          </div>
        </div>

        {/* Metric 4: Exit Breakdown */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Departure Exit Channels</span>
            <Trophy className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-center space-x-2 text-xs">
            <span className="bg-purple-950 text-purple-300 border border-purple-800/60 px-2 py-1 rounded-md font-bold">
              {currentMetrics.draftCount} NFL Draft
            </span>
            <span className="bg-amber-950 text-amber-300 border border-amber-800/60 px-2 py-1 rounded-md font-bold">
              {currentMetrics.portalCount} Portal
            </span>
            <span className="bg-neutral-800 text-neutral-300 border border-neutral-700 px-2 py-1 rounded-md font-bold">
              {currentMetrics.gradCount} Grad
            </span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-400">
            {selectedSeason === 'ALL' ? 'Cumulative breakdown across 2014–2025' : `${selectedSeason} season transition breakdown`}
          </div>
        </div>

      </div>

      {/* Multi-Year Trend Bar Visualization (2014–2025 Snaps & EPA Lost) */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-red-500" />
              <span>Multi-Year Production & Snaps Lost Trend (2014–2025)</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click any year column to filter departures for that specific season
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-red-700 inline-block" />
              <span className="text-neutral-300">Total Snaps Lost</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
              <span className="text-neutral-300">Offensive EPA Lost</span>
            </div>
          </div>
        </div>

        {/* Custom Bar Visualizer */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2.5 items-end h-52 pt-4">
          {summaries.map((s) => {
            const isSelected = selectedSeason === s.season;
            const maxSnaps = 6000;
            const heightPct = Math.min(100, Math.max(15, Math.round((s.totalSnaps / maxSnaps) * 100)));

            return (
              <button
                key={`summary-bar-${s.season}`}
                onClick={() => onSelectSeason(s.season)}
                className={`flex flex-col items-center group h-full justify-end p-2 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-red-950/70 border-red-600 ring-2 ring-red-500/50 shadow-lg scale-105'
                    : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800/50'
                }`}
              >
                {/* Top Label */}
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white mb-1">
                  {s.totalSnaps.toLocaleString()}
                </span>

                {/* Vertical Bar */}
                <div className="w-full bg-neutral-900 rounded-t-md overflow-hidden relative flex flex-col justify-end" style={{ height: `${heightPct}%` }}>
                  <div className={`w-full transition-all rounded-t-md ${isSelected ? 'bg-red-600' : 'bg-red-800/70 group-hover:bg-red-700'}`} style={{ height: '100%' }}>
                    <div className="w-full bg-amber-400/80" style={{ height: `${Math.min(100, Math.max(10, Math.abs(s.offEpaLost) * 0.7))}%` }} />
                  </div>
                </div>

                {/* Year Badge */}
                <span className={`text-xs font-bold mt-2 ${isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                  {s.season}
                </span>

                {/* Top Player Lost Tooltip text */}
                <span className="text-[9px] text-neutral-400 truncate max-w-full mt-0.5 font-sans">
                  {s.topPlayerLost}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Position Group Distribution */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>
            Position Group Snaps Lost {selectedSeason === 'ALL' ? '(All Seasons)' : `(${selectedSeason} Season)`}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {positionBreakdown.map((group) => (
            <div key={`pos-grp-${group.name}`} className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-neutral-200">
                  <span>{group.name}</span>
                  <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded text-[10px]">
                    {group.count} player{group.count !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white">
                    {group.snaps.toLocaleString()} <span className="text-xs font-normal text-neutral-500">snaps</span>
                  </span>
                  <span className={`text-xs font-bold ${group.epa >= 0 ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {group.epa >= 0 ? `+${group.epaFormatted}` : group.epaFormatted} EPA
                  </span>
                </div>
              </div>

              {/* Mini progress bar */}
              <div className="mt-3 w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-red-600 h-full rounded-full" 
                  style={{ width: `${Math.min(100, Math.round((group.snaps / Math.max(...positionBreakdown.map(b => b.snaps), 1)) * 100))}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roster & Search Table Controls */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-6">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <UserMinus className="w-5 h-5 text-red-500" />
              <span>
                Detailed Departure Player Roster ({filteredDepartures.length} record{filteredDepartures.length !== 1 ? 's' : ''})
              </span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Filter by season, position, exit channel, or search player details.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search player, position, team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800/80">
          
          {/* Position Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-neutral-400 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-red-400" />
              <span>Position:</span>
            </span>
            <div className="flex flex-wrap items-center gap-1">
              {['ALL', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'DB/S'].map((pos) => (
                <button
                  key={`pos-btn-${pos}`}
                  onClick={() => setPositionFilter(pos)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    positionFilter === pos
                      ? 'bg-red-900 text-white font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* Exit Type Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-neutral-400">Exit Channel:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'Draft', label: 'NFL Draft' },
                { id: 'Portal', label: 'Transfer Portal' },
                { id: 'Graduation', label: 'Graduation' },
              ].map((et) => (
                <button
                  key={`exit-btn-${et.id}`}
                  onClick={() => setExitTypeFilter(et.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    exitTypeFilter === et.id
                      ? 'bg-neutral-800 text-white font-bold border border-neutral-700'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {et.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Departure Table */}
        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/80">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/90 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                <th 
                  onClick={() => {
                    if (sortBy === 'season') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else { setSortBy('season'); setSortOrder('desc'); }
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  Season {sortBy === 'season' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th 
                  onClick={() => {
                    if (sortBy === 'name') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else { setSortBy('name'); setSortOrder('asc'); }
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  Player Name {sortBy === 'name' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th className="py-3 px-3">Pos</th>
                <th className="py-3 px-3">Class</th>
                <th className="py-3 px-4">Exit Type</th>
                <th className="py-3 px-4">Destination</th>
                <th 
                  onClick={() => {
                    if (sortBy === 'snaps') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else { setSortBy('snaps'); setSortOrder('desc'); }
                  }}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  Snaps Lost {sortBy === 'snaps' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th 
                  onClick={() => {
                    if (sortBy === 'epa') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    else { setSortBy('epa'); setSortOrder('desc'); }
                  }}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  Total EPA Impact {sortBy === 'epa' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th className="py-3 px-4 text-right">Succ %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-xs">
              {filteredDepartures.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-500 italic">
                    No departures match your current filter selection.
                  </td>
                </tr>
              ) : (
                filteredDepartures.map((player) => {
                  const isExpanded = expandedPlayerId === player.id;
                  const isDraft = player.exit_type.toLowerCase().includes('draft');
                  const isPortal = player.exit_type.toLowerCase().includes('portal') || player.exit_type.toLowerCase().includes('transfer');
                  const snapPercent = Math.min(100, Math.round((player.snap_count / maxSnapsInList) * 100));

                  return (
                    <React.Fragment key={`row-${player.id}`}>
                      <tr 
                        onClick={() => setExpandedPlayerId(isExpanded ? null : player.id)}
                        className={`hover:bg-neutral-900/80 cursor-pointer transition-colors ${
                          isExpanded ? 'bg-neutral-900/90' : ''
                        }`}
                      >
                        {/* Season */}
                        <td className="py-3.5 px-4 font-mono font-bold text-red-400">
                          {player.season}
                        </td>

                        {/* Player Name */}
                        <td className="py-3.5 px-4 font-bold text-white">
                          <div className="flex items-center space-x-2">
                            <span>{player.player_name}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </td>

                        {/* Position */}
                        <td className="py-3.5 px-3">
                          <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
                            {player.position}
                          </span>
                        </td>

                        {/* Class */}
                        <td className="py-3.5 px-3 text-neutral-400">
                          {player.class_year}
                        </td>

                        {/* Exit Type */}
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] inline-flex items-center space-x-1 ${
                            isDraft
                              ? 'bg-purple-950/80 text-purple-300 border border-purple-800/60'
                              : isPortal
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                              : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                          }`}>
                            <span>{player.exit_type}</span>
                          </span>
                        </td>

                        {/* Destination */}
                        <td className="py-3.5 px-4 text-neutral-300 font-medium truncate max-w-[180px]">
                          {player.destination || 'N/A'}
                        </td>

                        {/* Snap Count */}
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                          <div className="flex items-center justify-end space-x-2">
                            <span>{player.snap_count.toLocaleString()}</span>
                            <div className="w-12 bg-neutral-900 rounded-full h-1.5 overflow-hidden hidden sm:block">
                              <div className="bg-red-600 h-full rounded-full" style={{ width: `${snapPercent}%` }} />
                            </div>
                          </div>
                        </td>

                        {/* Total EPA Impact */}
                        <td className="py-3.5 px-4 text-right font-mono font-bold">
                          <span className={player.total_epa_impact >= 0 ? 'text-amber-400' : 'text-cyan-400'}>
                            {player.total_epa_impact >= 0 ? `+${player.total_epa_impact}` : player.total_epa_impact}
                          </span>
                          <span className="text-[10px] text-neutral-500 block font-normal">
                            ({player.epa_per_play >= 0 ? `+${player.epa_per_play}` : player.epa_per_play}/play)
                          </span>
                        </td>

                        {/* Success Rate */}
                        <td className="py-3.5 px-4 text-right font-mono text-neutral-300">
                          {player.success_rate}%
                        </td>
                      </tr>

                      {/* Expanded detail row */}
                      {isExpanded && (
                        <tr className="bg-neutral-900/60 border-b border-neutral-800">
                          <td colSpan={9} className="p-4 sm:p-6">
                            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-3">
                              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center space-x-1.5">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>Player Impact Notes & Context</span>
                                </span>
                                <span className="text-xs text-neutral-400 font-mono">
                                  ID: {player.id}
                                </span>
                              </div>

                              <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                                {player.notes}
                              </p>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                                <div className="bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800">
                                  <span className="text-neutral-500 block text-[10px]">Position / Role</span>
                                  <span className="font-bold text-white">{player.position} ({player.class_year})</span>
                                </div>
                                <div className="bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800">
                                  <span className="text-neutral-500 block text-[10px]">Exit Channel</span>
                                  <span className="font-bold text-white">{player.exit_type}</span>
                                </div>
                                <div className="bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800">
                                  <span className="text-neutral-500 block text-[10px]">Destination</span>
                                  <span className="font-bold text-white">{player.destination}</span>
                                </div>
                                <div className="bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800">
                                  <span className="text-neutral-500 block text-[10px]">Efficiency Index</span>
                                  <span className="font-bold text-white">{player.success_rate}% Success Rate</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* REST API Playground Card */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Live REST API Endpoint Explorer</h3>
          </div>
          <button
            onClick={handleCopyApi}
            className="inline-flex items-center space-x-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs px-3 py-1.5 rounded-lg border border-neutral-700 transition-colors"
          >
            {copiedApi ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied curl command!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy cURL Command</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-mono text-xs text-neutral-300 space-y-2 overflow-x-auto">
          <div className="flex items-center space-x-2 text-emerald-400">
            <span className="bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">GET</span>
            <span>http://localhost:3000{activeApiUrl}</span>
          </div>
          <p className="text-[11px] text-neutral-500 font-sans">
            Queries backend departures endpoint for real-time JSON format. Supports <code className="text-amber-300">season</code>, <code className="text-amber-300">position</code>, and <code className="text-amber-300">exit_type</code> query params or <code className="text-amber-300">/api/v1/departures/summary</code>.
          </p>
        </div>
      </div>

    </div>
  );
}
