
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Leaf, CheckCircle, TreePine, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GoGreen = () => {
  const navigate = useNavigate();
  const [paperlessBilling, setPaperlessBilling] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const greenStats = {
    paperSaved: 12,
    co2Reduced: 2.4,
    treesEquivalent: 0.3
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
        <h1 className="text-2xl font-bold">Go Green</h1>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 border-green-200">
        <CardContent className="p-6 text-center">
          <Leaf className="text-green-600 mx-auto mb-3" size={48} />
          <h2 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
            Make a Difference
          </h2>
          <p className="text-green-600 dark:text-green-300">
            Choose paperless billing and help save the environment
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Green Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Recycle className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-green-600">{greenStats.paperSaved}</p>
              <p className="text-xs text-muted-foreground">Sheets Saved</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full mx-auto mb-2"></div>
              <p className="text-2xl font-bold text-blue-600">{greenStats.co2Reduced}</p>
              <p className="text-xs text-muted-foreground">kg CO₂ Reduced</p>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <TreePine className="text-emerald-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-emerald-600">{greenStats.treesEquivalent}</p>
              <p className="text-xs text-muted-foreground">Trees Equivalent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Green Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Paperless Billing</p>
              <p className="text-sm text-muted-foreground">Receive bills via email instead of post</p>
            </div>
            <Switch
              checked={paperlessBilling}
              onCheckedChange={setPaperlessBilling}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Get bill and payment reminders via email</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Alerts</p>
              <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
            </div>
            <Switch
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Benefits of Going Green</h3>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li>• Save paper and reduce environmental impact</li>
            <li>• Get bills instantly in your email</li>
            <li>• Access bills anywhere, anytime</li>
            <li>• Contribute to a sustainable future</li>
          </ul>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
      >
        {saved ? (
          <>
            <CheckCircle className="mr-2" size={16} />
            Preferences Saved!
          </>
        ) : (
          'Save Green Preferences'
        )}
      </Button>
    </div>
  );
};

export default GoGreen;
