import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ConsumerDashboard from '@/components/dashboard/ConsumerDashboard';
import SiteEngineerDashboard from '@/components/dashboard/SiteEngineerDashboard';
import DeptHeadDashboard from '@/components/dashboard/DeptHeadDashboard';
import RoleBasedLogin from '@/components/auth/RoleBasedLogin';
import ViewBill from '@/components/services/ViewBill';
import PayBill from '@/components/services/PayBill';
import PrepaidRecharge from '@/components/services/PrepaidRecharge';
import MeterReading from '@/components/services/MeterReading';
import GoGreen from '@/components/services/GoGreen';
import TransformerFault from '@/components/services/TransformerFault';
import PowerTheft from '@/components/services/PowerTheft';
import AGIndex from '@/components/services/AGIndex';
import ContactHelpline from '@/components/services/ContactHelpline';
import UpdateContact from '@/components/services/UpdateContact';
import Feedback from '@/components/services/Feedback';
import BillCalculator from '@/components/services/BillCalculator';
import Profile from '@/components/Profile';
import UsageAnalytics from '@/components/UsageAnalytics';
import DocumentVault from '@/components/DocumentVault';
import Settings from '@/components/Settings';
import NearestOffice from '@/components/navigation/NearestOffice';
import NewConnectionStatus from '@/components/navigation/NewConnectionStatus';
import RegisterComplaint from '@/components/navigation/RegisterComplaint';
import PayReconnection from '@/components/navigation/PayReconnection';
import SolarPumpStatus from '@/components/navigation/SolarPumpStatus';
import UsefulLinks from '@/components/navigation/UsefulLinks';
import AboutUs from '@/components/navigation/AboutUs';
import TrainingDashboard from '@/components/training/TrainingDashboard';
import SCORMViewer from '@/components/training/SCORMViewer';
import IncidentHeatmap from '@/components/maps/IncidentHeatmap';
import ForecastDashboard from '@/components/ai/ForecastDashboard';
import WhatsAppIntegration from '@/components/whatsapp/WhatsAppIntegration';
import LanguageSwitcher from '@/components/language/LanguageSwitcher';
import EnhancedChatbot from '@/components/chatbot/EnhancedChatbot';
import { Menu, Bell } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useTranslation } from '@/hooks/useTranslation';
import { User } from '@/types';

const Index = () => {
  const { user, setUser, isLoggedIn } = useUser();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setSidebarOpen(false);
  };

  const getDashboardComponent = () => {
    if (!user) return <ConsumerDashboard />;
    
    switch (user.role) {
      case 'consumer':
        return <ConsumerDashboard />;
      case 'site_engineer':
        return <SiteEngineerDashboard />;
      case 'dept_head':
        return <DeptHeadDashboard />;
      default:
        return <ConsumerDashboard />;
    }
  };

  if (!isLoggedIn) {
    return <RoleBasedLogin onLogin={handleLogin} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground min-h-screen">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-600 to-red-700 text-white p-4 flex items-center justify-between shadow-lg sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-red-700 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-lg font-bold">MSEFC</h1>
              <p className="text-xs opacity-90">Karnataka Electricity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button className="p-2 hover:bg-red-700 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </header>

        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          language="en"
          setLanguage={() => {}}
        />

        {/* Main Content */}
        <main className="pb-20">
          <Routes>
            <Route index element={getDashboardComponent()} />
            <Route path="view-bill" element={<ViewBill />} />
            <Route path="pay-bill" element={<PayBill />} />
            <Route path="prepaid-recharge" element={<PrepaidRecharge />} />
            <Route path="meter-reading" element={<MeterReading />} />
            <Route path="go-green" element={<GoGreen />} />
            <Route path="transformer-fault" element={<TransformerFault />} />
            <Route path="power-theft" element={<PowerTheft />} />
            <Route path="ag-index" element={<AGIndex />} />
            <Route path="contact-helpline" element={<ContactHelpline />} />
            <Route path="update-contact" element={<UpdateContact />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="bill-calculator" element={<BillCalculator />} />
            <Route path="profile" element={<Profile />} />
            <Route path="usage-analytics" element={<UsageAnalytics />} />
            <Route path="documents" element={<DocumentVault />} />
            <Route path="settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} language="en" setLanguage={() => {}} />} />
            <Route path="nearest-office" element={<NearestOffice />} />
            <Route path="connection-status" element={<NewConnectionStatus />} />
            <Route path="register-complaint" element={<RegisterComplaint />} />
            <Route path="pay-reconnection" element={<PayReconnection />} />
            <Route path="solar-pump-status" element={<SolarPumpStatus />} />
            <Route path="useful-links" element={<UsefulLinks />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="training" element={<TrainingDashboard />} />
            <Route path="training/module/:moduleId" element={<SCORMViewer />} />
            <Route path="incident-map" element={<IncidentHeatmap />} />
            <Route path="ai-forecast" element={<ForecastDashboard />} />
            <Route path="whatsapp" element={<WhatsAppIntegration />} />
          </Routes>
        </main>

        {/* Enhanced Chatbot */}
        <EnhancedChatbot />

        {/* Overlay for sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;