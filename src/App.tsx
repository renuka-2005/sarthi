import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { LoginPage } from './components/auth/LoginPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { AlumniDirectory } from './components/directory/AlumniDirectory';
import { ProfilePage } from './components/profile/ProfilePage';
import { EventsPage } from './components/events/EventsPage';
import { MessagesPage } from './components/messages/MessagesPage';
import { DonationsPage } from './components/donations/DonationsPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Toaster } from './components/ui/sonner';

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

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Update theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const renderCurrentPage = () => {
    if (!user) return null;

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setCurrentPage} />;
      case 'directory':
        return <AlumniDirectory currentUser={user} />;
      case 'profile':
        return <ProfilePage user={user} onUpdateUser={handleUpdateUser} />;
      case 'events':
        return <EventsPage user={user} />;
      case 'messages':
        return <MessagesPage user={user} />;
      case 'donations':
        return <DonationsPage user={user} />;
      case 'admin-dashboard':
        return user.role === 'admin' ? <AdminDashboard user={user} /> : <Dashboard user={user} onNavigate={setCurrentPage} />;
      default:
        return <Dashboard user={user} onNavigate={setCurrentPage} />;
    }
  };

  if (!user) {
    return (
      <>
        <LoginPage onLogin={handleLogin} isDarkMode={isDarkMode} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      >
        {renderCurrentPage()}
      </Layout>
      <Toaster />
    </>
  );
}