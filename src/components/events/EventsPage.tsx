import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ExternalLink,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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

interface EventsPageProps {
  user: User;
}

export function EventsPage({ user }: EventsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const upcomingEvents = [
    {
      id: '1',
      title: 'Alumni Networking Night',
      description: 'Join us for an evening of networking with fellow alumni. Food and drinks will be provided.',
      date: '2024-10-15',
      time: '6:00 PM - 9:00 PM',
      location: 'University Hall, Room 205',
      type: 'Networking',
      attendees: 45,
      maxAttendees: 100,
      isRegistered: false,
      organizer: 'Alumni Association',
      price: 'Free',
      image: null,
    },
    {
      id: '2',
      title: 'Career Development Workshop',
      description: 'Learn about the latest trends in your industry and develop skills for career advancement.',
      date: '2024-10-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Online (Zoom)',
      type: 'Workshop',
      attendees: 128,
      maxAttendees: 200,
      isRegistered: true,
      organizer: 'Career Services',
      price: '$25',
      image: null,
    },
    {
      id: '3',
      title: 'Homecoming Reunion',
      description: 'Come back to campus for our annual homecoming celebration. Activities include campus tours, football game, and dinner.',
      date: '2024-11-05',
      time: '10:00 AM - 10:00 PM',
      location: 'Campus Grounds',
      type: 'Social',
      attendees: 312,
      maxAttendees: 500,
      isRegistered: false,
      organizer: 'University Events',
      price: '$50',
      image: null,
    },
    {
      id: '4',
      title: 'Tech Talk: AI in Industry',
      description: 'Industry experts discuss the impact of AI on various sectors and career opportunities.',
      date: '2024-10-25',
      time: '7:00 PM - 8:30 PM',
      location: 'Science Building Auditorium',
      type: 'Educational',
      attendees: 89,
      maxAttendees: 150,
      isRegistered: false,
      organizer: 'Computer Science Alumni',
      price: 'Free',
      image: null,
    },
  ];

  const pastEvents = [
    {
      id: '5',
      title: 'Summer Alumni BBQ',
      description: 'A fun outdoor gathering with food, games, and networking.',
      date: '2024-08-15',
      time: '12:00 PM - 4:00 PM',
      location: 'Campus Quad',
      type: 'Social',
      attendees: 156,
      maxAttendees: 200,
      isRegistered: true,
      organizer: 'Alumni Association',
      price: '$15',
      image: null,
    },
    {
      id: '6',
      title: 'Entrepreneurship Panel',
      description: 'Successful alumni entrepreneurs share their journey and insights.',
      date: '2024-07-10',
      time: '6:00 PM - 8:00 PM',
      location: 'Business School',
      type: 'Educational',
      attendees: 78,
      maxAttendees: 100,
      isRegistered: false,
      organizer: 'Business Alumni Network',
      price: 'Free',
      image: null,
    },
  ];

  const handleRegister = (eventId: string) => {
    // Mock registration
    console.log(`Registered for event: ${eventId}`);
  };

  const handleUnregister = (eventId: string) => {
    // Mock unregistration
    console.log(`Unregistered from event: ${eventId}`);
  };

  const filteredUpcomingEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const filteredPastEvents = pastEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <CardDescription className="mt-2">{event.description}</CardDescription>
          </div>
          <Badge variant={isPast ? 'secondary' : 'default'}>
            {event.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.attendees} / {event.maxAttendees} attending</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <span className="font-medium">{event.price}</span>
            <span className="text-sm text-muted-foreground">by {event.organizer}</span>
          </div>
          {!isPast && (
            <div className="flex gap-2">
              {event.isRegistered ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUnregister(event.id)}
                >
                  Unregister
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleRegister(event.id)}
                  disabled={event.attendees >= event.maxAttendees}
                >
                  {event.attendees >= event.maxAttendees ? 'Full' : 'Register'}
                </Button>
              )}
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}
          {isPast && event.isRegistered && (
            <Badge variant="secondary">Attended</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Events</h1>
          <p className="text-muted-foreground">
            Discover and join alumni events and activities
          </p>
        </div>
        {user.role === 'admin' && (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events ({filteredUpcomingEvents.length})</TabsTrigger>
          <TabsTrigger value="past">Past Events ({filteredPastEvents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {filteredUpcomingEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredUpcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No upcoming events found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filters.'
                    : 'Check back later for new events.'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {filteredPastEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredPastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No past events found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filters.'
                    : 'No past events to display.'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Opportunities Section */}
      <Card>
        <CardHeader>
          <CardTitle>Opportunities</CardTitle>
          <CardDescription>Mentorship and job opportunities from the alumni community</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mentorship" className="space-y-4">
            <TabsList>
              <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
              <TabsTrigger value="jobs">Job Postings</TabsTrigger>
              <TabsTrigger value="internships">Internships</TabsTrigger>
            </TabsList>

            <TabsContent value="mentorship" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Find a Mentor</CardTitle>
                    <CardDescription>Connect with experienced alumni in your field</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Browse Mentors</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Become a Mentor</CardTitle>
                    <CardDescription>Share your experience with recent graduates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Volunteer as Mentor</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Recent Job Postings</h3>
                  <Button variant="outline" size="sm">Post a Job</Button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Senior Software Engineer', company: 'Tech Corp', location: 'San Francisco, CA', posted: '2 days ago' },
                    { title: 'Product Manager', company: 'Startup Inc', location: 'Remote', posted: '1 week ago' },
                    { title: 'Data Scientist', company: 'Analytics Co', location: 'New York, NY', posted: '3 days ago' },
                  ].map((job, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                            <p className="text-xs text-muted-foreground">{job.posted}</p>
                          </div>
                          <Button size="sm">Apply</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="internships" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Internship Opportunities</h3>
                  <Button variant="outline" size="sm">Post Internship</Button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Summer Software Engineering Intern', company: 'Big Tech', location: 'Seattle, WA', duration: '12 weeks' },
                    { title: 'Marketing Intern', company: 'Creative Agency', location: 'Los Angeles, CA', duration: '10 weeks' },
                    { title: 'Research Intern', company: 'University Lab', location: 'Boston, MA', duration: '8 weeks' },
                  ].map((internship, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{internship.title}</h4>
                            <p className="text-sm text-muted-foreground">{internship.company} • {internship.location}</p>
                            <p className="text-xs text-muted-foreground">{internship.duration}</p>
                          </div>
                          <Button size="sm">Apply</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}