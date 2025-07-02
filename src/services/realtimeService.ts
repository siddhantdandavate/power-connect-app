import { io, Socket } from 'socket.io-client';
import { KPI, PowerTheftAlert } from '@/types';

class RealtimeService {
  private socket: Socket | null = null;
  private callbacks: Map<string, Function[]> = new Map();

  connect() {
    // In a real app, this would connect to your WebSocket server
    // For demo purposes, we'll simulate real-time updates
    this.simulateRealtimeUpdates();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  subscribe(event: string, callback: Function) {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)?.push(callback);
  }

  unsubscribe(event: string, callback: Function) {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  private simulateRealtimeUpdates() {
    // Simulate KPI updates every 10 seconds
    setInterval(() => {
      const kpis: KPI[] = [
        {
          id: '1',
          name: 'Power Theft Alerts',
          value: Math.floor(Math.random() * 50) + 10,
          unit: 'alerts',
          trend: Math.random() > 0.5 ? 'up' : 'down',
          change: Math.random() * 10 - 5,
          timestamp: new Date()
        },
        {
          id: '2',
          name: 'Resolution Rate',
          value: Math.floor(Math.random() * 20) + 80,
          unit: '%',
          trend: Math.random() > 0.3 ? 'up' : 'down',
          change: Math.random() * 5 - 2.5,
          timestamp: new Date()
        },
        {
          id: '3',
          name: 'Revenue Recovered',
          value: Math.floor(Math.random() * 100000) + 500000,
          unit: '₹',
          trend: 'up',
          change: Math.random() * 15,
          timestamp: new Date()
        }
      ];
      
      this.emit('kpi_update', kpis);
    }, 10000);

    // Simulate power theft alerts
    setInterval(() => {
      if (Math.random() > 0.7) {
        const alert: PowerTheftAlert = {
          id: Date.now().toString(),
          location: `Zone ${Math.floor(Math.random() * 5) + 1}, Area ${Math.floor(Math.random() * 10) + 1}`,
          severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
          detectedAt: new Date(),
          status: 'pending',
          estimatedLoss: Math.floor(Math.random() * 50000) + 10000,
          coordinates: [18.5204 + (Math.random() - 0.5) * 0.1, 73.8567 + (Math.random() - 0.5) * 0.1]
        };
        
        this.emit('theft_alert', alert);
      }
    }, 30000);
  }
}

export const realtimeService = new RealtimeService();