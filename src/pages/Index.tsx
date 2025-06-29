
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import LoginPage from '@/components/auth/LoginPage';
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
import Chatbot from '@/components/Chatbot';
import { Menu, Bell } from 'lucide-react';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }

    // Check theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }

    // Check language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
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

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('authToken', 'dummy-token-123');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    setSidebarOpen(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground min-h-screen">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between shadow-lg sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-lg font-bold">PowerSync</h1>
              <p className="text-xs opacity-90">Utility Management App</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-blue-700 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
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
          language={language}
          setLanguage={setLanguage}
        />

        {/* Main Content */}
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/view-bill" element={<ViewBill />} />
            <Route path="/pay-bill" element={<PayBill />} />
            <Route path="/prepaid-recharge" element={<PrepaidRecharge />} />
            <Route path="/meter-reading" element={<MeterReading />} />
            <Route path="/go-green" element={<GoGreen />} />
            <Route path="/transformer-fault" element={<TransformerFault />} />
            <Route path="/power-theft" element={<PowerTheft />} />
            <Route path="/ag-index" element={<AGIndex />} />
            <Route path="/contact-helpline" element={<ContactHelpline />} />
            <Route path="/update-contact" element={<UpdateContact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/bill-calculator" element={<BillCalculator />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/usage-analytics" element={<UsageAnalytics />} />
            <Route path="/documents" element={<DocumentVault />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />} />
            <Route path="/nearest-office" element={<NearestOffice />} />
            <Route path="/connection-status" element={<NewConnectionStatus />} />
            <Route path="/register-complaint" element={<RegisterComplaint />} />
            <Route path="/pay-reconnection" element={<PayReconnection />} />
            <Route path="/solar-pump-status" element={<SolarPumpStatus />} />
            <Route path="/useful-links" element={<UsefulLinks />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Chatbot */}
        <Chatbot />

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
