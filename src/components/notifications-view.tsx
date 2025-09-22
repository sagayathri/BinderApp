import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Bell, Heart, MessageCircle, Star, Calendar, Check, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Notification {
  id: string;
  type: 'match' | 'message' | 'booking' | 'review';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionRequired?: boolean;
  userName?: string;
  userImage?: string;
  serviceType?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'match',
    title: 'New Match!',
    description: 'You have a new match with Mike Johnson (Handyman)',
    timestamp: '2 hours ago',
    isRead: false,
    userName: 'Mike Johnson',
    userImage: 'https://images.unsplash.com/photo-1740754699699-c8b4b1635faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5keW1hbiUyMHdvcmtlcnxlbnwxfHx8fDE3NTg0NjI3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    serviceType: 'Handyman'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'Sarah Green sent you a message about your gardening project',
    timestamp: '4 hours ago',
    isRead: false,
    userName: 'Sarah Green',
    userImage: 'https://images.unsplash.com/photo-1724556295135-ff92b9aa0a55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW5lciUyMGxhbmRzY2FwaW5nfGVufDF8fHx8MTc1ODUzNDg1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    serviceType: 'Gardening'
  },
  {
    id: '3',
    type: 'booking',
    title: 'Booking Request',
    description: 'Emma Wilson wants to schedule a cleaning service for tomorrow',
    timestamp: '6 hours ago',
    isRead: true,
    actionRequired: true,
    userName: 'Emma Wilson',
    userImage: 'https://images.unsplash.com/photo-1758272421751-963195322eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4NTIzODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    serviceType: 'Cleaning'
  },
  {
    id: '4',
    type: 'review',
    title: 'New Review',
    description: 'You received a 5-star review from John Smith',
    timestamp: '1 day ago',
    isRead: true
  },
  {
    id: '5',
    type: 'match',
    title: 'New Match!',
    description: 'You have a new match with Carlos Rodriguez (Construction)',
    timestamp: '2 days ago',
    isRead: true,
    userName: 'Carlos Rodriguez',
    userImage: 'https://images.unsplash.com/photo-1697305592193-6a64a63a347e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGVyfGVufDF8fHx8MTc1ODUzNDg1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    serviceType: 'Construction'
  }
];

export function NotificationsView() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleBookingAction = (id: string, action: 'accept' | 'decline') => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== id)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'message':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'booking':
        return <Calendar className="w-4 h-4 text-green-500" />;
      case 'review':
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">No notifications</p>
                <p className="text-sm text-muted-foreground">
                  We'll notify you when something happens!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card 
                    key={notification.id}
                    className={`cursor-pointer transition-all ${
                      !notification.isRead ? 'bg-blue-50 border-blue-200' : 'hover:shadow-md'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {notification.userImage ? (
                          <Avatar className="w-10 h-10">
                            <ImageWithFallback
                              src={notification.userImage}
                              alt={notification.userName || ''}
                              className="w-full h-full object-cover"
                            />
                            <AvatarFallback>
                              {notification.userName?.split(' ').map(n => n[0]).join('') || 'U'}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          
                          {notification.serviceType && (
                            <Badge variant="outline" className="text-xs mt-2">
                              {notification.serviceType}
                            </Badge>
                          )}
                          
                          {notification.actionRequired && (
                            <div className="flex gap-2 mt-3">
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookingAction(notification.id, 'accept');
                                }}
                                className="flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookingAction(notification.id, 'decline');
                                }}
                                className="flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                Decline
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
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