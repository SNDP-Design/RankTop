import { AGENT_ROLES } from './agentDefinitions';

export class SwarmOrchestrator {
  constructor(onUpdate) {
    this.onUpdate = onUpdate; // State listener callback
    this.status = 'IDLE'; // 'IDLE' | 'RUNNING' | 'AWAITING_APPROVAL' | 'COMPLETED' | 'PAUSED'
    this.mode = 'autopilot'; // 'autopilot' (Full Autopilot default) | 'hitl' (Human-In-The-Loop)
    this.currentStepIndex = 0;
    this.logs = [];
    this.pendingApproval = null; // { id, gate, title, description, payload, resolve, reject }
    
    // 9 Specialized Swarm Agents
    this.agents = {
      orchestrator: { ...AGENT_ROLES.ORCHESTRATOR, state: 'IDLE', activeTask: 'Standing by for strategic goal' },
      research:     { ...AGENT_ROLES.RESEARCH,     state: 'IDLE', activeTask: 'Ready for domain & keyword research' },
      competitor:   { ...AGENT_ROLES.COMPETITOR,   state: 'IDLE', activeTask: 'Ready for rival gap audit' },
      writer:       { ...AGENT_ROLES.WRITER,       state: 'IDLE', activeTask: 'Ready for draft creation' },
      aeo:          { ...AGENT_ROLES.AEO,          state: 'IDLE', activeTask: 'Ready for AI Overview citation inspection' },
      data_citation:{ ...AGENT_ROLES.DATA_CITATION,state: 'IDLE', activeTask: 'Ready for GEO stat & citation injection' },
      entity_graph: { ...AGENT_ROLES.ENTITY_GRAPH, state: 'IDLE', activeTask: 'Ready for Knowledge Graph JSON-LD synthesis' },
      link_architect:{ ...AGENT_ROLES.LINK_ARCHITECT,state:'IDLE', activeTask: 'Ready for pillar-cluster link topology mapping' },
      dispatcher:   { ...AGENT_ROLES.DISPATCHER,   state: 'IDLE', activeTask: 'Ready for multi-channel CMS dispatch' },
    };
  }

  setMode(mode) {
    this.mode = mode; // 'hitl' | 'autopilot'
    this.addLog('orchestrator', 'orchestrator', `Swarm execution mode switched to ${mode.toUpperCase()} mode.`, 'system');
    this.notify();
  }

  notify() {
    if (this.onUpdate) {
      this.onUpdate({
        status: this.status,
        mode: this.mode,
        currentStepIndex: this.currentStepIndex,
        agents: { ...this.agents },
        logs: [...this.logs],
        pendingApproval: this.pendingApproval,
      });
    }
  }

