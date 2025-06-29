
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NearestOffice = () => {
  const navigate = useNavigate();
  const [selectedOffice, setSelectedOffice] = useState<any>(null);

  const offices = [
    {
      id: 1,
      name: 'Sector 15 Division Office',
      address: 'Plot No. 45, Sector 15, Phase 2, Cityville',
      phone: '+91 22 2845 6789',
      distance: '0.8 km',
      timings: 'Mon-Fri: 9:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM',
      services: ['Bill Payment', 'New Connection', 'Complaints', 'Meter Issues'],
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: 2,
      name: 'Main Collection Center',
      address: '123 MG Road, Central District, Cityville',
      phone: '+91 22 2845 1234',
      distance: '2.1 km',
      timings: 'Mon-Sat: 8:00 AM - 8:00 PM\nSun: 10:00 AM - 4:00 PM',
      services: ['Bill Payment', 'Cash Collection', 'Receipts'],
      coordinates: { lat: 19.0560, lng: 72.8277 }
    },
    {
      id: 3,
      name: 'Customer Service Center',
      address: '789 Station Road, Near Railway Station, Cityville',
      phone: '+91 22 2845 9876',
      distance: '3.5 km',
      timings: 'Mon-Fri: 10:00 AM - 7:00 PM\nSat: 10:00 AM - 5:00 PM',
      services: ['Customer Support', 'Document Verification', 'Grievances'],
      coordinates: { lat: 19.0360, lng: 72.8477 }
    }
  ];

  const handleGetDirections = (office: any) => {
    // In a real app, this would open maps with directions
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${office.coordinates.lat},${office.coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
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
        <h1 className="text-2xl font-bold">Nearest Offices</h1>
      </div>

      {/* Location Info */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" size={24} />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">Your Location</h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">Sector 15, Phase 1, Cityville</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card>
        <CardContent className="p-0">
          <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="text-blue-600 mx-auto mb-2" size={48} />
              <p className="text-muted-foreground">Interactive Map</p>
              <p className="text-sm text-muted-foreground">Showing nearby offices and collection centers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Office List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Nearby Offices & Centers</h2>
        {offices.map((office) => (
          <Card key={office.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{office.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{office.address}</p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Navigation size={14} />
                    <span>{office.distance} away</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Clock size={16} className="text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm font-medium">Opening Hours</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{office.timings}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Services Available</p>
                  <div className="flex flex-wrap gap-1">
                    {office.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCall(office.phone)}
                    className="flex-1"
                  >
                    <Phone size={14} className="mr-2" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleGetDirections(office)}
                    className="flex-1"
                  >
                    <Navigation size={14} className="mr-2" />
                    Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contact */}
      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Emergency Contact</h3>
          <p className="text-sm text-red-600 dark:text-red-300 mb-3">
            For power outages and emergency situations, call our 24/7 helpline
          </p>
          <Button
            onClick={() => handleCall('1912')}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <Phone size={16} className="mr-2" />
            Call 1912 (Emergency)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NearestOffice;
