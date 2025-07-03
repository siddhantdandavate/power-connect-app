import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MessageCircle, Phone, Bell, CheckCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';

const WhatsAppIntegration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [whatsappNumber, setWhatsappNumber] = useState('+91 9876543210');
  const [notifications, setNotifications] = useState({
    billReminders: true,
    powerOutages: true,
    paymentConfirmations: true,
    theftAlerts: false
  });
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Simulate WhatsApp connection
    setTimeout(() => {
      setIsConnected(true);
      alert('WhatsApp integration activated! You will receive notifications on WhatsApp.');
    }, 2000);
  };

  const sendTestMessage = () => {
    const message = encodeURIComponent(
      `Hello! This is a test message from MSEFC PowerSync app. Your WhatsApp integration is working correctly. 

Current Bill: ₹1,245
Due Date: July 15, 2024
Units Consumed: 324 kWh

Thank you for using our services!`
    );
    
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const openWhatsAppChat = () => {
    const message = encodeURIComponent('Hello MSEFC! I need help with my electricity connection.');
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  const quickActions = [
    {
      title: 'Bill Reminder',
      description: 'Get bill due date reminders',
      action: () => {
        const message = encodeURIComponent('🔔 Bill Reminder: Your electricity bill of ₹1,245 is due on July 15, 2024. Pay now to avoid late fees.');
        window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
      }
    },
    {
      title: 'Power Outage Alert',
      description: 'Receive outage notifications',
      action: () => {
        const message = encodeURIComponent('⚡ Power Outage Alert: Scheduled maintenance in your area from 10 AM to 2 PM today. We apologize for the inconvenience.');
        window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
      }
    },
    {
      title: 'Payment Confirmation',
      description: 'Get payment confirmations',
      action: () => {
        const message = encodeURIComponent('✅ Payment Confirmed: Your bill payment of ₹1,245 has been successfully processed. Transaction ID: TXN123456789');
        window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
      }
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">{t('whatsapp')} Integration</h1>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <MessageCircle className="text-green-600" size={32} />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-green-800 dark:text-green-200">WhatsApp Integration</h2>
              <p className="text-green-600 dark:text-green-300">Get instant notifications and updates on WhatsApp</p>
            </div>
            {isConnected && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={20} />
                <span className="text-sm font-medium">Connected</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick WhatsApp Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Contact MSEFC Support</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={openWhatsAppChat}
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <MessageCircle size={20} />
            Chat with MSEFC on WhatsApp
          </Button>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Get instant support for your electricity queries
          </p>
        </CardContent>
      </Card>

      {/* Setup */}
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
            <div className="flex gap-2">
              <Input
                id="whatsapp-number"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+91 9876543210"
                className="flex-1"
              />
              <Button onClick={handleConnect} disabled={isConnected}>
                {isConnected ? 'Connected' : 'Connect'}
              </Button>
            </div>
          </div>

          {isConnected && (
            <Button onClick={sendTestMessage} variant="outline" className="w-full">
              <MessageCircle size={16} className="mr-2" />
              Send Test Message
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Bill Reminders</p>
              <p className="text-sm text-muted-foreground">Get reminded before bill due dates</p>
            </div>
            <Switch
              checked={notifications.billReminders}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, billReminders: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Power Outage Alerts</p>
              <p className="text-sm text-muted-foreground">Notifications about planned outages</p>
            </div>
            <Switch
              checked={notifications.powerOutages}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, powerOutages: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payment Confirmations</p>
              <p className="text-sm text-muted-foreground">Confirm successful payments</p>
            </div>
            <Switch
              checked={notifications.paymentConfirmations}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, paymentConfirmations: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theft Alerts</p>
              <p className="text-sm text-muted-foreground">Critical security notifications</p>
            </div>
            <Switch
              checked={notifications.theftAlerts}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, theftAlerts: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <MessageCircle className="text-green-600" size={20} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              <div>
                <p className="font-medium">Instant Notifications</p>
                <p className="text-sm text-muted-foreground">Get real-time updates on your phone</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              <div>
                <p className="font-medium">Bill Sharing</p>
                <p className="text-sm text-muted-foreground">Share bills and receipts easily</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              <div>
                <p className="font-medium">Quick Support</p>
                <p className="text-sm text-muted-foreground">Get help through WhatsApp chat</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              <div>
                <p className="font-medium">Multilingual Support</p>
                <p className="text-sm text-muted-foreground">Receive messages in your preferred language</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppIntegration;