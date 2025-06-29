
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Phone, Mail, MapPin, Edit, CreditCard, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo] = useState({
    name: 'John Doe',
    consumerNo: 'MSE12345678',
    meterNo: '98765432',
    phone: '+91 9876543210',
    email: 'john.doe@email.com',
    address: '123 Main Street, Sector 15, Cityville - 400001',
    connectionType: 'Domestic',
    loadSanctioned: '5 KW',
    tariffCategory: 'LT-I',
    supplyType: 'Single Phase'
  });

  const [accountSummary] = useState({
    currentBill: 1245,
    lastPayment: 1150,
    totalUnits: 324,
    avgMonthlyBill: 1198
  });

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <User size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{userInfo.name}</h2>
              <p className="opacity-90">Consumer ID: {userInfo.consumerNo}</p>
              <p className="opacity-90">Meter No: {userInfo.meterNo}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/update-contact')}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <CreditCard className="text-red-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-red-600">₹{accountSummary.currentBill}</p>
              <p className="text-sm text-muted-foreground">Current Bill</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Zap className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-green-600">{accountSummary.totalUnits}</p>
              <p className="text-sm text-muted-foreground">Units This Month</p>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xl font-bold text-blue-600">₹{accountSummary.lastPayment}</p>
              <p className="text-sm text-muted-foreground">Last Payment</p>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-xl font-bold text-orange-600">₹{accountSummary.avgMonthlyBill}</p>
              <p className="text-sm text-muted-foreground">Avg Monthly</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <User className="text-muted-foreground" size={20} />
            <div className="flex-1">
              <p className="font-medium">{userInfo.name}</p>
              <p className="text-sm text-muted-foreground">Full Name</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Phone className="text-muted-foreground" size={20} />
            <div className="flex-1">
              <p className="font-medium">{userInfo.phone}</p>
              <p className="text-sm text-muted-foreground">Mobile Number</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <Mail className="text-muted-foreground" size={20} />
            <div className="flex-1">
              <p className="font-medium">{userInfo.email}</p>
              <p className="text-sm text-muted-foreground">Email Address</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border rounded-lg">
            <MapPin className="text-muted-foreground mt-1" size={20} />
            <div className="flex-1">
              <p className="font-medium">{userInfo.address}</p>
              <p className="text-sm text-muted-foreground">Service Address</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Details */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Connection Type</p>
              <p className="font-semibold">{userInfo.connectionType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Load Sanctioned</p>
              <p className="font-semibold">{userInfo.loadSanctioned}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Tariff Category</p>
              <p className="font-semibold">{userInfo.tariffCategory}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Supply Type</p>
              <p className="font-semibold">{userInfo.supplyType}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/update-contact')}
          className="h-16 flex flex-col items-center gap-2"
        >
          <Edit size={20} />
          <span className="text-sm">Update Details</span>
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/documents')}
          className="h-16 flex flex-col items-center gap-2"
        >
          <CreditCard size={20} />
          <span className="text-sm">View Documents</span>
        </Button>
      </div>
    </div>
  );
};

export default Profile;
