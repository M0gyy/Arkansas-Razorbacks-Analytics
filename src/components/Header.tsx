import React from 'react';
import { UnitType } from '../types';
import { Flame, BarChart3, Calculator, Bot, Calendar, Sparkles, Trophy, ArrowLeftRight, RefreshCw, Globe } from 'lucide-react';

interface HeaderProps {
  selectedSeason: number | 'ALL';
  onSelectSeason: (season: number | 'ALL') => void;
  isCompareMode: boolean;
  onToggleCompareMode: () => void;
  compareSeasonA: string | number;
  compareSeasonB: string | number;
  onSelectCompareSeasonA: (season: string | number) => void;
  onSelectCompareSeasonB: (season: string | number) => void;
  selectedUnit: UnitType;
  onSelectUnit: (unit: UnitType) => void;
  activeTab: 'overview' | 'games' | 'eras' | 'simulator' | 'situational' | 'players' | 'conferences';
  onSelectTab: (tab: 'overview' | 'games' | 'eras' | 'simulator' | 'situational' | 'players' | 'conferences') => void;
  onOpenAiDrawer?: () => void;
  onOpenSyncModal: () => void;
  availableSeasons: number[];
}

export const Header: React.FC<HeaderProps> = ({
  selectedSeason,
  onSelectSeason,
  isCompareMode,
  onToggleCompareMode,
  compareSeasonA,
  compareSeasonB,
  onSelectCompareSeasonA,
  onSelectCompareSeasonB,
  selectedUnit,
  onSelectUnit,
  activeTab,
  onSelectTab,
  onOpenAiDrawer,
  onOpenSyncModal,
  availableSeasons
}) => {
  return (
    <header className="bg-neutral-900/95 text-white border-b border-neutral-800 sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3.5 gap-3.5">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#9D2235] flex items-center justify-center text-white font-bold shadow-md ring-2 ring-red-700/50">
              <span className="text-2xl">🐗</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white">
                  Arkansas Razorbacks <span className="text-red-500">Advanced Metrics</span>
                </h1>
                <span className="bg-neutral-800 text-neutral-300 text-xs font-bold px-2 py-0.5 rounded border border-neutral-700">
                  2014 – 2025
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400">
                Expected Points Added Analytics • Play-by-Play Efficiency Engine
              </p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Compare Seasons Toggle Button */}
            <button
              onClick={onToggleCompareMode}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border cursor-pointer ${
                isCompareMode
                  ? 'bg-red-900/90 text-red-200 border-red-700'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
              }`}
            >
              <ArrowLeftRight className={`w-4 h-4 ${isCompareMode ? 'text-red-400' : 'text-neutral-400'}`} />
              <span>{isCompareMode ? 'Compare Active' : 'Compare Seasons'}</span>
            </button>

            {/* Dynamic Season Selector vs Compare Pickers */}
            {!isCompareMode ? (
              /* Single Season Selector */
              <div className="flex items-center space-x-2 bg-neutral-800/90 border border-neutral-700/80 rounded-lg px-3 py-1.5">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <span className="text-sm font-medium text-neutral-300">Season:</span>
                <select
                  id="season-select"
                  value={selectedSeason}
                  onChange={(e) => onSelectSeason(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                  className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer pr-1"
                >
                  <option value="ALL" className="bg-neutral-900 text-white">All Seasons (2014–2025)</option>
                  {availableSeasons.map((year) => (
                    <option key={year} value={year} className="bg-neutral-900 text-white">
                      {year} Season
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              /* Compare Pickers: Season A vs Season B */
              <div className="flex items-center space-x-2 bg-neutral-950 border border-red-900/60 rounded-lg px-3 py-1.5 text-sm">
                {/* Option A Dropdown */}
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <select
                    value={String(compareSeasonA)}
                    onChange={(e) => onSelectCompareSeasonA(e.target.value)}
                    className="bg-transparent text-sm font-bold text-red-400 focus:outline-none cursor-pointer max-w-[130px] truncate"
                  >
                    <optgroup label="🐗 Razorback Seasons">
                      {availableSeasons.map((year) => (
                        <option key={`H-A-ARK-${year}`} value={year} className="bg-neutral-900 text-white">
                          {year} Razorbacks
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🏆 Average SEC Team">
                      {availableSeasons.map((year) => (
                        <option key={`H-A-SEC-${year}`} value={`${year}-SEC`} className="bg-neutral-900 text-amber-300">
                          {year} SEC Average
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🏈 Average Div 1 Team">
                      {availableSeasons.map((year) => (
                        <option key={`H-A-DIV1-${year}`} value={`${year}-DIV1`} className="bg-neutral-900 text-cyan-300">
                          {year} Div 1 Average
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <span className="text-xs font-black text-neutral-500">VS</span>

                {/* Option B Dropdown */}
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <select
                    value={String(compareSeasonB)}
                    onChange={(e) => onSelectCompareSeasonB(e.target.value)}
                    className="bg-transparent text-sm font-bold text-cyan-400 focus:outline-none cursor-pointer max-w-[130px] truncate"
                  >
                    <optgroup label="🐗 Razorback Seasons">
                      {availableSeasons.map((year) => (
                        <option key={`H-B-ARK-${year}`} value={year} className="bg-neutral-900 text-white">
                          {year} Razorbacks
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🏆 Average SEC Team">
                      {availableSeasons.map((year) => (
                        <option key={`H-B-SEC-${year}`} value={`${year}-SEC`} className="bg-neutral-900 text-amber-300">
                          {year} SEC Average
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🏈 Average Div 1 Team">
                      {availableSeasons.map((year) => (
                        <option key={`H-B-DIV1-${year}`} value={`${year}-DIV1`} className="bg-neutral-900 text-cyan-300">
                          {year} Div 1 Average
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
            )}

            {/* Weekly Data Sync Button */}
            <button
              onClick={onOpenSyncModal}
              className="flex items-center space-x-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-semibold px-3 py-1.5 rounded-lg transition-all border border-neutral-700 cursor-pointer"
              title="Weekly Data Sync Status & Data Updates"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Weekly Data Sync</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs & Unit Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-neutral-800 pt-2 pb-2.5 gap-2.5">
          
          {/* Main Navigation Tabs */}
          <nav className="flex space-x-1.5 overflow-x-auto py-0.5 scrollbar-none">
            <button
              onClick={() => onSelectTab('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors flex items-center space-x-2 ${
                activeTab === 'overview'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Trends & Overview</span>
            </button>

            <button
              onClick={() => onSelectTab('conferences')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors flex items-center space-x-2 ${
                activeTab === 'conferences'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Conference EPA</span>
            </button>

            <button
              onClick={() => onSelectTab('players')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors flex items-center space-x-2 ${
                activeTab === 'players'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Player Leaders</span>
            </button>

            <button
              onClick={() => onSelectTab('games')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors flex items-center space-x-2 ${
                activeTab === 'games'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Game Explorer</span>
            </button>

            <button
              onClick={() => onSelectTab('eras')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors flex items-center space-x-2 ${
                activeTab === 'eras'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Coaching Eras</span>
            </button>

            <button
              onClick={() => onSelectTab('situational')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors flex items-center space-x-2 ${
                activeTab === 'situational'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Down & Distance</span>
            </button>

            <button
              onClick={() => onSelectTab('simulator')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors flex items-center space-x-2 ${
                activeTab === 'simulator'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>EPA Simulator</span>
            </button>
          </nav>

          {/* Unit Filters */}
          <div className="flex items-center space-x-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs font-medium">
            <button
              onClick={() => onSelectUnit('net')}
              className={`px-3 py-1 rounded-md text-xs transition-all ${
                selectedUnit === 'net' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Net Total
            </button>
            <button
              onClick={() => onSelectUnit('offense')}
              className={`px-3 py-1 rounded-md text-xs transition-all ${
                selectedUnit === 'offense' ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/60' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Offense
            </button>
            <button
              onClick={() => onSelectUnit('defense')}
              className={`px-3 py-1 rounded-md text-xs transition-all ${
                selectedUnit === 'defense' ? 'bg-amber-950 text-amber-300 font-bold border border-amber-800/60' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Defense
            </button>
            <button
              onClick={() => onSelectUnit('special_teams')}
              className={`px-3 py-1 rounded-md text-xs transition-all ${
                selectedUnit === 'special_teams' ? 'bg-sky-950 text-sky-300 font-bold border border-sky-800/60' : 'text-neutral-400 hover:text-neutral-200'
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
