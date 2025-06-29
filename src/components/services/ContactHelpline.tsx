
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, MessageCircle, Mail, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactHelpline = () => {
  const navigate = useNavigate();

  const helplineNumbers = [
    {
      title: 'Emergency Helpline',
      number: '1912',
      description: 'Power outages, emergencies',
      available: '24/7',
      type: 'emergency'
    },
    {
      title: 'Customer Care',
      number: '1800-123-456',
      description: 'General queries, complaints',
      available: '9 AM - 6 PM',
      type: 'support'
    },
    {
      title: 'Bill Payment Support',
      number: '+91 22 2845-1234',
      description: 'Payment issues, billing queries',
      available: '9 AM - 8 PM',
      type: 'billing'
    },
    {
      title: 'New Connection',
      number: '+91 22 2845-5678',
      description: 'New connection applications',
      available: '10 AM - 5 PM',
      type: 'connection'
    }
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello, I need help with my electricity connection.', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:support@powersync.com?subject=Customer Support Request';
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Contact Helpline</h1>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-800/20 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Phone className="text-blue-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200">Get Instant Help</h2>
              <p className="text-blue-600 dark:text-blue-300">Our support team is here to assist you</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Helpline Numbers */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Helpline Numbers</h2>
        {helplineNumbers.map((helpline, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{helpline.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{helpline.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Phone size={14} className="text-blue-600" />
                      <span className="font-mono font-medium">{helpline.number}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-green-600" />
                      <span className="text-green-600">{helpline.available}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => handleCall(helpline.number)}
                  className={`ml-4 ${
                    helpline.type === 'emergency' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Phone size={16} className="mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alternative Contact Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Other Ways to Reach Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            onClick={handleWhatsApp}
            className="w-full h-16 flex items-center gap-3 justify-start"
          >
            <MessageCircle className="text-green-600" size={24} />
            <div className="text-left">
              <p className="font-medium">WhatsApp Support</p>
              <p className="text-sm text-muted-foreground">Chat with us on WhatsApp</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            onClick={handleEmail}
            className="w-full h-16 flex items-center gap-3 justify-start"
          >
            <Mail className="text-blue-600" size={24} />
            <div className="text-left">
              <p className="font-medium">Email Support</p>
              <p className="text-sm text-muted-foreground">support@powersync.com</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => navigate('/nearest-office')}
            className="w-full h-16 flex items-center gap-3 justify-start"
          >
            <MapPin className="text-purple-600" size={24} />
            <div className="text-left">
              <p className="font-medium">Visit Office</p>
              <p className="text-sm text-muted-foreground">Find nearest office location</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Help</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-medium text-sm">How to pay my bill online?</p>
              <p className="text-xs text-muted-foreground mt-1">Go to Pay Bill section and choose your preferred payment method.</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-medium text-sm">How to report power outage?</p>
              <p className="text-xs text-muted-foreground mt-1">Call emergency helpline 1912 or use the Report Transformer Fault feature.</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-medium text-sm">How to submit meter reading?</p>
              <p className="text-xs text-muted-foreground mt-1">Use the Submit Meter Reading feature to upload photo or enter manually.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactHelpline;