  addLog(senderId, receiverId, message, type = 'info') {
    const sender = this.agents[senderId] || { name: senderId, avatar: '🤖' };
    const receiver = this.agents[receiverId] || { name: receiverId, avatar: '🤖' };
    const entry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      senderId,
      senderName: sender.name,
      senderAvatar: sender.avatar,
      receiverId,
      receiverName: receiver.name,
      receiverAvatar: receiver.avatar,
      message,
      type
    };
    this.logs.unshift(entry);
    this.notify();
  }

  setAgentState(agentId, state, task) {
    if (this.agents[agentId]) {
      this.agents[agentId].state = state;
      if (task) this.agents[agentId].activeTask = task;
      this.notify();
    }
  }

  async waitForApproval(gate, title, description, payload) {
    if (this.mode === 'autopilot') {
      this.addLog('orchestrator', 'orchestrator', `[Autopilot] Bypassed HITL Gate: "${title}". Executing autonomously.`, 'system');
      return { approved: true, payload };
    }

    this.status = 'AWAITING_APPROVAL';
    return new Promise((resolve) => {
      this.pendingApproval = {
        id: `gate-${Date.now()}`,
        gate,
        title,
        description,
        payload,
        resolve: (userPayload) => {
          this.pendingApproval = null;
          this.status = 'RUNNING';
          this.addLog('orchestrator', 'orchestrator', `HITL Gate Approved by User: "${title}". Swarm resuming...`, 'success');
          this.notify();
          resolve({ approved: true, payload: userPayload || payload });
        },
        reject: (reason) => {
          this.pendingApproval = null;
          this.status = 'PAUSED';
          this.addLog('orchestrator', 'orchestrator', `HITL Gate Rejected by User: ${reason || 'User requested pause'}`, 'warning');
          this.notify();
          resolve({ approved: false, reason });
        }
      };
      this.notify();
    });
  }

  approvePendingTask(modifiedPayload) {
    if (this.pendingApproval) {
      this.pendingApproval.resolve(modifiedPayload);
    }
  }

  rejectPendingTask(reason) {
    if (this.pendingApproval) {
      this.pendingApproval.reject(reason);
    }
  }

  async runFullAutopilotSwarm(targetDomain = 'mywebsite.com') {
    this.status = 'RUNNING';
    this.logs = [];
    this.pendingApproval = null;
    this.currentStepIndex = 1;
    this.notify();

    // PHASE 1: Swarm Initialization & Goal Mapping
    this.setAgentState('orchestrator', 'THINKING', `Mapping 9-agent autonomous DAG for ${targetDomain}`);
    this.addLog('orchestrator', 'research', `Initializing Swarm DAG. Domain: ${targetDomain}. Spawning research, competitor & link agents.`, 'system');
    await new Promise(r => setTimeout(r, 1000));

    // PHASE 2: Multi-Agent Intelligence Gathering (Parallel Execution)
    this.setAgentState('orchestrator', 'WORKING', 'Delegated task DAG to Research, Competitor & Link Architect agents');
    this.setAgentState('research', 'RESEARCHING', 'Extracting high-intent, low-KD topic clusters (KD ≤ 22)');
    this.setAgentState('competitor', 'CRAWLING', 'Profiling rival domain gaps & keyword vulnerabilities');
    this.setAgentState('link_architect', 'ANALYZING', 'Mapping site graph & cluster link topology');

    this.addLog('research', 'orchestrator', 'Found 18 low-KD opportunities. Primary target: "best ai overview & geo optimization tools".', 'data');
    await new Promise(r => setTimeout(r, 1200));

    this.addLog('competitor', 'orchestrator', 'Competitor audit done. Identified 4 high-authority missing content gaps.', 'data');
    this.addLog('link_architect', 'orchestrator', 'Cluster link map generated. Recommended parent silo: "/resources/ai-seo-guides".', 'data');
    await new Promise(r => setTimeout(r, 1000));

    this.setAgentState('research', 'COMPLETED', 'Keyword matrix attached');
    this.setAgentState('competitor', 'COMPLETED', 'Gap audit complete');
    this.setAgentState('link_architect', 'COMPLETED', 'Link silo topology configured');

    // HITL GATE 1: Strategy & Target Approval
    this.currentStepIndex = 2;
    const gate1Result = await this.waitForApproval(
      'STRATEGY_GATE',
      'Approve Target Keyword & Topic Cluster Blueprint',
      `Target: "Best AI Overview & GEO Optimization Tools" | Target Domain: ${targetDomain} | KD: 18 | Est. Search Intent: High Commercial`,
      {
        targetKeyword: 'Best AI Overview & GEO Optimization Tools',
        secondaryKeywords: ['GEO citation strategy', 'AEO answer engine optimization', 'Google AI overview score'],
        targetSilo: '/resources/ai-seo-guides',
        estimatedWordCount: 2400
      }
    );

    if (!gate1Result.approved) {
      this.addLog('orchestrator', 'orchestrator', 'Swarm execution halted at Gate 1.', 'warning');
      return;
    }

    // PHASE 3: Content Generation & Knowledge Graph Synthesis
    this.currentStepIndex = 3;
    this.setAgentState('orchestrator', 'WORKING', 'Delegating Content Creator & Entity Graph agents');
    this.setAgentState('writer', 'DRAFTING', 'Generating 2,400-word article with H2/H3 BLUF formatting');
    this.setAgentState('entity_graph', 'SYNTHESIZING', 'Building JSON-LD schema linked to Wikidata & Knowledge Graph IDs');

    this.addLog('orchestrator', 'writer', `Drafting topic: "${gate1Result.payload.targetKeyword}". Include Speakable & FAQPage schema.`, 'task');
    await new Promise(r => setTimeout(r, 1500));

    this.addLog('writer', 'entity_graph', 'Draft complete. Handing payload to Entity Graph & GEO agents for optimization.', 'handover');
    this.setAgentState('writer', 'COMPLETED', 'Draft ready');

    this.addLog('entity_graph', 'data_citation', 'Wikidata & schema links built. Handing to Statistical Data Injector.', 'handover');
    this.setAgentState('entity_graph', 'COMPLETED', 'JSON-LD Knowledge Graph schema attached');

    // PHASE 4: Statistical Injection & AEO Inspection
    this.currentStepIndex = 4;
    this.setAgentState('data_citation', 'INJECTING', 'Injecting authoritative research stats & 4 citations for GEO score');
    this.setAgentState('aeo', 'AUDITING', 'Testing BLUF answer block density & LLM citation score');

    await new Promise(r => setTimeout(r, 1400));

    this.addLog('data_citation', 'aeo', 'Added 5 verified metrics (+38% GEO retrieval lift score).', 'data');
    this.setAgentState('data_citation', 'COMPLETED', 'GEO statistical citations injected');

    this.addLog('aeo', 'dispatcher', 'AEO & GEO Audit passed: 98% LLM Citation Score (Perplexity, SearchGPT & Claude).', 'success');
    this.setAgentState('aeo', 'COMPLETED', '98% AEO/GEO Score Verified');

    // HITL GATE 2: CMS Dispatch & Final Publishing Review
    this.currentStepIndex = 5;
    const gate2Result = await this.waitForApproval(
      'PUBLISH_GATE',
      'Approve Article Payload & Direct CMS Dispatch',
      `Article Title: "Best AI Overview & GEO Optimization Tools: The 2026 Strategy Guide"\nWord Count: 2,420 words | AEO Citation Score: 98% | Schema: FAQPage + Speakable + Wikidata JSON-LD`,
      {
        title: 'Best AI Overview & GEO Optimization Tools: The 2026 Strategy Guide',
        wordCount: 2420,
        aeoScore: 98,
        cmsStatus: 'publish',
        targetDomain
      }
    );

    if (!gate2Result.approved) {
      this.addLog('orchestrator', 'orchestrator', 'Swarm execution halted at Gate 2.', 'warning');
      return;
    }

    // PHASE 5: CMS Payload Dispatch & Campaign Completion
    this.currentStepIndex = 6;
    this.setAgentState('dispatcher', 'DISPATCHING', 'Pushing final payload to CMS REST API with JSON-LD schema');
    await new Promise(r => setTimeout(r, 1400));

    this.addLog('dispatcher', 'orchestrator', `Article successfully published to ${targetDomain} (Post ID: #POST-9840).`, 'success');
    this.setAgentState('dispatcher', 'COMPLETED', 'Published to CMS');

    // Swarm Completion
    this.setAgentState('orchestrator', 'COMPLETED', '9-Agent Autonomous Swarm Cycle Completed Successfully');
    this.status = 'COMPLETED';
    this.notify();
  }

  stopSwarm() {
    this.status = 'IDLE';
    this.pendingApproval = null;
    Object.keys(this.agents).forEach(id => {
      this.agents[id].state = 'IDLE';
      this.agents[id].activeTask = 'Standing by';
    });
    this.notify();
  }
}

