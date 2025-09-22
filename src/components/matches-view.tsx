import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { MessageCircle, Star, MapPin, Calendar, Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Match {
  id: string;
  name: string;
  service: string;
  location: string;
  rating: number;
  hourlyRate: string;
  image: string;
  lastMessage?: string;
  matchedAt: string;
  isNew: boolean;
}

interface MatchesViewProps {
  matches: string[];
}

// Mock data for matches
const mockMatches: Match[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    service: 'Handyman',
    location: 'Downtown, SF',
    rating: 4.8,
    hourlyRate: '$35-50',
    image: 'https://images.unsplash.com/photo-1740754699699-c8b4b1635faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5keW1hbiUyMHdvcmtlcnxlbnwxfHx8fDE3NTg0NjI3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    lastMessage: 'Hi! I saw you need help with home repairs. When would be a good time to discuss your project?',
    matchedAt: '2 hours ago',
    isNew: true
  },
  {
    id: '2',
    name: 'Sarah Green',
    service: 'Gardening',
    location: 'Suburbs, SF',
    rating: 4.9,
    hourlyRate: '$40-60',
    image: 'https://images.unsplash.com/photo-1724556295135-ff92b9aa0a55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW5lciUyMGxhbmRzY2FwaW5nfGVufDF8fHx8MTc1ODUzNDg1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    lastMessage: 'Thanks for connecting! I\'d love to help with your garden project.',
    matchedAt: '1 day ago',
    isNew: false
  },
  {
    id: '4',
    name: 'Emma Wilson',
    service: 'Cleaning',
    location: 'Pacific Heights, SF',
    rating: 4.9,
    hourlyRate: '$25-40',
    image: 'https://images.unsplash.com/photo-1758272421751-963195322eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NTIzODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    matchedAt: '3 days ago',
    isNew: false
  }
];

export function MatchesView({ matches }: MatchesViewProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  
  const userMatches = mockMatches.filter(match => matches.includes(match.id));

  if (selectedMatch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto pt-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedMatch(null)}
            className="mb-4"
          >
            ← Back to Matches
          </Button>
          
          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <ImageWithFallback
                  src={selectedMatch.image}
                  alt={selectedMatch.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <CardTitle>{selectedMatch.name}</CardTitle>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {selectedMatch.rating}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {selectedMatch.location}
                </div>
              </div>
              <Badge variant="secondary">{selectedMatch.service}</Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">{selectedMatch.hourlyRate}/hr</div>
              </div>
              
              {selectedMatch.lastMessage && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">{selectedMatch.lastMessage}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sent {selectedMatch.matchedAt}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <Button className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
              </div>
              
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Your Matches</CardTitle>
            <p className="text-center text-muted-foreground text-sm">
              {userMatches.length} connection{userMatches.length !== 1 ? 's' : ''}
            </p>
          </CardHeader>
          
          <CardContent>
            {userMatches.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No matches yet!</p>
                <p className="text-sm text-muted-foreground">
                  Keep swiping to find service providers that match your needs.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {userMatches.map((match) => (
                  <Card 
                    key={match.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedMatch(match)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <ImageWithFallback
                              src={match.image}
                              alt={match.name}
                              className="w-full h-full object-cover"
                            />
                            <AvatarFallback>
                              {match.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {match.isNew && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold truncate">{match.name}</h4>
                            <span className="text-xs text-muted-foreground">{match.matchedAt}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{match.service}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {match.rating}
                            </div>
                          </div>
                          
                          {match.lastMessage && (
                            <p className="text-sm text-muted-foreground truncate mt-1">
                              {match.lastMessage}
                            </p>
                          )}
                        </div>
                        
                        <MessageCircle className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}