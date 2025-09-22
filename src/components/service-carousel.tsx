import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Wrench,
  Scissors,
  Paintbrush,
  Home,
  Truck,
  Zap,
  Camera,
  UtensilsCrossed,
  PawPrint,
  GraduationCap,
  Shield,
  Car,
  Code,
  Leaf,
  Hammer,
  Building,
  Sparkles,
} from "lucide-react";

interface ServiceCarouselProps {
  selectedServices: string[];
  onServiceClick?: (service: string) => void;
  showTitle?: boolean;
  variant?: "default" | "compact";
}

// Service icon mapping
const serviceIcons: Record<string, React.ReactNode> = {
  Gardening: <Leaf className="w-6 h-6" />,
  Cleaning: <Sparkles className="w-6 h-6" />,
  Plumbing: <Wrench className="w-6 h-6" />,
  Electrical: <Zap className="w-6 h-6" />,
  Painting: <Paintbrush className="w-6 h-6" />,
  Carpentry: <Hammer className="w-6 h-6" />,
  Moving: <Truck className="w-6 h-6" />,
  "Home Repair": <Home className="w-6 h-6" />,
  Landscaping: <Leaf className="w-6 h-6" />,
  Roofing: <Building className="w-6 h-6" />,
  HVAC: <Building className="w-6 h-6" />,
  Photography: <Camera className="w-6 h-6" />,
  Catering: <UtensilsCrossed className="w-6 h-6" />,
  "Pet Care": <PawPrint className="w-6 h-6" />,
  Tutoring: <GraduationCap className="w-6 h-6" />,
  Handyman: <Wrench className="w-6 h-6" />,
  "Interior Design": <Home className="w-6 h-6" />,
  Security: <Shield className="w-6 h-6" />,
  "Auto Repair": <Car className="w-6 h-6" />,
  "Web Development": <Code className="w-6 h-6" />,
};

// Service descriptions
const serviceDescriptions: Record<string, string> = {
  Gardening: "Plant care, lawn maintenance, and garden design",
  Cleaning: "Residential and commercial cleaning services",
  Plumbing: "Pipe repairs, installations, and maintenance",
  Electrical: "Wiring, fixtures, and electrical repairs",
  Painting: "Interior and exterior painting services",
  Carpentry: "Custom woodwork and furniture repair",
  Moving: "Professional moving and relocation services",
  "Home Repair": "General home maintenance and repairs",
  Landscaping: "Outdoor design and landscape maintenance",
  Roofing: "Roof repairs, installation, and maintenance",
  HVAC: "Heating, ventilation, and air conditioning",
  Photography: "Professional photography services",
  Catering: "Event catering and meal preparation",
  "Pet Care": "Pet sitting, walking, and grooming",
  Tutoring: "Educational support and tutoring",
  Handyman: "General maintenance and small repairs",
  "Interior Design": "Home and office interior design",
  Security: "Security systems and monitoring",
  "Auto Repair": "Vehicle maintenance and repairs",
  "Web Development": "Website design and development",
};

// Service categories for styling
const serviceCategories: Record<string, string> = {
  Gardening: "green",
  Cleaning: "blue",
  Plumbing: "orange",
  Electrical: "yellow",
  Painting: "purple",
  Carpentry: "amber",
  Moving: "indigo",
  "Home Repair": "gray",
  Landscaping: "emerald",
  Roofing: "slate",
  HVAC: "cyan",
  Photography: "pink",
  Catering: "red",
  "Pet Care": "violet",
  Tutoring: "teal",
  Handyman: "orange",
  "Interior Design": "rose",
  Security: "zinc",
  "Auto Repair": "stone",
  "Web Development": "blue",
};

export function ServiceCarousel({
  selectedServices,
  onServiceClick,
  showTitle = true,
  variant = "default",
}: ServiceCarouselProps) {
  if (selectedServices.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Wrench className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2">No Services Selected</h3>
        <p className="text-muted-foreground text-sm">
          Select services in your profile to see them here
        </p>
      </div>
    );
  }

  const getServiceCardColor = (service: string) => {
    const category = serviceCategories[service] || "gray";
    return {
      bg: `bg-${category}-50 dark:bg-${category}-950`,
      border: `border-${category}-200 dark:border-${category}-800`,
      icon: `text-${category}-600 dark:text-${category}-400`,
      badge: `bg-${category}-100 text-${category}-700 dark:bg-${category}-900 dark:text-${category}-300`,
    };
  };

  return (
    <div className="w-full">
      {showTitle && (
        <div className="mb-6">
          <h3 className="mb-2">Your Services</h3>
          <p className="text-muted-foreground text-sm">
            {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""} selected
          </p>
        </div>
      )}

      {variant === "compact" ? (
        // Compact grid view
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {selectedServices.map((service) => {
            const colors = getServiceCardColor(service);
            return (
              <Card
                key={service}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${colors.border}`}
                onClick={() => onServiceClick?.(service)}
              >
                <CardContent className={`p-4 text-center ${colors.bg}`}>
                  <div className={`mb-2 flex justify-center ${colors.icon}`}>
                    {serviceIcons[service] || <Wrench className="w-6 h-6" />}
                  </div>
                  <h4 className="text-sm mb-1">{service}</h4>
                  <Badge variant="secondary" className={`text-xs ${colors.badge}`}>
                    Active
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        // Carousel view
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {selectedServices.map((service) => {
              const colors = getServiceCardColor(service);
              return (
                <CarouselItem key={service} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${colors.border}`}
                    onClick={() => onServiceClick?.(service)}
                  >
                    <CardContent className={`p-6 ${colors.bg}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-full bg-white/80 ${colors.icon}`}>
                          {serviceIcons[service] || <Wrench className="w-6 h-6" />}
                        </div>
                        <Badge variant="secondary" className={colors.badge}>
                          Active
                        </Badge>
                      </div>
                      
                      <h4 className="mb-2">{service}</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {serviceDescriptions[service] || "Professional service"}
                      </p>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onServiceClick?.(service);
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          {selectedServices.length > 3 && (
            <>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </>
          )}
        </Carousel>
      )}

      {selectedServices.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            💡 These are the services you've selected in your profile
          </p>
        </div>
      )}
    </div>
  );
}