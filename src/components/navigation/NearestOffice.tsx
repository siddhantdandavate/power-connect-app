
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NearestOffice = () => {
  const navigate = useNavigate();

  const offices = [
    {
      id: 1,
      name: 'MSEDCL Division Office - Pune',
      address: '123 Main Street, Pune - 411001',
      phone: '+91 020 2567 8900',
      distance: '2.3 km',
      hours: '9:00 AM - 5:00 PM',
      services: ['Bill Payment', 'New Connections', 'Complaints']
    },
    {
      id: 2,
      name: 'MSEDCL Sub-Division Office - Kothrud',
      address: '456 FC Road, Kothrud, Pune - 411029',
      phone: '+91 020 2567 8901',
      distance: '3.8 km',
      hours: '9:00 AM - 5:00 PM',
      services: ['Meter Reading', 'Load Changes', 'Technical Issues']
    },
    {
      id: 3,
      name: 'Collection Center - Baner',
      address: '789 Baner Road, Baner, Pune - 411045',
      phone: '+91 020 2567 8902',
      distance: '5.2 km',
      hours: '10:00 AM - 4:00 PM',
      services: ['Bill Payment', 'Receipt Collection']
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
        <h1 className="text-2xl font-bold">Nearest Office</h1>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-green-100 dark:from-blue-900/20 dark:to-green-800/20 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <MapPin className="text-blue-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200">Find Nearby Offices</h2>
              <p className="text-blue-600 dark:text-blue-300">Locate the nearest MSEDCL office or collection center</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {offices.map((office) => (
          <Card key={office.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MapPin className="text-green-600 mt-1" size={20} />
                  <div>
                    <CardTitle className="text-lg">{office.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{office.address}</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                  {office.distance}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="text-muted-foreground" size={16} />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground" size={16} />
                  <span>{office.hours}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Services Available</h3>
                <div className="flex flex-wrap gap-2">
                  {office.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 px-2 py-1 rounded-full text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Navigation size={16} className="mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => window.location.href = `tel:${office.phone}`}>
                  <Phone size={16} className="mr-2" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Emergency Contact</h3>
          <p className="text-sm text-orange-600 dark:text-orange-300 mb-3">
            For power outages or urgent issues, call the 24/7 helpline
          </p>
          <Button size="sm" onClick={() => window.location.href = 'tel:1912'}>
            <Phone size={16} className="mr-2" />
            Call 1912
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NearestOffice;
