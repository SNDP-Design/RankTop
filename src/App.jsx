import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WebsiteInputScreen from './components/WebsiteInputScreen';

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
  const [activeWebsiteUrl, setActiveWebsiteUrl] = useState(''); // e.g. 'mywebsite.com'
  const [activeAppTab, setActiveAppTab] = useState('swarm'); // 'swarm' | 'dashboard' | 'strategy' | 'studio' | 'aeo' | 'geo' | 'competitors' | 'cms' | 'freetools'
  const [studioKeyword, setStudioKeyword] = useState('');

  const handleStartSwarm = (url) => {
    setActiveWebsiteUrl(url);
    setActiveAppTab('swarm');
  };

  const handleResetWebsiteUrl = () => {
    setActiveWebsiteUrl('');
  };

  const openAppWithTab = (tab, keyword = '') => {
    if (keyword) {
      setStudioKeyword(keyword);
    }
    setActiveAppTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ENTRY STEP: If no website URL is provided yet, show WebsiteInputScreen
  if (!activeWebsiteUrl) {
    return <WebsiteInputScreen onStartSwarm={handleStartSwarm} />;
  }

  // WORKSPACE VIEW: Website URL provided -> Run Swarm Engine Workspace
  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-slate-100 font-sans selection:bg-[#3ECF8E] selection:text-black">
      
      {/* Global Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#3ECF8E] focus:text-black focus:font-bold focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Global Top Navbar */}
      <Navbar 
        activeWebsiteUrl={activeWebsiteUrl}
        onResetWebsiteUrl={handleResetWebsiteUrl}
        activeAppTab={activeAppTab}
        setActiveAppTab={setActiveAppTab}
      />

      {/* RANKTOP WEB APP WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar 
          activeWebsiteUrl={activeWebsiteUrl}
          onResetWebsiteUrl={handleResetWebsiteUrl}
          activeTab={activeAppTab} 
          setActiveTab={setActiveAppTab} 
        />

        <main 
          id="main-content"
          role="main"
          aria-label="Workspace Module View"
          className="flex-1 overflow-y-auto bg-[#0F0F0F] h-[calc(100vh-64px)] pb-16 focus-visible:outline-none"
        >
          {activeAppTab === 'swarm' && (
            <SwarmOrchestratorView activeWebsiteUrl={activeWebsiteUrl} />
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
