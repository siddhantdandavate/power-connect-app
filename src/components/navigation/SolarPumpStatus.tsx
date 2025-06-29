
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sun, CheckCircle, Clock, FileText, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SolarPumpStatus = () => {
  const navigate = useNavigate();

  const solarApplications = [
    {
      id: 'SP12345678',
      farmLocation: 'Village Rampur, Taluka Shirur',
      appliedDate: '2024-05-15',
      status: 'Technical Survey Completed',
      currentStage: 'Subsidy Approval',
      progress: 75,
      subsidyAmount: 45000,
      totalCost: 150000,
      estimatedCompletion: '2024-08-15',
      lastUpdate: '2024-06-25'
    },
    {
      id: 'SP87654321',
      farmLocation: 'Village Pune, Taluka Haveli',
      appliedDate: '2024-04-20',
      status: 'Installation Completed',
      currentStage: 'Final Inspection',
      progress: 95,
      subsidyAmount: 50000,
      totalCost: 175000,
      estimatedCompletion: '2024-07-30',
      lastUpdate: '2024-06-28'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Installation Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Technical Survey Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Under Review':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
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
        <h1 className="text-2xl font-bold">Solar Pump Status</h1>
      </div>

      <Card className="bg-gradient-to-r from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-800/20 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Sun className="text-yellow-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Off-Grid Solar AG Pump</h2>
              <p className="text-yellow-600 dark:text-yellow-300">Track your solar pump application progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solar Applications */}
      <div className="space-y-4">
        {solarApplications.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="text-orange-600" size={24} />
                  <div>
                    <CardTitle className="text-lg">Solar Pump Application</CardTitle>
                    <p className="text-sm text-muted-foreground">Application ID: {app.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progress: {app.currentStage}</span>
                  <span>{app.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${app.progress}%` }}
                  />
                </div>
              </div>

              {/* Application Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Farm Location</p>
                  <p className="font-semibold">{app.farmLocation}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Applied Date</p>
                  <p className="font-semibold">{new Date(app.appliedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Cost</p>
                  <p className="font-semibold">₹{app.totalCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Subsidy Amount</p>
                  <p className="font-semibold text-green-600">₹{app.subsidyAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Financial Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Project Cost</span>
                    <span>₹{app.totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Government Subsidy</span>
                    <span className="text-green-600">-₹{app.subsidyAmount.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Your Contribution</span>
                    <span>₹{(app.totalCost - app.subsidyAmount).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Application Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={16} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Application Submitted</p>
                      <p className="text-xs text-muted-foreground">{app.appliedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={16} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Document Verification</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={16} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Technical Survey</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-orange-500" size={16} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{app.currentStage}</p>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                  {app.progress < 95 && (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Installation</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Est. Completion</p>
                  <p className="font-semibold">{new Date(app.estimatedCompletion).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Update</p>
                  <p className="font-semibold">{new Date(app.lastUpdate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <FileText size={16} className="mr-2" />
            Apply for New Solar Pump
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MapPin size={16} className="mr-2" />
            Schedule Site Visit
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/register-complaint')}>
            <Clock size={16} className="mr-2" />
            Raise Query
          </Button>
        </CardContent>
      </Card>

      {/* Subsidy Information */}
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Subsidy Information</h3>
          <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
            <li>• Up to 30% subsidy available for solar pumps</li>
            <li>• Maximum subsidy limit: ₹50,000 per pump</li>
            <li>• Installation must be done by approved vendors</li>
            <li>• 5-year warranty on solar panels and pump</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolarPumpStatus;
