import React, { useState } from 'react';
import Navbar from './components/Navbar';

// RankTop Web App Workspace Components
import AppSidebar from './components/app/AppSidebar';
import SwarmOrchestratorView from './components/app/SwarmOrchestratorView';
import DashboardOverview from './components/app/DashboardOverview';
import KeywordStrategy from './components/app/KeywordStrategy';
import AiBlogStudio from './components/app/AiBlogStudio';
import AeoSimulatorApp from './components/app/AeoSimulatorApp';
import LlmGeoOptimization from './components/app/LlmGeoOptimization';
import CompetitorSpy from './components/app/CompetitorSpy';
import CmsIntegrations from './components/app/CmsIntegrations';
import FreeToolsApp from './components/app/FreeToolsApp';

export default function App() {
  const [activeAppTab, setActiveAppTab] = useState('swarm'); // 'swarm' | 'dashboard' | 'strategy' | 'studio' | 'aeo' | 'geo' | 'competitors' | 'cms' | 'freetools'
  const [studioKeyword, setStudioKeyword] = useState('');

  const openAppWithTab = (tab, keyword = '') => {
    if (keyword) {
      setStudioKeyword(keyword);
    }
    setActiveAppTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Global Top Navbar */}
      <Navbar 
        activeAppTab={activeAppTab}
        setActiveAppTab={setActiveAppTab}
      />

      {/* RANKTOP WEB APP WORKSPACE DIRECT ACCESS */}
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar 
          activeTab={activeAppTab} 
          setActiveTab={setActiveAppTab} 
        />

        <main className="flex-1 overflow-y-auto bg-[#0D121D] min-h-[calc(100vh-64px)] pb-16">
          {activeAppTab === 'swarm' && (
            <SwarmOrchestratorView />
          )}

          {activeAppTab === 'dashboard' && (
            <DashboardOverview setActiveTab={setActiveAppTab} />
          )}

          {activeAppTab === 'strategy' && (
            <KeywordStrategy 
              onGenerateArticle={(kw) => openAppWithTab('studio', kw)} 
            />
          )}

          {activeAppTab === 'studio' && (
            <AiBlogStudio initialKeyword={studioKeyword} />
          )}

          {activeAppTab === 'aeo' && (
            <AeoSimulatorApp />
          )}

          {activeAppTab === 'geo' && (
            <LlmGeoOptimization />
          )}

          {activeAppTab === 'competitors' && (
            <CompetitorSpy 
              onGenerateArticle={(kw) => openAppWithTab('studio', kw)} 
            />
          )}

          {activeAppTab === 'cms' && (
            <CmsIntegrations />
          )}

          {activeAppTab === 'freetools' && (
            <FreeToolsApp />
          )}
        </main>
      </div>

    </div>
  );
}
