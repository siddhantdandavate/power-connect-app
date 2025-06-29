
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  CreditCard, 
  Zap, 
  Leaf, 
  AlertTriangle, 
  Shield, 
  BarChart3, 
  Phone, 
  User, 
  MessageSquare, 
  Calculator,
  Bell
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([
    "Power maintenance scheduled for Sector 15 on 30th June from 10 AM to 2 PM",
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

  const serviceBlocks = [
    { icon: FileText, title: 'View Bill', subtitle: 'Check your electricity bill', path: '/view-bill', color: 'bg-blue-500' },
    { icon: CreditCard, title: 'Pay Bill', subtitle: 'Pay your pending bills', path: '/pay-bill', color: 'bg-green-500' },
    { icon: Zap, title: 'Prepaid Recharge', subtitle: 'Recharge prepaid meter', path: '/prepaid-recharge', color: 'bg-orange-500' },
    { icon: BarChart3, title: 'Submit Reading', subtitle: 'Upload meter reading', path: '/meter-reading', color: 'bg-purple-500' },
    { icon: Leaf, title: 'Go Green', subtitle: 'Paperless billing option', path: '/go-green', color: 'bg-emerald-500' },
    { icon: AlertTriangle, title: 'Transformer Fault', subtitle: 'Report power issues', path: '/transformer-fault', color: 'bg-red-500' },
    { icon: Shield, title: 'Report Theft', subtitle: 'Anonymous complaint', path: '/power-theft', color: 'bg-indigo-500' },
    { icon: BarChart3, title: 'AG Index', subtitle: 'Agricultural energy data', path: '/ag-index', color: 'bg-yellow-500' },
    { icon: Phone, title: 'Contact Helpline', subtitle: 'Get instant support', path: '/contact-helpline', color: 'bg-teal-500' },
    { icon: User, title: 'Update Contact', subtitle: 'Modify your details', path: '/update-contact', color: 'bg-pink-500' },
    { icon: MessageSquare, title: 'Feedback', subtitle: 'Share your experience', path: '/feedback', color: 'bg-cyan-500' },
    { icon: Calculator, title: 'Bill Calculator', subtitle: 'Estimate your bill', path: '/bill-calculator', color: 'bg-amber-500' }
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
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
            <p className="opacity-90">Consumer ID: MSE12345678</p>
            <p className="opacity-90">Meter No: 98765432</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">₹1,245</p>
            <p className="text-sm text-green-700 dark:text-green-300">Current Bill</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">324 kWh</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">This Month</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Blocks */}
      <div>
        <h3 className="text-xl font-bold mb-4">Services</h3>
        <div className="grid grid-cols-2 gap-4">
          {serviceBlocks.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => navigate(service.path)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{service.title}</h4>
                  <p className="text-xs text-muted-foreground">{service.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer Links */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Emergency Helpline: 1912</p>
            <div className="flex justify-center space-x-4 text-xs">
              <button className="text-blue-600 hover:underline">Terms & Conditions</button>
              <button className="text-blue-600 hover:underline">Privacy Policy</button>
              <button className="text-blue-600 hover:underline">Contact Support</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
