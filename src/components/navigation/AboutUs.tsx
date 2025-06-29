
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Users, Award, Phone, Mail, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: '2.5M+', label: 'Active Users', color: 'text-blue-600' },
    { icon: Zap, value: '99.8%', label: 'Uptime', color: 'text-green-600' },
    { icon: Award, value: '24/7', label: 'Support', color: 'text-purple-600' },
    { icon: Star, value: '4.8', label: 'Rating', color: 'text-yellow-600' }
  ];

  const features = [
    { title: 'Digital Bill Management', description: 'View, download, and pay bills online with instant confirmation' },
    { title: 'Real-time Updates', description: 'Get instant notifications about outages, maintenance, and bill due dates' },
    { title: 'Smart Analytics', description: 'Track your energy consumption patterns and get personalized saving tips' },
    { title: 'Quick Complaint Resolution', description: 'Report issues and track resolution status in real-time' },
    { title: 'Multiple Payment Options', description: 'Pay through UPI, cards, net banking, or digital wallets' },
    { title: 'Green Initiatives', description: 'Contribute to environmental conservation with paperless billing' }
  ];

  const team = [
    { name: 'Rajesh Kumar', role: 'Chief Technology Officer', experience: '15+ years in utility management' },
    { name: 'Priya Sharma', role: 'Customer Experience Head', experience: '12+ years in customer service' },
    { name: 'Amit Patel', role: 'Operations Manager', experience: '10+ years in power sector' }
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
        <h1 className="text-2xl font-bold">About PowerSync</h1>
      </div>

      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-800 text-white">
        <CardContent className="p-8 text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">PowerSync</h2>
          <p className="text-lg opacity-90 mb-4">Your Complete Utility Management Solution</p>
          <p className="opacity-80">
            Empowering millions of customers with digital-first electricity services across Maharashtra
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <Icon className={`${stat.color} mx-auto mb-2`} size={24} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              To revolutionize the electricity service experience by providing innovative, 
              customer-centric digital solutions that make power management simple, 
              transparent, and efficient for every household and business.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              To become the leading digital utility platform in India, setting new standards 
              for customer service excellence while promoting sustainable energy practices 
              and environmental conservation.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>What We Offer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Founded</p>
              <p className="font-semibold">2020</p>
            </div>
            <div>
              <p className="text-muted-foreground">Headquarters</p>
              <p className="font-semibold">Mumbai, Maharashtra</p>
            </div>
            <div>
              <p className="text-muted-foreground">Service Areas</p>
              <p className="font-semibold">Maharashtra State</p>
            </div>
            <div>
              <p className="text-muted-foreground">License No</p>
              <p className="font-semibold">MERC/2020/PWR/001</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leadership Team */}
      <Card>
        <CardHeader>
          <CardTitle>Leadership Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {team.map((member, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-blue-600">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" size={20} />
            <div>
              <p className="font-semibold">Corporate Office</p>
              <p className="text-sm text-muted-foreground">
                PowerSync Tower, Bandra Kurla Complex,<br />
                Mumbai, Maharashtra - 400051
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-green-600" size={20} />
            <div>
              <p className="font-semibold">Customer Support</p>
              <p className="text-sm text-muted-foreground">
                Emergency: 1912 | Customer Care: 1800-123-456
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-purple-600" size={20} />
            <div>
              <p className="font-semibold">Email Support</p>
              <p className="text-sm text-muted-foreground">
                support@powersync.com | info@powersync.com
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-bold text-lg mb-2">Ready to Experience Better Utility Management?</h3>
          <p className="text-muted-foreground mb-4">
            Join millions of satisfied customers who trust PowerSync for their electricity needs.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/contact-helpline')}>
              Contact Support
            </Button>
            <Button variant="outline" onClick={() => navigate('/feedback')}>
              Share Feedback
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 PowerSync. All rights reserved. | Licensed by MERC | ISO 9001:2015 Certified
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
