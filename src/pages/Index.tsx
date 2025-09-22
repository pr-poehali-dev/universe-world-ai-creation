import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

interface Character {
  id: number
  name: string
  description: string
  image: string
  chats: string
  creator: string
  category: string
}

const characters: Character[] = [
  {
    id: 1,
    name: "Volt",
    description: "Ты заблудилась в лесу и встретила волков",
    image: "/img/fdd35e8a-d42e-4dbd-9197-d400b787507b.jpg",
    chats: "106.2k",
    creator: "@AlnoodSss",
    category: "Фэнтези"
  },
  {
    id: 2,
    name: "Luna",
    description: "Таинственная волшебница из далёких земель",
    image: "/img/5bd48cde-6b03-455f-bf14-38ee1b71c6a9.jpg",
    chats: "95.7k",
    creator: "@MagicWorld",
    category: "Фэнтези"
  },
  {
    id: 3,
    name: "Алан",
    description: "Твой муж устал на работе",
    image: "/img/3719bdb5-ce27-4674-9dc2-c90289b1419f.jpg",
    chats: "87.3k",
    creator: "@LifeStory",
    category: "Повседневность"
  }
]

const categories = ["Для вас", "Рекомендуемое", "Сценарии", "Романтика", "Фэнтези", "Аниме"]

const Index = () => {
  const [activeTab, setActiveTab] = useState("Для вас")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [chatMessages, setChatMessages] = useState<{text: string, isUser: boolean}[]>([])
  const [currentMessage, setCurrentMessage] = useState("")

  const sendMessage = () => {
    if (currentMessage.trim() && selectedCharacter) {
      setChatMessages(prev => [...prev, { text: currentMessage, isUser: true }])
      
      setTimeout(() => {
        const responses = [
          "Привет! Как дела?",
          "Интересно, расскажи больше",
          "Понимаю тебя...",
          "Что ты думаешь об этом?"
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        setChatMessages(prev => [...prev, { text: randomResponse, isUser: false }])
      }, 1000)
      
      setCurrentMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Universe-world.ai</h1>
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-md">НОВЫЙ</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                placeholder="Поиск персонажей..." 
                className="pl-10 w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" size={20} />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">2</Badge>
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeTab === category ? "default" : "ghost"}
              onClick={() => setActiveTab(category)}
              className={`whitespace-nowrap ${
                activeTab === category 
                  ? "bg-gray-900 text-white hover:bg-gray-800" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {category === "Для вас" && <Icon name="Sparkles" size={16} className="mr-2" />}
              {category}
            </Button>
          ))}
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters
            .filter(char => char.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           char.description.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((character) => (
            <Card key={character.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
                  {character.category}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold">{character.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-1">
                      {character.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={14} />
                    <span>{character.chats}</span>
                  </div>
                  <span>{character.creator}</span>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      onClick={() => {
                        setSelectedCharacter(character)
                        setChatMessages([
                          { text: `Привет! Я ${character.name}. ${character.description}`, isUser: false }
                        ])
                      }}
                    >
                      Начать чат
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <img 
                          src={selectedCharacter?.image} 
                          alt={selectedCharacter?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedCharacter?.name}
                      </DialogTitle>
                    </DialogHeader>
                    
                    {/* Chat Interface */}
                    <div className="flex flex-col h-[500px]">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
                        {chatMessages.map((message, index) => (
                          <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isUser 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-900 shadow-sm'
                            }`}>
                              {message.text}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Textarea
                          placeholder="Напишите сообщение..."
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              sendMessage()
                            }
                          }}
                          className="resize-none"
                          rows={2}
                        />
                        <Button 
                          onClick={sendMessage}
                          disabled={!currentMessage.trim()}
                          className="self-end"
                        >
                          <Icon name="Send" size={16} />
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg border px-6 py-3">
          <div className="flex items-center gap-8">
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Icon name="Home" size={20} />
              <span className="text-xs">Главная</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Icon name="Users" size={20} />
              <span className="text-xs">Персонажи</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Icon name="Plus" size={20} />
              <span className="text-xs">Создать</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Icon name="MessageCircle" size={20} />
              <span className="text-xs">Чаты</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Icon name="User" size={20} />
              <span className="text-xs">Профиль</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index