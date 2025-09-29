import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Edit, 
  Save, 
  X, 
  Camera, 
  MapPin, 
  Building, 
  Calendar, 
  Mail, 
  Linkedin, 
  Github,
  Phone,
  Globe
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

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
  bio?: string;
  position?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  phone?: string;
  skills?: string;
  interests?: string;
}

interface ProfilePageProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export function ProfilePage({ user, onUpdateUser }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    bio: user.bio || '',
    graduationYear: user.graduationYear || '',
    degree: user.degree || '',
    company: user.company || '',
    position: user.position || '',
    location: user.location || '',
    linkedIn: user.linkedIn || '',
    github: user.github || '',
    website: user.website || '',
    skills: user.skills || '',
    interests: user.interests || '',
  });

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    onUpdateUser(updatedUser);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      graduationYear: user.graduationYear || '',
      degree: user.degree || '',
      company: user.company || '',
      position: user.position || '',
      location: user.location || '',
      linkedIn: user.linkedIn || '',
      github: user.github || '',
      website: user.website || '',
      skills: user.skills || '',
      interests: user.interests || '',
    });
    setIsEditing(false);
  };

  const handleImageUpload = () => {
    // Mock image upload
    toast.success('Profile image uploaded successfully!');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl">My Profile</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto">
                <Avatar className="h-32 w-32 mx-auto">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback className="text-2xl">
                    {user.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                    onClick={handleImageUpload}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.position || 'Position not specified'}</CardDescription>
                <Badge variant="secondary">Class of {user.graduationYear}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {user.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{user.company}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Social Links */}
              <div className="space-y-2">
                <h4 className="font-medium">Connect</h4>
                <div className="flex gap-2">
                  {user.linkedIn && (
                    <Button size="sm" variant="outline" onClick={() => window.open(user.linkedIn, '_blank')}>
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                  {user.github && (
                    <Button size="sm" variant="outline" onClick={() => window.open(user.github, '_blank')}>
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  {user.website && (
                    <Button size="sm" variant="outline" onClick={() => window.open(user.website, '_blank')}>
                      <Globe className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic information about you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">About</h4>
                    <p className="text-muted-foreground">
                      {user.bio || 'No bio provided. Add a bio to help others learn about you.'}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Education & Career */}
          <Card>
            <CardHeader>
              <CardTitle>Education & Career</CardTitle>
              <CardDescription>Your academic and professional background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={formData.degree}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <p className="text-muted-foreground">{user.degree || 'Not specified'}</p>
                    <p className="text-sm text-muted-foreground">Class of {user.graduationYear}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Current Position</h4>
                    <p className="text-muted-foreground">{user.position || 'Not specified'}</p>
                    <p className="text-sm text-muted-foreground">{user.company || 'Company not specified'}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Connect with others through your social profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedIn">LinkedIn</Label>
                    <Input
                      id="linkedIn"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedIn}
                      onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/yourusername"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Personal Website</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {!user.linkedIn && !user.github && !user.website ? (
                    <p className="text-muted-foreground">No social links added yet.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {user.linkedIn && (
                        <Button variant="outline" size="sm" onClick={() => window.open(user.linkedIn, '_blank')}>
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                      )}
                      {user.github && (
                        <Button variant="outline" size="sm" onClick={() => window.open(user.github, '_blank')}>
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                      {user.website && (
                        <Button variant="outline" size="sm" onClick={() => window.open(user.website, '_blank')}>
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}