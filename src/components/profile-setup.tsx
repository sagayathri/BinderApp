import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';

interface UserProfile {
  name: string;
  location: string;
  userType: 'client' | 'provider';
  services: string[];
  description: string;
  experience?: string;
  hourlyRate?: string;
}

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

const availableServices = [
  'Gardening', 'Cleaning', 'Plumbing', 'Electrical', 'Painting',
  'Carpentry', 'Moving', 'Home Repair', 'Landscaping', 'Roofing',
  'HVAC', 'Photography', 'Catering', 'Pet Care', 'Tutoring'
];

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    location: '',
    userType: 'client',
    services: [],
    description: ''
  });

  const handleServiceToggle = (service: string) => {
    setProfile(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = () => {
    if (profile.name && profile.location && profile.description) {
      onComplete(profile);
    }
  };

  const isValid = profile.name && profile.location && profile.description && 
    (profile.userType === 'client' || (profile.services.length > 0 && profile.experience && profile.hourlyRate));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Create Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State"
              />
            </div>

            <div className="space-y-2">
              <Label>I am a...</Label>
              <Select value={profile.userType} onValueChange={(value: 'client' | 'provider') => setProfile(prev => ({ ...prev, userType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Looking for services</SelectItem>
                  <SelectItem value="provider">Providing services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {profile.userType === 'provider' && (
              <>
                <div className="space-y-2">
                  <Label>Services I Provide</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {availableServices.map((service) => (
                      <Button
                        key={service}
                        variant={profile.services.includes(service) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleServiceToggle(service)}
                        className="text-xs justify-start"
                      >
                        {service}
                      </Button>
                    ))}
                  </div>
                  {profile.services.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {profile.services.map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => handleServiceToggle(service)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={profile.experience || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g., 5+ years"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    value={profile.hourlyRate || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, hourlyRate: e.target.value }))}
                    placeholder="e.g., $25-50"
                  />
                </div>
              </>
            )}

            {profile.userType === 'client' && (
              <div className="space-y-2">
                <Label>Services I'm Looking For</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {availableServices.map((service) => (
                    <Button
                      key={service}
                      variant={profile.services.includes(service) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleServiceToggle(service)}
                      className="text-xs justify-start"
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">
                {profile.userType === 'provider' ? 'About Your Services' : 'Tell Us About Your Needs'}
              </Label>
              <Textarea
                id="description"
                value={profile.description}
                onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                placeholder={profile.userType === 'provider' 
                  ? "Describe your expertise and what makes you unique..."
                  : "What kind of projects or help are you looking for?"}
                rows={3}
              />
            </div>

            <Button 
              onClick={handleSubmit} 
              disabled={!isValid}
              className="w-full"
            >
              Complete Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}