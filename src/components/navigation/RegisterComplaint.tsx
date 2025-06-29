
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, AlertTriangle, CheckCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const [complaintType, setComplaintType] = useState('');
  const [priority, setPriority] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('+91 9876543210');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!complaintType || !priority || !subject || !description) {
      alert('Please fill all required fields');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => navigate('/'), 3000);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-12">
          <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Complaint Registered!</h2>
          <p className="text-muted-foreground mb-4">
            Your complaint has been successfully registered and will be addressed soon.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-left max-w-sm mx-auto">
            <h3 className="font-semibold mb-2">Complaint Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Complaint ID:</span>
                <span className="font-mono">CMP{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span>Priority:</span>
                <span className="capitalize">{priority}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-orange-600">Under Review</span>
              </div>
              <div className="flex justify-between">
                <span>ETA:</span>
                <span>{priority === 'high' ? '24 hours' : priority === 'medium' ? '48 hours' : '3-5 days'}</span>
              </div>
            </div>
          </div>
          <Button onClick={() => navigate('/')} className="mt-6">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Register Complaint</h1>
      </div>

      <Card className="bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <AlertTriangle className="text-orange-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-orange-800 dark:text-orange-200">File Your Complaint</h2>
              <p className="text-orange-600 dark:text-orange-300">We're here to resolve your issues quickly</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="complaint-type">Complaint Type *</Label>
            <Select value={complaintType} onValueChange={setComplaintType}>
              <SelectTrigger>
                <SelectValue placeholder="Select complaint type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="power-outage">Power Outage</SelectItem>
                <SelectItem value="voltage-fluctuation">Voltage Fluctuation</SelectItem>
                <SelectItem value="billing-issue">Billing Issue</SelectItem>
                <SelectItem value="meter-problem">Meter Problem</SelectItem>
                <SelectItem value="connection-issue">Connection Issue</SelectItem>
                <SelectItem value="staff-behavior">Staff Behavior</SelectItem>
                <SelectItem value="service-quality">Service Quality</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priority">Priority Level *</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High - Urgent (24 hours)</SelectItem>
                <SelectItem value="medium">Medium - Normal (48 hours)</SelectItem>
                <SelectItem value="low">Low - General (3-5 days)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="Brief subject of your complaint"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your complaint..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact Number *</Label>
            <Input
              id="contact"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Your mobile number for updates"
            />
          </div>

          <div>
            <Label htmlFor="location">Location/Address (Optional)</Label>
            <Input
              id="location"
              placeholder="Specific location related to the complaint"
              defaultValue="123 Main Street, Sector 15, Cityville"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li>• Your complaint will be assigned a unique ID</li>
            <li>• You'll receive SMS confirmation with complaint details</li>
            <li>• Our team will contact you within the specified timeframe</li>
            <li>• You can track the status using your complaint ID</li>
            <li>• Resolution updates will be sent via SMS/call</li>
          </ul>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800"
      >
        {submitting ? 'Registering Complaint...' : 'Register Complaint'}
      </Button>

      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">For urgent complaints, call directly</p>
          <Button
            variant="outline"
            onClick={() => window.location.href = 'tel:1912'}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <Phone size={16} className="mr-2" />
            Emergency Helpline: 1912
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterComplaint;
