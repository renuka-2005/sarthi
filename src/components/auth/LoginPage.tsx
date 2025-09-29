import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Users, Mail, Key, Smartphone } from 'lucide-react';

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

interface LoginPageProps {
  onLogin: (user: User) => void;
  isDarkMode: boolean;
}

export function LoginPage({ onLogin, isDarkMode }: LoginPageProps) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    graduationYear: '',
    degree: '',
  });
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would call an API
    // Extract name from email (before @ symbol) and capitalize it
    const emailName = loginForm.email.split('@')[0];
    const displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1).replace(/[._]/g, ' ');
    
    const mockUser = {
      id: '1',
      name: displayName,
      email: loginForm.email,
      role: loginForm.email.includes('admin') ? 'admin' : 'alumni',
      graduationYear: '2020',
      degree: 'Computer Science',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      profileImage: null,
    };
    onLogin(mockUser);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup
    const mockUser = {
      id: Math.random().toString(),
      name: signupForm.name,
      email: signupForm.email,
      role: 'alumni',
      graduationYear: signupForm.graduationYear,
      degree: signupForm.degree,
      company: '',
      location: '',
      profileImage: null,
    };
    onLogin(mockUser);
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      // Extract name from email (before @ symbol) and capitalize it
      const emailName = loginForm.email.split('@')[0];
      const displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1).replace(/[._]/g, ' ');
      
      const mockUser = {
        id: '1',
        name: displayName,
        email: loginForm.email,
        role: 'alumni',
        graduationYear: '2020',
        degree: 'Computer Science',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        profileImage: null,
      };
      onLogin(mockUser);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'dark' : ''}`} 
         style={{ background: isDarkMode ? 'var(--background)' : 'var(--background)' }}>
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-2xl flex items-center justify-center glass hover-lift relative overflow-hidden group"
                 style={{ background: 'var(--primary)' }}>
              <Users className="h-10 w-10 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">AlumniConnect</h1>
          <p className="text-muted-foreground text-lg">Connect with your university community</p>
        </div>

        <Card className="glass hover-lift border-0 shadow-2xl animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                {!otpMode ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@university.edu"
                          className="pl-10"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full h-12 text-base font-semibold hover-lift shadow-lg" 
                            style={{ background: 'var(--primary)' }}>
                      Sign In
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="otp"
                          type="text"
                          placeholder="123456"
                          className="pl-10"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        We sent a code to {loginForm.email}. Use "123456" for demo.
                      </p>
                    </div>
                    
                    <Button type="submit" className="w-full h-12 text-base font-semibold hover-lift shadow-lg"
                            style={{ background: 'var(--primary)' }}>
                      Verify OTP
                    </Button>
                  </form>
                )}
                
                <div className="space-y-2">
                  <Separator />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setOtpMode(!otpMode)}
                  >
                    {otpMode ? 'Back to Password Login' : 'Login with OTP'}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="graduation-year">Graduation Year</Label>
                      <Input
                        id="graduation-year"
                        type="number"
                        placeholder="2020"
                        value={signupForm.graduationYear}
                        onChange={(e) => setSignupForm({ ...signupForm, graduationYear: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree</Label>
                      <Input
                        id="degree"
                        type="text"
                        placeholder="Computer Science"
                        value={signupForm.degree}
                        onChange={(e) => setSignupForm({ ...signupForm, degree: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full h-12 text-base font-semibold hover-lift shadow-lg"
                          style={{ background: 'var(--primary)' }}>
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          Demo: Use any email/password for login, or admin@university.edu for admin access
        </p>
      </div>
    </div>
  );
}