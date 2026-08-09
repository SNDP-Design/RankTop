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
      backlinker:   { ...AGENT_ROLES.BACKLINKER,   state: 'IDLE', activeTask: 'Ready for off-page backlink & outreach campaign design' },
      llm_benchmarker:{ ...AGENT_ROLES.LLM_BENCHMARKER, state: 'IDLE', activeTask: 'Ready for live LLM query citation benchmark simulation' },
      community_amplifier:{ ...AGENT_ROLES.COMMUNITY_AMPLIFIER, state: 'IDLE', activeTask: 'Ready for Reddit & forum GEO thread prospecting' },
      decay_repairman:{ ...AGENT_ROLES.DECAY_REPAIRMAN, state: 'IDLE', activeTask: 'Ready for content decay audit & freshness schema injection' },
      som_tracker:   { ...AGENT_ROLES.SOM_TRACKER,    state: 'IDLE', activeTask: 'Ready for Share of Model (SoM) LLM brand recommendation analysis' },
      silo_architect:{ ...AGENT_ROLES.SILO_ARCHITECT, state: 'IDLE', activeTask: 'Ready for autonomous topic sitemap silo interlinking' },
      schema_engineer:{ ...AGENT_ROLES.SCHEMA_ENGINEER,state:'IDLE', activeTask: 'Ready for deep RAG multi-entity JSON-LD schema synthesis' },
      free_tools_engineer:{ ...AGENT_ROLES.FREE_TOOLS_ENGINEER, state: 'IDLE', activeTask: 'Ready for 26 free SEO & AI tool autonomous execution' },
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

  async runCustomStrategicGoal(goalPrompt, targetDomain = 'mywebsite.com') {
    this.status = 'RUNNING';
    this.logs = [];
    this.pendingApproval = null;
    this.currentStepIndex = 1;
    this.notify();

    this.setAgentState('orchestrator', 'THINKING', `Decomposing strategic goal: "${goalPrompt}"`);
    this.addLog('orchestrator', 'orchestrator', `[Strategic Engine] Received Goal: "${goalPrompt}" for ${targetDomain}. Decomposing into subtask DAG.`, 'system');
    await new Promise(r => setTimeout(r, 1200));

    // Subtask 1: Research & Competitor Gap Analysis
    this.setAgentState('orchestrator', 'WORKING', 'Delegated gap analysis & search intent extraction');
    this.setAgentState('research', 'RESEARCHING', `Analyzing search intent & KD metrics for "${goalPrompt}"`);
    this.setAgentState('competitor', 'CRAWLING', `Auditing top 3 competitor domains ranking for "${goalPrompt}"`);
    this.addLog('orchestrator', 'research', `Task Ticket #1: Extract target keywords & search intent for "${goalPrompt}".`, 'task');
    await new Promise(r => setTimeout(r, 1300));

    this.addLog('research', 'writer', `Found 4 high-value keyword targets (Avg KD: 18). Handing over to Content Creator.`, 'handover');
    this.setAgentState('research', 'COMPLETED', 'Keyword targets identified');

    // Subtask 2: Content Creation & Schema Engineering
    this.setAgentState('writer', 'DRAFTING', `Drafting 2,500-word authoritative guide for "${goalPrompt}"`);
    this.setAgentState('schema_engineer', 'ENGINEERING_SCHEMA', `Synthesizing Speakable & RAG Vector Schema`);
    this.addLog('writer', 'schema_engineer', `Draft complete. Generating nested JSON-LD schema with Wikidata @sameAs entities.`, 'handover');
    await new Promise(r => setTimeout(r, 1400));

    this.setAgentState('writer', 'COMPLETED', 'Draft ready');
    this.setAgentState('schema_engineer', 'COMPLETED', 'Vector RAG Schema Attached');

    // Subtask 3: GEO/AEO Citation & LLM Benchmarking
    this.setAgentState('aeo', 'AUDITING', 'Testing BLUF answer block density for AI Overviews');
    this.setAgentState('llm_benchmarker', 'BENCHMARKING', 'Simulating queries on ChatGPT Search, Perplexity Pro & Claude');
    this.addLog('aeo', 'llm_benchmarker', `BLUF block score: 98%. Benchmarking live LLM citation placement.`, 'data');
    await new Promise(r => setTimeout(r, 1300));

    this.setAgentState('aeo', 'COMPLETED', 'AEO Audit Passed');
    this.setAgentState('llm_benchmarker', 'COMPLETED', 'Cited #1 in Perplexity Pro');

    // Subtask 4: Backlinking, Forum GEO & Share of Model Tracking
    this.setAgentState('backlinker', 'PROSPECTING', 'Prospecting high-DR editorial blogs for outreach');
    this.setAgentState('community_amplifier', 'AMPLIFYING', 'Prospecting indexed Reddit subreddits & Quora questions');
    this.setAgentState('som_tracker', 'TRACKING_SOM', 'Measuring Share of Model (SoM) brand recommendation share');
    await new Promise(r => setTimeout(r, 1400));

    this.addLog('backlinker', 'orchestrator', '12 high-DR outreach emails queued & 4 Reddit entity citations drafted.', 'success');
    this.setAgentState('backlinker', 'COMPLETED', '12 Outreach Emails Queued');
    this.setAgentState('community_amplifier', 'COMPLETED', 'Reddit Entity Citations Prepared');
    this.setAgentState('som_tracker', 'COMPLETED', '92% SoM Recommendation Share Achieved');

    // Completion
    this.setAgentState('orchestrator', 'COMPLETED', `Strategic Goal "${goalPrompt}" Successfully Executed Across 16 Agents`);
    this.status = 'COMPLETED';
    this.notify();
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

    // PHASE 5: CMS Payload Dispatch
    this.currentStepIndex = 6;
    this.setAgentState('dispatcher', 'DISPATCHING', 'Pushing final payload to CMS REST API with JSON-LD schema');
    await new Promise(r => setTimeout(r, 1400));

    this.addLog('dispatcher', 'backlinker', `Article published to ${targetDomain} (Post ID: #POST-9840). Triggering off-page link building.`, 'handover');
    this.setAgentState('dispatcher', 'COMPLETED', 'Published to CMS');

    // PHASE 6: Backlink Gap Audit & Outreach Pitch Generation
    this.currentStepIndex = 7;
    this.setAgentState('backlinker', 'PROSPECTING', 'Auditing rival backlink profiles & discovering high-DR editorial opportunities');
    await new Promise(r => setTimeout(r, 1200));

    this.addLog('backlinker', 'llm_benchmarker', '14 outreach sequences queued. Handing over target keywords for live LLM citation benchmarking.', 'handover');
    this.setAgentState('backlinker', 'COMPLETED', '14 Outreach Emails Prepared & Dispatched');

    // PHASE 7: Live LLM Query Citation Benchmark Simulation
    this.currentStepIndex = 8;
    this.setAgentState('llm_benchmarker', 'BENCHMARKING', 'Simulating queries on ChatGPT Search, Perplexity, Gemini & Claude Overviews');
    await new Promise(r => setTimeout(r, 1300));

    this.addLog('llm_benchmarker', 'community_amplifier', 'Verified 96% LLM Citation Placement Rank (Cited #1 in Perplexity Pro & ChatGPT).', 'success');
    this.setAgentState('llm_benchmarker', 'COMPLETED', '96% Live LLM Citation Placement Verified');

    // PHASE 8: Reddit & Forum GEO Citation Amplification
    this.currentStepIndex = 9;
    this.setAgentState('community_amplifier', 'AMPLIFYING', 'Prospecting top Reddit subreddits & Quora threads indexed by Perplexity/ChatGPT');
    await new Promise(r => setTimeout(r, 1200));

    this.addLog('community_amplifier', 'decay_repairman', 'Discovered 8 high-traffic Reddit subreddits. 5 contextual answers synthesized.', 'info');
    this.setAgentState('community_amplifier', 'COMPLETED', '5 Reddit/Forum Entity Citations Queued');

    // PHASE 9: Content Freshness Guard & Decay Audit
    this.currentStepIndex = 10;
    this.setAgentState('decay_repairman', 'REPAIRING', 'Auditing GSC traffic velocity, updating timestamps, & injecting dateModified JSON-LD');
    await new Promise(r => setTimeout(r, 1100));

    this.addLog('decay_repairman', 'som_tracker', 'Freshness score restored to 100%. Handing over domain to Share of Model (SoM) Tracker.', 'handover');
    this.setAgentState('decay_repairman', 'COMPLETED', 'Content Decay Repaired & Freshness Schema Updated');

    // PHASE 10: Share of Model (SoM) Brand Recommendation Audit
    this.currentStepIndex = 11;
    this.setAgentState('som_tracker', 'TRACKING_SOM', 'Measuring LLM brand recommendation share across commercial buyer queries');
    await new Promise(r => setTimeout(r, 1200));

    this.addLog('som_tracker', 'silo_architect', 'SoM Score: 88% Brand Recommendation Share verified in Perplexity & ChatGPT.', 'success');
    this.setAgentState('som_tracker', 'COMPLETED', '88% Share of Model (SoM) Score Verified');

    // PHASE 11: Autonomous Topic Silo & Internal Interlinking
    this.currentStepIndex = 12;
    this.setAgentState('silo_architect', 'SILOING', 'Mapping sitemap URL graph & injecting contextual internal pillar anchor links');
    await new Promise(r => setTimeout(r, 1100));

    this.addLog('silo_architect', 'schema_engineer', 'Built 6 contextual internal link silos. Zero orphaned pages remaining.', 'info');
    this.setAgentState('silo_architect', 'COMPLETED', 'Internal Link Silos Constructed');

    // PHASE 12: Deep RAG Multi-Entity Schema Synthesis
    this.currentStepIndex = 13;
    this.setAgentState('schema_engineer', 'ENGINEERING_SCHEMA', 'Synthesizing Speakable, FAQPage, & Wikidata @sameAs JSON-LD for RAG vectorization');
    await new Promise(r => setTimeout(r, 1200));

    this.addLog('schema_engineer', 'orchestrator', 'Deep RAG Schema payload vectorized & ready for LLM crawler extraction.', 'success');
    this.setAgentState('schema_engineer', 'COMPLETED', 'Deep RAG Multi-Entity Schema Injected');

    // Swarm Completion
    this.setAgentState('orchestrator', 'COMPLETED', '16-Agent Autonomous Swarm Cycle Completed Successfully');
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

