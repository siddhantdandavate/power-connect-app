import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Brain, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { aiService } from '@/services/aiService';
import { Forecast } from '@/types';

const ForecastDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedZone, setSelectedZone] = useState('all');
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadForecasts();
  }, [selectedZone]);

  const loadForecasts = async () => {
    setIsLoading(true);
    try {
      const data = await aiService.getForecast(selectedZone === 'all' ? undefined : selectedZone);
      setForecasts(data);
    } catch (error) {
      console.error('Error loading forecasts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];
  const totalIncidents = forecasts.reduce((sum, f) => sum + f.incidents, 0);
  const avgConfidence = forecasts.length > 0 
    ? Math.round(forecasts.reduce((sum, f) => sum + f.confidence, 0) / forecasts.length)
    : 0;
  const highRiskPeriods = forecasts.filter(f => f.riskLevel === 'high').length;

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">AI {t('forecast')} Dashboard</h1>
      </div>

      {/* AI Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-100 dark:from-purple-900/20 dark:to-blue-800/20 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Brain className="text-purple-600" size={32} />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-purple-800 dark:text-purple-200">AI Predictive Analytics</h2>
              <p className="text-purple-600 dark:text-purple-300">6-month incident forecasting with ML models</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">{avgConfidence}%</p>
              <p className="text-sm text-purple-700 dark:text-purple-300">Avg Confidence</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map(zone => (
                <SelectItem key={zone} value={zone}>{zone}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Forecast Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="text-orange-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-orange-600">{totalIncidents}</p>
            <p className="text-sm text-muted-foreground">Predicted Incidents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="text-blue-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-blue-600">{avgConfidence}%</p>
            <p className="text-sm text-muted-foreground">Model Confidence</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="text-red-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-red-600">{highRiskPeriods}</p>
            <p className="text-sm text-muted-foreground">High Risk Periods</p>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Timeline */}
      {isLoading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading AI forecasts...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">6-Month {t('forecast')}</h3>
          {forecasts.map((forecast, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{forecast.period}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(forecast.riskLevel)}`}>
                        {forecast.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Predicted Incidents</p>
                        <p className="text-2xl font-bold text-orange-600">{forecast.incidents}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Model Confidence</p>
                        <p className={`text-2xl font-bold ${getConfidenceColor(forecast.confidence)}`}>
                          {forecast.confidence}%
                        </p>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-medium mb-2">AI Recommendations:</h4>
                      <ul className="space-y-1">
                        {forecast.recommendations.map((rec, recIndex) => (
                          <li key={recIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={14} />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="ml-6 text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center relative">
                      <div 
                        className={`absolute inset-0 rounded-full border-4 border-transparent ${
                          forecast.confidence >= 90 ? 'border-t-green-500' :
                          forecast.confidence >= 70 ? 'border-t-orange-500' : 'border-t-red-500'
                        }`}
                        style={{
                          transform: `rotate(${(forecast.confidence / 100) * 360}deg)`,
                          borderTopColor: forecast.confidence >= 90 ? '#10b981' :
                                         forecast.confidence >= 70 ? '#f97316' : '#ef4444'
                        }}
                      />
                      <span className="text-sm font-bold">{forecast.confidence}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Confidence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Model Information */}
      <Card>
        <CardHeader>
          <CardTitle>Model Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Model Type</p>
              <p className="font-medium">Time Series LSTM</p>
            </div>
            <div>
              <p className="text-muted-foreground">Training Data</p>
              <p className="font-medium">3 years historical</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Accuracy</p>
              <p className="font-medium">87.3%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastDashboard;