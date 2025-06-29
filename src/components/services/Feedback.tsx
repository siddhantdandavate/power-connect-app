
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, MessageSquare, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = () => {
    if (!rating || !category || !subject || !message) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => navigate('/'), 3000);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-12">
          <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-4">
            Your feedback has been submitted successfully. We appreciate your input!
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-left max-w-sm mx-auto">
            <h3 className="font-semibold mb-2">Feedback Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Rating:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span>{category}</span>
              </div>
              <div className="flex justify-between">
                <span>Reference:</span>
                <span className="font-mono">FB{Date.now().toString().slice(-6)}</span>
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
        <h1 className="text-2xl font-bold">Provide Feedback</h1>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <MessageSquare className="text-purple-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-purple-800 dark:text-purple-200">We Value Your Opinion</h2>
              <p className="text-purple-600 dark:text-purple-300">Help us improve our services with your feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Section */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Rating *</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className="transition-colors"
              >
                <Star
                  size={32}
                  className={
                    star <= rating
                      ? 'text-yellow-500 fill-current hover:text-yellow-600'
                      : 'text-gray-300 hover:text-yellow-400'
                  }
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {rating === 0 && 'Please rate your overall experience'}
            {rating === 1 && 'Very Poor - We apologize for the poor experience'}
            {rating === 2 && 'Poor - We need to improve'}
            {rating === 3 && 'Average - It was okay'}
            {rating === 4 && 'Good - We\'re glad you had a good experience'}
            {rating === 5 && 'Excellent - Thank you for the great rating!'}
          </p>
        </CardContent>
      </Card>

      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="category">Feedback Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app-experience">App Experience</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="bill-payment">Bill Payment</SelectItem>
                <SelectItem value="power-quality">Power Quality</SelectItem>
                <SelectItem value="complaint-resolution">Complaint Resolution</SelectItem>
                <SelectItem value="new-connection">New Connection</SelectItem>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="suggestion">Suggestion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="Brief subject of your feedback"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="message">Your Feedback *</Label>
            <Textarea
              id="message"
              placeholder="Please share your detailed feedback, suggestions, or concerns..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact for Follow-up (Optional)</Label>
            <Input
              id="contact"
              placeholder="Email or phone number if you want us to follow up"
              defaultValue="john.doe@email.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Your Privacy</h3>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li>• Your feedback is confidential and secure</li>
            <li>• We use feedback to improve our services</li>
            <li>• Response time for follow-ups: 2-3 business days</li>
            <li>• You can provide anonymous feedback if preferred</li>
          </ul>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
      >
        {isSubmitting ? 'Submitting Feedback...' : 'Submit Feedback'}
      </Button>
    </div>
  );
};

export default Feedback;
