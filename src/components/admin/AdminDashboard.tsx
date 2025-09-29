import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock,
  Search,
  Filter,
  Plus,
  BarChart3,
  PieChart,
  Settings,
  Mail,
  AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

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

interface AdminDashboardProps {
  user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = [
    { title: 'Total Alumni', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Pending Approvals', value: '23', change: '+5', icon: Clock, color: 'text-orange-600' },
    { title: 'This Month Events', value: '8', change: '+2', icon: Calendar, color: 'text-green-600' },
    { title: 'Total Donations', value: '$45,230', change: '+18%', icon: DollarSign, color: 'text-purple-600' },
  ];

  const pendingAlumni = [
    {
      id: '1',
      name: 'Jennifer Smith',
      email: 'jennifer.smith@email.com',
      graduationYear: '2023',
      degree: 'Computer Science',
      submittedAt: '2024-09-28T10:00:00Z',
      documents: ['Diploma', 'ID'],
      status: 'pending',
    },
    {
      id: '2',
      name: 'Robert Johnson',
      email: 'robert.johnson@email.com',
      graduationYear: '2022',
      degree: 'Business Administration',
      submittedAt: '2024-09-27T15:30:00Z',
      documents: ['Diploma'],
      status: 'pending',
    },
    {
      id: '3',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      graduationYear: '2021',
      degree: 'Engineering',
      submittedAt: '2024-09-26T09:15:00Z',
      documents: ['Diploma', 'ID', 'Transcript'],
      status: 'under_review',
    },
  ];

  const engagementData = [
    { month: 'Jan', logins: 1240, events: 45, donations: 890 },
    { month: 'Feb', logins: 1390, events: 52, donations: 920 },
    { month: 'Mar', logins: 1180, events: 38, donations: 1100 },
    { month: 'Apr', logins: 1450, events: 48, donations: 950 },
    { month: 'May', logins: 1620, events: 65, donations: 1250 },
    { month: 'Jun', logins: 1380, events: 42, donations: 980 },
  ];

  const alumniByGradYear = [
    { year: '2020-2024', count: 523, color: '#8884d8' },
    { year: '2015-2019', count: 892, color: '#82ca9d' },
    { year: '2010-2014', count: 756, color: '#ffc658' },
    { year: '2005-2009', count: 445, color: '#ff7c7c' },
    { year: '2000-2004', count: 231, color: '#8dd1e1' },
  ];

  const handleApprove = (alumniId: string) => {
    console.log('Approving alumni:', alumniId);
    // Mock approval logic
  };

  const handleReject = (alumniId: string) => {
    console.log('Rejecting alumni:', alumniId);
    // Mock rejection logic
  };

  const handleSendEmail = (email: string) => {
    console.log('Sending email to:', email);
    // Mock email sending
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage alumni data, events, and system settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="approvals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="events">Event Management</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        {/* Pending Approvals */}
        <TabsContent value="approvals" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Alumni Account Approvals</CardTitle>
                  <CardDescription>Review and approve new alumni registrations</CardDescription>
                </div>
                <Badge variant="destructive">{pendingAlumni.length} pending</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAlumni.map((alumni) => (
                  <Card key={alumni.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {alumni.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="font-medium">{alumni.name}</h4>
                            <p className="text-sm text-muted-foreground">{alumni.email}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Class of {alumni.graduationYear}</span>
                              <span>{alumni.degree}</span>
                              <span>Submitted {new Date(alumni.submittedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs">Documents:</span>
                              {alumni.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={alumni.status === 'pending' ? 'secondary' : 'default'}>
                            {alumni.status.replace('_', ' ')}
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSendEmail(alumni.email)}
                            >
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600"
                              onClick={() => handleReject(alumni.id)}
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(alumni.id)}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Engagement Trends
                </CardTitle>
                <CardDescription>Alumni activity over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="logins" fill="#8884d8" name="Logins" />
                    <Bar dataKey="events" fill="#82ca9d" name="Event Attendance" />
                    <Bar dataKey="donations" fill="#ffc658" name="Donations ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Alumni by Graduation Year
                </CardTitle>
                <CardDescription>Distribution of registered alumni</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={alumniByGradYear}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={(entry) => `${entry.year}: ${entry.count}`}
                    >
                      {alumniByGradYear.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
              <CardDescription>Important platform statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profile Completion Rate</span>
                    <span className="text-sm text-muted-foreground">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Event Attendance Rate</span>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Donation Participation</span>
                    <span className="text-sm text-muted-foreground">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Event Management */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Event Management</CardTitle>
                  <CardDescription>Create and manage alumni events</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Alumni Networking Night', date: '2024-10-15', attendees: 45, status: 'Published' },
                  { name: 'Career Development Workshop', date: '2024-10-20', attendees: 128, status: 'Published' },
                  { name: 'Homecoming Reunion', date: '2024-11-05', attendees: 312, status: 'Draft' },
                ].map((event, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{event.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()} • {event.attendees} registered
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={event.status === 'Published' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communications */}
        <TabsContent value="communications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Send Announcement</CardTitle>
                <CardDescription>Broadcast messages to all alumni</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Enter announcement subject" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="w-full p-3 border rounded-md resize-none"
                    rows={4}
                    placeholder="Enter your announcement message..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="urgent" className="rounded" />
                  <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
                </div>
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Communications</CardTitle>
                <CardDescription>History of sent announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { subject: 'New Mentorship Program Launch', sent: '2 hours ago', recipients: 2847, status: 'Delivered' },
                    { subject: 'Alumni Directory Updates', sent: '1 day ago', recipients: 2847, status: 'Delivered' },
                    { subject: 'Upcoming Networking Event', sent: '3 days ago', recipients: 1234, status: 'Delivered' },
                  ].map((comm, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{comm.subject}</h4>
                        <Badge variant="outline" className="text-xs">{comm.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {comm.sent} • {comm.recipients.toLocaleString()} recipients
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}