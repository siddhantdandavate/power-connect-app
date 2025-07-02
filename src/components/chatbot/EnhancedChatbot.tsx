import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Download, Camera, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { aiService } from '@/services/aiService';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  hasDownload?: boolean;
  hasAction?: boolean;
  actionType?: string;
  language?: string;
}

const EnhancedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 1,
        text: getLocalizedText('welcome'),
        isBot: true,
        timestamp: new Date(),
        language: currentLanguage
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, currentLanguage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLocalizedText = (key: string): string => {
    const texts: Record<string, Record<string, string>> = {
      welcome: {
        en: "Hello! I'm your Mahavitaran AI assistant. I can help you with:\n• Generate and download bills\n• Pay bills\n• Submit meter readings\n• Register complaints\n• Track applications\n• AI forecasting\n• Training modules\n\nWhat would you like to do today?",
        hi: "नमस्ते! मैं आपका महावितरण AI सहायक हूं। मैं आपकी मदद कर सकता हूं:\n• बिल जेनरेट और डाउनलोड करें\n• बिल भुगतान\n• मीटर रीडिंग जमा करें\n• शिकायत दर्ज करें\n• आवेदन ट्रैक करें\n• AI पूर्वानुमान\n• प्रशिक्षण मॉड्यूल\n\nआज आप क्या करना चाहेंगे?",
        kn: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮಹಾವಿತರಣ AI ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ:\n• ಬಿಲ್ ಜನರೇಟ್ ಮತ್ತು ಡೌನ್‌ಲೋಡ್\n• ಬಿಲ್ ಪಾವತಿ\n• ಮೀಟರ್ ರೀಡಿಂಗ್ ಸಲ್ಲಿಸಿ\n• ದೂರು ದಾಖಲಿಸಿ\n• ಅರ್ಜಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ\n• AI ಮುನ್ಸೂಚನೆ\n• ತರಬೇತಿ ಮಾಡ್ಯೂಲ್‌ಗಳು\n\nಇಂದು ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?"
      },
      billGenerated: {
        en: "I've generated your current bill. Here are the details:\n\n📄 **Bill Summary**\nConsumer: John Doe\nPeriod: June 2024\nUnits: 324 kWh\nAmount: ₹1,245\nDue Date: July 15, 2024\n\nWould you like me to download the full bill PDF?",
        hi: "मैंने आपका वर्तमान बिल तैयार किया है। यहाँ विवरण हैं:\n\n📄 **बिल सारांश**\nउपभोक्ता: John Doe\nअवधि: जून 2024\nयूनिट: 324 kWh\nराशि: ₹1,245\nदेय तिथि: 15 जुलाई, 2024\n\nक्या आप चाहते हैं कि मैं पूरा बिल PDF डाउनलोड करूं?",
        kn: "ನಾನು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಬಿಲ್ ಅನ್ನು ತಯಾರಿಸಿದ್ದೇನೆ. ಇಲ್ಲಿ ವಿವರಗಳಿವೆ:\n\n📄 **ಬಿಲ್ ಸಾರಾಂಶ**\nಗ್ರಾಹಕ: John Doe\nಅವಧಿ: ಜೂನ್ 2024\nಯೂನಿಟ್‌ಗಳು: 324 kWh\nಮೊತ್ತ: ₹1,245\nದೇಯ ದಿನಾಂಕ: ಜುಲೈ 15, 2024\n\nನಾನು ಪೂರ್ಣ ಬಿಲ್ PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಕೆ?"
      }
    };
    
    return texts[key]?.[currentLanguage] || texts[key]?.['en'] || key;
  };

  const processMessage = async (text: string) => {
    try {
      const nlpResult = await aiService.processNLPCommand(text);
      
      switch (nlpResult.intent) {
        case 'show_bill':
          setTimeout(() => navigate('/view-bill'), 1000);
          return {
            text: getLocalizedText('billGenerated'),
            hasDownload: true,
            hasAction: true,
            actionType: 'navigate'
          };
          
        case 'pay_bill':
          setTimeout(() => navigate('/pay-bill'), 1000);
          return {
            text: getLocalizedText('payBill') || "I'll redirect you to the bill payment page where you can pay securely using UPI, cards, or net banking. Redirecting now..."
          };
          
        case 'submit_meter_reading':
          setTimeout(() => navigate('/meter-reading'), 1000);
          return {
            text: "I'll take you to the meter reading submission page where you can upload a photo of your meter or enter the reading manually. Redirecting now...",
            hasAction: true,
            actionType: 'camera'
          };
          
        case 'register_complaint':
          setTimeout(() => navigate('/register-complaint'), 1000);
          return {
            text: "I'm opening the complaint registration form for you. You can report power outages, billing issues, or other concerns. Redirecting now..."
          };
          
        default:
          return {
            text: "I understand you're asking about utility services. Here are some things I can help with:\n\n• Generate bill - say 'generate my bill'\n• Pay bill - say 'pay my bill'\n• Submit reading - say 'submit meter reading'\n• Register complaint - say 'register a complaint'\n• AI forecast - say 'show forecast'\n• Training - say 'start training'\n\nWhat would you like to do?"
          };
      }
    } catch (error) {
      return {
        text: "I'm having trouble understanding. Could you please rephrase your request?"
      };
    }
  };

  const generateDummyBill = () => {
    const billData = {
      consumerName: "John Doe",
      consumerNo: "MSE12345678",
      meterNo: "98765432",
      billingPeriod: "June 2024",
      unitsConsumed: 324,
      amount: 1245,
      dueDate: "2024-07-15"
    };
    return billData;
  };

  const downloadBillPDF = () => {
    const billData = generateDummyBill();
    const billContent = `
MAHAVITARAN ELECTRICITY BILL
═══════════════════════════════════════

Consumer Name: ${billData.consumerName}
Consumer No: ${billData.consumerNo}
Meter No: ${billData.meterNo}
Billing Period: ${billData.billingPeriod}

Units Consumed: ${billData.unitsConsumed} kWh
Amount Due: ₹${billData.amount}
Due Date: ${billData.dueDate}

Thank you for using Mahavitaran!
═══════════════════════════════════════
    `;
    
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahavitaran-bill-${billData.billingPeriod.replace(' ', '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      const response = await processMessage(input);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        hasDownload: response.hasDownload,
        hasAction: response.hasAction,
        actionType: response.actionType,
        language: currentLanguage
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleVoiceToggle = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'kn' ? 'kn-IN' : 'en-US';

      if (!isListening) {
        setIsListening(true);
        recognition.start();
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
          alert('Speech recognition failed. Please try again.');
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'kn' ? 'kn-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-110 z-40 ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-background border rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-t-lg p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle size={20} />
                Mahavitaran AI Assistant
              </CardTitle>
              <div className="flex items-center gap-2">
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="text-xs bg-white/20 text-white border-none rounded px-2 py-1"
                >
                  <option value="en">EN</option>
                  <option value="hi">हि</option>
                  <option value="kn">ಕನ್</option>
                </select>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-red-700 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-orange-600 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    {message.hasDownload && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={downloadBillPDF}
                        className="flex items-center gap-2"
                      >
                        <Download size={14} />
                        Download Bill
                      </Button>
                    )}
                    
                    {message.actionType === 'camera' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate('/meter-reading')}
                        className="flex items-center gap-2"
                      >
                        <Camera size={14} />
                        Open Camera
                      </Button>
                    )}
                    
                    {message.isBot && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => speakText(message.text)}
                        className="flex items-center gap-2"
                      >
                        <Volume2 size={14} />
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('typeMessage') || "Type your message..."}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleVoiceToggle}
                className={isListening ? 'bg-red-100 border-red-300' : ''}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </Button>
              <Button size="sm" onClick={handleSend} disabled={!input.trim()}>
                <Send size={16} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Try: "generate my bill", "pay bill", "submit meter reading", "show forecast"
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedChatbot;