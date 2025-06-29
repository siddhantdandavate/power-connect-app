
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, TrendingDown, Zap, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UsageAnalytics = () => {
  const navigate = useNavigate();

  const monthlyData = [
    { month: 'Jan', units: 280, amount: 1120 },
    { month: 'Feb', units: 295, amount: 1180 },
    { month: 'Mar', units: 310, amount: 1240 },
    { month: 'Apr', units: 325, amount: 1300 },
    { month: 'May', units: 298, amount: 1190 },
    { month: 'Jun', units: 324, amount: 1245 }
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const unitsChange = currentMonth.units - previousMonth.units;
  const amountChange = currentMonth.amount - previousMonth.amount;

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Usage Analytics</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <CardContent className="p-4 text-center">
            <Zap className="text-blue-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-blue-600">{currentMonth.units}</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">kWh This Month</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {unitsChange > 0 ? (
                <TrendingUp className="text-red-500" size={12} />
              ) : (
                <TrendingDown className="text-green-500" size={12} />
              )}
              <span className={`text-xs ${unitsChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {Math.abs(unitsChange)} kWh
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
          <CardContent className="p-4 text-center">
            <IndianRupee className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold text-green-600">₹{currentMonth.amount}</p>
            <p className="text-sm text-green-700 dark:text-green-300">Current Bill</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {amountChange > 0 ? (
                <TrendingUp className="text-red-500" size={12} />
              ) : (
                <TrendingDown className="text-green-500" size={12} />
              )}
              <span className={`text-xs ${amountChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                ₹{Math.abs(amountChange)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => {
              const maxUnits = Math.max(...monthlyData.map(d => d.units));
              const widthPercentage = (data.units / maxUnits) * 100;
              
              return (
                <div key={data.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{data.month} 2024</span>
                    <span>{data.units} kWh</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${widthPercentage}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    ₹{data.amount}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-lg font-bold text-orange-600">
                {Math.round(monthlyData.reduce((sum, d) => sum + d.units, 0) / monthlyData.length)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Monthly Units</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-lg font-bold text-purple-600">
                ₹{Math.round(monthlyData.reduce((sum, d) => sum + d.amount, 0) / monthlyData.length)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Monthly Bill</p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Energy Saving Tips</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Use LED bulbs to reduce electricity consumption</li>
              <li>• Unplug devices when not in use</li>
              <li>• Set AC temperature to 24°C or higher</li>
              <li>• Use natural light during daytime</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Next Month Estimate</h3>
          <p className="text-2xl font-bold text-green-600">₹1,280</p>
          <p className="text-sm text-muted-foreground">
            Based on current usage pattern
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageAnalytics;
