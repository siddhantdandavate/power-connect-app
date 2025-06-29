
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Eye, Calendar, Zap, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ViewBill = () => {
  const navigate = useNavigate();
  const [selectedBill, setSelectedBill] = useState<any>(null);

  const dummyBills = [
    {
      id: 1,
      period: 'June 2024',
      dueDate: '2024-07-15',
      amount: 1245,
      units: 324,
      status: 'Pending',
      billDate: '2024-06-30'
    },
    {
      id: 2,
      period: 'May 2024',
      dueDate: '2024-06-15',
      amount: 1150,
      units: 298,
      status: 'Paid',
      billDate: '2024-05-31'
    },
    {
      id: 3,
      period: 'April 2024',
      dueDate: '2024-05-15',
      amount: 1320,
      units: 356,
      status: 'Paid',
      billDate: '2024-04-30'
    }
  ];

  const downloadBill = (bill: any) => {
    const billContent = `
ELECTRICITY BILL
═══════════════════════════════════════

PowerSync Utility Company
Consumer Name: John Doe
Consumer No: MSE12345678
Meter No: 98765432
Address: 123 Main Street, Sector 15, City

Billing Period: ${bill.period}
Bill Date: ${bill.billDate}
Due Date: ${bill.dueDate}

Previous Reading: ${Math.max(0, bill.units - 50)}
Current Reading: ${bill.units}
Units Consumed: ${bill.units} kWh

Rate per Unit: ₹3.84
Energy Charges: ₹${(bill.units * 3.84).toFixed(2)}
Fixed Charges: ₹50.00
Tax & Other Charges: ₹${(bill.amount - (bill.units * 3.84) - 50).toFixed(2)}

Total Amount: ₹${bill.amount}
Status: ${bill.status}

Pay online at: www.powersync.com
Helpline: 1912

Thank you for using PowerSync!
═══════════════════════════════════════
    `;
    
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `electricity-bill-${bill.period.replace(' ', '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const viewBillDetails = (bill: any) => {
    setSelectedBill(bill);
  };

  if (selectedBill) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => setSelectedBill(null)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Bill Details</h1>
        </div>

        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardTitle className="flex items-center gap-2">
              <Zap size={20} />
              Electricity Bill - {selectedBill.period}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Consumer Name</p>
                <p className="font-semibold">John Doe</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Consumer No</p>
                <p className="font-semibold">MSE12345678</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Meter No</p>
                <p className="font-semibold">98765432</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bill Date</p>
                <p className="font-semibold">{selectedBill.billDate}</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">Consumption Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Previous Reading</span>
                  <span>{Math.max(0, selectedBill.units - 50)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Reading</span>
                  <span>{selectedBill.units} kWh</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Units Consumed</span>
                  <span>{selectedBill.units} kWh</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">Charges Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Energy Charges ({selectedBill.units} × ₹3.84)</span>
                  <span>₹{(selectedBill.units * 3.84).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fixed Charges</span>
                  <span>₹50.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax & Other Charges</span>
                  <span>₹{(selectedBill.amount - (selectedBill.units * 3.84) - 50).toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold text-green-600">
                  <span>Total Amount</span>
                  <span>₹{selectedBill.amount}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => downloadBill(selectedBill)} className="flex-1">
                <Download className="mr-2" size={16} />
                Download Bill
              </Button>
              {selectedBill.status === 'Pending' && (
                <Button onClick={() => navigate('/pay-bill')} variant="outline" className="flex-1">
                  <IndianRupee className="mr-2" size={16} />
                  Pay Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
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
        <h1 className="text-2xl font-bold">View Bills</h1>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-full">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">Consumer Details</h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">MSE12345678 • Meter: 98765432</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Bills</h2>
        {dummyBills.map((bill) => (
          <Card key={bill.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <h3 className="font-semibold">{bill.period}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bill.status === 'Paid' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
                    }`}>
                      {bill.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-semibold">₹{bill.amount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Units</p>
                      <p className="font-semibold">{bill.units} kWh</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Due Date</p>
                      <p className="font-semibold">{bill.dueDate}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => viewBillDetails(bill)}>
                    <Eye size={14} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => downloadBill(bill)}>
                    <Download size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewBill;
