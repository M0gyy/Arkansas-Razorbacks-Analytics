import React, { useState, useMemo } from 'react';
import { TeamLogo } from './TeamLogo';
import {
  getConferenceEpaData,
  getConferenceAverages,
  ConferenceName,
  ConferenceTeamEpa
} from '../data/conferenceData';
import {
  Trophy,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Globe,
  Zap,
  Shield,
  Target,
  BarChart2,
  CheckCircle2,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine
} from 'recharts';

interface ConferenceRankingsProps {
  availableSeasons: number[];
  defaultSeason?: number;
}

type SortField = 'netEpa' | 'offenseEpa' | 'defenseEpa' | 'passEpa' | 'rushEpa' | 'specialTeamsEpa' | 'successRate' | 'stuffRate' | 'opportunityRate';
type SortOrder = 'asc' | 'desc';

export const ConferenceRankings: React.FC<ConferenceRankingsProps> = ({
  availableSeasons,
  defaultSeason = 2024
}) => {
  const [selectedSeason, setSelectedSeason] = useState<number>(defaultSeason);
  const [selectedConference, setSelectedConference] = useState<ConferenceName | 'ALL'>('SEC');
  const [sortField, setSortField] = useState<SortField>('netEpa');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  // Load raw data for season
  const allTeams = useMemo(() => getConferenceEpaData(selectedSeason), [selectedSeason]);
  const confAverages = useMemo(() => getConferenceAverages(selectedSeason), [selectedSeason]);

  // Filtered by conference and search query
  const filteredTeams = useMemo(() => {
    return allTeams.filter((team) => {
      const matchConf = selectedConference === 'ALL' || team.conference === selectedConference;
      const matchQuery =
        searchQuery.trim() === '' ||
        team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.conference.toLowerCase().includes(searchQuery.toLowerCase());
      return matchConf && matchQuery;
    });
  }, [allTeams, selectedConference, searchQuery]);

  // Sorted teams
  const sortedTeams = useMemo(() => {
    return [...filteredTeams].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // For defense EPA and stuffRate, lower is better performance
      if (sortField === 'defenseEpa' || sortField === 'stuffRate') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }

      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });
  }, [filteredTeams, sortField, sortOrder]);

  // Find Arkansas Razorbacks position
  const arkansasTeam = useMemo(() => {
    return allTeams.find((t) => t.isArkansas);
  }, [allTeams]);

  const secTeamsSorted = useMemo(() => {
    return allTeams
      .filter((t) => t.conference === 'SEC')
      .sort((a, b) => b.netEpa - a.netEpa);
  }, [allTeams]);

  const arkansasSecRank = useMemo(() => {
    if (!arkansasTeam) return 0;
    const idx = secTeamsSorted.findIndex((t) => t.isArkansas);
    return idx >= 0 ? idx + 1 : 0;
  }, [secTeamsSorted, arkansasTeam]);

  const fbsTeamsSorted = useMemo(() => {
    return [...allTeams].sort((a, b) => b.netEpa - a.netEpa);
  }, [allTeams]);

  const arkansasNationalRank = useMemo(() => {
    if (!arkansasTeam) return 0;
    const idx = fbsTeamsSorted.findIndex((t) => t.isArkansas);
    return idx >= 0 ? idx + 1 : 0;
  }, [fbsTeamsSorted, arkansasTeam]);

  // Toggle sort order or field
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      // Defense EPA default asc (lower is better), others desc
      setSortOrder(field === 'defenseEpa' ? 'asc' : 'desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-neutral-500 opacity-60 inline-block ml-1" />;
    }
    return sortOrder === 'desc' ? (
      <ArrowDown className="w-3.5 h-3.5 text-red-400 font-bold inline-block ml-1" />
    ) : (
      <ArrowUp className="w-3.5 h-3.5 text-red-400 font-bold inline-block ml-1" />
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-red-950 text-red-400 rounded-xl border border-red-800/80">
                <Trophy className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight flex items-center space-x-2">
                  <span>Conference EPA Leaderboards</span>
                  <span className="text-xs bg-red-900/80 text-red-200 px-2.5 py-0.5 rounded-full font-bold border border-red-700/50">
                    {selectedSeason} Season
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Multi-conference Expected Points Added standings, sorting, and national benchmarks.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Season Picker */}
            <div className="flex items-center space-x-1.5 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800">
              <span className="text-xs font-bold text-neutral-400">Season:</span>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="bg-neutral-900 border border-neutral-700 text-xs font-bold text-white rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer"
              >
                {availableSeasons.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr} Season
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  viewMode === 'table' ? 'bg-red-800 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Rankings Grid</span>
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  viewMode === 'chart' ? 'bg-red-800 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Chart Visualizer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Arkansas Razorback Status Highlight Box */}
        {arkansasTeam && (
          <div className="mt-4 bg-neutral-950 p-3.5 rounded-xl border border-red-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <span className="text-3xl inline-block -scale-x-100">🐗</span>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-white text-sm">Arkansas Razorbacks ({arkansasTeam.record})</span>
                  <span className="bg-red-900/80 text-red-200 text-[10px] font-bold px-2 py-0.5 rounded border border-red-700/50">
                    SEC Conference
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center space-x-3">
                  <span>Net EPA: <strong className="text-white font-mono">{arkansasTeam.netEpa > 0 ? `+${arkansasTeam.netEpa}` : arkansasTeam.netEpa}</strong></span>
                  <span>Off EPA: <strong className="text-emerald-400 font-mono">+{arkansasTeam.offenseEpa}</strong></span>
                  <span>Def EPA: <strong className="text-amber-400 font-mono">{arkansasTeam.defenseEpa > 0 ? `+${arkansasTeam.defenseEpa}` : arkansasTeam.defenseEpa}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400 uppercase font-bold">SEC Rank</div>
                <div className="text-sm font-black text-amber-400">#{arkansasSecRank} <span className="text-[10px] text-neutral-400 font-normal">of 16</span></div>
              </div>
              <div className="bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-400 uppercase font-bold">National Rank</div>
                <div className="text-sm font-black text-cyan-400">#{arkansasNationalRank} <span className="text-[10px] text-neutral-400 font-normal">of FBS</span></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Conference Average Baseline Benchmarks Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {(['SEC', 'Big Ten', 'Big 12', 'ACC', 'G5 / Ind', 'FBS_ALL'] as const).map((conf) => {
          const avg = confAverages[conf];
          if (!avg) return null;
          const isSelected = selectedConference === conf || (selectedConference === 'ALL' && conf === 'FBS_ALL');
          const confLabel = conf === 'FBS_ALL' ? 'National FBS Avg' : `${conf} Avg`;

          return (
            <button
              key={conf}
              onClick={() => setSelectedConference(conf === 'FBS_ALL' ? 'ALL' : conf)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-neutral-900 border-red-600 shadow-md ring-1 ring-red-600/50'
                  : 'bg-neutral-950 hover:bg-neutral-900/80 border-neutral-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-red-400' : 'text-neutral-400'}`}>
                  {confLabel}
                </span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />}
              </div>
              <div className="mt-1 text-sm font-extrabold font-mono text-white">
                {avg.avgNetEpa > 0 ? `+${avg.avgNetEpa}` : avg.avgNetEpa}
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5 flex justify-between">
                <span>Off: +{avg.avgOffEpa}</span>
                <span>Def: {avg.avgDefEpa > 0 ? `+${avg.avgDefEpa}` : avg.avgDefEpa}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
        
        {/* Conference Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto text-xs">
          <button
            onClick={() => setSelectedConference('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              selectedConference === 'ALL'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            All FBS
          </button>
          <button
            onClick={() => setSelectedConference('SEC')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              selectedConference === 'SEC'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            SEC
          </button>
          <button
            onClick={() => setSelectedConference('Big Ten')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              selectedConference === 'Big Ten'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            Big Ten
          </button>
          <button
            onClick={() => setSelectedConference('Big 12')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              selectedConference === 'Big 12'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            Big 12
          </button>
          <button
            onClick={() => setSelectedConference('ACC')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              selectedConference === 'ACC'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            ACC
          </button>
          <button
            onClick={() => setSelectedConference('G5 / Ind')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              selectedConference === 'G5 / Ind'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            G5 / Ind
          </button>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search team or conference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Main Content Area: Table vs Chart */}
      {viewMode === 'table' ? (
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-900/90 text-neutral-400 text-[11px] font-bold uppercase tracking-wider border-b border-neutral-800">
                  <th className="py-3 px-3 text-center w-12">Rank</th>
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-3 text-center">Conf</th>
                  <th className="py-3 px-3 text-center">Record</th>
                  
                  {/* Sortable Column Headers */}
                  <th
                    onClick={() => handleSort('netEpa')}
                    className={`py-3 px-3 text-right cursor-pointer transition-colors ${
                      sortField === 'netEpa' ? 'text-white font-extrabold bg-neutral-800/60' : 'hover:text-white'
                    }`}
                  >
                    <span>Net EPA</span> {getSortIcon('netEpa')}
                  </th>

                  <th
                    onClick={() => handleSort('offenseEpa')}
                    className={`py-3 px-3 text-right cursor-pointer transition-colors ${
                      sortField === 'offenseEpa' ? 'text-emerald-400 font-extrabold bg-neutral-800/60' : 'hover:text-white'
                    }`}
                  >
                    <span>Off EPA</span> {getSortIcon('offenseEpa')}
                  </th>

                  <th
                    onClick={() => handleSort('defenseEpa')}
                    className={`py-3 px-3 text-right cursor-pointer transition-colors ${
                      sortField === 'defenseEpa' ? 'text-amber-400 font-extrabold bg-neutral-800/60' : 'hover:text-white'
                    }`}
                  >
                    <span>Def EPA</span> {getSortIcon('defenseEpa')}
                  </th>

                  <th
                    onClick={() => handleSort('passEpa')}
                    className={`py-3 px-3 text-right cursor-pointer transition-colors ${
                      sortField === 'passEpa' ? 'text-cyan-400 font-extrabold bg-neutral-800/60' : 'hover:text-white'
                    }`}
                  >
                    <span>Pass EPA</span> {getSortIcon('passEpa')}
                  </th>

                  <th
                    onClick={() => handleSort('rushEpa')}
                    className={`py-3 px-3 text-right cursor-pointer transition-colors ${
                      sortField === 'rushEpa' ? 'text-amber-400 font-extrabold bg-neutral-800/60' : 'hover:text-white'
                    }`}
                  >
                    <span>Rush EPA</span> {getSortIcon('rushEpa')}
                  </th>

                  <th
                    onClick={() => handleSort('successRate')}
                    className={`py-3 px-3 text-right cursor-pointer transition-colors ${
                      sortField === 'successRate' ? 'text-purple-400 font-extrabold bg-neutral-800/60' : 'hover:text-white'
                    }`}
                  >
                    <span>Succ %</span> {getSortIcon('successRate')}
                  </th>

                  <th
                    onClick={() => handleSort('stuffRate')}
                    className={`py-3 px-3 text-right cursor-pointer transition-colors ${
                      sortField === 'stuffRate' ? 'text-rose-400 font-extrabold bg-neutral-800/60' : 'hover:text-white'
                    }`}
                  >
                    <span>Stuff %</span> {getSortIcon('stuffRate')}
                  </th>

                  <th
                    onClick={() => handleSort('opportunityRate')}
                    className={`py-3 px-3 text-right cursor-pointer transition-colors ${
                      sortField === 'opportunityRate' ? 'text-teal-400 font-extrabold bg-neutral-800/60' : 'hover:text-white'
                    }`}
                  >
                    <span>Opp Rate</span> {getSortIcon('opportunityRate')}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-900 text-xs">
                {sortedTeams.map((team, idx) => {
                  const isArk = team.isArkansas;
                  return (
                    <tr
                      key={`${team.season}-${team.shortName}`}
                      className={`transition-colors ${
                        isArk
                          ? 'bg-red-950/40 border-l-4 border-l-red-500 font-semibold'
                          : idx % 2 === 0
                          ? 'bg-neutral-950/60 hover:bg-neutral-900/60'
                          : 'bg-neutral-900/30 hover:bg-neutral-900/60'
                      }`}
                    >
                      {/* Rank Number */}
                      <td className="py-3 px-3 text-center font-mono font-bold">
                        {idx === 0 ? (
                          <span className="text-amber-400 font-black">🥇 #1</span>
                        ) : idx === 1 ? (
                          <span className="text-neutral-300 font-black">🥈 #2</span>
                        ) : idx === 2 ? (
                          <span className="text-amber-600 font-black">🥉 #3</span>
                        ) : (
                          <span className={isArk ? 'text-red-400 font-extrabold' : 'text-neutral-400'}>#{idx + 1}</span>
                        )}
                      </td>

                      {/* Team Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <TeamLogo teamName={team.teamName} fallbackEmoji={team.logo} size="xs" />
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className={`font-bold ${isArk ? 'text-red-400 font-extrabold text-sm' : 'text-white'}`}>
                                {team.teamName}
                              </span>
                              {isArk && (
                                <span className="bg-red-800 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                  Hogs
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Conference */}
                      <td className="py-3 px-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          team.conference === 'SEC'
                            ? 'bg-amber-950 text-amber-300 border-amber-800/80'
                            : team.conference === 'Big Ten'
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-800/80'
                            : team.conference === 'Big 12'
                            ? 'bg-purple-950 text-purple-300 border-purple-800/80'
                            : team.conference === 'ACC'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800/80'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-700'
                        }`}>
                          {team.conference}
                        </span>
                      </td>

                      {/* Record */}
                      <td className="py-3 px-3 text-center font-mono text-neutral-300">
                        {team.record}
                      </td>

                      {/* Net EPA */}
                      <td className={`py-3 px-3 text-right font-mono font-bold text-sm ${
                        team.netEpa > 0.1 ? 'text-emerald-400' : team.netEpa < 0 ? 'text-red-400' : 'text-white'
                      }`}>
                        {team.netEpa > 0 ? `+${team.netEpa.toFixed(3)}` : team.netEpa.toFixed(3)}
                      </td>

                      {/* Offense EPA */}
                      <td className="py-3 px-3 text-right font-mono text-emerald-300">
                        +{team.offenseEpa.toFixed(3)}
                      </td>

                      {/* Defense EPA (Allowed) */}
                      <td className={`py-3 px-3 text-right font-mono ${
                        team.defenseEpa < 0 ? 'text-emerald-400 font-bold' : team.defenseEpa > 0.05 ? 'text-red-400' : 'text-amber-300'
                      }`}>
                        {team.defenseEpa > 0 ? `+${team.defenseEpa.toFixed(3)}` : team.defenseEpa.toFixed(3)}
                      </td>

                      {/* Pass EPA */}
                      <td className="py-3 px-3 text-right font-mono text-neutral-300">
                        +{team.passEpa.toFixed(3)}
                      </td>

                      {/* Rush EPA */}
                      <td className="py-3 px-3 text-right font-mono text-neutral-300">
                        +{team.rushEpa.toFixed(3)}
                      </td>

                      {/* Success Rate */}
                      <td className="py-3 px-3 text-right font-mono text-purple-300 font-semibold">
                        {team.successRate}%
                      </td>

                      {/* Stuff Rate */}
                      <td className="py-3 px-3 text-right font-mono text-rose-300">
                        {team.stuffRate ?? 16.5}%
                      </td>

                      {/* Opportunity Rate */}
                      <td className="py-3 px-3 text-right font-mono text-teal-300 font-semibold">
                        {team.opportunityRate ?? 48.0}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Visual Chart View */
        <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-red-400" />
                <span>Team Net EPA Standings ({selectedSeason})</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Comparing Net EPA across {selectedConference === 'ALL' ? 'All Conferences' : selectedConference}.
              </p>
            </div>
            <span className="text-xs text-neutral-500 font-mono">Sorted by {sortField} ({sortOrder})</span>
          </div>

          <div className="h-[480px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedTeams.slice(0, 20)} // Top 20 teams
                layout="vertical"
                margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
                <XAxis type="number" stroke="#a3a3a3" fontSize={11} domain={['dataMin - 0.05', 'dataMax + 0.05']} />
                <YAxis
                  type="category"
                  dataKey="shortName"
                  stroke="#a3a3a3"
                  fontSize={11}
                  width={80}
                  tick={({ x, y, payload }) => {
                    const isArk = payload.value === 'Arkansas';
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text
                          x={-6}
                          y={4}
                          textAnchor="end"
                          fill={isArk ? '#ef4444' : '#d4d4d4'}
                          fontWeight={isArk ? '900' : '600'}
                          fontSize={11}
                        >
                          {isArk ? '🐗 Arkansas' : payload.value}
                        </text>
                      </g>
                    );
                  }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as ConferenceTeamEpa;
                      return (
                        <div className="bg-neutral-900/95 border border-neutral-700/80 p-3.5 rounded-xl text-xs space-y-2 shadow-2xl backdrop-blur-md ring-1 ring-white/10 max-w-xs">
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                            <div className="font-extrabold text-white flex items-center space-x-1.5 text-sm">
                              <span>{data.logo}</span>
                              <span>{data.teamName}</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-amber-400 bg-neutral-800 px-2 py-0.5 rounded">
                              {data.record}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-[11px] text-neutral-400">
                            <span>Conference: <strong className="text-white">{data.conference}</strong></span>
                            <span>Success Rate: <strong className="text-purple-300 font-mono">{data.successRate}%</strong></span>
                          </div>

                          <div className="space-y-1 font-mono pt-1 border-t border-neutral-800">
                            <div className="text-emerald-400 flex justify-between">
                              <span>Offense EPA:</span>
                              <span>+{data.offenseEpa.toFixed(3)}</span>
                            </div>
                            <div className="text-neutral-400 text-[10px] flex justify-between pl-2">
                              <span>└ Pass: +{data.passEpa.toFixed(3)} | Rush: +{data.rushEpa.toFixed(3)}</span>
                            </div>
                            <div className="text-amber-400 flex justify-between">
                              <span>Defense EPA Allowed:</span>
                              <span>{data.defenseEpa > 0 ? `+${data.defenseEpa.toFixed(3)}` : data.defenseEpa.toFixed(3)}</span>
                            </div>
                            <div className="text-sky-400 flex justify-between">
                              <span>Special Teams EPA:</span>
                              <span>+{data.specialTeamsEpa.toFixed(3)}</span>
                            </div>
                            <div className="text-white font-bold flex justify-between pt-1 border-t border-neutral-800 text-xs">
                              <span>Net Total EPA:</span>
                              <span className={data.netEpa > 0 ? 'text-emerald-400' : 'text-red-400'}>
                                {data.netEpa > 0 ? `+${data.netEpa.toFixed(3)}` : data.netEpa.toFixed(3)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine x={0} stroke="#525252" strokeDasharray="3 3" />
                <Bar dataKey={sortField} radius={[0, 6, 6, 0]}>
                  {sortedTeams.slice(0, 20).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isArkansas ? '#ef4444' : entry.conference === 'SEC' ? '#f59e0b' : '#3b82f6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Explanatory Footnote */}
      <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 flex items-start space-x-2">
        <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-neutral-200">How Conference EPA Sorting Works:</strong> Expected Points Added (EPA) measures efficiency on a play-by-play basis against down-and-distance baselines.
          Click any column header (e.g., <em>Net EPA</em>, <em>Off EPA</em>, <em>Def EPA</em>) to re-sort teams in real-time. Defensive EPA represents opponent EPA generated — lower or negative values denote stingier, more efficient defenses.
        </p>
      </div>

    </div>
  );
};
