import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/realtime', cors: { origin: '*' } })
export class RealtimeGateway {
  @WebSocketServer() server!: Server;
  private readonly logger = new Logger(RealtimeGateway.name);

  @SubscribeMessage('call:latency')
  onLatencyUpdate(@MessageBody() payload: { callId: string; latencyMs: number }) {
    this.logger.log(`latency update: ${payload.callId} -> ${payload.latencyMs}ms`);
    this.server.emit('call:latency:update', payload);
    return { ok: true };
  }
}
