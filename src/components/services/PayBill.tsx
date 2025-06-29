
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CreditCard, Smartphone, Building, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PayBill = () => {
  const navigate = useNavigate();
  const [selectedBill, setSelectedBill] = useState('current');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const bills = {
    current: { period: 'June 2024', amount: 1245, dueDate: '2024-07-15' },
    previous: { period: 'May 2024', amount: 1150, dueDate: '2024-06-15' }
  };

  const handlePayment = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
      
      // Auto redirect after success
      setTimeout(() => {
        navigate('/');
      }, 3000);
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
            Your payment of ₹{bills[selectedBill].amount} has been processed successfully.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-left max-w-sm mx-auto">
            <h3 className="font-semibold mb-2">Transaction Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono">TXN{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span>Bill Period:</span>
                <span>{bills[selectedBill].period}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>₹{bills[selectedBill].amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
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
        <h1 className="text-2xl font-bold">Pay Bill</h1>
      </div>

      {/* Bill Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Bill to Pay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {Object.entries(bills).map(([key, bill]) => (
              <Card 
                key={key}
                className={`cursor-pointer transition-all ${
                  selectedBill === key 
                    ? 'ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedBill(key)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{bill.period}</h3>
                      <p className="text-sm text-muted-foreground">Due: {bill.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">₹{bill.amount}</p>
                      <p className="text-sm text-muted-foreground">Amount Due</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Card 
              className={`cursor-pointer transition-all ${
                paymentMethod === 'upi' 
                  ? 'ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setPaymentMethod('upi')}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Smartphone className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold">UPI Payment</h3>
                  <p className="text-sm text-muted-foreground">Pay using UPI apps like GPay, PhonePe, Paytm</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${
                paymentMethod === 'card' 
                  ? 'ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setPaymentMethod('card')}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <CreditCard className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold">Credit/Debit Card</h3>
                  <p className="text-sm text-muted-foreground">Visa, MasterCard, RuPay supported</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${
                paymentMethod === 'netbanking' 
                  ? 'ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setPaymentMethod('netbanking')}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Building className="text-purple-600" size={24} />
                <div>
                  <h3 className="font-semibold">Net Banking</h3>
                  <p className="text-sm text-muted-foreground">Pay directly from your bank account</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details Form */}
      {paymentMethod && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upi">UPI ID</Label>
                  <Input id="upi" placeholder="yourname@paytm" />
                </div>
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
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-4">
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
                      <SelectItem value="axis">Axis Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Payment Summary */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Payment Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Bill Amount:</span>
                  <span>₹{bills[selectedBill].amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Convenience Fee:</span>
                  <span>₹0</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{bills[selectedBill].amount}</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
            >
              {processing ? 'Processing Payment...' : `Pay ₹${bills[selectedBill].amount}`}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PayBill;
