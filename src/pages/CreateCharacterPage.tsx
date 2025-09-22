import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

export default function CreateCharacterPage() {
  const navigate = useNavigate();
  const [characterData, setCharacterData] = useState({
    name: '',
    description: '',
    personality: '',
    greeting: '',
    category: '',
    image: ''
  });

  const categories = [
    'Sci-Fi', 'Фэнтези', 'Роботы', 'Помощники', 'Аниме', 
    'Игры', 'Фильмы', 'Книги', 'Образование', 'Развлечения'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь была бы отправка данных на сервер
    console.log('Создание персонажа:', characterData);
    // Перенаправление на главную страницу после создания
    navigate('/');
  };

  const personalityTemplates = [
    {
      name: 'Дружелюбный помощник',
      description: 'Всегда готов помочь, позитивный и вежливый',
      personality: 'Дружелюбный, готовый помочь, позитивный, терпеливый. Всегда отвечает вежливо и старается быть максимально полезным.'
    },
    {
      name: 'Мудрый наставник',
      description: 'Опытный, мудрый, дает советы',
      personality: 'Мудрый, опытный, терпеливый наставник. Говорит глубоко и вдумчиво, дает ценные советы и помогает размышлять над сложными вопросами.'
    },
    {
      name: 'Веселый компаньон',
      description: 'Энергичный, шутливый, поднимает настроение',
      personality: 'Веселый, энергичный, любит шутить и поднимать настроение. Общается легко и непринужденно, всегда найдет повод для улыбки.'
    }
  ];

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
              <h1 className="text-2xl font-bold text-white">Создать персонажа</h1>
            </div>
            
            <Button 
              onClick={handleSubmit}
              disabled={!characterData.name || !characterData.description}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Icon name="Sparkles" className="mr-2" size={16} />
              Создать
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Основная информация
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Задайте имя, описание и категорию для вашего персонажа
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Имя персонажа *
                  </label>
                  <Input
                    placeholder="Например: Алиса, Киберрон, Мерлин..."
                    value={characterData.name}
                    onChange={(e) => setCharacterData({...characterData, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Краткое описание *
                  </label>
                  <Input
                    placeholder="Опишите персонажа в одном предложении..."
                    value={characterData.description}
                    onChange={(e) => setCharacterData({...characterData, description: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Категория
                  </label>
                  <Select value={characterData.category} onValueChange={(value) => setCharacterData({...characterData, category: value})}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Personality */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Brain" size={20} />
                  Личность и характер
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Определите, как ваш персонаж будет общаться и вести себя
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Personality Templates */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Быстрые шаблоны
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {personalityTemplates.map((template, index) => (
                      <Card 
                        key={index} 
                        className="bg-white/5 border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => setCharacterData({...characterData, personality: template.personality})}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-medium text-white mb-1">{template.name}</h4>
                          <p className="text-xs text-gray-400">{template.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Подробное описание личности
                  </label>
                  <Textarea
                    placeholder="Опишите характер, манеру речи, интересы персонажа..."
                    value={characterData.personality}
                    onChange={(e) => setCharacterData({...characterData, personality: e.target.value})}
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Первое сообщение
                  </label>
                  <Textarea
                    placeholder="Как персонаж будет приветствовать пользователей..."
                    value={characterData.greeting}
                    onChange={(e) => setCharacterData({...characterData, greeting: e.target.value})}
                    rows={3}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            {(characterData.name || characterData.description) && (
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Eye" size={20} />
                    Предварительный просмотр
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <Icon name="User" size={32} className="text-white" />
                      </div>
                      <CardTitle className="text-white text-xl">{characterData.name || 'Имя персонажа'}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {characterData.description || 'Описание персонажа'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {characterData.category && (
                        <Badge variant="outline" className="border-purple-400 text-purple-400">
                          {characterData.category}
                        </Badge>
                      )}
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                        <Icon name="MessageCircle" className="mr-2" size={16} />
                        Начать чат
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Icon name="Lightbulb" size={20} />
                  Советы по созданию персонажа
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-200 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                    Дайте персонажу уникальную личность и манеру речи
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                    Определите область знаний или специализацию
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                    Создайте интересное первое сообщение
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                    Будьте конкретными в описании характера
                  </li>
                </ul>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}