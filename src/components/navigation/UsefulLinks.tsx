
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Globe, FileText, Phone, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UsefulLinks = () => {
  const navigate = useNavigate();

  const linkCategories = [
    {
      title: 'Government Portals',
      icon: Building,
      color: 'text-blue-600',
      links: [
        { name: 'Maharashtra Electricity Regulatory Commission', url: 'https://www.merc.gov.in', description: 'Electricity regulations and tariffs' },
        { name: 'Ministry of Power', url: 'https://powermin.gov.in', description: 'Central government power ministry' },
        { name: 'Central Electricity Authority', url: 'https://cea.nic.in', description: 'National electricity authority' },
        { name: 'Maharashtra State Electricity Board', url: 'https://www.mahadiscom.in', description: 'State electricity board' }
      ]
    },
    {
      title: 'Online Services',
      icon: Globe,
      color: 'text-green-600',
      links: [
        { name: 'MSEDCL Online Portal', url: 'https://wss.mahadiscom.in', description: 'Official MSEDCL website' },
        { name: 'Bill Payment Gateway', url: 'https://billpay.mahadiscom.in', description: 'Pay electricity bills online' },
        { name: 'New Connection Portal', url: 'https://newconnection.mahadiscom.in', description: 'Apply for new electricity connection' },
        { name: 'Solar Rooftop Portal', url: 'https://solarrooftop.gov.in', description: 'Solar rooftop application portal' }
      ]
    },
    {
      title: 'Information & Resources',
      icon: FileText,
      color: 'text-purple-600',
      links: [
        { name: 'Tariff Schedule', url: 'https://www.merc.gov.in/tariff', description: 'Current electricity tariff rates' },
        { name: 'Energy Conservation Guide', url: 'https://beeindia.gov.in', description: 'Bureau of Energy Efficiency' },
        { name: 'Consumer Rights', url: 'https://www.consumeraffairs.nic.in', description: 'Know your consumer rights' },
        { name: 'Grievance Portal', url: 'https://grievance.mahadiscom.in', description: 'File grievances online' }
      ]
    },
    {
      title: 'Emergency Contacts',
      icon: Phone,
      color: 'text-red-600',
      links: [
        { name: 'Emergency Helpline', url: 'tel:1912', description: 'Power outage emergency: 1912' },
        { name: 'Customer Care', url: 'tel:18001234567', description: 'General inquiries: 1800-123-4567' },
        { name: 'Complaint Helpline', url: 'tel:18007654321', description: 'Lodge complaints: 1800-765-4321' },
        { name: 'WhatsApp Support', url: 'https://wa.me/919876543210', description: 'Chat support on WhatsApp' }
      ]
    }
  ];

  const handleLinkClick = (url: string) => {
    if (url.startsWith('tel:') || url.startsWith('https://wa.me/')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
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

      <Card className="bg-gradient-to-r from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-800/20 border-indigo-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Globe className="text-indigo-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-200">Quick Access</h2>
              <p className="text-indigo-600 dark:text-indigo-300">Important links and resources for electricity consumers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Link Categories */}
      <div className="space-y-6">
        {linkCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          
          return (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={category.color} size={24} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <Card key={linkIndex} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{link.name}</h3>
                          <p className="text-xs text-muted-foreground">{link.description}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLinkClick(link.url)}
                          className="ml-3"
                        >
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Access Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start h-12"
            onClick={() => handleLinkClick('https://wss.mahadiscom.in')}
          >
            <Globe size={16} className="mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium">Visit MSEDCL Website</p>
              <p className="text-xs text-muted-foreground">Official electricity board portal</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-12"
            onClick={() => handleLinkClick('tel:1912')}
          >
            <Phone size={16} className="mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium">Emergency Helpline</p>
              <p className="text-xs text-muted-foreground">Call 1912 for power outages</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-12"
            onClick={() => handleLinkClick('https://solarrooftop.gov.in')}
          >
            <Building size={16} className="mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium">Solar Rooftop Portal</p>
              <p className="text-xs text-muted-foreground">Apply for solar installation</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Disclaimer</h3>
          <p className="text-sm text-yellow-600 dark:text-yellow-300">
            These links are provided for convenience. PowerSync is not responsible for the content 
            or availability of external websites. Please verify information from official sources.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsefulLinks;
