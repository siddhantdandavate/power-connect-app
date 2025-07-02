export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: 'consumer' | 'site_engineer' | 'dept_head';
  zone?: string;
  area?: string;
  consumerNo?: string;
  meterNo?: string;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  target?: number;
  zone?: string;
  area?: string;
  timestamp: Date;
}

export interface PowerTheftAlert {
  id: string;
  location: string;
  severity: 'high' | 'medium' | 'low';
  detectedAt: Date;
  status: 'pending' | 'investigating' | 'resolved';
  assignedTo?: string;
  estimatedLoss: number;
  coordinates: [number, number];
}

export interface Complaint {
  id: string;
  type: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
  resolvedAt?: Date;
  assignedTo?: string;
  location: string;
  consumerNo?: string;
}

export interface Forecast {
  period: string;
  incidents: number;
  confidence: number;
  riskLevel: 'high' | 'medium' | 'low';
  recommendations: string[];
}

export interface SCORMModule {
  id: string;
  title: string;
  description: string;
  role: string[];
  progress: number;
  completed: boolean;
  duration: number;
  url: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}