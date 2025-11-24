import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*', // Allow all origins for now, adjust for production
    },
})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    // Map to store connected clients: socketId -> userId
    private connectedClients: Map<string, string> = new Map();

    afterInit(server: Server) {
        this.logger.log('WebSocket Gateway Initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        const userId = client.handshake.query.userId as string;
        if (!userId) {
            this.logger.warn(`Client connected without userId: ${client.id}`);
            return;
        }

        this.logger.log(`Client connected: ${client.id} (User: ${userId})`);
        this.connectedClients.set(client.id, userId);
        this.broadcastStatus();
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.connectedClients.delete(client.id);
        this.broadcastStatus();
    }

    @SubscribeMessage('statusUpdate')
    handleStatusUpdate(client: Socket, payload: any): void {
        // Handle specific status updates if needed
        this.logger.log(`Status update from ${client.id}: ${JSON.stringify(payload)}`);
    }

    private broadcastStatus() {
        // Get unique online user IDs
        const onlineUserIds = Array.from(new Set(this.connectedClients.values()));
        this.server.emit('onlineUsers', { count: onlineUserIds.length, users: onlineUserIds });
    }
}
