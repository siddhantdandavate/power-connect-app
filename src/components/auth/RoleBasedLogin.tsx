import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Eye, EyeOff, Moon, Sun, User, Shield, Crown } from 'lucide-react';
import { User as UserType } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface RoleBasedLoginProps {
  onLogin: (user: UserType) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const RoleBasedLogin = ({ onLogin, darkMode, setDarkMode }: RoleBasedLoginProps) => {
  const { t } = useTranslation();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState<'consumer' | 'site_engineer' | 'dept_head'>('consumer');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      alert('OTP sent to your mobile number: 123456 (Demo OTP)');
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp === '123456' || otp === '1234') {
      setLoading(true);
      setTimeout(() => {
        const user: UserType = {
          id: Date.now().toString(),
          name: role === 'consumer' ? 'John Doe' : role === 'site_engineer' ? 'Rajesh Kumar' : 'Dr. Priya Sharma',
          mobile: `+91 ${mobile}`,
          email: `${role}@mahavitaran.com`,
          role,
          zone: role !== 'consumer' ? 'Zone A' : undefined,
          area: role !== 'consumer' ? 'Area 1' : undefined,
          consumerNo: role === 'consumer' ? 'MSE12345678' : undefined,
          meterNo: role === 'consumer' ? '98765432' : undefined
        };
        onLogin(user);
        setLoading(false);
      }, 1000);
    } else {
      alert('Invalid OTP. Use 123456 for demo');
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const user: UserType = {
        id: Date.now().toString(),
        name: role === 'consumer' ? 'John Doe' : role === 'site_engineer' ? 'Rajesh Kumar' : 'Dr. Priya Sharma',
        mobile: '+91 9876543210',
        email: `${role}@mahavitaran.com`,
        role,
        zone: role !== 'consumer' ? 'Zone A' : undefined,
        area: role !== 'consumer' ? 'Area 1' : undefined,
        consumerNo: role === 'consumer' ? 'MSE12345678' : undefined,
        meterNo: role === 'consumer' ? '98765432' : undefined
      };
      onLogin(user);
      setLoading(false);
    }, 1000);
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case 'consumer': return <User size={20} />;
      case 'site_engineer': return <Shield size={20} />;
      case 'dept_head': return <Crown size={20} />;
      default: return <User size={20} />;
    }
  };

  const getRoleColor = (roleType: string) => {
    switch (roleType) {
      case 'consumer': return 'from-blue-600 to-blue-800';
      case 'site_engineer': return 'from-green-600 to-green-800';
      case 'dept_head': return 'from-purple-600 to-purple-800';
      default: return 'from-blue-600 to-blue-800';
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen w-full flex items-center justify-center">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-red-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mahavitaran</h1>
            <p className="text-gray-600 dark:text-gray-300">Utility Analytics Platform</p>
          </div>

          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('welcome')}</CardTitle>
              <p className="text-muted-foreground">Select your role and login</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consumer">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        Consumer
                      </div>
                    </SelectItem>
                    <SelectItem value="site_engineer">
                      <div className="flex items-center gap-2">
                        <Shield size={16} />
                        Site Engineer
                      </div>
                    </SelectItem>
                    <SelectItem value="dept_head">
                      <div className="flex items-center gap-2">
                        <Crown size={16} />
                        Department Head
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!otpSent ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSendOTP}
                    disabled={loading || mobile.length !== 10}
                    className={`w-full bg-gradient-to-r ${getRoleColor(role)} hover:opacity-90`}
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <div className="relative">
                      <Input
                        id="otp"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      OTP sent to +91-{mobile}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.length < 4}
                    className={`w-full bg-gradient-to-r ${getRoleColor(role)} hover:opacity-90`}
                  >
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setOtpSent(false)}
                    className="w-full"
                  >
                    Change Mobile Number
                  </Button>
                </>
              )}
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50"
              >
                <div className="flex items-center gap-2">
                  {getRoleIcon(role)}
                  {loading ? 'Logging in...' : `Demo Login as ${role.replace('_', ' ')}`}
                </div>
              </Button>
              
              <div className="text-center text-xs text-muted-foreground">
                <p>Demo OTP: 123456</p>
                <p>By logging in, you agree to our Terms & Conditions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedLogin;