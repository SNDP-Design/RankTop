import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import FeaturesSection from './components/FeaturesSection';
import AeoSimulatorLanding from './components/AeoSimulatorLanding';
import CompareSection from './components/CompareSection';
import PricingSection from './components/PricingSection';
import FreeToolsSection from './components/FreeToolsSection';
import Footer from './components/Footer';

// App Workspace Components
import AppSidebar from './components/app/AppSidebar';
import DashboardOverview from './components/app/DashboardOverview';
import KeywordStrategy from './components/app/KeywordStrategy';
import AiBlogStudio from './components/app/AiBlogStudio';
import AeoSimulatorApp from './components/app/AeoSimulatorApp';
import LlmGeoOptimization from './components/app/LlmGeoOptimization';
import CompetitorSpy from './components/app/CompetitorSpy';
import CmsIntegrations from './components/app/CmsIntegrations';
import FreeToolsApp from './components/app/FreeToolsApp';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'app'
  const [activeAppTab, setActiveAppTab] = useState('dashboard'); // 'dashboard' | 'strategy' | 'studio' | 'aeo' | 'geo' | 'competitors' | 'cms' | 'freetools'
  const [studioKeyword, setStudioKeyword] = useState('');

  const openAppWithTab = (tab, keyword = '') => {
    if (keyword) {
      setStudioKeyword(keyword);
    }
    setActiveAppTab(tab);
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Global Top Navbar */}
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeAppTab={activeAppTab}
        setActiveAppTab={setActiveAppTab}
      />

      {/* VIEW MODE 1: LANDING MARKETING PAGE */}
      {currentView === 'landing' && (
        <main className="flex-1">
          <Hero onOpenApp={(tab) => openAppWithTab(tab)} />
          <MarqueeTicker />
          <FeaturesSection onOpenApp={(tab) => openAppWithTab(tab)} />
          <AeoSimulatorLanding onOpenApp={(tab) => openAppWithTab(tab)} />
          <CompareSection />
          <PricingSection onOpenApp={(tab) => openAppWithTab(tab)} />
          <FreeToolsSection onOpenApp={(tab) => openAppWithTab(tab)} />
          <Footer onOpenApp={(tab) => openAppWithTab(tab)} />
        </main>
      )}

      {/* VIEW MODE 2: INTERACTIVE WEB APP WORKSPACE */}
      {currentView === 'app' && (
        <div className="flex-1 flex overflow-hidden">
          <AppSidebar 
            activeTab={activeAppTab} 
            setActiveTab={setActiveAppTab} 
          />

          <main className="flex-1 overflow-y-auto bg-[#0D121D] min-h-[calc(100vh-80px)] pb-16">
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
      )}

    </div>
  );
}
