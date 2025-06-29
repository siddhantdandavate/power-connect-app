
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AGIndex = () => {
  const navigate = useNavigate();

  const agData = [
    { month: 'Jan 2024', index: 125.4, change: 2.3, status: 'Normal' },
    { month: 'Feb 2024', index: 128.7, change: 3.3, status: 'Normal' },
    { month: 'Mar 2024', index: 131.2, change: 2.5, status: 'Normal' },
    { month: 'Apr 2024', index: 129.8, change: -1.4, status: 'Decreased' },
    { month: 'May 2024', index: 133.5, change: 3.7, status: 'Increased' },
    { month: 'Jun 2024', index: 135.9, change: 2.4, status: 'Normal' }
  ];

  const currentIndex = agData[agData.length - 1];
  const avgIndex = agData.reduce((sum, item) => sum + item.index, 0) / agData.length;

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Agricultural Energy Index</h1>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <BarChart3 className="text-green-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-green-800 dark:text-green-200">AG Energy Index</h2>
              <p className="text-green-600 dark:text-green-300">Agricultural sector energy consumption data</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{currentIndex.index}</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Current Index</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {currentIndex.change > 0 ? (
                <TrendingUp className="text-green-500" size={12} />
              ) : (
                <TrendingDown className="text-red-500" size={12} />
              )}
              <span className={`text-xs ${currentIndex.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {currentIndex.change > 0 ? '+' : ''}{currentIndex.change}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{avgIndex.toFixed(1)}</p>
            <p className="text-sm text-orange-700 dark:text-orange-300">6-Month Average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly AG Index Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.month}</p>
                  <p className="text-sm text-muted-foreground">Index: {item.index}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {item.change > 0 ? (
                      <TrendingUp className="text-green-500" size={16} />
                    ) : item.change < 0 ? (
                      <TrendingDown className="text-red-500" size={16} />
                    ) : null}
                    <span className={`font-medium ${
                      item.change > 0 ? 'text-green-600' : 
                      item.change < 0 ? 'text-red-600' : 'text-muted-foreground'
                    }`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'Normal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                    item.status === 'Increased' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">About AG Index</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The Agricultural Energy Index tracks electricity consumption patterns in the agricultural sector, 
            helping farmers and authorities monitor energy efficiency and consumption trends.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Index above 130: High consumption period</li>
            <li>• Index 120-130: Normal consumption range</li>
            <li>• Index below 120: Low consumption period</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AGIndex;
