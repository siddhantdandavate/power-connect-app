import { SCORMModule } from '@/types';

class SCORMService {
  private modules: SCORMModule[] = [
    {
      id: '1',
      title: 'Power Theft Detection Basics',
      description: 'Learn the fundamentals of identifying and reporting power theft',
      role: ['site_engineer', 'dept_head'],
      progress: 0,
      completed: false,
      duration: 45,
      url: '/scorm/power-theft-basics/index.html'
    },
    {
      id: '2',
      title: 'Safety Protocols for Field Engineers',
      description: 'Essential safety procedures for field operations',
      role: ['site_engineer'],
      progress: 100,
      completed: true,
      duration: 60,
      url: '/scorm/safety-protocols/index.html'
    },
    {
      id: '3',
      title: 'Customer Service Excellence',
      description: 'Best practices for customer interaction and service',
      role: ['consumer', 'site_engineer', 'dept_head'],
      progress: 75,
      completed: false,
      duration: 30,
      url: '/scorm/customer-service/index.html'
    },
    {
      id: '4',
      title: 'Revenue Protection Strategies',
      description: 'Advanced techniques for revenue protection and loss reduction',
      role: ['dept_head'],
      progress: 0,
      completed: false,
      duration: 90,
      url: '/scorm/revenue-protection/index.html'
    }
  ];

  async getModulesForRole(role: string): Promise<SCORMModule[]> {
    return this.modules.filter(module => module.role.includes(role));
  }

  async updateProgress(moduleId: string, progress: number): Promise<void> {
    const module = this.modules.find(m => m.id === moduleId);
    if (module) {
      module.progress = progress;
      module.completed = progress >= 100;
      
      // Save to localStorage for persistence
      localStorage.setItem('scorm_progress', JSON.stringify(this.modules));
    }
  }

  async uploadModule(file: File): Promise<SCORMModule> {
    // Simulate SCORM package upload and extraction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newModule: SCORMModule = {
      id: Date.now().toString(),
      title: file.name.replace('.zip', ''),
      description: 'Uploaded SCORM module',
      role: ['consumer', 'site_engineer', 'dept_head'],
      progress: 0,
      completed: false,
      duration: 60,
      url: `/scorm/${file.name}/index.html`
    };
    
    this.modules.push(newModule);
    return newModule;
  }

  loadProgress(): void {
    const saved = localStorage.getItem('scorm_progress');
    if (saved) {
      try {
        const savedModules = JSON.parse(saved);
        savedModules.forEach((savedModule: SCORMModule) => {
          const module = this.modules.find(m => m.id === savedModule.id);
          if (module) {
            module.progress = savedModule.progress;
            module.completed = savedModule.completed;
          }
        });
      } catch (error) {
        console.error('Error loading SCORM progress:', error);
      }
    }
  }
}

export const scormService = new SCORMService();