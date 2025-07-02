import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ArrowLeft, BookOpen, Play, Upload, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useUser } from '@/contexts/UserContext';
import { scormService } from '@/services/scormService';
import { SCORMModule } from '@/types';

const TrainingDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useUser();
  const [modules, setModules] = useState<SCORMModule[]>([]);
  const [filteredModules, setFilteredModules] = useState<SCORMModule[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadModules();
    scormService.loadProgress();
  }, [user]);

  useEffect(() => {
    filterModules();
  }, [modules, searchTerm, filterStatus]);

  const loadModules = async () => {
    if (!user) return;
    
    try {
      const userModules = await scormService.getModulesForRole(user.role);
      setModules(userModules);
    } catch (error) {
      console.error('Error loading modules:', error);
    }
  };

  const filterModules = () => {
    let filtered = modules;

    if (searchTerm) {
      filtered = filtered.filter(module =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(module => {
        if (filterStatus === 'completed') return module.completed;
        if (filterStatus === 'in_progress') return module.progress > 0 && !module.completed;
        if (filterStatus === 'not_started') return module.progress === 0;
        return true;
      });
    }

    setFilteredModules(filtered);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.zip')) {
      alert('Please upload a ZIP file containing SCORM content');
      return;
    }

    setIsUploading(true);
    try {
      const newModule = await scormService.uploadModule(file);
      setModules(prev => [...prev, newModule]);
      alert('SCORM module uploaded successfully!');
    } catch (error) {
      console.error('Error uploading module:', error);
      alert('Error uploading module. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-200';
    if (progress < 50) return 'bg-orange-500';
    if (progress < 100) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStatusBadge = (module: SCORMModule) => {
    if (module.completed) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Completed</span>;
    }
    if (module.progress > 0) {
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">In Progress</span>;
    }
    return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Not Started</span>;
  };

  const overallProgress = modules.length > 0 
    ? Math.round(modules.reduce((sum, module) => sum + module.progress, 0) / modules.length)
    : 0;

  const completedCount = modules.filter(m => m.completed).length;

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">{t('training')} {t('dashboard')}</h1>
      </div>

      {/* Training Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-100 dark:from-blue-900/20 dark:to-purple-800/20 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <BookOpen className="text-blue-600" size={32} />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200">SCORM Training Platform</h2>
              <p className="text-blue-600 dark:text-blue-300">Role: {user?.role.replace('_', ' ')}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{overallProgress}%</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Overall Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            <p className="text-sm text-muted-foreground">{t('completed')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{modules.filter(m => m.progress > 0 && !m.completed).length}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{modules.length}</p>
            <p className="text-sm text-muted-foreground">Total {t('modules')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Upload SCORM Module */}
      {(user?.role === 'dept_head' || user?.role === 'site_engineer') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload SCORM Module
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".zip"
                onChange={handleFileUpload}
                className="hidden"
                id="scorm-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="scorm-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="text-gray-400" size={32} />
                <p className="text-sm text-muted-foreground">
                  {isUploading ? 'Uploading...' : 'Click to upload SCORM 1.2 package (ZIP file)'}
                </p>
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Training Modules */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available {t('modules')}</h3>
        {filteredModules.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="font-semibold text-muted-foreground mb-2">No modules found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No training modules are available for your role.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredModules.map((module) => (
            <Card key={module.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                      {getStatusBadge(module)}
                    </div>
                    <p className="text-muted-foreground mb-4">{module.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="ml-2 font-medium">{module.duration} minutes</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="ml-2 font-medium">{module.progress}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="w-full" />
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <Button
                      onClick={() => navigate(`/training/module/${module.id}`)}
                      className="flex items-center gap-2"
                    >
                      <Play size={16} />
                      {module.progress === 0 ? t('startTraining') : 'Continue'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TrainingDashboard;