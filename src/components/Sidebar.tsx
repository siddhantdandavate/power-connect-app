
import { X, Home, MapPin, FileText, AlertTriangle, CreditCard, Sun, Link, Info, User, BarChart3, FileStack, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

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

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: MapPin, label: 'Nearest Office', path: '/nearest-office' },
    { icon: FileText, label: 'Connection Status', path: '/connection-status' },
    { icon: AlertTriangle, label: 'Register Complaint', path: '/register-complaint' },
    { icon: CreditCard, label: 'Pay Re-connection', path: '/pay-reconnection' },
    { icon: Sun, label: 'Solar Pump Status', path: '/solar-pump-status' },
    { icon: Link, label: 'Useful Links', path: '/useful-links' },
    { icon: Info, label: 'About Us', path: '/about' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: BarChart3, label: 'Usage Analytics', path: '/usage-analytics' },
    { icon: FileStack, label: 'Documents', path: '/documents' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full w-80 bg-background shadow-xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Menu</h2>
          <p className="text-sm opacity-90">Navigate to services</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-muted transition-colors ${
                isActive ? 'bg-muted border-r-4 border-blue-600 text-blue-600' : ''
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
