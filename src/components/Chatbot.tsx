
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Download, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your PowerSync assistant. I can help you with:\n• Generate and download bills\n• Pay bills\n• Submit meter readings\n• Register complaints\n• Track applications\n\nWhat would you like to do today?", 
      isBot: true, 
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateDummyBill = () => {
    const billData = {
      consumerName: "John Doe",
      consumerNo: "MSE12345678",
      meterNo: "98765432",
      billingPeriod: "May 2024",
      unitsConsumed: 324,
      amount: 1245,
      dueDate: "2024-07-15"
    };
    return billData;
  };

  const downloadBillPDF = () => {
    const billData = generateDummyBill();
    const billContent = `
ELECTRICITY BILL
═══════════════════════════════════════

Consumer Name: ${billData.consumerName}
Consumer No: ${billData.consumerNo}
Meter No: ${billData.meterNo}
Billing Period: ${billData.billingPeriod}

Units Consumed: ${billData.unitsConsumed} kWh
Amount Due: ₹${billData.amount}
Due Date: ${billData.dueDate}

Thank you for using PowerSync!
═══════════════════════════════════════
    `;
    
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `electricity-bill-${billData.billingPeriod.replace(' ', '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const processMessage = (text: string) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('generate') && lowerText.includes('bill')) {
      const billData = generateDummyBill();
      return {
        text: `Here's your current bill details:\n\n📄 **Bill Summary**\nConsumer: ${billData.consumerName}\nPeriod: ${billData.billingPeriod}\nUnits: ${billData.unitsConsumed} kWh\nAmount: ₹${billData.amount}\nDue Date: ${billData.dueDate}\n\nWould you like me to download the full bill PDF?`,
        hasDownload: true
      };
    }
    
    if (lowerText.includes('pay') && lowerText.includes('bill')) {
      setTimeout(() => navigate('/pay-bill'), 1000);
      return {
        text: "I'll redirect you to the bill payment page where you can pay securely using UPI, cards, or net banking. Redirecting now..."
      };
    }
    
    if (lowerText.includes('submit') && lowerText.includes('meter') && lowerText.includes('reading')) {
      setTimeout(() => navigate('/meter-reading'), 1000);
      return {
        text: "I'll take you to the meter reading submission page where you can upload a photo of your meter or enter the reading manually. Redirecting now..."
      };
    }
    
    if (lowerText.includes('register') && lowerText.includes('complaint')) {
      setTimeout(() => navigate('/register-complaint'), 1000);
      return {
        text: "I'm opening the complaint registration form for you. You can report power outages, billing issues, or other concerns. Redirecting now..."
      };
    }
    
    if (lowerText.includes('track') && (lowerText.includes('application') || lowerText.includes('status'))) {
      setTimeout(() => navigate('/connection-status'), 1000);
      return {
        text: "Let me show you your application status page where you can track new connections and solar pump applications. Redirecting now..."
      };
    }

    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      return {
        text: "Hello! How can I assist you today? I can help with bills, payments, meter readings, complaints, and application tracking."
      };
    }

    if (lowerText.includes('help') || lowerText.includes('what can you do')) {
      return {
        text: "I can help you with:\n• 📄 Generate and download bills\n• 💳 Pay your electricity bills\n• 📸 Submit meter readings\n• ⚠️ Register complaints\n• 📋 Track application status\n• 🔍 Find nearest offices\n• 📞 Contact helpline\n\nJust tell me what you need!"
      };
    }
    
    return {
      text: "I understand you're asking about electricity services. Here are some things I can help with:\n\n• Generate bill - say 'generate my bill'\n• Pay bill - say 'pay my bill'\n• Submit reading - say 'submit meter reading'\n• Register complaint - say 'register a complaint'\n• Track status - say 'track my application'\n\nWhat would you like to do?"
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processMessage(input);
      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        hasDownload: response.hasDownload
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
      recognition.lang = 'en-US';

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

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-110 z-40 ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-background border rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle size={20} />
                PowerSync Assistant
              </CardTitle>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-blue-700 rounded transition-colors"
              >
                <X size={18} />
              </button>
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
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  {message.hasDownload && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={downloadBillPDF}
                      className="mt-2 flex items-center gap-2"
                    >
                      <Download size={14} />
                      Download Bill
                    </Button>
                  )}
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
                placeholder="Type your message..."
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
              Try: "generate my bill", "pay bill", "submit meter reading"
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
