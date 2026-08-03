import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Play, 
  Square, 
  Key, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  RefreshCw, 
  Bot, 
  ShieldCheck, 
  Layers, 
  MessageSquare,
  X
} from 'lucide-react';
import { SwarmOrchestrator } from '../../agents/SwarmOrchestrator';
import { geminiService } from '../../services/geminiService';

export default function SwarmOrchestratorView() {
  const [swarmState, setSwarmState] = useState({
    status: 'IDLE',
    agents: {},
    logs: []
  });

  const [apiKey, setApiKey] = useState(localStorage.getItem('GEMINI_API_KEY') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const orchestratorRef = useRef(null);

  useEffect(() => {
    orchestratorRef.current = new SwarmOrchestrator((updated) => {
      setSwarmState(updated);
    });
    orchestratorRef.current.notify();
  }, []);

  const handleRunSwarm = () => {
    if (orchestratorRef.current) {
      orchestratorRef.current.runFullAutopilotSwarm('mywebsite.com');
    }
  };

  const handleStopSwarm = () => {
    if (orchestratorRef.current) {
      orchestratorRef.current.stopSwarm();
    }
  };

  const saveApiKey = (e) => {
    e.preventDefault();
    geminiService.setApiKey(apiKey);
    setShowKeyModal(false);
  };

  const agentsList = Object.values(swarmState.agents || {});

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Google ADK & Vertex AI Architecture</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit">Autonomous Multi-Agent AI Swarm Center</h1>
          <p className="text-xs text-slate-400 mt-1">Coordinated multi-agent DAG pipeline powered by Gemini 2.5 Pro & Gemini 2.5 Flash</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowKeyModal(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>{apiKey ? 'Gemini API Connected' : 'Set Gemini / Vertex Key'}</span>
          </button>

          {swarmState.status === 'RUNNING' ? (
            <button
              onClick={handleStopSwarm}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>Stop Swarm</span>
            </button>
          ) : (
            <button
              onClick={handleRunSwarm}
              className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-500/25 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Run Autopilot Swarm</span>
            </button>
          )}
        </div>
      </div>

      {/* Agent DAG Network Visualizer */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-bold text-white font-outfit">Live Agent Swarm DAG Topology</h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Engine Status: {swarmState.status}
            </span>
          </div>
        </div>

        {/* Multi-Agent DAG Node Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentsList.map((agent) => {
            const isWorking = agent.state !== 'IDLE' && agent.state !== 'COMPLETED';
            return (
              <div
                key={agent.id}
                className={`p-4 rounded-xl border transition-all ${
                  isWorking
                    ? 'bg-brand-500/10 border-brand-500 shadow-lg shadow-brand-500/20'
                    : agent.state === 'COMPLETED'
                    ? 'bg-slate-950 border-emerald-500/30'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{agent.avatar}</span>
                    <div>
                      <h3 className="text-xs font-bold text-white font-outfit">{agent.name}</h3>
                      <span className="text-[10px] text-slate-400 font-mono">{agent.model}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    agent.state === 'COMPLETED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : isWorking
                      ? 'bg-brand-500 text-white animate-pulse'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {agent.state}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 mt-2 font-mono bg-slate-900 p-2 rounded border border-slate-800/80 truncate">
                  {agent.activeTask}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inter-Agent Message Bus Feed Log */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-bold text-white font-outfit">Inter-Agent Communication & Task Event Bus</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">{swarmState.logs.length} Messages Logged</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-72 overflow-y-auto space-y-2.5 font-mono text-xs">
          {swarmState.logs.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              Swarm is standing by. Click "Run Autopilot Swarm" above to launch agent delegation.
            </div>
          ) : (
            swarmState.logs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 flex items-start gap-3">
                <span className="text-slate-500 text-[10px] shrink-0 mt-0.5">{log.timestamp}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-brand-400">
                    <span>{log.senderAvatar} {log.senderName}</span>
                    <span className="text-slate-600">→</span>
                    <span className="text-slate-300">{log.receiverAvatar} {log.receiverName}</span>
                  </div>
                  <p className="text-slate-200 text-[11px] leading-relaxed">{log.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowKeyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-outfit mb-2 flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" /> Configure Gemini / Vertex AI Key
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your Google GenAI API key to execute live Gemini 2.5 Pro / Flash calls. If left empty, the autonomous agent simulator handles execution.
            </p>

            <form onSubmit={saveApiKey} className="space-y-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
              />
              <button
                type="submit"
                className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                Save Gemini Key
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
