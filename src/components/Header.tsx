import React from 'react';
import { UnitType } from '../types';
import { Flame, BarChart3, Calculator, Bot, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  selectedSeason: number | 'ALL';
  onSelectSeason: (season: number | 'ALL') => void;
  selectedUnit: UnitType;
  onSelectUnit: (unit: UnitType) => void;
  activeTab: 'overview' | 'games' | 'eras' | 'simulator' | 'situational';
  onSelectTab: (tab: 'overview' | 'games' | 'eras' | 'simulator' | 'situational') => void;
  onOpenAiDrawer: () => void;
  availableSeasons: number[];
}

export const Header: React.FC<HeaderProps> = ({
  selectedSeason,
  onSelectSeason,
  selectedUnit,
  onSelectUnit,
  activeTab,
  onSelectTab,
  onOpenAiDrawer,
  availableSeasons
}) => {
  return (
    <header className="bg-neutral-900 text-white border-b border-neutral-800 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#9D2235] to-[#6d1322] flex items-center justify-center text-white shadow-md shadow-red-950/50 border border-red-500/30">
              <span className="font-extrabold text-xl tracking-tighter">🐗</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Arkansas Razorbacks <span className="text-red-500">EPA Tracker</span>
                </h1>
                <span className="bg-red-950/80 text-red-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-red-800/50">
                  2014 – Present
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Expected Points Added per Play • Offense, Defense & Special Teams
              </p>
            </div>
          </div>

          {/* Quick Controls: Season Selector & AI Assistant */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Season Selector */}
            <div className="flex items-center space-x-2 bg-neutral-800/90 border border-neutral-700/80 rounded-lg px-3 py-1.5">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <label htmlFor="season-select" className="text-xs font-medium text-neutral-300">Season:</label>
              <select
                id="season-select"
                value={selectedSeason}
                onChange={(e) => onSelectSeason(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer pr-2"
              >
                <option value="ALL" className="bg-neutral-900 text-white">All Seasons (2014–2025)</option>
                {availableSeasons.map((year) => (
                  <option key={year} value={year} className="bg-neutral-900 text-white">
                    {year} Season
                  </option>
                ))}
              </select>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiDrawer}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-md shadow-red-950/40 border border-red-500/40 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-200 animate-pulse" />
              <span>AI EPA Analyst</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs & Unit Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-neutral-800 pt-2 pb-3 gap-3">
          
          {/* Main Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none">
            <button
              onClick={() => onSelectTab('overview')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'overview'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Trends & Overview</span>
            </button>

            <button
              onClick={() => onSelectTab('games')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'games'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Game Explorer</span>
            </button>

            <button
              onClick={() => onSelectTab('eras')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'eras'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Coaching Eras</span>
            </button>

            <button
              onClick={() => onSelectTab('situational')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'situational'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Down & Distance</span>
            </button>

            <button
              onClick={() => onSelectTab('simulator')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>EPA Simulator</span>
            </button>
          </nav>

          {/* Unit Filters (Offense, Defense, Special Teams, Net) */}
          <div className="flex items-center space-x-1 bg-neutral-950/80 p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => onSelectUnit('net')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                selectedUnit === 'net' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Net Total
            </button>
            <button
              onClick={() => onSelectUnit('offense')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                selectedUnit === 'offense' ? 'bg-emerald-900/80 text-emerald-300 font-semibold border border-emerald-700/50' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Offense
            </button>
            <button
              onClick={() => onSelectUnit('defense')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                selectedUnit === 'defense' ? 'bg-amber-900/80 text-amber-300 font-semibold border border-amber-700/50' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Defense
            </button>
            <button
              onClick={() => onSelectUnit('special_teams')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                selectedUnit === 'special_teams' ? 'bg-sky-900/80 text-sky-300 font-semibold border border-sky-700/50' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Spec. Teams
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
