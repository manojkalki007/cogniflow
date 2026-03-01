import { Injectable, NotFoundException } from '@nestjs/common';

export interface AgentRecord {
  id: string;
  name: string;
  template?: string;
  systemPrompt: string;
  greetingMessage: string;
  llmProvider: string;
  sttProvider: string;
  ttsProvider: string;
  voiceSpeed: number;
  voicePitch: number;
  interruptSensitivity: number;
  maxCallDurationSec: number;
  voicemailDetection: boolean;
  transferTarget?: string;
}

@Injectable()
export class AgentsService {
  private agents: AgentRecord[] = [];

  list() {
    return this.agents;
  }

  getModelCatalog() {
    return {
      llm: [
        { id: 'gemini-2-flash', label: 'Gemini 2 Flash', latencyMs: 220 },
        { id: 'gpt-4o', label: 'GPT-4o', latencyMs: 280 },
      ],
      stt: [
        { id: 'deepgram-nova-3', label: 'Deepgram Nova-3' },
        { id: 'smallest-pulse', label: 'Smallest AI Pulse' },
      ],
      tts: [
        { id: 'sarvam-bulbul-v2', label: 'Sarvam Bulbul v2' },
        { id: 'smallest-lightning', label: 'Smallest AI Lightning' },
      ],
      templates: ['sales-outreach', 'booking-agent', 'student-counselor', 'customer-support'],
    };
  }

  create(payload: Omit<AgentRecord, 'id'>) {
    const agent: AgentRecord = {
      id: `agent_${Math.random().toString(36).slice(2, 10)}`,
      ...payload,
    };
    this.agents.unshift(agent);
    return agent;
  }

  update(id: string, payload: Partial<Omit<AgentRecord, 'id'>>) {
    const index = this.agents.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Agent not found');
    this.agents[index] = { ...this.agents[index], ...payload };
    return this.agents[index];
  }

  architecture() {
    return {
      streaming: true,
      interruptHandling: true,
      lowLatency: true,
      pluggableProviders: true,
      realtimeTesting: true,
    };
  }
}
