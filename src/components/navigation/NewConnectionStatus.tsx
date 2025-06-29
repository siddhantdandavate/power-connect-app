
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewConnectionStatus = () => {
  const navigate = useNavigate();

  const applications = [
    {
      id: 'NC12345678',
      type: 'New Domestic Connection',
      appliedDate: '2024-06-15',
      status: 'Under Verification',
      currentStage: 'Document Verification',
      progress: 60,
      estimatedCompletion: '2024-07-20',
      lastUpdate: '2024-06-25'
    },
    {
      id: 'AG98765432',
      type: 'Agricultural Solar Pump',
      appliedDate: '2024-05-20',
      status: 'Site Survey Completed',
      currentStage: 'Technical Approval',
      progress: 80,
      estimatedCompletion: '2024-07-10',
      lastUpdate: '2024-06-28'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'Under Verification':
      case 'Site Survey Completed':
        return <Clock className="text-orange-600" size={20} />;
      case 'Rejected':
        return <AlertTriangle className="text-red-600" size={20} />;
      default:
        return <FileText className="text-blue-600" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Under Verification':
      case 'Site Survey Completed':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
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
        <h1 className="text-2xl font-bold">Application Status</h1>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-100 dark:from-blue-900/20 dark:to-purple-800/20 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <FileText className="text-blue-600" size={32} />
            <div>
              <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200">Track Your Applications</h2>
              <p className="text-blue-600 dark:text-blue-300">Monitor the progress of your connection requests</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(app.status)}
                  <div>
                    <CardTitle className="text-lg">{app.type}</CardTitle>
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
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${app.progress}%` }}
                  />
                </div>
              </div>

              {/* Application Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Applied Date</p>
                  <p className="font-semibold">{new Date(app.appliedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Update</p>
                  <p className="font-semibold">{new Date(app.lastUpdate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current Stage</p>
                  <p className="font-semibold">{app.currentStage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Est. Completion</p>
                  <p className="font-semibold">{new Date(app.estimatedCompletion).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Application Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Application Submitted</p>
                      <p className="text-xs text-muted-foreground">{app.appliedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Initial Review Completed</p>
                      <p className="text-xs text-muted-foreground">2024-06-20</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{app.currentStage}</p>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Connection Installation</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
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
            Apply for New Connection
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Clock size={16} className="mr-2" />
            Schedule Site Survey
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/register-complaint')}>
            <AlertTriangle size={16} className="mr-2" />
            Raise Query/Complaint
          </Button>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-600 dark:text-blue-300 mb-3">
            For any queries regarding your application status, contact our support team.
          </p>
          <Button size="sm" onClick={() => navigate('/contact-helpline')}>
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewConnectionStatus;
