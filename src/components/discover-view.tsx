import { useState, useEffect } from 'react';
import { ServiceCard } from './service-card';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, RefreshCw, List, Grid3x3, Star, MapPin, Clock, X } from 'lucide-react';
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

interface DiscoverViewProps {
  onMatch: (providerId: string) => void;
}

// Mock data for service providers
const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    service: 'Handyman',
    location: 'Downtown, SF',
    rating: 4.8,
    reviewCount: 127,
    hourlyRate: '$35-50',
    description: 'Professional handyman with 8+ years of experience. Specializing in home repairs, furniture assembly, and general maintenance.',
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
    description: 'Passionate gardener and landscaper. I create beautiful outdoor spaces and maintain gardens with eco-friendly practices.',
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
    description: 'Licensed contractor with expertise in home renovations, additions, and remodeling projects. Quality work guaranteed.',
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
    description: 'Professional cleaning service with attention to detail. Residential and commercial cleaning with eco-friendly products.',
    image: 'https://images.unsplash.com/photo-1758272421751-963195322eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NTIzODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Thorough', 'Punctual', 'Eco-friendly'],
    experience: '4+ years',
    responseTime: '< 30 min'
  },
  {
    id: '5',
    name: 'David Tech',
    service: 'Electrical',
    location: 'SOMA, SF',
    rating: 4.6,
    reviewCount: 92,
    hourlyRate: '$60-80',
    description: 'Licensed electrician specializing in residential and commercial electrical work. Safe and reliable service.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxlbGVjdHJpY2lhbiUyMHdvcmtlcnxlbnwwfHx8fDE3NTg0NjI3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Licensed', 'Safety First', 'Emergency Service'],
    experience: '10+ years',
    responseTime: '< 3 hours'
  },
  {
    id: '6',
    name: 'Lisa Plumb',
    service: 'Plumbing',
    location: 'Richmond, SF',
    rating: 4.8,
    reviewCount: 134,
    hourlyRate: '$45-65',
    description: 'Expert plumber with 15+ years experience. From leaky faucets to complete bathroom renovations.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c5e2e15f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJkaHwyfHxwbHVtYmVyJTIwd29ya2VyfGVufDB8fHx8MTc1ODQ2Mjc5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Expert', '24/7 Emergency', 'Warranty'],
    experience: '15+ years',
    responseTime: '< 2 hours'
  }
];

const serviceTypes = ['All Services', 'Handyman', 'Gardening', 'Construction', 'Cleaning', 'Plumbing', 'Electrical'];
const sortOptions = ['Relevance', 'Rating', 'Price: Low to High', 'Price: High to Low', 'Distance'];
const popularSearches = ['Plumber', 'House Cleaning', 'Electrician', 'Painter', 'Gardener', 'Handyman'];

export function DiscoverView({ onMatch }: DiscoverViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [providers, setProviders] = useState<ServiceProvider[]>(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('All Services');
  const [sortBy, setSortBy] = useState('Relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'swipe' | 'list'>('swipe');
  const [hasSearched, setHasSearched] = useState(false);

  const currentProvider = providers[currentIndex];

  const handleSwipe = (direction: 'left' | 'right', providerId: string) => {
    if (direction === 'right') {
      onMatch(providerId);
    }
    
    setCurrentIndex(prev => prev + 1);
  };

  const handleSearch = (term?: string) => {
    const searchQuery = term || searchTerm;
    let filtered = mockProviders;
    
    if (selectedService !== 'All Services') {
      filtered = filtered.filter(p => p.service === selectedService);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
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
    
    setProviders(filtered);
    setCurrentIndex(0);
    if (searchQuery || selectedService !== 'All Services') {
      setHasSearched(true);
    }
  };

  const resetStack = () => {
    setProviders(mockProviders);
    setCurrentIndex(0);
    setSearchTerm('');
    setSelectedService('All Services');
    setSortBy('Relevance');
    setHasSearched(false);
    setViewMode('swipe');
  };

  const handlePopularSearch = (search: string) => {
    setSearchTerm(search);
    handleSearch(search);
  };

  const handleConnect = (providerId: string) => {
    onMatch(providerId);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedService('All Services');
    setSortBy('Relevance');
    setHasSearched(false);
    setProviders(mockProviders);
    setCurrentIndex(0);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedService, sortBy]);

  if (currentIndex >= providers.length && viewMode === 'swipe') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto pt-8">
          <Card className="text-center p-8">
            <CardContent>
              <h3 className="text-lg mb-4">No more service providers!</h3>
              <p className="text-muted-foreground mb-6">
                You've seen all available providers. Try adjusting your search or check back later for new professionals.
              </p>
              <Button onClick={resetStack} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
      <div className="max-w-md mx-auto pt-4">
        {/* Enhanced Search Header */}
        <Card className="mb-4">
          <CardContent className="p-4 space-y-3">
            {/* Search Input */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search services, providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setViewMode(viewMode === 'swipe' ? 'list' : 'swipe')}
              >
                {viewMode === 'swipe' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
              </Button>
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Service Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort By" />
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
                
                <Button onClick={() => handleSearch()} className="w-full" size="sm">
                  Apply Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Searches - Show when no search has been made */}
        {!hasSearched && (
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Popular Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <Button
                    key={search}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePopularSearch(search)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Services You May Be Interested */}
        <div className="mb-4 text-center">
          <h3 className="text-muted-foreground">
            {hasSearched 
              ? `${providers.length} result${providers.length !== 1 ? 's' : ''} found`
              : 'Service you may be interested'
            }
          </h3>
        </div>

        {/* Content - Toggle between Swipe and List Mode */}
        {viewMode === 'swipe' ? (
          <>
            {/* Swipe Mode - Card Stack */}
            <div className="relative h-[600px]">
              {providers.slice(currentIndex, currentIndex + 3).map((provider, index) => (
                <ServiceCard
                  key={provider.id}
                  provider={provider}
                  onSwipe={handleSwipe}
                  style={{
                    zIndex: 3 - index,
                    scale: 1 - index * 0.05,
                    y: index * 10,
                  }}
                />
              ))}
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              {currentIndex + 1} of {providers.length} • Swipe right to connect, left to pass
            </div>
          </>
        ) : (
          <>
            {/* List Mode - Search Results */}
            <div className="space-y-3">
              {providers.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No providers found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search criteria or browse all services.
                    </p>
                    <Button onClick={resetStack} className="mt-4" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset Search
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                providers.map((provider) => (
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
                            <Button size="sm" onClick={() => handleConnect(provider.id)}>
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
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}