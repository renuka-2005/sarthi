import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Menu, 
  Users, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Settings, 
  User,
  Home,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut
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

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Layout({ children, currentPage, onNavigate, user, onLogout, isDarkMode, onToggleTheme }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'directory', label: 'Alumni Directory', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'donations', label: 'Donations', icon: DollarSign },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const adminItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: Settings },
  ];

  interface NavItemType {
    id: string;
    label: string;
    icon: any;
    badge?: number;
  }

  const NavItem = ({ item, isMobile = false }: { item: NavItemType; isMobile?: boolean }) => (
    <button
      onClick={() => {
        onNavigate(item.id);
        if (isMobile) setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left group hover-lift ${
        currentPage === item.id
          ? 'text-white shadow-lg'
          : 'hover:bg-accent/60 hover:text-accent-foreground hover:shadow-md'
      }`}
      style={{
        background: currentPage === item.id ? 'var(--primary)' : 'transparent'
      }}
    >
      <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      <span className="font-medium">{item.label}</span>
      {item.badge && (
        <Badge variant="destructive" className="ml-auto animate-pulse shadow-lg">
          {item.badge}
        </Badge>
      )}
    </button>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`} style={{ background: 'var(--background)' }}>
      <div className="text-foreground animate-fade-in">
        {/* Header */}
        <header className="border-b border-border glass backdrop-blur-lg shadow-lg">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Trigger */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                      <h2 className="mb-2 px-4 tracking-tight">Navigation</h2>
                      <div className="space-y-1">
                        {navigationItems.map((item) => (
                          <NavItem key={item.id} item={item} isMobile />
                        ))}
                      </div>
                    </div>
                    {user?.role === 'admin' && (
                      <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 tracking-tight">Admin</h2>
                        <div className="space-y-1">
                          {adminItems.map((item) => (
                            <NavItem key={item.id} item={item} isMobile />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center glass relative overflow-hidden group hover-lift"
                     style={{ background: 'var(--primary)' }}>
                  <Users className="h-6 w-6 text-white relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
                </div>
                <div>
                  <h1 className="text-lg font-bold gradient-text">AlumniConnect</h1>
                  <p className="text-sm text-muted-foreground">University Portal</p>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} />
                <Moon className="h-4 w-4" />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 border-r border-border glass backdrop-blur-lg min-h-[calc(100vh-81px)] animate-slide-in">
            <div className="space-y-6 py-6">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 tracking-tight text-muted-foreground">Navigation</h2>
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <NavItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
              {user?.role === 'admin' && (
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 tracking-tight text-muted-foreground">Admin</h2>
                  <div className="space-y-1">
                    {adminItems.map((item) => (
                      <NavItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-h-[calc(100vh-81px)] animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}