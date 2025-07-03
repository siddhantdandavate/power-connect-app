import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Users, Shield, Award, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const AboutUs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      icon: Zap,
      title: 'Reliable Service',
      description: 'Providing uninterrupted power supply to millions of customers across Karnataka'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Dedicated customer service with 24/7 support for all your electricity needs'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Advanced security measures to protect your data and ensure safe transactions'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Award-winning utility services with commitment to quality and innovation'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Managing Director',
      department: 'MSEFC'
    },
    {
      name: 'Priya Sharma',
      position: 'Chief Technology Officer',
      department: 'Digital Services'
    },
    {
      name: 'Amit Patil',
      position: 'Customer Relations Head',
      department: 'Consumer Affairs'
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
        <h1 className="text-2xl font-bold">{t('aboutUs')}</h1>
      </div>

      <Card className="bg-gradient-to-r from-orange-600 to-red-700 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <Zap className="mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">MSEFC</h2>
            <p className="text-lg opacity-90">
              Mysuru State Electricity & Feedback Corporation - Powering Karnataka's Future
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            To provide reliable, efficient, and sustainable electricity distribution services to the people of Karnataka 
            while embracing digital transformation to enhance customer experience and operational excellence.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            To be the leading electricity distribution company in India, known for innovation, customer satisfaction, 
            and sustainable energy solutions that power the growth of Karnataka.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <IconComponent className="text-orange-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leadership Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                  <Users className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.position}</p>
                  <p className="text-xs text-muted-foreground">{member.department}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Head Office</p>
              <p className="text-sm text-muted-foreground">
                MSEFC Bhavan, Jyoti Nagar, Mysuru - 570009, Karnataka
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Customer Care</p>
              <p className="text-sm text-muted-foreground">1912 (24/7 Helpline)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Email Support</p>
              <p className="text-sm text-muted-foreground">support@msefc.karnataka.gov.in</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>App Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-orange-600">2.5M+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">98.5%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">50M+</p>
              <p className="text-sm text-muted-foreground">Bills Processed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">4.8★</p>
              <p className="text-sm text-muted-foreground">App Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            MSEFC v1.0.0 | © 2024 MSEFC | Made with ❤️ for Karnataka
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">Privacy Policy</Button>
            <Button variant="outline" size="sm">Terms of Service</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/contact-helpline')}>Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;