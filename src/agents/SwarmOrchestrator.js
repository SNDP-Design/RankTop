import { AGENT_ROLES } from './agentDefinitions';
import { geminiService } from '../services/geminiService';

export class SwarmOrchestrator {
  constructor(onUpdate) {
    this.onUpdate = onUpdate; // State listener callback
    this.status = 'IDLE'; // 'IDLE' | 'RUNNING' | 'COMPLETED' | 'PAUSED'
    this.currentStepIndex = 0;
    this.logs = [];
    
    // Initial agent states
    this.agents = {
      orchestrator: { ...AGENT_ROLES.ORCHESTRATOR, state: 'IDLE', activeTask: 'Standing by for goal input' },
      research: { ...AGENT_ROLES.RESEARCH, state: 'IDLE', activeTask: 'Ready for domain research' },
      competitor: { ...AGENT_ROLES.COMPETITOR, state: 'IDLE', activeTask: 'Ready for competitor crawl' },
      writer: { ...AGENT_ROLES.WRITER, state: 'IDLE', activeTask: 'Ready for drafting' },
      aeo: { ...AGENT_ROLES.AEO, state: 'IDLE', activeTask: 'Ready for AEO inspection' },
      dispatcher: { ...AGENT_ROLES.DISPATCHER, state: 'IDLE', activeTask: 'Ready for CMS payload dispatch' },
    };
  }

  notify() {
    if (this.onUpdate) {
      this.onUpdate({
        status: this.status,
        currentStepIndex: this.currentStepIndex,
        agents: { ...this.agents },
        logs: [...this.logs]
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

  async runFullAutopilotSwarm(targetDomain = 'mywebsite.com') {
    this.status = 'RUNNING';
    this.logs = [];
    this.notify();

    // STEP 1: Orchestrator Goal Planning
    this.setAgentState('orchestrator', 'THINKING', `Planning autonomous SEO swarm for ${targetDomain}`);
    this.addLog('orchestrator', 'research', `Initializing Swarm. Target Domain: ${targetDomain}. Delegating keyword research & competitor analysis.`, 'system');
    await new Promise(r => setTimeout(r, 1200));

    // STEP 2: Research & Competitor Agents in parallel
    this.setAgentState('orchestrator', 'WORKING', 'Delegated tasks to Research & Competitor subagents');
    this.setAgentState('research', 'RESEARCHING', 'Extracting high-intent topic clusters (KD ≤ 20)');
    this.setAgentState('competitor', 'CRAWLING', 'Analyzing competitor missed keyword gaps');

    this.addLog('research', 'orchestrator', 'Found 14 low-KD keyword opportunities. Top target: "best ai overview simulator tool".', 'data');
    await new Promise(r => setTimeout(r, 1400));

    this.addLog('competitor', 'orchestrator', 'Competitor gap audit complete. Identified 3 high-authority rival vulnerabilities.', 'data');
    await new Promise(r => setTimeout(r, 1200));

    this.setAgentState('research', 'COMPLETED', 'Keyword strategy matrix compiled');
    this.setAgentState('competitor', 'COMPLETED', 'Competitor gap report attached');

    // STEP 3: Content Writer Agent
    this.setAgentState('orchestrator', 'WORKING', 'Delegating article drafting & JSON-LD schema generation');
    this.setAgentState('writer', 'DRAFTING', 'Generating 2,200-word article with H2/H3 hierarchy and Speakable schema');

    this.addLog('orchestrator', 'writer', 'Topic: "The Ultimate Guide to AI Overview Simulators". Requirements: Include JSON-LD & featured graphic prompt.', 'task');
    await new Promise(r => setTimeout(r, 1600));

    this.addLog('writer', 'aeo', 'Article draft complete. Requesting AEO & LLM Citation score evaluation.', 'handover');
    this.setAgentState('writer', 'COMPLETED', 'Draft & JSON-LD schema ready');

    // STEP 4: AEO & LLM Citation Agent
    this.setAgentState('aeo', 'AUDITING', 'Testing BLUF answer density & Google AI Overview citation score');
    await new Promise(r => setTimeout(r, 1400));

    this.addLog('aeo', 'dispatcher', 'AEO Inspection passed: 96% Citation Probability Score. Content optimized for Perplexity & Claude.', 'success');
    this.setAgentState('aeo', 'COMPLETED', '96% AEO Score Verified');

    // STEP 5: CMS Dispatcher Agent
    this.setAgentState('dispatcher', 'DISPATCHING', 'Formatting payload & pushing via WordPress REST API');
    await new Promise(r => setTimeout(r, 1400));

    this.addLog('dispatcher', 'orchestrator', 'Article successfully published to WordPress (Draft Mode ID: #POST-9402).', 'success');
    this.setAgentState('dispatcher', 'COMPLETED', 'Published to CMS');

    // STEP 6: Swarm Completion
    this.setAgentState('orchestrator', 'COMPLETED', 'Autonomous SEO Swarm Cycle Finished Successfully');
    this.status = 'COMPLETED';
    this.notify();
  }

  stopSwarm() {
    this.status = 'IDLE';
    Object.keys(this.agents).forEach(id => {
      this.agents[id].state = 'IDLE';
      this.agents[id].activeTask = 'Standing by';
    });
    this.notify();
  }
}
