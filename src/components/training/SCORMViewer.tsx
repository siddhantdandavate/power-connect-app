import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, RotateCcw, Upload } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useUser } from '@/contexts/UserContext';
import { scormService } from '@/services/scormService';
import { SCORMModule } from '@/types';

const SCORMViewer = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const { t } = useTranslation();
  const { user } = useUser();
  const [module, setModule] = useState<SCORMModule | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadModule();
    scormService.loadProgress();
  }, [moduleId]);

  const loadModule = async () => {
    if (!moduleId || !user) return;
    
    try {
      const modules = await scormService.getModulesForRole(user.role);
      const foundModule = modules.find(m => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
        setCurrentProgress(foundModule.progress);
      }
    } catch (error) {
      console.error('Error loading module:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate progress updates
    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        const newProgress = Math.min(prev + 2, 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          handleComplete();
        }
        return newProgress;
      });
    }, 1000);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentProgress(0);
    setIsPlaying(false);
    if (module) {
      scormService.updateProgress(module.id, 0);
    }
  };

  const handleComplete = async () => {
    if (module) {
      await scormService.updateProgress(module.id, 100);
      setModule({ ...module, progress: 100, completed: true });
    }
  };

  const saveProgress = async () => {
    if (module) {
      await scormService.updateProgress(module.id, currentProgress);
      setModule({ ...module, progress: currentProgress, completed: currentProgress >= 100 });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        saveProgress();
      }
    }, 10000); // Save progress every 10 seconds

    return () => clearInterval(interval);
  }, [isPlaying, currentProgress, module]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/training')}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/training')}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">Module not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate('/training')}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">{module.title}</h1>
      </div>

      {/* Module Info */}
      <Card>
        <CardHeader>
          <CardTitle>{module.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{module.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <span className="ml-2 font-medium">{module.duration} minutes</span>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <span className={`ml-2 font-medium ${module.completed ? 'text-green-600' : 'text-orange-600'}`}>
                {module.completed ? t('completed') : 'In Progress'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>{t('progress')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={currentProgress} className="w-full" />
            <div className="flex justify-between text-sm">
              <span>{currentProgress.toFixed(0)}% Complete</span>
              <span>{Math.round((currentProgress / 100) * module.duration)} / {module.duration} minutes</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SCORM Content Viewer */}
      <Card>
        <CardHeader>
          <CardTitle>Training Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
            {/* Simulated SCORM content */}
            <div className="w-full max-w-md space-y-6">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">SCORM Training Module</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This is a simulated SCORM 1.2 training module. In a real implementation, 
                  this would load the actual SCORM content in an iframe.
                </p>
                <div className="space-y-4">
                  <div className="text-left">
                    <h4 className="font-medium">Learning Objectives:</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Understand power theft detection methods</li>
                      <li>• Learn safety protocols for field work</li>
                      <li>• Practice incident reporting procedures</li>
                    </ul>
                  </div>
                  
                  {currentProgress > 25 && (
                    <div className="text-left">
                      <h4 className="font-medium">Module Content:</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        Interactive lessons, videos, and assessments would appear here.
                      </p>
                    </div>
                  )}
                  
                  {currentProgress > 75 && (
                    <div className="text-left">
                      <h4 className="font-medium">Assessment:</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        Final quiz and practical exercises to test understanding.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Simulated iframe for SCORM content */}
              <div className="bg-white dark:bg-gray-700 p-4 rounded border-2 border-dashed border-gray-300">
                <p className="text-xs text-muted-foreground">
                  SCORM Content Frame<br />
                  URL: {module.url}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-4">
            {!isPlaying ? (
              <Button onClick={handlePlay} disabled={currentProgress >= 100}>
                <Play size={16} className="mr-2" />
                {currentProgress === 0 ? t('startTraining') : 'Resume'}
              </Button>
            ) : (
              <Button onClick={handlePause} variant="outline">
                <Pause size={16} className="mr-2" />
                Pause
              </Button>
            )}
            
            <Button onClick={handleReset} variant="outline">
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
            
            <Button onClick={saveProgress} variant="outline">
              {t('save')} {t('progress')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Completion Message */}
      {currentProgress >= 100 && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              🎉 Training Completed!
            </h3>
            <p className="text-green-600 dark:text-green-300">
              Congratulations! You have successfully completed this training module.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SCORMViewer;