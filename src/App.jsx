import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';

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
  const [activeAppTab, setActiveAppTab] = useState('dashboard'); // Default to Master Dashboard overview
  const [studioKeyword, setStudioKeyword] = useState('');

  const openAppWithTab = (tab, keyword = '') => {
    if (keyword) {
      setStudioKeyword(keyword);
    }
    setActiveAppTab(tab || 'dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveModule = () => {
    switch (activeAppTab) {
      case 'swarm':
        return <SwarmOrchestratorView activeWebsiteUrl={activeWebsiteUrl} />;
      case 'strategy':
        return <KeywordStrategy activeWebsiteUrl={activeWebsiteUrl} onGenerateArticle={(kw) => openAppWithTab('studio', kw)} />;
      case 'studio':
        return <AiBlogStudio activeWebsiteUrl={activeWebsiteUrl} initialKeyword={studioKeyword} />;
      case 'aeo':
        return <AeoSimulatorApp />;
      case 'geo':
        return <LlmGeoOptimization activeWebsiteUrl={activeWebsiteUrl} />;
      case 'competitors':
        return <CompetitorSpy activeWebsiteUrl={activeWebsiteUrl} onGenerateArticle={(kw) => openAppWithTab('studio', kw)} />;
      case 'cms':
        return <CmsIntegrations />;
      case 'freetools':
        return <FreeToolsApp />;
      case 'dashboard':
      default:
        return <DashboardOverview activeWebsiteUrl={activeWebsiteUrl} setActiveTab={openAppWithTab} />;
    }
  };

  return (
    <ErrorBoundary>
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
          setActiveAppTab={openAppWithTab}
        />

        {/* RANKTOP WEB APP WORKSPACE */}
        <div className="flex-1 flex overflow-hidden">
          <AppSidebar 
            activeWebsiteUrl={activeWebsiteUrl}
            activeTab={activeAppTab} 
            setActiveTab={openAppWithTab} 
          />

          <main 
            id="main-content"
            role="main"
            aria-label="Workspace Module View"
            className="flex-1 overflow-y-auto bg-[#0F0F0F] min-h-[calc(100vh-64px)] pb-16 focus-visible:outline-none"
          >
            {renderActiveModule()}
          </main>
        </div>

      </div>
    </ErrorBoundary>
  );
}
