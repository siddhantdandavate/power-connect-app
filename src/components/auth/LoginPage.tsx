
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Eye, EyeOff, Moon, Sun } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const LoginPage = ({ onLogin, darkMode, setDarkMode }: LoginPageProps) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setLoading(true);
    // Simulate API call
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
        onLogin();
        setLoading(false);
      }, 1000);
    } else {
      alert('Invalid OTP. Use 123456 for demo');
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen w-full flex items-center justify-center">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">P</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">PowerSync</h1>
            <p className="text-gray-600 dark:text-gray-300">Utility Management App</p>
          </div>

          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <p className="text-muted-foreground">Login to access your account</p>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
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
                    className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
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
                {loading ? 'Logging in...' : 'Demo Login (Skip OTP)'}
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

export default LoginPage;
