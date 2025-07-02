import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, TrendingDown, Download, Filter, AlertTriangle, CheckCircle, IndianRupee, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useUser } from '@/contexts/UserContext';
import { realtimeService } from '@/services/realtimeService';
import { KPI } from '@/types';

const DeptHeadDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useUser();
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [globalKPIs] = useState({
    powerTheftDetected: 45,
    resolutionRate: 87,
    detectionAccuracy: 94,
    revenueRecovered: 2500000,
    billingPerformance: 96,
    paidVsUnpaid: { paid: 78, unpaid: 22 }
  });

  useEffect(() => {
    const handleKPIUpdate = (newKPIs: KPI[]) => {
      setKPIs(newKPIs);
    };

    realtimeService.subscribe('kpi_update', handleKPIUpdate);
    realtimeService.connect();

    return () => {
      realtimeService.unsubscribe('kpi_update', handleKPIUpdate);
    };
  }, []);

  const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];
  const areas = ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5'];

  const monthlyComparison = [
    { month: 'May 2024', theftCases: 52, resolved: 45, revenue: 2200000 },
    { month: 'Jun 2024', theftCases: 45, resolved: 39, revenue: 2500000 }
  ];

  const currentMonth = monthlyComparison[1];
  const previousMonth = monthlyComparison[0];
  const theftChange = currentMonth.theftCases - previousMonth.theftCases;
  const revenueChange = currentMonth.revenue - previousMonth.revenue;

  const exportData = (format: 'pdf' | 'excel') => {
    // Simulate data export
    const data = {
      zone: selectedZone,
      area: selectedArea,
      kpis: globalKPIs,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kpi-report-${format}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <CardContent className="p-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('welcome')}, {user?.name}!</h2>
            <p className="opacity-90">Department Head - Regional Overview</p>
            <p className="opacity-90">Managing {zones.length} zones, {areas.length * zones.length} areas</p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter size={20} />
            Zone & Area Filters
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
              <label className="text-sm font-medium mb-2 block">Area</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {areas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global KPIs */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="text-red-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-red-600">{globalKPIs.powerTheftDetected}</p>
            <p className="text-sm text-red-700 dark:text-red-300">{t('powerTheftAlerts')}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {theftChange < 0 ? (
                <TrendingDown className="text-green-500" size={12} />
              ) : (
                <TrendingUp className="text-red-500" size={12} />
              )}
              <span className={`text-xs ${theftChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                {theftChange > 0 ? '+' : ''}{theftChange}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-green-600">{globalKPIs.resolutionRate}%</p>
            <p className="text-sm text-green-700 dark:text-green-300">{t('resolutionRate')}</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <CardContent className="p-4 text-center">
            <BarChart3 className="text-blue-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-blue-600">{globalKPIs.detectionAccuracy}%</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Detection Accuracy</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200">
          <CardContent className="p-4 text-center">
            <IndianRupee className="text-purple-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-purple-600">₹{(globalKPIs.revenueRecovered / 100000).toFixed(1)}L</p>
            <p className="text-sm text-purple-700 dark:text-purple-300">{t('revenueRecovered')}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="text-green-500" size={12} />
              <span className="text-xs text-green-500">
                +₹{((revenueChange) / 100000).toFixed(1)}L
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time KPIs */}
      {kpis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              {t('realTimeData')} - Live Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{kpi.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {kpi.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">
                      {kpi.unit === '₹' ? '₹' : ''}{kpi.value.toLocaleString()}{kpi.unit !== '₹' ? kpi.unit : ''}
                    </p>
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

      {/* Paid vs Unpaid Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Performance</span>
              <span className="text-2xl font-bold text-green-600">{globalKPIs.billingPerformance}%</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Paid Bills</span>
                <span className="font-medium">{globalKPIs.paidVsUnpaid.paid}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${globalKPIs.paidVsUnpaid.paid}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Unpaid Bills</span>
                <span className="font-medium">{globalKPIs.paidVsUnpaid.unpaid}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-red-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${globalKPIs.paidVsUnpaid.unpaid}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Month-on-Month Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Month-on-Month Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {monthlyComparison.map((month, index) => (
              <div key={month.month} className={`p-4 rounded-lg ${index === 1 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-muted/50'}`}>
                <h3 className="font-semibold mb-2">{month.month}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Theft Cases:</span>
                    <span className="font-medium">{month.theftCases}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolved:</span>
                    <span className="font-medium">{month.resolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-medium">₹{(month.revenue / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download size={20} />
            {t('export')} KPI Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={() => exportData('pdf')} className="flex-1">
              <Download size={16} className="mr-2" />
              Export PDF
            </Button>
            <Button onClick={() => exportData('excel')} variant="outline" className="flex-1">
              <Download size={16} className="mr-2" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeptHeadDashboard;