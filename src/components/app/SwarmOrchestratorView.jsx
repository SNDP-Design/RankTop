import React, { useState } from 'react';
import { Bot, Sparkles, CheckCircle2, Play, RefreshCw, Cpu, Activity } from 'lucide-react';

export default function SwarmOrchestratorView({ activeWebsiteUrl = 'mywebsite.com' }) {
  const [isSwarmRunning, setIsSwarmRunning] = useState(false);
  const domain = (typeof activeWebsiteUrl === 'string' && activeWebsiteUrl) ? activeWebsiteUrl : 'mywebsite.com';

  const [agents, setAgents] = useState([
    { id: 'research', name: 'Search Research Agent', role: 'Keyword Clustering & Intent Analysis', status: 'Idle', progress: 'Ready' },
    { id: 'writer', name: 'AI Content Drafting Agent', role: '2,000+ Word Article Drafting', status: 'Idle', progress: 'Ready' },
    { id: 'schema', name: 'JSON-LD Schema Agent', role: 'Speakable & BlogPosting Markup', status: 'Idle', progress: 'Ready' },
    { id: 'geo', name: 'GEO LLM Citation Agent', role: 'GPTBot & ClaudeBot Visibility Audit', status: 'Idle', progress: 'Ready' },
  ]);

  const handleStartSwarm = () => {
    setIsSwarmRunning(true);
    setAgents(agents.map(a => ({ ...a, status: 'Active', progress: 'Running Telemetry...' })));

    setTimeout(() => {
      setAgents(agents.map(a => ({ ...a, status: 'Completed', progress: 'Finished Task' })));
      setIsSwarmRunning(false);
    }, 1500);
  };

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <Bot className="w-4 h-4" />
            <span>Multi-Agent Swarm Orchestrator</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-sans">Autonomous AI Swarm Center</h1>
          <p className="text-sm text-zinc-400 mt-1">Deploy autonomous multi-agent swarms powered by Google Cloud Vertex AI and Gemini for {domain}.</p>
        </div>

        <button
          onClick={handleStartSwarm}
          disabled={isSwarmRunning}
          className="px-5 py-2.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow flex items-center gap-2 shrink-0"
        >
          {isSwarmRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              <span>Running Swarm...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-black" />
              <span>Start AI Swarm</span>
            </>
          )}
        </button>
      </div>

      {/* Swarm Agents Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center border border-[#3ECF8E]/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-sans">{agent.name}</h3>
                  <span className="text-sm text-zinc-400 block mt-0.5">{agent.role}</span>
                </div>
              </div>

              <span className={`text-sm font-bold px-3 py-1 rounded-lg border ${
                agent.status === 'Active'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                  : agent.status === 'Completed'
                  ? 'bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/20'
                  : 'bg-[#121212] text-zinc-400 border-[#262626]'
              }`}>
                {agent.status}
              </span>
            </div>

            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] text-sm flex items-center justify-between text-zinc-300">
              <span>Agent Status:</span>
              <span className="font-semibold text-[#3ECF8E]">{agent.progress}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
