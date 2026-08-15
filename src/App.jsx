import React, { useState } from 'react';
import { AgentProvider } from './context/AgentContext';
import Navbar from './components/Navbar';
import ApiKeyModal from './components/ApiKeyModal';
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
import BacklinkOutreach from './components/app/BacklinkOutreach';

function WorkspaceShell() {
  const [activeAppTab, setActiveAppTab] = useState('dashboard');
  const [studioKeyword, setStudioKeyword] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const openAppWithTab = (tab, keyword = '') => {
    if (keyword) setStudioKeyword(keyword);
    setActiveAppTab(tab || 'dashboard');
    setIsMobileSidebarOpen(false);
    const mainEl = document.getElementById('main-content');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveModule = () => {
    switch (activeAppTab) {
      // Core Workspace
      case 'swarm':        return <SwarmOrchestratorView />;
      case 'dashboard':    return <DashboardOverview setActiveTab={openAppWithTab} />;

      // SEO Module
      case 'strategy':     return <KeywordStrategy onGenerateArticle={(kw) => openAppWithTab('studio', kw)} />;
      case 'competitors':  return <CompetitorSpy onGenerateArticle={(kw) => openAppWithTab('studio', kw)} />;
      case 'studio':       return <AiBlogStudio initialKeyword={studioKeyword} />;
      case 'backlinks':    return <BacklinkOutreach />;
      case 'cms':          return <CmsIntegrations />;

      // AEO Module
      case 'aeo':          return <AeoSimulatorApp />;
      case 'aeo_faq':      return <FreeToolsApp />;

      // GEO Module
      case 'geo':          return <LlmGeoOptimization initialTab="overview" />;
      case 'geo_reddit':   return <LlmGeoOptimization initialTab="reddit" />;
      case 'geo_decay':    return <LlmGeoOptimization initialTab="decay" />;

      // Utilities
      case 'freetools':    return <FreeToolsApp />;
      default:             return <DashboardOverview setActiveTab={openAppWithTab} />;
    }
  };

  return (
    <>
      {/* Fixed Navbar with mobile sidebar toggle */}
      <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)} />
      {/* ApiKey Modal — rendered at root level, overlays everything */}
      <ApiKeyModal />
      {/* 64px spacer for fixed navbar */}
      <div style={{ height: '64px', flexShrink: 0 }} aria-hidden="true" />

      {/* App workspace — 100% full screen Master Dashboard canvas */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0, width: '100%' }}>
        <AppSidebar
          activeTab={activeAppTab}
          setActiveTab={openAppWithTab}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
        <main
          id="main-content"
          role="main"
          aria-label="Master Dashboard Canvas"
          style={{
            flex: 1,
            minWidth: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            background: '#0F0F0F',
            minHeight: 0,
          }}
          className="p-4 sm:p-6 lg:p-8 pb-24 focus-visible:outline-none font-sans"
        >
          <div className="w-full max-w-7xl mx-auto space-y-6">
            {renderActiveModule()}
          </div>
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AgentProvider>
        <div
          style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          className="bg-[#121212] text-slate-100 font-sans selection:bg-[#3ECF8E] selection:text-black"
        >
          {/* Global Accessibility Skip Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#3ECF8E] focus:text-black focus:font-bold focus:rounded-lg"
          >
            Skip to main content
          </a>

          <WorkspaceShell />
        </div>
      </AgentProvider>
    </ErrorBoundary>
  );
}
