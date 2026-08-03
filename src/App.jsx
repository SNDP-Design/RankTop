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
  const [activeWebsiteUrl, setActiveWebsiteUrl] = useState('mywebsite.com'); // Website URL managed in Top Navbar Input
  const [activeAppTab, setActiveAppTab] = useState('dashboard'); // Default to Dashboard overview
  const [studioKeyword, setStudioKeyword] = useState('');

  const openAppWithTab = (tab, keyword = '') => {
    if (keyword) {
      setStudioKeyword(keyword);
    }
    setActiveAppTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-slate-100 font-sans selection:bg-[#3ECF8E] selection:text-black">
      
      {/* Global Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#3ECF8E] focus:text-black focus:font-bold focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Global Top Navbar with Target Website Input & Start AI Automation Button */}
      <Navbar 
        activeWebsiteUrl={activeWebsiteUrl}
        setActiveWebsiteUrl={setActiveWebsiteUrl}
        activeAppTab={activeAppTab}
        setActiveAppTab={setActiveAppTab}
      />

      {/* RANKTOP WEB APP WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar 
          activeWebsiteUrl={activeWebsiteUrl}
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
            <DashboardOverview 
              activeWebsiteUrl={activeWebsiteUrl} 
              setActiveTab={openAppWithTab} 
            />
          )}

          {activeAppTab === 'strategy' && (
            <KeywordStrategy 
              activeWebsiteUrl={activeWebsiteUrl}
              onGenerateArticle={(kw) => openAppWithTab('studio', kw)} 
            />
          )}

          {activeAppTab === 'studio' && (
            <AiBlogStudio 
              activeWebsiteUrl={activeWebsiteUrl}
              initialKeyword={studioKeyword} 
            />
          )}

          {activeAppTab === 'aeo' && (
            <AeoSimulatorApp />
          )}

          {activeAppTab === 'geo' && (
            <LlmGeoOptimization activeWebsiteUrl={activeWebsiteUrl} />
          )}

          {activeAppTab === 'competitors' && (
            <CompetitorSpy 
              activeWebsiteUrl={activeWebsiteUrl}
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
