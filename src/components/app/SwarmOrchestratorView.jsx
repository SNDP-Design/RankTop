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
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <Cpu className="w-4 h-4" />
            <span>Google ADK & Vertex AI Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-outfit">Autonomous Multi-Agent AI Swarm Center</h1>
          <p className="text-sm text-zinc-400 mt-1">Coordinated multi-agent DAG pipeline powered by Gemini 2.5 Pro & Gemini 2.5 Flash</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowKeyModal(true)}
            className="px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#262626] text-zinc-300 rounded-xl text-sm font-semibold flex items-center gap-2 border border-[#333]"
          >
            <Key className="w-4 h-4 text-[#3ECF8E]" />
            <span>{apiKey ? 'Gemini API Connected' : 'Set Gemini / Vertex Key'}</span>
          </button>

          {swarmState.status === 'RUNNING' ? (
            <button
              onClick={handleStopSwarm}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl shadow flex items-center gap-2"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>Stop Swarm</span>
            </button>
          ) : (
            <button
              onClick={handleRunSwarm}
              className="px-5 py-2.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow-lg shadow-[#3ECF8E]/20 flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Run Autopilot Swarm</span>
            </button>
          )}
        </div>
      </div>

      {/* Agent DAG Network Visualizer */}
      <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#3ECF8E]" />
            <h2 className="text-base font-bold text-white font-outfit">Live Agent Swarm DAG Topology</h2>
          </div>

          <div className="flex items-center gap-3 text-sm font-mono">
            <span className="flex items-center gap-1.5 text-[#3ECF8E]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3ECF8E] animate-ping" /> Engine Status: {swarmState.status}
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
                className={`p-5 rounded-xl border transition-all ${
                  isWorking
                    ? 'bg-[#3ECF8E]/10 border-[#3ECF8E] shadow-lg shadow-[#3ECF8E]/20'
                    : agent.state === 'COMPLETED'
                    ? 'bg-[#121212] border-[#3ECF8E]/30'
                    : 'bg-[#121212] border-[#262626]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{agent.avatar}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white font-outfit">{agent.name}</h3>
                      <span className="text-sm text-zinc-400 font-mono">{agent.model}</span>
                    </div>
                  </div>
                  <span className={`text-sm font-mono font-bold px-2.5 py-0.5 rounded border ${
                    agent.state === 'COMPLETED'
                      ? 'bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/20'
                      : isWorking
                      ? 'bg-[#3ECF8E] text-black animate-pulse'
                      : 'bg-[#262626] text-zinc-400 border border-[#333]'
                  }`}>
                    {agent.state}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 mt-3 font-mono bg-[#171717] p-2.5 rounded border border-[#262626] truncate">
                  {agent.activeTask}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inter-Agent Message Bus Feed Log */}
      <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#3ECF8E]" />
            <h3 className="text-base font-bold text-white font-outfit">Inter-Agent Communication & Task Event Bus</h3>
          </div>
          <span className="text-sm font-mono text-zinc-400">{swarmState.logs.length} Messages Logged</span>
        </div>

        <div className="bg-[#121212] p-4 rounded-xl border border-[#262626] max-h-72 overflow-y-auto space-y-2.5 font-mono text-sm">
          {swarmState.logs.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              Swarm is standing by. Click "Run Autopilot Swarm" above to launch agent delegation.
            </div>
          ) : (
            swarmState.logs.map((log) => (
              <div key={log.id} className="p-3 bg-[#171717] rounded-lg border border-[#262626] flex items-start gap-3">
                <span className="text-zinc-500 text-sm shrink-0 mt-0.5">{log.timestamp}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#3ECF8E]">
                    <span>{log.senderAvatar} {log.senderName}</span>
                    <span className="text-zinc-600">→</span>
                    <span className="text-zinc-300">{log.receiverAvatar} {log.receiverName}</span>
                  </div>
                  <p className="text-zinc-200 text-sm leading-relaxed">{log.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171717] border border-[#262626] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowKeyModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-outfit mb-2 flex items-center gap-2">
              <Key className="w-5 h-5 text-[#3ECF8E]" /> Configure Gemini / Vertex AI Key
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Enter your Google GenAI API key to execute live Gemini 2.5 Pro / Flash calls. If left empty, the autonomous agent simulator handles execution.
            </p>

            <form onSubmit={saveApiKey} className="space-y-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-[#121212] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3ECF8E] font-mono"
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow transition-all"
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
