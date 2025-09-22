import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Settings, Edit2, Star, MapPin, Calendar, LogOut, Clock, Phone, Mail, Globe, Award, Building } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfile {
  name: string;
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
}

interface ProfileViewProps {
  profile: UserProfile;
  onEditProfile: () => void;
  onSignOut: () => void;
}

export function ProfileView({ profile, onEditProfile, onSignOut }: ProfileViewProps) {
  const [settings, setSettings] = useState({
    notifications: true,
    showOnline: true,
    autoMatch: false
  });

  const stats = {
    connections: 12,
    rating: 4.8,
    completedJobs: profile.userType === 'provider' ? 45 : 8
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <ImageWithFallback
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <AvatarFallback>
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-semibold mb-1">
                {profile.businessName || profile.name}
              </h2>
              {profile.businessName && (
                <p className="text-sm text-muted-foreground mb-2">{profile.name}</p>
              )}
              
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center mb-2">
                <Badge variant={profile.userType === 'client' ? 'secondary' : 'default'}>
                  {profile.userType === 'provider' ? 'Service Provider' : 
                   profile.userType === 'client' ? 'Client' : 'Provider & Client'}
                </Badge>
                {profile.businessType && (profile.userType === 'provider' || profile.userType === 'both') && (
                  <Badge variant="outline" className="text-xs">
                    {profile.businessType === 'individual' ? 'Individual' : 
                     profile.businessType === 'small-business' ? 'Small Business' : 'Company'}
                  </Badge>
                )}
              </div>
              
              {(profile.userType === 'provider' || profile.userType === 'both') && profile.hourlyRate && (
                <div className="text-lg font-semibold text-primary mt-2">
                  {profile.hourlyRate}/hr
                </div>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onEditProfile}
                className="mt-4"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-semibold text-primary">{stats.connections}</div>
                <div className="text-sm text-muted-foreground">Connections</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-semibold text-primary">{stats.rating}</span>
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-primary">{stats.completedJobs}</div>
                <div className="text-sm text-muted-foreground">
                  {profile.userType === 'client' ? 'Projects' : 'Jobs Done'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {profile.userType === 'provider' ? 'Services I Provide' : 
               profile.userType === 'client' ? 'Services I Need' : 
               'Services (Provide/Need)'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.services.map((service) => (
                <Badge key={service} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>
            {profile.experience && (
              <div className="mt-4 text-sm text-muted-foreground">
                <strong>Experience:</strong> {profile.experience}
              </div>
            )}
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{profile.description}</p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        {(profile.email || profile.phone || profile.website) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {profile.website}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Service Areas */}
        {profile.serviceAreas && profile.serviceAreas.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Service Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.serviceAreas.map((area) => (
                  <Badge key={area} variant="outline">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Business Hours */}
        {(profile.userType === 'provider' || profile.userType === 'both') && profile.businessHours && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(profile.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="capitalize font-medium">{day}:</span>
                    <span className="text-muted-foreground">{hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certifications */}
        {profile.certifications && profile.certifications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certifications & Licenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-sm">
                Push Notifications
              </Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, notifications: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showOnline" className="text-sm">
                Show Online Status
              </Label>
              <Switch
                id="showOnline"
                checked={settings.showOnline}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, showOnline: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autoMatch" className="text-sm">
                Auto-match Similar Profiles
              </Label>
              <Switch
                id="autoMatch"
                checked={settings.autoMatch}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, autoMatch: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Star className="w-4 h-4 mr-2" />
              Reviews & Ratings
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
              onClick={onSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}