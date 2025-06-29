
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PowerTheft = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!location || !description) {
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
            Your anonymous report has been filed. Our investigation team will look into this matter.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-left max-w-sm mx-auto">
            <h3 className="font-semibold mb-2">Report Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Report ID:</span>
                <span className="font-mono">PT{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-orange-600">Under Investigation</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span>Anonymous</span>
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
        <h1 className="text-2xl font-bold">Report Power Theft</h1>
      </div>

      <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="text-orange-600" size={24} />
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-200">Anonymous Reporting</h3>
              <p className="text-sm text-orange-600 dark:text-orange-300">Help us combat electricity theft in your area</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Important Notice</h3>
              <ul className="text-sm text-red-600 dark:text-red-300 space-y-1">
                <li>• Your identity will remain completely confidential</li>
                <li>• False reports may lead to legal consequences</li>
                <li>• Only report genuine cases of electricity theft</li>
                <li>• Provide accurate information for investigation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="location">Location of Suspected Theft *</Label>
            <Input
              id="location"
              placeholder="Enter exact address or nearby landmark"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what you observed (e.g., illegal connections, bypassed meters, etc.)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="additional">Additional Information (Optional)</Label>
            <Textarea
              id="additional"
              placeholder="Any other details that might help in investigation"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li>• Your report will be logged anonymously</li>
            <li>• Investigation team will verify the complaint</li>
            <li>• Appropriate action will be taken if theft is confirmed</li>
            <li>• No follow-up contact will be made to maintain anonymity</li>
          </ul>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900"
      >
        {submitting ? 'Submitting Report...' : 'Submit Anonymous Report'}
      </Button>

      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Need to speak to someone directly?</p>
          <Button
            variant="outline"
            onClick={() => window.location.href = 'tel:1800123456'}
          >
            Call Anti-Theft Helpline: 1800-123-456
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerTheft;
