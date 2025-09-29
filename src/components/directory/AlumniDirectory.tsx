import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Search, MapPin, Building, Calendar, Mail, Linkedin, Github, Filter, Users, Star, Award, Briefcase } from 'lucide-react';

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

interface AlumniDirectoryProps {
  currentUser: User;
}

export function AlumniDirectory({ currentUser }: AlumniDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    graduationYear: 'all',
    degree: 'all',
    company: 'all',
    location: 'all',
    mentorshipAvailable: false,
  });
  const [sortBy, setSortBy] = useState('name');

  // Simulate loading when search changes
  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  // Mock alumni data
  const mockAlumni = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      graduationYear: '2018',
      degree: 'Computer Science',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b9b155ca?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/sarahjohnson',
      github: 'https://github.com/sarahjohnson',
      bio: 'Passionate about AI and machine learning. Looking to mentor new graduates and share knowledge about cutting-edge technology.',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'React'],
      isVerified: true,
      rating: 4.9,
      mentorshipAvailable: true,
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      graduationYear: '2020',
      degree: 'Business Administration',
      company: 'Microsoft',
      position: 'Product Manager',
      location: 'Seattle, WA',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/michaelchen',
      github: null,
      bio: 'Leading product development for cloud services. Open to networking and collaboration on innovative projects.',
      skills: ['Product Management', 'Strategy', 'Analytics', 'Leadership'],
      isVerified: true,
      rating: 4.8,
      mentorshipAvailable: true,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      graduationYear: '2019',
      degree: 'Marketing',
      company: 'Startup Inc',
      position: 'VP Marketing',
      location: 'Austin, TX',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/emilyrodriguez',
      github: null,
      bio: 'Building brands and growing companies. Always happy to help fellow alumni with career advice and marketing strategies.',
      skills: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking', 'Content Marketing'],
      isVerified: false,
      rating: 4.7,
      mentorshipAvailable: true,
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@email.com',
      graduationYear: '2017',
      degree: 'Engineering',
      company: 'Tesla',
      position: 'Principal Engineer',
      location: 'Palo Alto, CA',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/davidkim',
      github: 'https://github.com/davidkim',
      bio: 'Working on sustainable transportation. Love to discuss innovative engineering solutions and green technology.',
      skills: ['Automotive Engineering', 'Sustainability', 'Innovation', 'Team Leadership'],
      isVerified: true,
      rating: 4.9,
      mentorshipAvailable: false,
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      graduationYear: '2021',
      degree: 'Data Science',
      company: 'Netflix',
      position: 'Data Scientist',
      location: 'Los Gatos, CA',
      profileImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/lisawang',
      github: 'https://github.com/lisawang',
      bio: 'Analyzing user behavior to improve content recommendations. Interested in mentoring data science students.',
      skills: ['Data Science', 'Python', 'Machine Learning', 'Statistics'],
      isVerified: true,
      rating: 4.8,
      mentorshipAvailable: true,
    },
    {
      id: '6',
      name: 'James Thompson',
      email: 'james.thompson@email.com',
      graduationYear: '2016',
      degree: 'Finance',
      company: 'Goldman Sachs',
      position: 'Investment Director',
      location: 'New York, NY',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/jamesthompson',
      github: null,
      bio: 'Managing investment portfolios and financial strategies. Happy to discuss finance career paths and investment opportunities.',
      skills: ['Investment Banking', 'Financial Analysis', 'Portfolio Management', 'Risk Assessment'],
      isVerified: true,
      rating: 4.9,
      mentorshipAvailable: true,
    },
    {
      id: '7',
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      graduationYear: '2019',
      degree: 'Computer Science',
      company: 'Apple',
      position: 'iOS Developer',
      location: 'Cupertino, CA',
      profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/priyapatel',
      github: 'https://github.com/priyapatel',
      bio: 'Creating amazing user experiences on iOS. Passionate about mobile development and user interface design.',
      skills: ['iOS Development', 'Swift', 'UI/UX Design', 'Mobile Architecture'],
      isVerified: true,
      rating: 4.8,
      mentorshipAvailable: true,
    },
    {
      id: '8',
      name: 'Robert Martinez',
      email: 'robert.martinez@email.com',
      graduationYear: '2015',
      degree: 'MBA',
      company: 'Amazon',
      position: 'Senior Operations Manager',
      location: 'Austin, TX',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/robertmartinez',
      github: null,
      bio: 'Optimizing supply chain operations at scale. Always interested in discussing logistics and operational excellence.',
      skills: ['Operations Management', 'Supply Chain', 'Logistics', 'Process Optimization'],
      isVerified: false,
      rating: 4.6,
      mentorshipAvailable: true,
    },
    {
      id: '9',
      name: 'Amanda Foster',
      email: 'amanda.foster@email.com',
      graduationYear: '2022',
      degree: 'Design',
      company: 'Figma',
      position: 'Product Designer',
      location: 'San Francisco, CA',
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/amandafoster',
      github: 'https://github.com/amandafoster',
      bio: 'Designing tools that empower creativity. Love to collaborate on design thinking and user experience projects.',
      skills: ['Product Design', 'UI/UX', 'Design Systems', 'Prototyping'],
      isVerified: true,
      rating: 4.9,
      mentorshipAvailable: true,
    },
    {
      id: '10',
      name: 'Kevin Zhang',
      email: 'kevin.zhang@email.com',
      graduationYear: '2020',
      degree: 'Computer Science',
      company: 'Meta',
      position: 'Software Engineer',
      location: 'Menlo Park, CA',
      profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/kevinzhang',
      github: 'https://github.com/kevinzhang',
      bio: 'Building social experiences that connect people worldwide. Interested in distributed systems and scalable architecture.',
      skills: ['Full Stack Development', 'React', 'Node.js', 'System Design'],
      isVerified: true,
      rating: 4.7,
      mentorshipAvailable: false,
    },
    {
      id: '11',
      name: 'Rachel Green',
      email: 'rachel.green@email.com',
      graduationYear: '2018',
      degree: 'Psychology',
      company: 'LinkedIn',
      position: 'UX Researcher',
      location: 'San Francisco, CA',
      profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/rachelgreen',
      github: null,
      bio: 'Understanding user behavior to create better digital experiences. Passionate about human-centered design.',
      skills: ['UX Research', 'User Testing', 'Data Analysis', 'Design Thinking'],
      isVerified: true,
      rating: 4.8,
      mentorshipAvailable: true,
    },
    {
      id: '12',
      name: 'Carlos Rivera',
      email: 'carlos.rivera@email.com',
      graduationYear: '2017',
      degree: 'Marketing',
      company: 'Airbnb',
      position: 'Growth Marketing Manager',
      location: 'San Francisco, CA',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      linkedIn: 'https://linkedin.com/in/carlosrivera',
      github: null,
      bio: 'Driving user acquisition and engagement through data-driven marketing strategies. Love sharing growth hacking techniques.',
      skills: ['Growth Marketing', 'Digital Advertising', 'A/B Testing', 'Analytics'],
      isVerified: false,
      rating: 4.6,
      mentorshipAvailable: true,
    },
  ];

  const filteredAlumni = useMemo(() => {
    let result = mockAlumni.filter((alumni) => {
      const matchesSearch = 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilters = 
        (!filters.graduationYear || filters.graduationYear === 'all' || alumni.graduationYear === filters.graduationYear) &&
        (!filters.degree || filters.degree === 'all' || alumni.degree.toLowerCase().includes(filters.degree.toLowerCase())) &&
        (!filters.company || filters.company === 'all' || alumni.company.toLowerCase().includes(filters.company.toLowerCase())) &&
        (!filters.location || filters.location === 'all' || alumni.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.mentorshipAvailable || alumni.mentorshipAvailable);

      return matchesSearch && matchesFilters;
    });

    // Sort results
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'year':
          return parseInt(b.graduationYear) - parseInt(a.graduationYear);
        case 'rating':
          return b.rating - a.rating;
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, filters, sortBy]);

  const uniqueYears = [...new Set(mockAlumni.map(a => a.graduationYear))].sort().reverse();
  const uniqueDegrees = [...new Set(mockAlumni.map(a => a.degree))].sort();
  const uniqueCompanies = [...new Set(mockAlumni.map(a => a.company))].sort();
  const uniqueLocations = [...new Set(mockAlumni.map(a => a.location.split(',')[1]?.trim() || a.location))].sort();

  const handleConnect = (alumni: any, type: 'email' | 'linkedin') => {
    if (type === 'email') {
      window.open(`mailto:${alumni.email}?subject=Connection Request from ${currentUser.name}`);
    } else if (type === 'linkedin' && alumni.linkedIn) {
      window.open(alumni.linkedIn, '_blank');
    }
  };

  // Loading Skeleton Component
  const AlumniCardSkeleton = () => (
    <Card className="glass border-0 shadow-xl animate-pulse">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-full skeleton"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 skeleton rounded w-3/4"></div>
            <div className="h-4 skeleton rounded w-1/2"></div>
            <div className="h-4 skeleton rounded w-2/3"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 skeleton rounded"></div>
          <div className="h-4 skeleton rounded w-4/5"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 skeleton rounded w-16"></div>
          <div className="h-6 skeleton rounded w-16"></div>
          <div className="h-6 skeleton rounded w-16"></div>
        </div>
        <div className="h-10 skeleton rounded"></div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass backdrop-blur-lg border-0 shadow-xl hover-lift">
        <div>
          <h1 className="text-4xl font-bold gradient-text">👥 Alumni Directory</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Connect with {mockAlumni.length} alumni from your university
          </p>
        </div>
        <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold rounded-full shadow-lg animate-pulse">
          🔍 {filteredAlumni.length} results
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass hover-lift border-0 shadow-lg text-center p-4">
          <div className="text-2xl font-bold gradient-text">{mockAlumni.length}</div>
          <div className="text-sm text-muted-foreground font-medium">Total Alumni</div>
        </Card>
        <Card className="glass hover-lift border-0 shadow-lg text-center p-4">
          <div className="text-2xl font-bold gradient-text">{mockAlumni.filter(a => a.mentorshipAvailable).length}</div>
          <div className="text-sm text-muted-foreground font-medium">Available Mentors</div>
        </Card>
        <Card className="glass hover-lift border-0 shadow-lg text-center p-4">
          <div className="text-2xl font-bold gradient-text">{uniqueCompanies.length}</div>
          <div className="text-sm text-muted-foreground font-medium">Companies</div>
        </Card>
        <Card className="glass hover-lift border-0 shadow-lg text-center p-4">
          <div className="text-2xl font-bold gradient-text">{uniqueLocations.length}</div>
          <div className="text-sm text-muted-foreground font-medium">Locations</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="glass hover-lift border-0 shadow-xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary)' }}>
              <Search className="h-5 w-5 text-white" />
            </div>
            <span className="gradient-text">Search & Filter Alumni</span>
          </CardTitle>
          <CardDescription className="text-base">
            Find the perfect alumni connections using our advanced search filters
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 relative z-10">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
            <Input
              placeholder="🔍 Search by name, company, degree, position, or skills..."
              className="pl-12 pr-4 py-3 text-base glass border-0 shadow-lg focus:shadow-xl transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Graduation Year
              </label>
              <Select
                value={filters.graduationYear}
                onValueChange={(value) => setFilters({ ...filters, graduationYear: value })}
              >
                <SelectTrigger className="glass border-0 shadow-md hover:shadow-lg transition-shadow">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {uniqueYears.map((year) => (
                    <SelectItem key={year} value={year}>Class of {year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Award className="h-4 w-4" />
                Degree
              </label>
              <Select
                value={filters.degree}
                onValueChange={(value) => setFilters({ ...filters, degree: value })}
              >
                <SelectTrigger className="glass border-0 shadow-md hover:shadow-lg transition-shadow">
                  <SelectValue placeholder="All Degrees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Degrees</SelectItem>
                  {uniqueDegrees.map((degree) => (
                    <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company
              </label>
              <Select
                value={filters.company}
                onValueChange={(value) => setFilters({ ...filters, company: value })}
              >
                <SelectTrigger className="glass border-0 shadow-md hover:shadow-lg transition-shadow">
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {uniqueCompanies.map((company) => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </label>
              <Select
                value={filters.location}
                onValueChange={(value) => setFilters({ ...filters, location: value })}
              >
                <SelectTrigger className="glass border-0 shadow-md hover:shadow-lg transition-shadow">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sort and Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ graduationYear: 'all', degree: 'all', company: 'all', location: 'all', mentorshipAvailable: false });
                }}
                className="hover-lift glass border-0 shadow-md flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear All Filters
              </Button>
              
              <Button
                variant={filters.mentorshipAvailable ? "default" : "outline"}
                onClick={() => setFilters({ ...filters, mentorshipAvailable: !filters.mentorshipAvailable })}
                className={`hover-lift glass border-0 shadow-md flex items-center gap-2 ${
                  filters.mentorshipAvailable 
                    ? 'text-white' 
                    : 'bg-green-50 text-green-700 border-green-200'
                }`}
                style={filters.mentorshipAvailable ? { background: 'var(--primary)' } : {}}
              >
                <Briefcase className="h-4 w-4" />
                {filters.mentorshipAvailable ? 'Showing Mentors' : 'Mentors Only'}
              </Button>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-muted-foreground">Sort by:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 glass border-0 shadow-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="year">Graduation Year</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <AlumniCardSkeleton key={index} />
          ))
        ) : (
          filteredAlumni.map((alumni, index) => (
          <Card key={alumni.id} className="glass hover-lift border-0 shadow-xl group animate-scale-in overflow-hidden relative"
                style={{ animationDelay: `${index * 0.1}s` }}>
            
            {/* Gradient overlay for enhanced visuals */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-white/20 shadow-lg">
                    <AvatarImage src={alumni.profileImage} className="object-cover" />
                    <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {alumni.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {alumni.isVerified && (
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {alumni.name}
                    </CardTitle>
                    {alumni.mentorshipAvailable && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        Mentor
                      </Badge>
                    )}
                  </div>
                  
                  <CardDescription className="font-medium text-base">
                    {alumni.position}
                  </CardDescription>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">{alumni.company}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-muted-foreground">{alumni.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{alumni.bio}</p>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {alumni.skills.slice(0, 3).map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {skill}
                  </Badge>
                ))}
                {alumni.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{alumni.skills.length - 3} more
                  </Badge>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">Class of {alumni.graduationYear}</span>
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                    {alumni.degree}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">{alumni.location}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-3">
                <Button
                  size="sm"
                  className="flex-1 hover-lift shadow-md"
                  style={{ background: 'var(--primary)' }}
                  onClick={() => handleConnect(alumni, 'email')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Connect
                </Button>
                
                <div className="flex gap-2">
                  {alumni.linkedIn && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover-lift glass border-0 shadow-md"
                      onClick={() => handleConnect(alumni, 'linkedin')}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                  {alumni.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover-lift glass border-0 shadow-md"
                      onClick={() => window.open(alumni.github, '_blank')}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Mentorship indicator */}
              {alumni.mentorshipAvailable && (
                <div className="flex items-center gap-2 pt-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                  <Briefcase className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Available for mentorship</span>
                </div>
              )}
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {filteredAlumni.length === 0 && (
        <Card className="glass hover-lift border-0 shadow-xl">
          <CardContent className="text-center py-16">
            <div className="h-24 w-24 mx-auto mb-6 rounded-full flex items-center justify-center glass"
                 style={{ background: 'var(--primary)' }}>
              <Users className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 gradient-text">No Alumni Found</h3>
            <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
              We couldn't find any alumni matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ graduationYear: '', degree: '', company: '', location: '', mentorshipAvailable: false });
                }}
                className="hover-lift glass border-0 shadow-md"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
              <Button
                variant="outline"
                className="hover-lift glass border-0 shadow-md"
                onClick={() => setSearchTerm('')}
              >
                <Search className="h-4 w-4 mr-2" />
                Clear Search
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="lg"
          className="h-16 w-16 rounded-full shadow-2xl hover-lift group"
          style={{ background: 'var(--primary)' }}
        >
          <Users className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    </div>
  );
}