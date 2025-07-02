import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CreditCard, Zap, Camera, Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useUser } from '@/contexts/UserContext';

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useUser();
  const [currentBill] = useState(1245);
  const [unitsConsumed] = useState(324);
  const [lastMonthUnits] = useState(298);
  const [announcements] = useState([
    "Power maintenance scheduled for your area on 30th June from 10 AM to 2 PM",
    "New tariff rates effective from July 1st, 2024",
    "Online bill payment now available 24/7 with instant confirmation"
  ]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const unitsChange = unitsConsumed - lastMonthUnits;
  const changePercentage = ((unitsChange / lastMonthUnits) * 100).toFixed(1);

  const quickActions = [
    { 
      icon: FileText, 
      title: t('viewBill'), 
      subtitle: 'Check your electricity bill', 
      path: '/view-bill', 
      color: 'bg-blue-500' 
    },
    { 
      icon: CreditCard, 
      title: t('payBill'), 
      subtitle: 'Pay your pending bills', 
      path: '/pay-bill', 
      color: 'bg-green-500' 
    },
    { 
      icon: Camera, 
      title: 'Submit Reading', 
      subtitle: 'Upload meter reading', 
      path: '/meter-reading', 
      color: 'bg-purple-500' 
    },
    { 
      icon: Zap, 
      title: 'Usage Analytics', 
      subtitle: 'View consumption trends', 
      path: '/usage-analytics', 
      color: 'bg-orange-500' 
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Notification Bar */}
      <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Bell className="text-blue-600 flex-shrink-0" size={20} />
            <div className="overflow-hidden">
              <p className="text-sm text-blue-800 dark:text-blue-200 animate-fade-in font-medium">
                {announcements[currentAnnouncement]}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardContent className="p-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('welcome')}, {user?.name}!</h2>
            <p className="opacity-90">Consumer ID: {user?.consumerNo}</p>
            <p className="opacity-90">Meter No: {user?.meterNo}</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">₹{currentBill}</p>
            <p className="text-sm text-green-700 dark:text-green-300">{t('currentBill')}</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{unitsConsumed} kWh</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">{t('unitsConsumed')}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {unitsChange > 0 ? (
                <TrendingUp className="text-red-500" size={12} />
              ) : (
                <TrendingDown className="text-green-500" size={12} />
              )}
              <span className={`text-xs ${unitsChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {unitsChange > 0 ? '+' : ''}{changePercentage}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{action.title}</h4>
                  <p className="text-xs text-muted-foreground">{action.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
              <CreditCard className="text-green-600" size={16} />
              <div className="flex-1">
                <p className="text-sm font-medium">Bill Payment Successful</p>
                <p className="text-xs text-muted-foreground">₹1,150 paid on June 5, 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
              <Camera className="text-blue-600" size={16} />
              <div className="flex-1">
                <p className="text-sm font-medium">Meter Reading Submitted</p>
                <p className="text-xs text-muted-foreground">Reading: 2,780 kWh on June 1, 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumerDashboard;