import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, Users, MessageSquare, DollarSign, TrendingUp, Bell } from 'lucide-react';

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

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const stats = [
    { title: 'Total Alumni', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'This Month Events', value: '8', change: '+2', icon: Calendar, color: 'text-green-600' },
    { title: 'Unread Messages', value: '23', change: '+5', icon: MessageSquare, color: 'text-purple-600' },
    { title: 'Total Donations', value: '$45,230', change: '+18%', icon: DollarSign, color: 'text-yellow-600' },
  ];

  const recentEvents = [
    {
      id: 1,
      title: 'Alumni Networking Night',
      date: '2024-10-15',
      time: '6:00 PM',
      location: 'University Hall',
      attendees: 45,
    },
    {
      id: 2,
      title: 'Career Development Workshop',
      date: '2024-10-20',
      time: '2:00 PM',
      location: 'Online',
      attendees: 128,
    },
    {
      id: 3,
      title: 'Homecoming Reunion',
      date: '2024-11-05',
      time: '10:00 AM',
      location: 'Campus Grounds',
      attendees: 312,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'New Mentorship Program Launch',
      content: 'We are excited to announce our new mentorship program connecting recent graduates with industry veterans.',
      time: '2 hours ago',
      important: true,
    },
    {
      id: 2,
      title: 'Alumni Directory Updates',
      content: 'Please update your profile information to help fellow alumni connect with you.',
      time: '1 day ago',
      important: false,
    },
    {
      id: 3,
      title: 'Annual Giving Campaign',
      content: 'Support the next generation of students through our annual giving campaign.',
      time: '3 days ago',
      important: false,
    },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass backdrop-blur-lg border-0 shadow-xl hover-lift">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Welcome back, {user.name}! 👋</h1>
          <p className="text-muted-foreground text-lg mt-2">
            {user.email} • {user.degree} • Class of {user.graduationYear}
          </p>
        </div>
        <Badge variant="secondary" className="w-fit px-4 py-2 text-sm font-semibold rounded-full shadow-lg animate-pulse">
          {user.role === 'admin' ? '🔧 Administrator' : '🎓 Alumni Member'}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass hover-lift border-0 shadow-xl group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600 font-semibold">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card className="glass hover-lift border-0 shadow-xl group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">📅 Upcoming Events</CardTitle>
              <Button variant="outline" size="sm" onClick={() => onNavigate('events')} 
                      className="hover-lift glass border-0 shadow-md">
                View All
              </Button>
            </div>
            <CardDescription className="text-base">Don't miss these upcoming alumni events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvents.map((event, index) => (
              <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-xl glass hover-lift group transition-all duration-300"
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-1 space-y-2">
                  <p className="font-semibold text-lg group-hover:text-blue-600 transition-colors">{event.title}</p>
                  <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <span className="flex items-center gap-1">
                      📅 {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      🕐 {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      📍 {event.location}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="px-3 py-1 rounded-full shadow-md">
                  👥 {event.attendees} attending
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="glass hover-lift border-0 shadow-xl group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">🔔 Recent Announcements</CardTitle>
              <Bell className="h-6 w-6 text-muted-foreground animate-pulse" />
            </div>
            <CardDescription className="text-base">Stay updated with the latest news</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={announcement.id} className="space-y-3 p-4 border rounded-xl glass hover-lift group transition-all duration-300"
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                    {announcement.important ? '⚠️ ' : '📢 '}{announcement.title}
                  </h4>
                  {announcement.important && (
                    <Badge variant="destructive" className="text-xs animate-pulse shadow-lg">
                      Important
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{announcement.content}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  🕐 {announcement.time}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass hover-lift border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">⚡ Quick Actions</CardTitle>
          <CardDescription className="text-base">Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Button variant="outline" onClick={() => onNavigate('profile')} 
                    className="h-24 flex-col gap-3 glass border-0 hover-lift shadow-lg group">
              <Users className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Update Profile</span>
            </Button>
            <Button variant="outline" onClick={() => onNavigate('directory')} 
                    className="h-24 flex-col gap-3 glass border-0 hover-lift shadow-lg group">
              <Users className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Find Alumni</span>
            </Button>
            <Button variant="outline" onClick={() => onNavigate('events')} 
                    className="h-24 flex-col gap-3 glass border-0 hover-lift shadow-lg group">
              <Calendar className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Browse Events</span>
            </Button>
            <Button variant="outline" onClick={() => onNavigate('donations')} 
                    className="h-24 flex-col gap-3 glass border-0 hover-lift shadow-lg group">
              <DollarSign className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Make Donation</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}