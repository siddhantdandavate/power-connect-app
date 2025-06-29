
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransformerFault = () => {
  const navigate = useNavigate();
  const [faultType, setFaultType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!faultType || !description || !location) {
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
          <h2 className="text-2xl font-bold text-green-600 mb-2">Report Submitted!</h2>
          <p className="text-muted-foreground mb-4">
            Your transformer fault report has been logged. Our team will investigate shortly.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-left max-w-sm mx-auto">
            <h3 className="font-semibold mb-2">Complaint Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Complaint ID:</span>
                <span className="font-mono">TF{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-orange-600">Under Investigation</span>
              </div>
              <div className="flex justify-between">
                <span>ETA:</span>
                <span>2-4 hours</span>
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
        <h1 className="text-2xl font-bold">Report Transformer Fault</h1>
      </div>

      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={24} />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">Emergency Reporting</h3>
              <p className="text-sm text-red-600 dark:text-red-300">Report power outages and transformer issues</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fault Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fault-type">Type of Fault *</Label>
            <Select value={faultType} onValueChange={setFaultType}>
              <SelectTrigger>
                <SelectValue placeholder="Select fault type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="power-outage">Complete Power Outage</SelectItem>
                <SelectItem value="voltage-fluctuation">Voltage Fluctuation</SelectItem>
                <SelectItem value="transformer-noise">Transformer Making Noise</SelectItem>
                <SelectItem value="sparking">Sparking from Transformer</SelectItem>
                <SelectItem value="partial-outage">Partial Power Outage</SelectItem>
                <SelectItem value="other">Other Issue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Enter exact location (e.g., Near XYZ Building, Sector 15)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setLocation('Current Location: Sector 15, Phase 1, Cityville')}
            >
              <MapPin size={14} className="mr-2" />
              Use Current Location
            </Button>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              placeholder="Your mobile number for updates"
              defaultValue="+91 9876543210"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li>• Your complaint will be logged immediately</li>
            <li>• Technical team will be notified</li>
            <li>• You'll receive SMS updates on progress</li>
            <li>• Expected resolution time: 2-4 hours</li>
          </ul>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
      >
        {submitting ? 'Submitting Report...' : 'Submit Fault Report'}
      </Button>

      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">For immediate emergency assistance</p>
          <Button
            variant="outline"
            onClick={() => window.location.href = 'tel:1912'}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Call Emergency Helpline: 1912
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransformerFault;
