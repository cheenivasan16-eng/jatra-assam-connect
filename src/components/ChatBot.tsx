import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I\'m your Jatra AI assistant. I can help you in Hindi and English with experiences, bookings, and Eco Points. How can I assist you today? / नमस्ते! मैं आपका जात्रा AI सहायक हूं। मैं आपकी हिंदी और अंग्रेजी में सहायता कर सकता हूं।',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response (will be replaced with actual AI integration)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Hindi responses
    if (input.includes('हिंदी') || input.includes('नमस्ते') || input.includes('कैसे')) {
      return 'मैं आपकी झारखंड की यात्रा में सहायता कर सकता हूं। आप अनुभव, होमस्टे, या हस्तशिल्प के बारे में पूछ सकते हैं। आपको किस प्रकार की जानकारी चाहिए?';
    }
    
    // Experience related
    if (input.includes('experience') || input.includes('tour') || input.includes('अनुभव')) {
      return 'Jatra offers authentic tribal experiences like traditional art workshops, village life immersion, forest medicine walks, and organic farming. Our most popular experience is the Traditional Tribal Art Workshop (₹1,500). Would you like to know more about any specific experience?';
    }
    
    // Booking related
    if (input.includes('book') || input.includes('booking') || input.includes('बुकिंग')) {
      return 'To book an experience, simply click the "Book Experience" button on any experience card. You\'ll need to provide your details and preferred dates. Payment can be made online or at the venue. Would you like help with a specific booking?';
    }
    
    // Eco Points
    if (input.includes('eco points') || input.includes('points') || input.includes('इको पॉइंट्स')) {
      return 'Eco Points are rewards you earn for sustainable tourism activities! You earn 10 points per ₹100 spent on experiences, 5 points for marketplace purchases, and bonus points for eco-friendly choices. Points can be redeemed for discounts on future bookings.';
    }
    
    // Marketplace
    if (input.includes('marketplace') || input.includes('handicraft') || input.includes('buy') || input.includes('हस्तशिल्प')) {
      return 'Our marketplace features authentic handicrafts, homestays, and organic products made by local artisans. Popular items include handwoven tribal sarees (₹3,500), bamboo craft sets (₹1,200), and traditional Dokra jewelry. All purchases directly support local communities.';
    }
    
    // Homestay
    if (input.includes('homestay') || input.includes('stay') || input.includes('होमस्टे')) {
      return 'Our homestays offer authentic tribal village experience with local families. The Forest Homestay Experience (₹2,800 for 2 days) includes traditional meals, cultural activities, and nature walks. All homestays are verified and provide clean, comfortable accommodation.';
    }
    
    // Location/Travel
    if (input.includes('location') || input.includes('reach') || input.includes('travel') || input.includes('कैसे पहुंचें')) {
      return 'Most experiences are located in Ranchi, Khunti, Gumla, and Lohardaga districts. The nearest airport is Ranchi (Birsa Munda Airport). We can arrange transportation from major cities. Would you like specific directions to any location?';
    }
    
    // Default response
    return 'I can help you with Jatra experiences, bookings, marketplace items, homestays, Eco Points, and travel information in Hindi and English. What would you like to know more about? / मैं जात्रा के अनुभव, बुकिंग, मार्केटप्लेस, होमस्टे और यात्रा की जानकारी में आपकी मदद कर सकता हूं। आप क्या जानना चाहेंगे?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          size="icon"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-96 bg-card border border-border rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">Jatra AI Assistant</h3>
                <p className="text-xs text-primary-foreground/80">Hindi & English Support</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3 h-3 text-primary" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
                <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about experiences, bookings... / अनुभव, बुकिंग के बारे में पूछें..."
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                size="icon"
                className="bg-primary hover:bg-primary-hover"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Supports हिंदी & English
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;