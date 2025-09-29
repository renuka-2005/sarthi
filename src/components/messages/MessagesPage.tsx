import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Send, 
  Search, 
  MoreVertical,
  MessageSquare,
  Bell,
  Pin,
  Archive,
  Star
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'alumni';
  graduationYear: string;
  degree: string;
  company?: string;
  location?: string;
  profileImage?: string | null;
}

interface MessagesPageProps {
  user: User;
}

export function MessagesPage({ user }: MessagesPageProps) {
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      lastMessage: 'Thanks for the mentorship advice! I really appreciate it.',
      time: '2m ago',
      unread: 2,
      profileImage: null,
      online: true,
    },
    {
      id: '2',
      name: 'Alumni Networking Group',
      lastMessage: 'Michael: Looking forward to the event next week!',
      time: '1h ago',
      unread: 0,
      profileImage: null,
      online: false,
      isGroup: true,
    },
    {
      id: '3',
      name: 'David Kim',
      lastMessage: 'I saw your post about the job opening. Is it still available?',
      time: '3h ago',
      unread: 1,
      profileImage: null,
      online: false,
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      lastMessage: 'Great meeting you at the networking event!',
      time: '1d ago',
      unread: 0,
      profileImage: null,
      online: false,
    },
    {
      id: '5',
      name: 'Class of 2020 Group',
      lastMessage: 'Lisa: Who\'s organizing the reunion this year?',
      time: '2d ago',
      unread: 5,
      profileImage: null,
      online: false,
      isGroup: true,
    },
  ];

  const messages = {
    '1': [
      {
        id: '1',
        senderId: 'sarah',
        senderName: 'Sarah Johnson',
        content: 'Hi! I saw your profile and noticed you work at Google. I\'m currently looking for opportunities in tech.',
        timestamp: '2024-09-29T10:00:00Z',
        isCurrentUser: false,
      },
      {
        id: '2',
        senderId: user.id,
        senderName: user.name,
        content: 'Hi Sarah! I\'d be happy to help. What specific role are you interested in?',
        timestamp: '2024-09-29T10:05:00Z',
        isCurrentUser: true,
      },
      {
        id: '3',
        senderId: 'sarah',
        senderName: 'Sarah Johnson',
        content: 'I\'m particularly interested in software engineering roles, especially in AI/ML.',
        timestamp: '2024-09-29T10:10:00Z',
        isCurrentUser: false,
      },
      {
        id: '4',
        senderId: user.id,
        senderName: user.name,
        content: 'That\'s great! We actually have several openings in that area. I can refer you if you\'re interested. Do you have your resume ready?',
        timestamp: '2024-09-29T10:15:00Z',
        isCurrentUser: true,
      },
      {
        id: '5',
        senderId: 'sarah',
        senderName: 'Sarah Johnson',
        content: 'Thanks for the mentorship advice! I really appreciate it.',
        timestamp: '2024-09-29T10:20:00Z',
        isCurrentUser: false,
      },
    ],
    '2': [
      {
        id: '1',
        senderId: 'admin',
        senderName: 'Group Admin',
        content: 'Welcome to the Alumni Networking Group! This is a space for professional networking and collaboration.',
        timestamp: '2024-09-28T09:00:00Z',
        isCurrentUser: false,
      },
      {
        id: '2',
        senderId: 'michael',
        senderName: 'Michael Chen',
        content: 'Looking forward to the event next week!',
        timestamp: '2024-09-29T09:00:00Z',
        isCurrentUser: false,
      },
    ],
  };

  const currentMessages = messages[selectedConversation] || [];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mock sending message - in real app, this would call an API
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Messages</h1>
          <p className="text-muted-foreground">Connect with fellow alumni</p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[550px]">
              <div className="space-y-1 p-4">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id
                        ? 'bg-accent'
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.profileImage} />
                          <AvatarFallback>
                            {conversation.isGroup ? '👥' : conversation.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && !conversation.isGroup && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.name}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">{conversation.time}</span>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="text-xs min-w-5 h-5">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedConv ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedConv.profileImage} />
                      <AvatarFallback>
                        {selectedConv.isGroup ? '👥' : selectedConv.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedConv.name}</CardTitle>
                      <CardDescription>
                        {selectedConv.isGroup ? `Group • ${selectedConv.unread + 3} members` : 
                         selectedConv.online ? 'Online' : 'Last seen 2h ago'}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col h-[520px] p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.map((msg, index) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${msg.isCurrentUser ? 'order-last' : ''}`}>
                          {!msg.isCurrentUser && (
                            <p className="text-xs text-muted-foreground mb-1">{msg.senderName}</p>
                          )}
                          <div
                            className={`p-3 rounded-lg ${
                              msg.isCurrentUser
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p>{msg.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <Separator />
                
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Announcements
          </CardTitle>
          <CardDescription>Latest updates from the alumni association</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'New Mentorship Program Launch',
                content: 'We are excited to announce our new mentorship program connecting recent graduates with industry veterans.',
                time: '2 hours ago',
                important: true,
              },
              {
                title: 'Alumni Directory Updates',
                content: 'Please update your profile information to help fellow alumni connect with you.',
                time: '1 day ago',
                important: false,
              },
              {
                title: 'Upcoming Networking Event',
                content: 'Join us for our monthly networking event on October 15th at University Hall.',
                time: '3 days ago',
                important: false,
              },
            ].map((announcement, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{announcement.title}</h4>
                  {announcement.important && (
                    <Badge variant="destructive">Important</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                <p className="text-xs text-muted-foreground">{announcement.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}