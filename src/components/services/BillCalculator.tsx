
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calculator, Zap, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BillCalculator = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState('');
  const [connectionType, setConnectionType] = useState('domestic');
  const [calculatedBill, setCalculatedBill] = useState<any>(null);

  const tariffRates = {
    domestic: {
      slabs: [
        { min: 0, max: 100, rate: 2.50 },
        { min: 101, max: 300, rate: 3.50 },
        { min: 301, max: 500, rate: 4.50 },
        { min: 501, max: Infinity, rate: 6.00 }
      ],
      fixedCharge: 50
    },
    commercial: {
      slabs: [
        { min: 0, max: 50, rate: 4.00 },
        { min: 51, max: 200, rate: 5.50 },
        { min: 201, max: Infinity, rate: 7.00 }
      ],
      fixedCharge: 100
    },
    industrial: {
      slabs: [
        { min: 0, max: Infinity, rate: 6.50 }
      ],
      fixedCharge: 200
    }
  };

  const calculateBill = () => {
    if (!units || parseInt(units) <= 0) {
      alert('Please enter valid units consumed');
      return;
    }

    const unitsConsumed = parseInt(units);
    const tariff = tariffRates[connectionType as keyof typeof tariffRates];
    let energyCharges = 0;
    let remainingUnits = unitsConsumed;

    // Calculate energy charges based on slabs
    for (const slab of tariff.slabs) {
      if (remainingUnits <= 0) break;
      
      const slabUnits = Math.min(remainingUnits, slab.max - slab.min + 1);
      energyCharges += slabUnits * slab.rate;
      remainingUnits -= slabUnits;
    }

    const fixedCharges = tariff.fixedCharge;
    const subtotal = energyCharges + fixedCharges;
    const tax = subtotal * 0.05; // 5% tax
    const fuelAdjustment = unitsConsumed * 0.20; // Fuel adjustment
    const totalAmount = subtotal + tax + fuelAdjustment;

    setCalculatedBill({
      units: unitsConsumed,
      connectionType,
      energyCharges: energyCharges.toFixed(2),
      fixedCharges: fixedCharges.toFixed(2),
      fuelAdjustment: fuelAdjustment.toFixed(2),
      tax: tax.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    });
  };

  const resetCalculator = () => {
    setUnits('');
    setConnectionType('domestic');
    setCalculatedBill(null);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Bill Calculator</h1>
      </div>

      <Card className="bg-gradient-to-r from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Calculator className="text-amber-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200">Estimate Your Bill</h2>
              <p className="text-amber-600 dark:text-amber-300">Calculate your electricity bill based on usage</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle>Bill Calculation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="connection-type">Connection Type</Label>
            <Select value={connectionType} onValueChange={setConnectionType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domestic">Domestic</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="units">Units Consumed (kWh)</Label>
            <Input
              id="units"
              type="number"
              placeholder="Enter units consumed"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              min="1"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={calculateBill} className="flex-1">
              <Calculator className="mr-2" size={16} />
              Calculate Bill
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calculation Result */}
      {calculatedBill && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="text-green-600" size={20} />
              Bill Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Connection Type</p>
                <p className="font-semibold capitalize">{calculatedBill.connectionType}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Units Consumed</p>
                <p className="font-semibold">{calculatedBill.units} kWh</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-white dark:bg-muted/50">
              <h3 className="font-semibold mb-3">Charges Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Energy Charges</span>
                  <span>₹{calculatedBill.energyCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fixed Charges</span>
                  <span>₹{calculatedBill.fixedCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuel Adjustment</span>
                  <span>₹{calculatedBill.fuelAdjustment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{calculatedBill.tax}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold text-green-600">
                  <span>Total Amount</span>
                  <span>₹{calculatedBill.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                This is an estimated calculation. Actual bill may vary based on current tariffs and additional charges.
              </p>
              <Button onClick={() => navigate('/pay-bill')} className="bg-green-600 hover:bg-green-700">
                Pay Bill Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tariff Information */}
      <Card>
        <CardHeader>
          <CardTitle>Current Tariff Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Domestic</h3>
              <div className="text-sm space-y-1">
                <p>0-100 units: ₹2.50/unit</p>
                <p>101-300 units: ₹3.50/unit</p>
                <p>301-500 units: ₹4.50/unit</p>
                <p>Above 500 units: ₹6.00/unit</p>
                <p>Fixed Charge: ₹50/month</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Commercial</h3>
              <div className="text-sm space-y-1">
                <p>0-50 units: ₹4.00/unit</p>
                <p>51-200 units: ₹5.50/unit</p>
                <p>Above 200 units: ₹7.00/unit</p>
                <p>Fixed Charge: ₹100/month</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">Industrial</h3>
              <div className="text-sm space-y-1">
                <p>All units: ₹6.50/unit</p>
                <p>Fixed Charge: ₹200/month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillCalculator;
