
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpdateContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john.doe@email.com',
    address: '123 Main Street, Sector 15, Cityville - 400001',
    alternatePhone: '+91 9876543211',
    emergencyContact: 'Jane Doe - +91 9876543212'
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsUpdated(true);
      setTimeout(() => {
        setIsUpdated(false);
        navigate('/profile');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Update Contact Details</h1>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <User className="text-green-600" size={24} />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">Keep Your Details Updated</h3>
              <p className="text-sm text-green-600 dark:text-green-300">Ensure we can reach you for important updates</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="phone">Primary Mobile Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your mobile number"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Bills and notifications will be sent to this email
            </p>
          </div>

          <div>
            <Label htmlFor="alternatePhone">Alternate Mobile Number</Label>
            <Input
              id="alternatePhone"
              type="tel"
              value={formData.alternatePhone}
              onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
              placeholder="Enter alternate mobile number"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Service Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your complete address"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This should match your electricity connection address
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="emergency">Emergency Contact Person & Number</Label>
            <Input
              id="emergency"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              placeholder="Name - Mobile Number"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This person will be contacted in case of emergencies
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Important Notes</h3>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li>• Changes to contact details may take 24-48 hours to reflect</li>
            <li>• Mobile number verification may be required for security</li>
            <li>• Email verification link will be sent to new email address</li>
            <li>• Keep your contact details updated for timely notifications</li>
          </ul>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
      >
        {isSubmitting ? 'Updating Details...' : 'Update Contact Details'}
      </Button>

      {/* Success Message */}
      {isUpdated && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
            <p className="font-semibold text-green-800 dark:text-green-200">Details Updated Successfully!</p>
            <p className="text-sm text-green-600 dark:text-green-300">Your contact information has been updated.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpdateContact;
