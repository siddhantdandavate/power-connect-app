
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PayReconnection = () => {
  const navigate = useNavigate();
  const [reconnectionType, setReconnectionType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const reconnectionCharges = {
    'temporary-disconnection': { amount: 500, description: 'Temporary Disconnection Fee' },
    'permanent-disconnection': { amount: 1500, description: 'Permanent Disconnection Charges' },
    'load-enhancement': { amount: 2000, description: 'Load Enhancement Fee' },
    'meter-shifting': { amount: 800, description: 'Meter Shifting Charges' }
  };

  const handlePayment = () => {
    if (!reconnectionType || !paymentMethod) {
      alert('Please select reconnection type and payment method');
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
      setTimeout(() => navigate('/'), 3000);
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-12">
          <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-4">
            Your re-connection charges have been paid successfully.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-left max-w-sm mx-auto">
            <h3 className="font-semibold mb-2">Payment Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono">RC{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>₹{reconnectionCharges[reconnectionType as keyof typeof reconnectionCharges]?.amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600">Completed</span>
              </div>
              <div className="flex justify-between">
                <span>Service:</span>
                <span>Within 24-48 hours</span>
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
        <h1 className="text-2xl font-bold">Pay Re-connection Charges</h1>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <CreditCard className="text-purple-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-purple-800 dark:text-purple-200">Re-connection Services</h2>
              <p className="text-purple-600 dark:text-purple-300">Pay charges for connection services</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Service Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="reconnection-type">Re-connection Service</Label>
            <Select value={reconnectionType} onValueChange={setReconnectionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temporary-disconnection">Temporary Disconnection</SelectItem>
                <SelectItem value="permanent-disconnection">Permanent Disconnection</SelectItem>
                <SelectItem value="load-enhancement">Load Enhancement</SelectItem>
                <SelectItem value="meter-shifting">Meter Shifting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {reconnectionType && (
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                      {reconnectionCharges[reconnectionType as keyof typeof reconnectionCharges]?.description}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Service will be completed within 24-48 hours
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{reconnectionCharges[reconnectionType as keyof typeof reconnectionCharges]?.amount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Payment Method */}
      {reconnectionType && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['upi', 'card', 'netbanking'].map((method) => (
              <Card 
                key={method}
                className={`cursor-pointer transition-all ${
                  paymentMethod === method 
                    ? 'ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setPaymentMethod(method)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <CreditCard className="text-blue-600" size={24} />
                  <div>
                    <h3 className="font-semibold capitalize">{method === 'upi' ? 'UPI Payment' : method === 'card' ? 'Credit/Debit Card' : 'Net Banking'}</h3>
                    <p className="text-sm text-muted-foreground">
                      {method === 'upi' && 'Pay using UPI apps'}
                      {method === 'card' && 'Visa, MasterCard, RuPay supported'}
                      {method === 'netbanking' && 'Pay directly from bank account'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Payment Form */}
      {paymentMethod && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethod === 'upi' && (
              <div>
                <Label htmlFor="upi">UPI ID</Label>
                <Input id="upi" placeholder="yourname@paytm" />
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div>
                <Label htmlFor="bank">Select Bank</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sbi">State Bank of India</SelectItem>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
            >
              {processing ? 'Processing Payment...' : `Pay ₹${reconnectionCharges[reconnectionType as keyof typeof reconnectionCharges]?.amount}`}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Important Notice */}
      <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-orange-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Important Information</h3>
              <ul className="text-sm text-orange-600 dark:text-orange-300 space-y-1">
                <li>• Service will be completed within 24-48 hours of payment</li>
                <li>• Keep your payment receipt for future reference</li>
                <li>• Contact customer care if service is not completed on time</li>
                <li>• Additional charges may apply for complex installations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayReconnection;
