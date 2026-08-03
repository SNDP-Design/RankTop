import React, { useState } from 'react';
import { Sparkles, ArrowRight, Layers, BarChart3, Zap, Cpu, Globe, CheckCircle2, LayoutDashboard } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, activeAppTab, setActiveAppTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/85 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5 font-outfit">
                seosorted<span className="text-brand-500 font-mono text-sm font-semibold bg-brand-500/10 px-1.5 py-0.5 rounded border border-brand-500/20">.ai</span>
              </span>
              <span className="text-[10px] text-slate-400 block tracking-wider uppercase font-medium -mt-1">AI SEO & Blog Writer</span>
            </div>
          </div>

          {/* Navigation Links (Landing Mode) */}
          {currentView === 'landing' ? (
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-brand-400 transition-colors">Features</a>
              <a href="#aeo-simulator" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-brand-500" />
                AI Overview Simulator
              </a>
              <a href="#compare" className="hover:text-brand-400 transition-colors">Compare</a>
              <a href="#pricing" className="hover:text-brand-400 transition-colors">Pricing</a>
              <a href="#free-tools" className="hover:text-brand-400 transition-colors">Free Tools</a>
            </nav>
          ) : (
            /* App Mode Workspace Breadcrumb / Navigation */
            <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-3 py-1 text-xs">
              <span className="text-slate-400">Workspace:</span>
              <span className="text-white font-semibold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-brand-500" /> mywebsite.com
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">Sync Active</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {currentView === 'landing' ? (
              <>
                <button 
                  onClick={() => {
                    setCurrentView('app');
                    setActiveAppTab('dashboard');
                  }}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  Demo App
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('app');
                    setActiveAppTab('studio');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 rounded-lg shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transition-all transform hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  Start Free Trial
                </button>
              </>
            ) : (
              <button 
                onClick={() => setCurrentView('landing')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-800 rounded-lg border border-slate-700 transition-all"
              >
                <Globe className="w-4 h-4 text-brand-500" />
                Back to Website
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
