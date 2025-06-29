
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Camera, Upload, CheckCircle, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeterReading = () => {
  const navigate = useNavigate();
  const [meterReading, setMeterReading] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    if (!meterReading && !selectedImage) {
      alert('Please enter meter reading or upload an image');
      return;
    }

    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-12">
          <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Reading Submitted!</h2>
          <p className="text-muted-foreground mb-4">
            Your meter reading has been successfully recorded.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-left max-w-sm mx-auto">
            <h3 className="font-semibold mb-2">Submission Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Reading:</span>
                <span>{meterReading || 'From Image'}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600">Recorded</span>
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
        <h1 className="text-2xl font-bold">Submit Meter Reading</h1>
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Instructions</h3>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li>• Take a clear photo of your electricity meter</li>
            <li>• Ensure the reading digits are clearly visible</li>
            <li>• You can also manually enter the reading</li>
            <li>• Submit readings before the 5th of each month</li>
          </ul>
        </CardContent>
      </Card>

      {/* Current Meter Info */}
      <Card>
        <CardHeader>
          <CardTitle>Meter Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Meter Number</p>
              <p className="font-semibold">98765432</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Reading</p>
              <p className="font-semibold">2,456 kWh</p>
            </div>
            <div>
              <p className="text-muted-foreground">Reading Date</p>
              <p className="font-semibold">15-May-2024</p>
            </div>
            <div>
              <p className="text-muted-foreground">Next Due</p>
              <p className="font-semibold text-orange-600">05-Jul-2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Meter Photo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={handleCameraCapture}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Camera size={24} />
              <span className="text-sm">Take Photo</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleFileSelect}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Upload size={24} />
              <span className="text-sm">Choose File</span>
            </Button>
          </div>

          {/* Hidden file inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Image size={16} />
                <span className="text-sm font-medium">Uploaded Image</span>
              </div>
              <img 
                src={imagePreview} 
                alt="Meter reading" 
                className="w-full max-w-sm rounded-lg border"
              />
              <p className="text-xs text-muted-foreground mt-2">
                File: {selectedImage?.name}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Or Enter Reading Manually</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="reading">Current Meter Reading (kWh)</Label>
            <Input
              id="reading"
              type="number"
              placeholder="Enter current reading"
              value={meterReading}
              onChange={(e) => setMeterReading(e.target.value)}
              className="text-lg font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Last reading: 2,456 kWh
            </p>
          </div>

          {meterReading && parseInt(meterReading) > 0 && (
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm font-medium">Units Consumed This Month</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.max(0, parseInt(meterReading) - 2456)} kWh
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit}
        disabled={submitting || (!meterReading && !selectedImage)}
        className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
      >
        {submitting ? 'Submitting...' : 'Submit Reading'}
      </Button>
    </div>
  );
};

export default MeterReading;
