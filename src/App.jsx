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

function WorkspaceShell() {
  const [activeAppTab, setActiveAppTab] = useState('dashboard');
  const [studioKeyword, setStudioKeyword] = useState('');

  const openAppWithTab = (tab, keyword = '') => {
    if (keyword) setStudioKeyword(keyword);
    setActiveAppTab(tab || 'dashboard');
    const mainEl = document.getElementById('main-content');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveModule = () => {
    switch (activeAppTab) {
      case 'swarm':      return <SwarmOrchestratorView />;
      case 'strategy':   return <KeywordStrategy onGenerateArticle={(kw) => openAppWithTab('studio', kw)} />;
      case 'studio':     return <AiBlogStudio initialKeyword={studioKeyword} />;
      case 'aeo':        return <AeoSimulatorApp />;
      case 'geo':        return <LlmGeoOptimization />;
      case 'competitors': return <CompetitorSpy onGenerateArticle={(kw) => openAppWithTab('studio', kw)} />;
      case 'cms':        return <CmsIntegrations />;
      case 'freetools':  return <FreeToolsApp />;
      case 'dashboard':
      default:           return <DashboardOverview setActiveTab={openAppWithTab} />;
    }
  };

  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />
      {/* ApiKey Modal — rendered at root level, overlays everything */}
      <ApiKeyModal />
      {/* 64px spacer for fixed navbar */}
      <div style={{ height: '64px', flexShrink: 0 }} aria-hidden="true" />

      {/* App workspace */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        <AppSidebar activeTab={activeAppTab} setActiveTab={openAppWithTab} />

        <main
          id="main-content"
          role="main"
          aria-label="Workspace Module View"
          style={{ flex: 1, overflowY: 'auto', background: '#0F0F0F', minHeight: 0 }}
          className="p-6 pb-24 focus-visible:outline-none font-sans"
        >
          <div className="w-full space-y-6">
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
