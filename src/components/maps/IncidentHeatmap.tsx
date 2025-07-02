import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, AlertTriangle, Filter, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { PowerTheftAlert } from '@/types';

const IncidentHeatmap = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [incidents, setIncidents] = useState<PowerTheftAlert[]>([]);

  useEffect(() => {
    // Generate dummy incident data for heatmap
    const dummyIncidents: PowerTheftAlert[] = Array.from({ length: 50 }, (_, i) => ({
      id: i.toString(),
      location: `Zone ${Math.floor(Math.random() * 5) + 1}, Area ${Math.floor(Math.random() * 10) + 1}`,
      severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
      detectedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      status: ['pending', 'investigating', 'resolved'][Math.floor(Math.random() * 3)] as any,
      estimatedLoss: Math.floor(Math.random() * 50000) + 10000,
      coordinates: [
        18.5204 + (Math.random() - 0.5) * 0.2,
        73.8567 + (Math.random() - 0.5) * 0.2
      ]
    }));
    setIncidents(dummyIncidents);
  }, []);

  const filteredIncidents = incidents.filter(incident => {
    if (selectedZone !== 'all' && !incident.location.includes(selectedZone)) return false;
    if (selectedSeverity !== 'all' && incident.severity !== selectedSeverity) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f97316';
      case 'low': return '#eab308';
      default: return '#6b7280';
    }
  };

  const zones = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Incident Heatmap</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter size={20} />
            Map Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Zone</label>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  {zones.map(zone => (
                    <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Severity</label>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin size={20} />
            Incident Distribution Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[400px] relative">
            {/* Simulated Map */}
            <div className="absolute inset-4 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded border-2 border-dashed border-gray-300">
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Interactive Map View (Simulated)
                </p>
                
                {/* Simulated incident markers */}
                <div className="relative w-full h-full">
                  {filteredIncidents.slice(0, 20).map((incident, index) => (
                    <div
                      key={incident.id}
                      className="absolute w-3 h-3 rounded-full cursor-pointer hover:scale-150 transition-transform"
                      style={{
                        backgroundColor: getSeverityColor(incident.severity),
                        left: `${20 + (index % 8) * 10}%`,
                        top: `${20 + Math.floor(index / 8) * 15}%`,
                      }}
                      title={`${incident.location} - ${incident.severity} severity`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">High Severity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm">Medium Severity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Low Severity</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {filteredIncidents.filter(i => i.severity === 'high').length}
            </p>
            <p className="text-sm text-muted-foreground">High Severity</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">
              {filteredIncidents.filter(i => i.severity === 'medium').length}
            </p>
            <p className="text-sm text-muted-foreground">Medium Severity</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {filteredIncidents.filter(i => i.severity === 'low').length}
            </p>
            <p className="text-sm text-muted-foreground">Low Severity</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredIncidents.slice(0, 5).map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getSeverityColor(incident.severity) }}
                  />
                  <div>
                    <p className="font-medium">{incident.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {incident.detectedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{incident.estimatedLoss.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{incident.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentHeatmap;