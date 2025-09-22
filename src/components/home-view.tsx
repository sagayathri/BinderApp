import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  Heart,
  Users,
  Bell,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Zap,
  CheckCircle,
} from "lucide-react";

interface HomeViewProps {
  onViewChange: (view: string) => void;
  userProfile: {
    name: string;
    fullName?: string;
    businessName?: string;
    location: string;
    userType: "client" | "provider" | "both";
    services: string[];
  } | null;
  matchCount: number;
  notificationCount: number;
}

export function HomeView({
  onViewChange,
  userProfile,
  matchCount,
  notificationCount,
}: HomeViewProps) {
  const recentActivity = [
    {
      type: "match",
      title: "New match with Sarah Johnson",
      description: "Professional cleaner in your area",
      time: "2 hours ago",
      icon: Heart,
      color: "text-pink-500",
    },
    {
      type: "message",
      title: "Message from Mike Chen",
      description: "Thanks for the great service!",
      time: "4 hours ago",
      icon: Users,
      color: "text-blue-500",
    },
    {
      type: "booking",
      title: "Booking confirmed",
      description: "Plumbing service for tomorrow 2PM",
      time: "1 day ago",
      icon: CheckCircle,
      color: "text-green-500",
    },
  ];

  const recommendedServices = [
    {
      name: "Home Cleaning",
      providers: 23,
      rating: 4.8,
      category: "cleaning",
    },
    {
      name: "Plumbing",
      providers: 15,
      rating: 4.9,
      category: "repair",
    },
    {
      name: "Gardening",
      providers: 18,
      rating: 4.7,
      category: "outdoor",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-500 text-white">
                  {userProfile
                    ? getInitials(userProfile.name)
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg">
                  {getGreeting()}, {userProfile?.fullName || userProfile?.name || "User"}
                  !
                </h1>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {userProfile?.location || "Location not set"}
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-600"
            >
              {userProfile?.userType === "provider"
                ? "Service Provider"
                : userProfile?.userType === "client"
                  ? "Client"
                  : "Client & Provider"}
            </Badge>
          </div>

          {userProfile?.businessName && (
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {userProfile.businessName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {userProfile.services
                        .slice(0, 2)
                        .join(", ")}
                      {userProfile.services.length > 2 &&
                        ` +${userProfile.services.length - 2} more`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-4 h-4 text-pink-600" />
              </div>
              <div className="text-xl font-medium">
                {matchCount}
              </div>
              <div className="text-xs text-muted-foreground">
                Matches
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-xl font-medium">4.9</div>
              <div className="text-xs text-muted-foreground">
                Rating
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-xl font-medium">12</div>
              <div className="text-xs text-muted-foreground">
                Completed
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2>Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}
                      >
                        <Icon
                          className={`w-4 h-4 ${activity.color}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">
                          {activity.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recommended Services */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2>Recommended for You</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("discover")}
            >
              Browse All
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="grid gap-4">
            {recommendedServices.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onViewChange("discover")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.providers} providers available
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm ml-1">
                          {service.rating}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}