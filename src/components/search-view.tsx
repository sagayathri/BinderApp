import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Search, Filter, MapPin, Star, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: string;
  description: string;
  image: string;
  tags: string[];
  experience: string;
  responseTime: string;
}

interface SearchViewProps {
  onAddToSearchHistory: (query: string) => void;
}

const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    service: 'Handyman',
    location: 'Downtown, SF',
    rating: 4.8,
    reviewCount: 127,
    hourlyRate: '$35-50',
    description: 'Professional handyman with 8+ years of experience.',
    image: 'https://images.unsplash.com/photo-1740754699699-c8b4b1635faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5keW1hbiUyMHdvcmtlcnxlbnwxfHx8fDE3NTg0NjI3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Reliable', 'Quick Response', 'Affordable'],
    experience: '8+ years',
    responseTime: '< 1 hour'
  },
  {
    id: '2',
    name: 'Sarah Green',
    service: 'Gardening',
    location: 'Suburbs, SF',
    rating: 4.9,
    reviewCount: 89,
    hourlyRate: '$40-60',
    description: 'Passionate gardener and landscaper with eco-friendly practices.',
    image: 'https://images.unsplash.com/photo-1724556295135-ff92b9aa0a55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW5lciUyMGxhbmRzY2FwaW5nfGVufDF8fHx8MTc1ODUzNDg1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Eco-friendly', 'Creative', 'Experienced'],
    experience: '6+ years',
    responseTime: '< 2 hours'
  },
  {
    id: '3',
    name: 'Carlos Rodriguez',
    service: 'Construction',
    location: 'Mission, SF',
    rating: 4.7,
    reviewCount: 203,
    hourlyRate: '$50-75',
    description: 'Licensed contractor with expertise in home renovations.',
    image: 'https://images.unsplash.com/photo-1697305592193-6a64a63a347e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGVyfGVufDF8fHx8MTc1ODUzNDg1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Licensed', 'Insured', 'Professional'],
    experience: '12+ years',
    responseTime: '< 4 hours'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    service: 'Cleaning',
    location: 'Pacific Heights, SF',
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: '$25-40',
    description: 'Professional cleaning service with attention to detail.',
    image: 'https://images.unsplash.com/photo-1758272421751-963195322eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NTIzODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Thorough', 'Punctual', 'Eco-friendly'],
    experience: '4+ years',
    responseTime: '< 30 min'
  }
];

const serviceTypes = ['All Services', 'Handyman', 'Gardening', 'Construction', 'Cleaning', 'Plumbing', 'Electrical'];
const sortOptions = ['Relevance', 'Rating', 'Price: Low to High', 'Price: High to Low', 'Distance'];

export function SearchView({ onAddToSearchHistory }: SearchViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('All Services');
  const [sortBy, setSortBy] = useState('Relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<ServiceProvider[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchTerm && selectedService === 'All Services') return;
    
    let filtered = mockProviders;
    
    if (selectedService !== 'All Services') {
      filtered = filtered.filter(p => p.service === selectedService);
    }
    
    if (searchTerm) {
      onAddToSearchHistory(searchTerm);
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort results
    switch (sortBy) {
      case 'Rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'Price: Low to High':
        filtered.sort((a, b) => 
          parseInt(a.hourlyRate.split('-')[0].replace('$', '')) - 
          parseInt(b.hourlyRate.split('-')[0].replace('$', ''))
        );
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => 
          parseInt(b.hourlyRate.split('-')[1].replace('$', '')) - 
          parseInt(a.hourlyRate.split('-')[1].replace('$', ''))
        );
        break;
    }
    
    setResults(filtered);
    setHasSearched(true);
  };

  const popularSearches = ['Plumber', 'House Cleaning', 'Electrician', 'Painter', 'Gardener'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
      <div className="max-w-md mx-auto pt-8 space-y-4">
        {/* Search Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Find Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for services, providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>

            {/* Service Type Filter */}
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filter and Sort */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSearch} className="w-full">
              Search
            </Button>
          </CardContent>
        </Card>

        {/* Services You May Be Interested */}
        {!hasSearched && (
          <div className="pt-4">
            <h3 className="mb-4 text-center text-muted-foreground">
              Service you may be interested
            </h3>
          </div>
        )}

        {/* Popular Searches */}
        {!hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <Button
                    key={search}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm(search);
                      onAddToSearchHistory(search);
                    }}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No providers found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search criteria or browse all services.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((provider) => (
                    <Card key={provider.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar className="w-16 h-16">
                            <ImageWithFallback
                              src={provider.image}
                              alt={provider.name}
                              className="w-full h-full object-cover"
                            />
                            <AvatarFallback>
                              {provider.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold">{provider.name}</h3>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {provider.service}
                                </Badge>
                              </div>
                              <div className="text-lg font-semibold text-primary">
                                {provider.hourlyRate}/hr
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                {provider.rating} ({provider.reviewCount})
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {provider.location}
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {provider.description}
                            </p>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                Responds {provider.responseTime}
                              </div>
                              <Button size="sm">
                                Connect
                              </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-2">
                              {provider.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}