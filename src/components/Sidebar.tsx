import { X, Home, MapPin, FileText, AlertTriangle, CreditCard, Sun, Link, Info, User, BarChart3, FileStack, Settings, LogOut, Brain, MessageCircle, BookOpen, Map, Leaf, Camera, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useTranslation } from '@/hooks/useTranslation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
}

const Sidebar = ({ isOpen, onClose, onLogout, darkMode, setDarkMode, language, setLanguage }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { t } = useTranslation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: t('dashboard'), path: '/' },
    ];

    // Consumer-specific menu items
    if (user?.role === 'consumer') {
      baseItems.push(
        { icon: MapPin, label: t('nearestOffice'), path: '/nearest-office' },
        { icon: FileText, label: t('complaintTracker'), path: '/register-complaint' },
        { icon: CreditCard, label: t('payBill'), path: '/pay-bill' },
        { icon: FileStack, label: t('documentVault'), path: '/documents' },
        { icon: Sun, label: t('solarPumpStatus'), path: '/solar-pump-status' },
        { icon: Link, label: t('usefulLinks'), path: '/useful-links' },
        { icon: Info, label: t('aboutUs'), path: '/about' },
        { icon: MessageCircle, label: t('whatsapp'), path: '/whatsapp' },
        { icon: Leaf, label: t('goGreen'), path: '/go-green' },
        { icon: Camera, label: t('submitMeterReading'), path: '/meter-reading' },
        { icon: Star, label: t('provideFeedback'), path: '/feedback' },
        { icon: User, label: t('profile'), path: '/profile' },
        { icon: Settings, label: t('settings'), path: '/settings' }
      );
    }

    // Site Engineer menu items
    if (user?.role === 'site_engineer') {
      baseItems.push(
        { icon: AlertTriangle, label: 'Assigned Complaints', path: '/register-complaint' },
        { icon: BarChart3, label: 'KPI Dashboard', path: '/usage-analytics' },
        { icon: Map, label: 'Incident Heatmap', path: '/incident-map' },
        { icon: Brain, label: 'AI Forecast', path: '/ai-forecast' },
        { icon: User, label: t('profile'), path: '/profile' },
        { icon: Settings, label: t('settings'), path: '/settings' }
      );
    }

    // Department Head menu items
    if (user?.role === 'dept_head') {
      baseItems.push(
        { icon: BarChart3, label: 'Analytics Dashboard', path: '/usage-analytics' },
        { icon: Map, label: 'Incident Heatmap', path: '/incident-map' },
        { icon: Brain, label: 'AI Forecast', path: '/ai-forecast' },
        { icon: AlertTriangle, label: 'Complaint Monitor', path: '/register-complaint' },
        { icon: User, label: t('profile'), path: '/profile' },
        { icon: Settings, label: t('settings'), path: '/settings' }
      );
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-background shadow-xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white p-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold truncate">MSEFC</h2>
            <p className="text-sm opacity-90 truncate">{user?.role?.replace('_', ' ')} - {user?.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-700 rounded-lg transition-colors flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-4 flex-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-muted transition-colors ${
                  isActive ? 'bg-muted border-r-4 border-orange-600 text-orange-600' : ''
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="font-medium truncate text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className="font-medium truncate">{t('logout')}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;