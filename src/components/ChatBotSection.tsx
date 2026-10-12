import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  MessageSquareText,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  Dna,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

interface ChatBotSectionProps {
  currentCycleDay?: number;
  lastPh?: number;
  onNavigateToClinics: () => void;
}

export const ChatBotSection: React.FC<ChatBotSectionProps> = ({
  currentCycleDay = 14,
  lastPh = 4.2,
  onNavigateToClinics,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: '¡Hola! Soy PurIA, tu asistente de biotecnología y salud femenina desarrollada para PHurity en Aguascalientes, México. Puedo responder tus dudas sobre el color de tu panty, cambios en tu pH vaginal, fases del ciclo menstrual o clínicas cercanas.',
      timestamp: 'Ahora',
      quickQuestions: [
        '¿Por qué mi panty se puso verde turquesa?',
        '¿Qué significa un pH 3.8 - 4.2?',
        '¿El indicador colorimétrico es dañino para la piel?',
        '¿Cómo afecta la ovulación al pH?',
        '¿Dónde hay clínicas en Aguascalientes?',
      ],
    },
  ]);

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: newHistory.map((m) => ({ sender: m.sender, text: m.text })),
          userProfile: {
            cycleDay: currentCycleDay,
            lastPh: lastPh,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Error en el servicio de chat');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: data.reply || 'He recibido tu mensaje. Recuerda verificar el color en tu tira PHurity.',
        timestamp: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      console.error(error);
      // Fallback answers for frequent questions
      let fallbackText =
        'El pH vaginal saludable oscila entre 3.8 y 4.5. Si observas tonos verdosos (pH > 5.0) en tu panty PHurity o tienes molestias, te sugerimos agendar una cita con tu ginecóloga en Aguascalientes.';

      if (query.toLowerCase().includes('verde') || query.toLowerCase().includes('turquesa')) {
        fallbackText =
          'El color verde turquesa (pH ~5.2 o superior) indica que el medio vaginal ha perdido acidez protectora. Esto suele asociarse a una disminución de lactobacilos y posible Vaginosis Bacteriana (Gardnerella) o presencia de semen/sangre. Te sugerimos no aplicar duchas vaginales y consultar una clínica en Aguascalientes.';
      } else if (query.toLowerCase().includes('dañin') || query.toLowerCase().includes('tóxic') || query.toLowerCase().includes('seguro')) {
        fallbackText =
          '¡Es 100% seguro! La biotecnología de PHurity desarrollada en Aguascalientes utiliza matrices colorimétricas biocompatibles de grado dermatológico que no liberan sustancias ni irritan la piel o mucosa vulvar.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-err-' + Date.now(),
          sender: 'bot',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="chat-main-view">
      {/* Bot Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-rose-200">
              <Bot className="w-7 h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">PurIA</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200 uppercase tracking-wide">
                Gemini 3.8 Flash • Biotech
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Asistente de orientación ginecológica y biosensor PHurity en Aguascalientes
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToClinics}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors shrink-0"
        >
          <span>Buscar Clínicas Ags</span>
        </button>
      </div>

      {/* CHAT CONTAINER */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4" id="chat-messages-container">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-xs'
                      : 'bg-rose-600 text-white rounded-tr-xs shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Quick question chips if present */}
                  {msg.quickQuestions && msg.quickQuestions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 block">
                        Preguntas frecuentes para tocar directamente:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.quickQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(q)}
                            className="text-left px-2.5 py-1.5 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-700 text-xs font-medium transition-colors shadow-2xs"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className={`mt-1.5 text-[10px] text-right ${
                      isBot ? 'text-slate-400' : 'text-rose-100'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 text-xs text-slate-500 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-500" />
                <span>PurIA está consultando la base de biotecnología...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR */}
        <div className="p-3 sm:p-4 bg-slate-50/90 border-t border-rose-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Escribe tu duda sobre tu panty PHurity, pH, síntomas o ciclo..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-2xs"
              id="input-chat-query"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
              id="btn-send-chat"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Preguntar</span>
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-500" />
            PurIA es una herramienta educativa y de apoyo que no reemplaza un diagnóstico ginecológico profesional.
          </p>
        </div>
      </div>
    </div>
  );
};
