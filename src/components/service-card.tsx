import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, MapPin, Heart, X } from 'lucide-react';
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
}

interface ServiceCardProps {
  provider: ServiceProvider;
  onSwipe: (direction: 'left' | 'right', providerId: string) => void;
  style?: React.CSSProperties;
}

export function ServiceCard({ provider, onSwipe, style }: ServiceCardProps) {
  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;
    const direction = info.offset.x > threshold ? 'right' : info.offset.x < -threshold ? 'left' : null;
    
    if (direction) {
      onSwipe(direction, provider.id);
    }
  };

  return (
    <motion.div
      style={style}
      drag="x"
      dragConstraints={{ left: -300, right: 300 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <Card className="h-full bg-white shadow-lg border-0 overflow-hidden">
        <div className="relative h-64">
          <ImageWithFallback
            src={provider.image}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-black">
              {provider.service}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{provider.rating}</span>
            <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-semibold">{provider.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {provider.location}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">{provider.hourlyRate}/hr</span>
            <span className="text-sm text-muted-foreground">{provider.experience} experience</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">{provider.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {provider.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => onSwipe('left', provider.id)}
            >
              <X className="w-5 h-5 mr-2" />
              Pass
            </Button>
            <Button
              size="lg"
              className="flex-1 bg-green-500 hover:bg-green-600"
              onClick={() => onSwipe('right', provider.id)}
            >
              <Heart className="w-5 h-5 mr-2" />
              Connect
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}