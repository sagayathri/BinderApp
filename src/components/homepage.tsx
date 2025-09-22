import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "./ui/carousel";
import {
  Users,
  Heart,
  Search,
  Zap,
  Star,
  MapPin,
  Wrench,
  Home,
  Paintbrush,
  Car,
  Scissors,
  Shield,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function HomePage({
  onLogin,
  onRegister,
}: HomePageProps) {
  // Carousel state management
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [featuresApi, setFeaturesApi] = useState<CarouselApi>();
  const [servicesApi, setServicesApi] = useState<CarouselApi>();
  const [testimonialsApi, setTestimonialsApi] =
    useState<CarouselApi>();
  const [ctaApi, setCtaApi] = useState<CarouselApi>();

  const [heroCurrentSlide, setHeroCurrentSlide] = useState(0);
  const [featuresCurrentSlide, setFeaturesCurrentSlide] =
    useState(0);
  const [servicesCurrentSlide, setServicesCurrentSlide] =
    useState(0);
  const [
    testimonialsCurrentSlide,
    setTestimonialsCurrentSlide,
  ] = useState(0);
  const [ctaCurrentSlide, setCtaCurrentSlide] = useState(0);

  // Update slide indexes when carousel changes
  useEffect(() => {
    if (!heroApi) return;
    setHeroCurrentSlide(heroApi.selectedScrollSnap());
    heroApi.on("select", () => {
      setHeroCurrentSlide(heroApi.selectedScrollSnap());
    });
  }, [heroApi]);

  useEffect(() => {
    if (!featuresApi) return;
    setFeaturesCurrentSlide(featuresApi.selectedScrollSnap());
    featuresApi.on("select", () => {
      setFeaturesCurrentSlide(featuresApi.selectedScrollSnap());
    });
  }, [featuresApi]);

  useEffect(() => {
    if (!servicesApi) return;
    setServicesCurrentSlide(servicesApi.selectedScrollSnap());
    servicesApi.on("select", () => {
      setServicesCurrentSlide(servicesApi.selectedScrollSnap());
    });
  }, [servicesApi]);

  useEffect(() => {
    if (!testimonialsApi) return;
    setTestimonialsCurrentSlide(
      testimonialsApi.selectedScrollSnap(),
    );
    testimonialsApi.on("select", () => {
      setTestimonialsCurrentSlide(
        testimonialsApi.selectedScrollSnap(),
      );
    });
  }, [testimonialsApi]);

  useEffect(() => {
    if (!ctaApi) return;
    setCtaCurrentSlide(ctaApi.selectedScrollSnap());
    ctaApi.on("select", () => {
      setCtaCurrentSlide(ctaApi.selectedScrollSnap());
    });
  }, [ctaApi]);

  // Carousel indicators component
  const CarouselIndicators = ({
    totalSlides,
    currentSlide,
    onSlideClick,
    className = "",
  }: {
    totalSlides: number;
    currentSlide: number;
    onSlideClick: (index: number) => void;
    className?: string;
  }) => (
    <div
      className={`flex justify-center space-x-2 mt-6 ${className}`}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-200 ${
            index === currentSlide
              ? "bg-blue-500 scale-110"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
  const heroSlides = [
    {
      icon: Heart,
      title: "Find Your Perfect Match",
      description:
        "Connect with trusted service providers and clients through our innovative swipe-based platform",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-100",
    },
    {
      icon: Zap,
      title: "Network Like Never Before",
      description:
        "Skip the endless searching and get matched with the right professionals in seconds",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-100",
    },
    {
      icon: Shield,
      title: "Verified & Trusted",
      description:
        "All service providers are verified and rated by real clients for your peace of mind",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-100",
    },
  ];

  const featureCards = [
    {
      icon: Search,
      title: "Smart Discovery",
      description:
        "Find services and providers that match your specific needs through intelligent recommendations",
      color: "blue",
    },
    {
      icon: Users,
      title: "Instant Connections",
      description:
        "Swipe right to connect instantly with verified professionals and potential clients",
      color: "green",
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description:
        "Skip lengthy forms and get matched with the right people in seconds, not hours",
      color: "purple",
    },
    {
      icon: Heart,
      title: "Perfect Matching",
      description:
        "Our advanced algorithm ensures you connect with the most compatible professionals",
      color: "orange",
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description:
        "All service providers are verified and rated by real clients for your peace of mind",
      color: "pink",
    },
  ];

  const serviceCategories = [
    {
      icon: Home,
      title: "Home Services",
      services: ["Cleaning", "Plumbing", "Electrical", "HVAC"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Wrench,
      title: "Handyman",
      services: [
        "Repairs",
        "Installation",
        "Maintenance",
        "Assembly",
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Paintbrush,
      title: "Creative Services",
      services: ["Painting", "Design", "Photography", "Art"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Car,
      title: "Moving & Transport",
      services: ["Moving", "Delivery", "Logistics", "Storage"],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Scissors,
      title: "Personal Care",
      services: ["Haircut", "Beauty", "Wellness", "Fitness"],
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "Found an amazing electrician in minutes! The swipe interface made it so easy to browse through different professionals.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b469?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "Mike Chen",
      role: "Contractor",
      content:
        "As a service provider, this app has completely changed how I find clients. The matching system is incredibly accurate.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "Emily Rodriguez",
      role: "Business Owner",
      content:
        "The verification process gives me confidence that I'm connecting with legitimate professionals. Highly recommend!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "David Kim",
      role: "Freelancer",
      content:
        "Got three new clients in my first week! The interface is intuitive and the matches are spot-on.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
  ];

  const ctaVariants = [
    {
      title: "Ready to Start Networking?",
      description:
        "Be part of a growing network of trusted professionals and satisfied connections",
      primaryText: "Create Account",
      secondaryText: "Sign In",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Leeds Binder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The future of professional networking
          </p>
        </div>

        {/* Hero Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <Carousel
            setApi={setHeroApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {heroSlides.map((slide, index) => {
                const Icon = slide.icon;
                return (
                  <CarouselItem key={index}>
                    <Card
                      className={`p-8 text-center bg-gradient-to-br ${slide.bgGradient} border-0 shadow-lg`}
                    >
                      <CardContent>
                        <div className="mb-8">
                          <div
                            className={`w-20 h-20 bg-gradient-to-r ${slide.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
                          >
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                          <h2 className="mb-4">
                            {slide.title}
                          </h2>
                          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            {slide.description}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                              onClick={onRegister}
                              size="lg"
                            >
                              Create Account
                            </Button>
                            <Button
                              onClick={onLogin}
                              variant="outline"
                              size="lg"
                            >
                              Sign In
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
          <CarouselIndicators
            totalSlides={heroSlides.length}
            currentSlide={heroCurrentSlide}
            onSlideClick={(index) => heroApi?.scrollTo(index)}
          />
        </div>

        {/* Features Carousel */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="mb-4">Why Choose Leeds Binders?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make professional
              networking effortless
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <Carousel
              setApi={setFeaturesApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featureCards.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div
                            className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}
                          >
                            <Icon
                              className={`w-6 h-6 text-${feature.color}-600`}
                            />
                          </div>
                          <CardTitle className="text-lg">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
            <CarouselIndicators
              totalSlides={featureCards.length}
              currentSlide={featuresCurrentSlide}
              onSlideClick={(index) =>
                featuresApi?.scrollTo(index)
              }
            />
          </div>
        </div>

        {/* Services Carousel */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="mb-4">Popular Service Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the wide range of services available on
              our platform
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Carousel
              setApi={setServicesApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {serviceCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <Card
                        className={`h-full hover:shadow-lg transition-all duration-300 hover:scale-105 ${category.bgColor} border-0`}
                      >
                        <CardContent className="p-6">
                          <div className="text-center mb-4">
                            <div
                              className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                            >
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="mb-3">
                              {category.title}
                            </h3>
                          </div>
                          <div className="space-y-2">
                            {category.services.map(
                              (service) => (
                                <Badge
                                  key={service}
                                  variant="secondary"
                                  className="mr-2 mb-2"
                                >
                                  {service}
                                </Badge>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
            <CarouselIndicators
              totalSlides={serviceCategories.length}
              currentSlide={servicesCurrentSlide}
              onSlideClick={(index) =>
                servicesApi?.scrollTo(index)
              }
            />
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real feedback from service providers and clients
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Carousel
              setApi={setTestimonialsApi}
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2"
                  >
                    <Card className="p-6 h-full">
                      <CardContent>
                        <div className="flex items-center mb-4">
                          <ImageWithFallback
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="font-semibold">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(testimonial.rating)].map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ),
                          )}
                        </div>
                        <p className="text-muted-foreground italic">
                          "{testimonial.content}"
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
            <CarouselIndicators
              totalSlides={testimonials.length}
              currentSlide={testimonialsCurrentSlide}
              onSlideClick={(index) =>
                testimonialsApi?.scrollTo(index)
              }
            />
          </div>
        </div>

        {/* CTA Carousel */}
        <div className="max-w-3xl mx-auto">
          <Carousel
            setApi={setCtaApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {ctaVariants.map((cta, index) => (
                <CarouselItem key={index}>
                  <Card className="text-center p-8 bg-gradient-to-br from-indigo-50 to-blue-100 border-0 shadow-lg">
                    <CardContent>
                      <h3 className="mb-4">{cta.title}</h3>
                      <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                        {cta.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={onRegister} size="lg">
                          {cta.primaryText}
                        </Button>
                        <Button
                          onClick={onLogin}
                          variant="outline"
                          size="lg"
                        >
                          {cta.secondaryText}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}