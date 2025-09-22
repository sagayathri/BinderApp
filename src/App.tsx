import { useState } from 'react';
import { HomePage } from './components/homepage';
import { SignInPage } from './components/signin-page';
import { RegisterPage } from './components/register-page';
import { HomeView } from './components/home-view';
import { BusinessProfileSetup } from './components/business-profile-setup';
import { DiscoverView } from './components/discover-view';
import { MatchesView } from './components/matches-view';
import { NotificationsView } from './components/notifications-view';
import { ProfileView } from './components/profile-view';
import { Navigation } from './components/navigation';

interface UserProfile {
  name: string;
  fullName?: string;
  businessName?: string;
  location: string;
  serviceAreas: string[];
  userType: 'client' | 'provider' | 'both';
  services: string[];
  description: string;
  experience?: string;
  hourlyRate?: string;
  businessHours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  certifications?: string[];
  portfolioImages?: string[];
  businessType?: 'individual' | 'small-business' | 'company';
  businessLogo?: string;
  businessImage?: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [matches, setMatches] = useState<string[]>([]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false);
  const [registrationData, setRegistrationData] = useState<{
    name: string;
    email: string;
    location: string;
    userType: 'client' | 'provider' | 'both';
  } | null>(null);

  const handleLogin = () => {
    setShowSignIn(true);
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setShowSignIn(false);
    setCurrentView('home');
    // Simulate loading existing profile for returning users
    // In a real app, this would come from a database
    const existingProfile: UserProfile = {
      name: 'John Smith',
      fullName: 'John Michael Smith',
      businessName: 'Smith Home Services',
      location: 'Leeds, UK',
      serviceAreas: ['Leeds', 'Bradford', 'Wakefield'],
      userType: 'provider',
      services: ['Plumbing', 'Electrical', 'General Maintenance'],
      description: 'Professional home services with 10+ years experience',
      experience: '10+ years',
      hourlyRate: '£35-50',
      businessHours: {
        monday: '8:00 AM - 6:00 PM',
        tuesday: '8:00 AM - 6:00 PM',
        wednesday: '8:00 AM - 6:00 PM',
        thursday: '8:00 AM - 6:00 PM',
        friday: '8:00 AM - 6:00 PM',
        saturday: '9:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      phone: '+44 113 123 4567',
      email: 'john@smithhomeservices.co.uk',
      businessType: 'small-business',
      certifications: ['Gas Safe Registered', 'NICEIC Approved']
    };
    setUserProfile(existingProfile);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setNeedsProfileSetup(true);
  };

  const handleRegistrationComplete = (userData: {
    name: string;
    email: string;
    location: string;
    userType: 'client' | 'provider' | 'both';
  }) => {
    setRegistrationData(userData);
    setIsAuthenticated(true);
    setShowRegister(false);
    setNeedsProfileSetup(true); // New users need to complete profile setup
  };

  const handleBackToHome = () => {
    setShowSignIn(false);
    setShowRegister(false);
  };

  const handleBackToHomeFromProfile = () => {
    setIsAuthenticated(false);
    setNeedsProfileSetup(false);
    setRegistrationData(null);
    setIsEditingProfile(false);
  };

  const handleGoToRegister = () => {
    setShowSignIn(false);
    setShowRegister(true);
  };

  const handleGoToSignIn = () => {
    setShowRegister(false);
    setShowSignIn(true);
  };

  const handleProfileComplete = (profile: UserProfile) => {
    // Merge registration data with profile data
    const completeProfile = {
      ...profile,
      ...(registrationData && {
        name: registrationData.name,
        email: registrationData.email,
        location: registrationData.location,
        userType: registrationData.userType
      })
    };
    
    setUserProfile(completeProfile);
    setNeedsProfileSetup(false); // Profile setup is now complete
    setRegistrationData(null); // Clear registration data
    setCurrentView('home'); // Take user to home after profile setup
  };

  const handleMatch = (providerId: string) => {
    setMatches(prev => [...prev, providerId]);
  };



  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsEditingProfile(false);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setMatches([]);
    setCurrentView('home');
  };

  // Show registration page
  if (showRegister) {
    return (
      <RegisterPage
        onRegister={handleRegistrationComplete}
        onBackToHome={handleBackToHome}
        onGoToSignIn={handleGoToSignIn}
      />
    );
  }

  // Show sign-in page
  if (showSignIn) {
    return (
      <SignInPage
        onSignIn={handleSignIn}
        onBackToHome={handleBackToHome}
        onGoToRegister={handleGoToRegister}
      />
    );
  }

  // Show homepage if not authenticated
  if (!isAuthenticated) {
    return (
      <HomePage 
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  // If no profile is set up, needs profile setup, or editing profile, show profile setup
  if (!userProfile || needsProfileSetup || isEditingProfile) {
    return (
      <BusinessProfileSetup 
        onComplete={isEditingProfile ? handleProfileUpdate : handleProfileComplete}
        onBackToHome={!isEditingProfile ? handleBackToHomeFromProfile : undefined}
        initialData={registrationData || undefined}
      />
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            onViewChange={setCurrentView}
            userProfile={userProfile}
            matchCount={matches.length}
            notificationCount={3}
          />
        );
      case 'discover':
        return (
          <DiscoverView 
            onMatch={handleMatch}
          />
        );
      case 'matches':
        return <MatchesView matches={matches} />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return (
          <ProfileView 
            profile={userProfile}
            onEditProfile={handleEditProfile}
            onSignOut={handleSignOut}
          />
        );
      default:
        return (
          <HomeView 
            onViewChange={setCurrentView}
            userProfile={userProfile}
            matchCount={matches.length}
            notificationCount={3}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentView()}
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        matchCount={matches.length}
        notificationCount={3}
      />
    </div>
  );
}