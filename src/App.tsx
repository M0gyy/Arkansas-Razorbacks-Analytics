import React, { useState } from 'react';
import { RAZORBACKS_SEASONS } from './data/razorbacksData';
import { UnitType } from './types';
import { Header } from './components/Header';
import { MetricsOverview } from './components/MetricsOverview';
import { YearlyTrendChart } from './components/YearlyTrendChart';
import { PassVsRushChart } from './components/PassVsRushChart';
import { QuadrantChart } from './components/QuadrantChart';
import { GameExplorer } from './components/GameExplorer';
import { EraComparison } from './components/EraComparison';
import { SituationalSplits } from './components/SituationalSplits';
import { EpaSimulator } from './components/EpaSimulator';
import { AiAnalystDrawer } from './components/AiAnalystDrawer';

export default function App() {
  const [selectedSeason, setSelectedSeason] = useState<number | 'ALL'>('ALL');
  const [selectedUnit, setSelectedUnit] = useState<UnitType>('net');
  const [activeTab, setActiveTab] = useState<'overview' | 'games' | 'eras' | 'simulator' | 'situational'>('overview');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);

  const availableSeasons = RAZORBACKS_SEASONS.map((s) => s.season);

  return (
    <div id="razorbacks-app" className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-red-900 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        selectedSeason={selectedSeason}
        onSelectSeason={setSelectedSeason}
        selectedUnit={selectedUnit}
        onSelectUnit={setSelectedUnit}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
        availableSeasons={availableSeasons}
      />

      {/* Main Content Area */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* KPI Metrics Overview */}
        <MetricsOverview
          seasons={RAZORBACKS_SEASONS}
          selectedSeason={selectedSeason}
        />

        {/* Tab 1: Trends & Visual Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <YearlyTrendChart
              seasons={RAZORBACKS_SEASONS}
              selectedUnit={selectedUnit}
              onSelectSeason={(yr: number) => {
                setSelectedSeason(yr);
                setActiveTab('games');
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PassVsRushChart seasons={RAZORBACKS_SEASONS} />
              <QuadrantChart
                seasons={RAZORBACKS_SEASONS}
                onSelectSeason={(yr: number) => {
                  setSelectedSeason(yr);
                  setActiveTab('games');
                }}
              />
            </div>

            <GameExplorer
              seasons={RAZORBACKS_SEASONS}
              selectedSeason={selectedSeason}
              onSelectSeason={setSelectedSeason}
            />
          </div>
        )}

        {/* Tab 2: Game Explorer */}
        {activeTab === 'games' && (
          <GameExplorer
            seasons={RAZORBACKS_SEASONS}
            selectedSeason={selectedSeason}
            onSelectSeason={setSelectedSeason}
          />
        )}

        {/* Tab 3: Coaching Eras & Coordinators */}
        {activeTab === 'eras' && <EraComparison />}

        {/* Tab 4: Situational Splits */}
        {activeTab === 'situational' && (
          <div>
            <SituationalSplits />
            <PassVsRushChart seasons={RAZORBACKS_SEASONS} />
          </div>
        )}

        {/* Tab 5: EPA Simulator */}
        {activeTab === 'simulator' && <EpaSimulator />}

      </main>

      {/* AI Assistant Drawer */}
      <AiAnalystDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        selectedSeason={selectedSeason}
        seasons={RAZORBACKS_SEASONS}
      />

      {/* Footer */}
      <footer id="app-footer" className="border-t border-neutral-900 bg-neutral-950 py-6 mt-12 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-red-500 font-bold">Arkansas Razorbacks Football Analytics</span>
            <span>•</span>
            <span>Expected Points Added (EPA) Database (2014–Present)</span>
          </div>
          <p className="text-neutral-400 text-[11px]">
            Data models calibrated against NCAA play-by-play college football analytics
          </p>
        </div>
      </footer>

    </div>
  );
}
