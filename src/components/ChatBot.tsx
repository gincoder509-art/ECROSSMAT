import { GoogleGenAI } from "@google/genai";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Bonjour ! Je suis l'assistant Ecrossmat. Comment puis-je vous aider aujourd'hui ?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const model = ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [...messages, { role: "user", text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "Tu es l'assistant de vente expert pour Ecrossmat, une boutique en ligne de produits technologiques haut de gamme. Ton ton est professionnel, amical et persuasif. Tu aides les clients à choisir les meilleurs produits (écouteurs, montres connectées, accessoires). Réponds en français."
        }
      });

      const response = await model;
      const text = response.text;
      
      if (text) {
        setMessages(prev => [...prev, { role: "model", text }]);
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: "model", text: "Désolé, j'ai rencontré une petite erreur technique. Pouvez-vous reformuler ?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all z-50 group"
        id="chatbot-trigger"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden"
            id="chatbot-window"
          >
            {/* Header */}
            <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">Assistant Ecrossmat</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-top border-slate-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
