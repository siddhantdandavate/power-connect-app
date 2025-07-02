import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, CheckCircle, IndianRupee, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useUser } from '@/contexts/UserContext';
import { realtimeService } from '@/services/realtimeService';
import { PowerTheftAlert, KPI } from '@/types';

const SiteEngineerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useUser();
  const [alerts, setAlerts] = useState<PowerTheftAlert[]>([]);
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [assignedComplaints] = useState(12);
  const [resolvedToday] = useState(8);
  const [pendingVisits] = useState(4);

  useEffect(() => {
    // Subscribe to real-time updates
    const handleTheftAlert = (alert: PowerTheftAlert) => {
      setAlerts(prev => [alert, ...prev.slice(0, 4)]);
    };

    const handleKPIUpdate = (newKPIs: KPI[]) => {
      setKPIs(newKPIs);
    };

    realtimeService.subscribe('theft_alert', handleTheftAlert);
    realtimeService.subscribe('kpi_update', handleKPIUpdate);
    realtimeService.connect();

    // Initial data
    setAlerts([
      {
        id: '1',
        location: 'Zone A, Area 3, Sector 15',
        severity: 'high',
        detectedAt: new Date(Date.now() - 30 * 60 * 1000),
        status: 'pending',
        estimatedLoss: 25000,
        coordinates: [18.5204, 73.8567]
      },
      {
        id: '2',
        location: 'Zone A, Area 1, Sector 8',
        severity: 'medium',
        detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'investigating',
        assignedTo: user?.id,
        estimatedLoss: 15000,
        coordinates: [18.5304, 73.8667]
      }
    ]);

    return () => {
      realtimeService.unsubscribe('theft_alert', handleTheftAlert);
      realtimeService.unsubscribe('kpi_update', handleKPIUpdate);
    };
  }, [user?.id]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <CardContent className="p-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('welcome')}, {user?.name}!</h2>
            <p className="opacity-90">Site Engineer - {user?.zone}, {user?.area}</p>
            <p className="opacity-90">Active Alerts: {alerts.filter(a => a.status === 'pending').length}</p>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <CardContent className="p-4 text-center">
            <Clock className="text-blue-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-blue-600">{assignedComplaints}</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Assigned Complaints</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-green-600">{resolvedToday}</p>
            <p className="text-sm text-green-700 dark:text-green-300">Resolved Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time KPIs */}
      {kpis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              {t('realTimeData')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{kpi.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Updated: {kpi.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{kpi.unit === '₹' ? '₹' : ''}{kpi.value.toLocaleString()}{kpi.unit !== '₹' ? kpi.unit : ''}</p>
                    <div className="flex items-center gap-1">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="text-green-500" size={12} />
                      ) : (
                        <TrendingDown className="text-red-500" size={12} />
                      )}
                      <span className={`text-xs ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {kpi.change > 0 ? '+' : ''}{kpi.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Power Theft Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-red-600" size={20} />
            {t('powerTheftAlerts')} (Live)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No active alerts</p>
            ) : (
              alerts.map((alert) => (
                <Card key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin size={14} className="text-muted-foreground" />
                          <p className="font-medium">{alert.location}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Detected: {alert.detectedAt.toLocaleString()}
                        </p>
                        <p className="text-sm font-medium text-red-600">
                          Estimated Loss: ₹{alert.estimatedLoss.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" onClick={() => navigate('/incident-map')}>
                          View Map
                        </Button>
                        {alert.status === 'pending' && (
                          <Button size="sm" variant="outline">
                            Investigate
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => navigate('/complaint-tracker')}
          className="h-16 flex flex-col items-center gap-2"
        >
          <Clock size={20} />
          <span className="text-sm">View Complaints</span>
        </Button>
        <Button 
          onClick={() => navigate('/incident-map')}
          variant="outline"
          className="h-16 flex flex-col items-center gap-2"
        >
          <MapPin size={20} />
          <span className="text-sm">Incident Map</span>
        </Button>
      </div>
    </div>
  );
};

export default SiteEngineerDashboard;