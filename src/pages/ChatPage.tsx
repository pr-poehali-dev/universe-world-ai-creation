import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
  personality: string;
  greeting: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const characters: Character[] = [
  {
    id: 1,
    name: "Aurora",
    description: "Мистический ИИ-помощник из будущего",
    image: "/img/bcfda77e-4536-4a8e-9c48-898c5144622f.jpg",
    personality: "Мудрая, загадочная, всегда готова помочь с любыми вопросами. Обладает знаниями из будущего.",
    greeting: "Приветствую, путешественник времени! Я Aurora, ваш проводник через цифровые измерения. Что привело вас в мою вселенную сегодня?"
  },
  {
    id: 2,
    name: "Cybron",
    description: "Дружелюбный робот-компаньон",
    image: "/img/e4ca0596-60e3-4f71-86ee-cf1c2e5d09aa.jpg",
    personality: "Дружелюбный, технически подкованный, всегда оптимистичен. Любит помогать с техническими вопросами.",
    greeting: "Системы запущены! Привет, друг! Я Cybron, ваш персональный робот-помощник. Готов помочь вам с любыми задачами!"
  },
  {
    id: 3,
    name: "Мерлин",
    description: "Древний маг с безграничной мудростью",
    image: "/img/75f0b2fd-c576-49b0-b613-fd81d2d26efb.jpg",
    personality: "Мудрый, терпеливый, говорит загадками. Обладает древними знаниями и магической силой.",
    greeting: "Добро пожаловать, юный искатель мудрости. Я Мерлин, хранитель древних тайн. Какие знания вы ищете в моей башне?"
  }
];

export default function ChatPage() {
  const { characterId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const character = characters.find(c => c.id === parseInt(characterId || '1'));

  useEffect(() => {
    if (character) {
      setMessages([{
        id: '1',
        text: character.greeting,
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [character]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userMessage: string, characterName: string): string => {
    const responses: { [key: string]: string[] } = {
      'Aurora': [
        "Интересный вопрос... В моих банках данных будущего есть информация об этом.",
        "Сканирую временные потоки... Вижу несколько возможных путей развития событий.",
        "Мои голографические процессоры анализируют ваш запрос. Позвольте поделиться мудростью будущего.",
        "Данные получены из квантовой сети. Позвольте объяснить это с точки зрения продвинутых технологий."
      ],
      'Cybron': [
        "Обрабатываю ваш запрос... Системы дружелюбия активированы! Вот что я думаю:",
        "Мои сенсоры показывают, что это отличный вопрос! Позвольте применить логические алгоритмы.",
        "Запуск программы помощи... Готов предоставить техническую поддержку!",
        "Анализ завершен! Мои схемы оптимизма предлагают следующее решение:"
      ],
      'Мерлин': [
        "Хм... древние тексты говорят об этом так:",
        "Позвольте старому магу поделиться мудростью веков...",
        "В моих свитках есть упоминание о подобном. Слушайте внимательно:",
        "Магический кристалл показывает мне ответ... Терпение, юный ученик."
      ]
    };

    const characterResponses = responses[characterName] || responses['Aurora'];
    return characterResponses[Math.floor(Math.random() * characterResponses.length)];
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !character) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(newMessage, character.name),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="p-6 bg-white/10 border-white/20">
          <p className="text-white">Персонаж не найден</p>
          <Button asChild className="mt-4">
            <Link to="/">Вернуться на главную</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Link to="/">
                  <Icon name="ArrowLeft" size={20} />
                </Link>
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{character.name}</h1>
                  <p className="text-sm text-gray-300">{character.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-green-400 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Онлайн
              </Badge>
              
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="container mx-auto px-4 pb-24 pt-6">
        <div className="max-w-4xl mx-auto">
          {/* Character Info */}
          <Card className="mb-6 bg-white/10 border-white/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">О персонаже</h3>
              <p className="text-gray-300">{character.personality}</p>
            </div>
          </Card>

          {/* Messages */}
          <div className="space-y-4 mb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                  {!message.isUser && (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-0.5 flex-shrink-0">
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  )}
                  
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'bg-white/10 text-white border border-white/20'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 opacity-60 ${
                      message.isUser ? 'text-purple-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-0.5 flex-shrink-0">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="bg-white/10 text-white border border-white/20 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  placeholder={`Напишите сообщение ${character.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-12"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white h-8 w-8"
                >
                  <Icon name="Paperclip" size={16} />
                </Button>
              </div>
              
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}