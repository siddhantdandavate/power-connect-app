
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Globe, FileText, CreditCard, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UsefulLinks = () => {
  const navigate = useNavigate();

  const linkCategories = [
    {
      title: 'MSEDCL Official',
      icon: Zap,
      links: [
        { name: 'MSEDCL Main Website', url: 'https://www.mahadiscom.in', description: 'Official MSEDCL portal' },
        { name: 'Online Bill Payment', url: 'https://wss.mahadiscom.in/wss/wss', description: 'Pay your electricity bills online' },
        { name: 'New Connection Portal', url: 'https://www.mahadiscom.in/solar/', description: 'Apply for new electricity connections' },
        { name: 'Consumer Grievances', url: 'https://www.mahadiscom.in/consumer/', description: 'Register complaints and grievances' }
      ]
    },
    {
      title: 'Government Services',
      icon: Globe,
      links: [
        { name: 'Maharashtra Government', url: 'https://www.maharashtra.gov.in', description: 'Official state government portal' },
        { name: 'Digital India', url: 'https://digitalindia.gov.in', description: 'Digital governance initiatives' },
        { name: 'PM Solar Yojana', url: 'https://solarrooftop.gov.in', description: 'Solar rooftop subsidy scheme' },
        { name: 'Aadhaar Services', url: 'https://uidai.gov.in', description: 'Aadhaar related services' }
      ]
    },
    {
      title: 'Payment Gateways',
      icon: CreditCard,
      links: [
        { name: 'BHIM UPI', url: 'https://www.bhimupi.org.in', description: 'Digital payment platform' },
        { name: 'Paytm', url: 'https://paytm.com', description: 'Online wallet and payments' },
        { name: 'PhonePe', url: 'https://www.phonepe.com', description: 'Digital payment app' },
        { name: 'Google Pay', url: 'https://pay.google.com', description: 'Google payment service' }
      ]
    },
    {
      title: 'Resources & Forms',
      icon: FileText,
      links: [
        { name: 'Tariff Schedule', url: '#', description: 'Current electricity tariff rates' },
        { name: 'Application Forms', url: '#', description: 'Download various application forms' },
        { name: 'Connection Guidelines', url: '#', description: 'New connection process guidelines' },
        { name: 'Safety Guidelines', url: '#', description: 'Electrical safety information' }
      ]
    }
  ];

  const handleLinkClick = (url: string) => {
    if (url === '#') {
      alert('This is a demo link. In a real app, this would open the actual resource.');
    } else {
      window.open(url, '_blank');
    }
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
        <h1 className="text-2xl font-bold">Useful Links</h1>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-100 dark:from-green-900/20 dark:to-blue-800/20 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Globe className="text-green-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-green-800 dark:text-green-200">Quick Access Links</h2>
              <p className="text-green-600 dark:text-green-300">Important links for electricity services and government portals</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {linkCategories.map((category, index) => {
        const IconComponent = category.icon;
        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconComponent className="text-blue-600" size={24} />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.links.map((link, linkIndex) => (
                <Card key={linkIndex} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleLinkClick(link.url)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200">{link.name}</h3>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                      <ExternalLink className="text-muted-foreground" size={16} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        );
      })}

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Disclaimer</h3>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            External links will redirect you to third-party websites. PowerSync is not responsible for the content or availability of external sites.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsefulLinks;
