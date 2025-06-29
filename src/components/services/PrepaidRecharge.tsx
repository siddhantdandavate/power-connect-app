
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrepaidRecharge = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleRecharge = () => {
    if (!amount || parseInt(amount) < 50) {
      alert('Please enter a valid amount (minimum ₹50)');
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-12">
          <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Recharge Successful!</h2>
          <p className="text-muted-foreground mb-4">
            Your prepaid meter has been recharged with ₹{amount}
          </p>
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
        <h1 className="text-2xl font-bold">Prepaid Recharge</h1>
      </div>

      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Zap className="text-orange-600" size={24} />
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-200">Prepaid Meter</h3>
              <p className="text-sm text-orange-600 dark:text-orange-300">Current Balance: ₹245.50</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Recharge Amount</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant={amount === quickAmount.toString() ? "default" : "outline"}
                onClick={() => setAmount(quickAmount.toString())}
                className="h-12"
              >
                ₹{quickAmount}
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="custom-amount">Or enter custom amount</Label>
            <Input
              id="custom-amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="50"
              max="10000"
            />
            <p className="text-xs text-muted-foreground">Minimum: ₹50 | Maximum: ₹10,000</p>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleRecharge}
        disabled={processing || !amount}
        className="w-full bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900"
      >
        {processing ? 'Processing...' : `Recharge ₹${amount || '0'}`}
      </Button>
    </div>
  );
};

export default PrepaidRecharge;
