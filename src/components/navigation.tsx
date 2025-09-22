import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, Heart, Bell, User, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  matchCount: number;
  notificationCount: number;
}

export function Navigation({ currentView, onViewChange, matchCount, notificationCount }: NavigationProps) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      badge: null
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: Sparkles,
      badge: null
    },
    {
      id: 'matches',
      label: 'Matches',
      icon: Heart,
      badge: matchCount > 0 ? matchCount : null
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: notificationCount > 0 ? notificationCount : null
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      badge: null
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-2">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className="flex flex-col gap-1 h-auto py-2 px-2 relative"
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                <span className={`text-xs ${isActive ? 'text-white' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}