import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { ServiceCarousel } from "./service-carousel";
import {
  X,
  Plus,
  Clock,
  MapPin,
  User,
  Building,
  Phone,
  Mail,
  Globe,
  Award,
  Sparkles,
  Upload,
  Camera,
  Image as ImageIcon,
  Lock,
} from "lucide-react";

interface UserProfile {
  name: string;
  fullName?: string;
  businessName?: string;
  location: string;
  serviceAreas: string[];
  userType: "client" | "provider" | "both";
  services: string[];
  description: string;
  experience?: string;
  hourlyRate?: string;
  businessHours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  certifications?: string[];
  portfolioImages?: string[];
  businessType?: "individual" | "small-business" | "company";
  businessLogo?: string;
  businessImage?: string;
  password?: string;
}

interface BusinessProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
  initialData?: {
    name: string;
    email: string;
    location: string;
    userType: "client" | "provider" | "both";
  };
}

const availableServices = [
  "Gardening",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Painting",
  "Carpentry",
  "Moving",
  "Home Repair",
  "Landscaping",
  "Roofing",
  "HVAC",
  "Photography",
  "Catering",
  "Pet Care",
  "Tutoring",
  "Handyman",
  "Interior Design",
  "Security",
  "Auto Repair",
  "Web Development",
];

// Keywords mapping for auto-detecting services from descriptions
const serviceKeywords = {
  Gardening: [
    "garden",
    "gardening",
    "plant",
    "flower",
    "lawn",
    "grass",
    "trim",
    "prune",
    "weed",
    "soil",
    "irrigation",
    "greenhouse",
    "botanical",
    "landscaping",
  ],
  Cleaning: [
    "clean",
    "cleaning",
    "sanitize",
    "vacuum",
    "mop",
    "dust",
    "tidy",
    "organize",
    "janitorial",
    "housekeeping",
    "maintenance",
    "deep clean",
  ],
  Plumbing: [
    "plumber",
    "plumbing",
    "pipe",
    "drain",
    "faucet",
    "toilet",
    "leak",
    "water",
    "sewer",
    "fixture",
    "installation",
    "bathroom",
    "kitchen",
  ],
  Electrical: [
    "electric",
    "electrical",
    "electrician",
    "wire",
    "outlet",
    "switch",
    "circuit",
    "breaker",
    "lighting",
    "panel",
    "voltage",
    "installation",
    "wiring",
  ],
  Painting: [
    "paint",
    "painting",
    "painter",
    "color",
    "brush",
    "wall",
    "interior",
    "exterior",
    "primer",
    "coating",
    "finish",
    "decorator",
    "house painting",
  ],
  Carpentry: [
    "carpenter",
    "carpentry",
    "wood",
    "furniture",
    "cabinet",
    "door",
    "window",
    "frame",
    "build",
    "custom",
    "joinery",
    "woodwork",
  ],
  Moving: [
    "move",
    "moving",
    "relocate",
    "transport",
    "pack",
    "load",
    "delivery",
    "shipping",
    "logistics",
    "storage",
    "relocation",
  ],
  "Home Repair": [
    "repair",
    "fix",
    "maintenance",
    "renovation",
    "restore",
    "upgrade",
    "improvement",
    "handyman",
    "home repair",
    "house repair",
  ],
  Landscaping: [
    "landscape",
    "landscaping",
    "outdoor",
    "yard",
    "patio",
    "deck",
    "fence",
    "pathway",
    "design",
    "hardscape",
    "backyard",
  ],
  Roofing: [
    "roof",
    "roofing",
    "roofer",
    "shingle",
    "gutter",
    "chimney",
    "leak",
    "installation",
    "replacement",
    "storm damage",
  ],
  HVAC: [
    "hvac",
    "heating",
    "cooling",
    "air conditioning",
    "ventilation",
    "furnace",
    "ac",
    "temperature",
    "duct",
    "climate",
    "air conditioner",
  ],
  Photography: [
    "photo",
    "photography",
    "photographer",
    "camera",
    "shoot",
    "wedding",
    "portrait",
    "event",
    "studio",
    "editing",
    "digital",
    "photos",
  ],
  Catering: [
    "cater",
    "catering",
    "caterer",
    "food",
    "event",
    "party",
    "wedding",
    "menu",
    "chef",
    "cooking",
    "restaurant",
    "cuisine",
  ],
  "Pet Care": [
    "pet",
    "pets",
    "dog",
    "cat",
    "animal",
    "veterinary",
    "grooming",
    "walking",
    "sitting",
    "boarding",
    "pet care",
    "dog walking",
  ],
  Tutoring: [
    "tutor",
    "tutoring",
    "teach",
    "teaching",
    "education",
    "lesson",
    "student",
    "academic",
    "homework",
    "learning",
    "instruction",
  ],
  Handyman: [
    "handyman",
    "general",
    "odd jobs",
    "small repairs",
    "maintenance",
    "assembly",
    "installation",
    "handy",
    "fix",
  ],
  "Interior Design": [
    "interior",
    "design",
    "designer",
    "decor",
    "furniture",
    "space",
    "aesthetic",
    "style",
    "consultation",
    "interior design",
  ],
  Security: [
    "security",
    "alarm",
    "surveillance",
    "camera",
    "monitoring",
    "protection",
    "safety",
    "guard",
    "security system",
  ],
  "Auto Repair": [
    "auto",
    "car",
    "vehicle",
    "mechanic",
    "engine",
    "brake",
    "tire",
    "automotive",
    "garage",
    "auto repair",
    "car repair",
  ],
  "Web Development": [
    "web",
    "website",
    "development",
    "programming",
    "coding",
    "app",
    "software",
    "digital",
    "tech",
    "web development",
    "developer",
  ],
};

const businessTypes = [
  { value: "individual", label: "Individual/Freelancer" },
  { value: "small-business", label: "Small Business" },
  { value: "company", label: "Company/Enterprise" },
];

const defaultBusinessHours = {
  monday: "9:00 AM - 5:00 PM",
  tuesday: "9:00 AM - 5:00 PM",
  wednesday: "9:00 AM - 5:00 PM",
  thursday: "9:00 AM - 5:00 PM",
  friday: "9:00 AM - 5:00 PM",
  saturday: "Closed",
  sunday: "Closed",
};

export function BusinessProfileSetup({
  onComplete,
  initialData,
}: BusinessProfileSetupProps) {
  const [currentTab, setCurrentTab] = useState("basic");
  const [profile, setProfile] = useState<UserProfile>({
    name: initialData?.name || "",
    location: initialData?.location || "",
    serviceAreas: initialData?.location
      ? [initialData.location]
      : [],
    userType: initialData?.userType || "both",
    services: [],
    description: "",
    businessHours: defaultBusinessHours,
    certifications: [],
    portfolioImages: [],
    businessType: "individual",
    email: initialData?.email || "",
  });

  const [newServiceArea, setNewServiceArea] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [isGeneratingDescription, setIsGeneratingDescription] =
    useState(false);
  const [hasAutoSelectedServices, setHasAutoSelectedServices] =
    useState(false);

  const addServiceArea = () => {
    if (
      newServiceArea &&
      !profile.serviceAreas.includes(newServiceArea)
    ) {
      setProfile((prev) => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, newServiceArea],
      }));
      setNewServiceArea("");
    }
  };

  const removeServiceArea = (area: string) => {
    setProfile((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((a) => a !== area),
    }));
  };

  const addCertification = () => {
    if (
      newCertification &&
      !profile.certifications?.includes(newCertification)
    ) {
      setProfile((prev) => ({
        ...prev,
        certifications: [
          ...(prev.certifications || []),
          newCertification,
        ],
      }));
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setProfile((prev) => ({
      ...prev,
      certifications:
        prev.certifications?.filter((c) => c !== cert) || [],
    }));
  };

  const updateBusinessHours = (day: string, hours: string) => {
    setProfile((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours!,
        [day]: hours,
      },
    }));
  };

  const generateAIDescription = async () => {
    if (profile.services.length === 0) {
      return;
    }

    setIsGeneratingDescription(true);

    // Simulate AI generation with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const servicesText = profile.services.join(", ");
    const businessTypeText =
      businessTypes.find(
        (bt) => bt.value === profile.businessType,
      )?.label || "business";

    let generatedDescription = "";

    if (profile.userType === "provider") {
      generatedDescription = `Professional ${businessTypeText.toLowerCase()} specializing in ${servicesText.toLowerCase()}. With years of experience and a commitment to quality, we deliver exceptional results that exceed expectations. Our expertise covers comprehensive ${profile.services[0].toLowerCase()} solutions tailored to meet your specific needs. We pride ourselves on reliable service, competitive pricing, and customer satisfaction.`;
    } else if (profile.userType === "client") {
      generatedDescription = `Looking for reliable professionals to help with ${servicesText.toLowerCase()}. I value quality workmanship, clear communication, and timely completion. Whether it's a small project or ongoing services, I'm seeking experienced providers who can deliver excellent results within budget and timeline requirements.`;
    } else {
      generatedDescription = `Versatile ${businessTypeText.toLowerCase()} offering ${servicesText.toLowerCase()} services while also seeking partnerships for complementary projects. We bring professional expertise to every job while remaining open to collaborating with other skilled professionals. Our dual approach allows us to both serve clients directly and work as part of larger project teams.`;
    }

    setProfile((prev) => ({
      ...prev,
      description: generatedDescription,
    }));
    setIsGeneratingDescription(false);
  };

  // Auto-detect services from description
  const autoSelectServicesFromDescription = (
    description: string,
  ) => {
    if (!description || description.length < 10) return;

    const descriptionLower = description.toLowerCase();
    const detectedServices: string[] = [];

    console.log("Analyzing description:", description);

    // Check each service for keyword matches
    Object.entries(serviceKeywords).forEach(
      ([service, keywords]) => {
        const matchingKeywords = keywords.filter((keyword) =>
          descriptionLower.includes(keyword.toLowerCase()),
        );

        // More lenient detection: 1+ keyword match, or any exact service name match
        if (
          matchingKeywords.length >= 1 ||
          descriptionLower.includes(service.toLowerCase())
        ) {
          detectedServices.push(service);
          console.log(
            `Detected service: ${service} (matched: ${matchingKeywords.join(", ")})`,
          );
        }
      },
    );

    console.log("Detected services:", detectedServices);

    // Only auto-select if we found some services
    if (detectedServices.length > 0) {
      setProfile((prev) => ({
        ...prev,
        services: [
          ...new Set([...prev.services, ...detectedServices]),
        ], // Merge and deduplicate
      }));
      setHasAutoSelectedServices(true);
    }
  };

  // Watch for description changes and auto-detect services
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        profile.description &&
        profile.description.length > 10 &&
        !isGeneratingDescription
      ) {
        autoSelectServicesFromDescription(profile.description);
      }
    }, 800); // Reduced debounce time for better UX

    return () => clearTimeout(timeoutId);
  }, [profile.description, isGeneratingDescription]); // Removed hasAutoSelectedServices dependency

  // Reset auto-selection flag when user manually changes services
  const handleServiceToggle = (service: string) => {
    setProfile((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
    // Reset the flag so auto-detection can work again if description changes
    setHasAutoSelectedServices(false);
  };

  const handleImageUpload = (
    type: "logo" | "image",
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);

      if (type === "logo") {
        setProfile((prev) => ({
          ...prev,
          businessLogo: objectUrl,
        }));
      } else {
        setProfile((prev) => ({
          ...prev,
          businessImage: objectUrl,
        }));
      }
    }
  };

  const removeImage = (type: "logo" | "image") => {
    if (type === "logo") {
      if (profile.businessLogo) {
        URL.revokeObjectURL(profile.businessLogo);
      }
      setProfile((prev) => ({
        ...prev,
        businessLogo: undefined,
      }));
    } else {
      if (profile.businessImage) {
        URL.revokeObjectURL(profile.businessImage);
      }
      setProfile((prev) => ({
        ...prev,
        businessImage: undefined,
      }));
    }
  };

  const handleSubmit = () => {
    const isBasicValid =
      profile.name && profile.location && profile.description;
    const isProviderValid =
      profile.userType === "client" ||
      ((profile.userType === "provider" ||
        profile.userType === "both") &&
        profile.services.length > 0 &&
        profile.experience &&
        profile.hourlyRate);

    if (isBasicValid && isProviderValid) {
      onComplete(profile);
    }
  };

  const isValid =
    profile.name &&
    profile.location &&
    profile.description &&
    (profile.userType === "client" ||
      ((profile.userType === "provider" ||
        profile.userType === "both") &&
        profile.services.length > 0 &&
        profile.experience &&
        profile.hourlyRate));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Building className="w-6 h-6" />
              Create Your Business Profile
            </CardTitle>
            <p className="text-center text-muted-foreground text-sm">
              Set up your professional profile to connect with
              clients
            </p>
          </CardHeader>
          <CardContent>
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic" className="text-xs">
                  Basic
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="text-xs"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="business"
                  className="text-xs"
                >
                  Business
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="text-xs"
                >
                  Contact
                </TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent
                value="basic"
                className="space-y-4 mt-6"
              >
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      {
                        value: "client",
                        label: "Looking for services",
                        icon: "🔍",
                      },
                      {
                        value: "provider",
                        label: "Providing services",
                        icon: "🛠️",
                      },
                      {
                        value: "both",
                        label: "Both",
                        icon: "🔄",
                      },
                    ].map((option) => (
                      <div
                        key={option.value}
                        onClick={() =>
                          setProfile((prev) => ({
                            ...prev,
                            userType: option.value as
                              | "client"
                              | "provider"
                              | "both",
                          }))
                        }
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 ${
                          profile.userType === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">
                            {option.icon}
                          </span>
                          <span className="text-sm font-medium">
                            {option.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {(profile.userType === "provider" ||
                  profile.userType === "both") && (
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select
                      value={profile.businessType}
                      onValueChange={(value: any) =>
                        setProfile((prev) => ({
                          ...prev,
                          businessType: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">
                    <User className="w-4 h-4 inline mr-2" />
                    {profile.userType === "client"
                      ? "Business Name"
                      : "Business Name"}
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter your name"
                  />
                </div>

                {(profile.userType === "provider" ||
                  profile.userType === "both") &&
                  profile.businessType !== "individual" && (
                    <div className="space-y-2">
                      <Label htmlFor="businessName">
                        <Building className="w-4 h-4 inline mr-2" />
                        Business Name
                      </Label>
                      <Input
                        id="businessName"
                        value={profile.businessName || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            businessName: e.target.value,
                          }))
                        }
                        placeholder="Enter your business name"
                      />
                    </div>
                  )}

                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={profile.fullName || ""}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Primary Location
                  </Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="City"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">
                      {profile.userType === "provider"
                        ? "About Your Business"
                        : profile.userType === "client"
                          ? "Tell Us About Your Needs"
                          : "About Your Business & Needs"}
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateAIDescription}
                      disabled={
                        profile.services.length === 0 ||
                        isGeneratingDescription
                      }
                      className="flex items-center gap-2 text-xs"
                    >
                      <Sparkles
                        className={`w-4 h-4 ${isGeneratingDescription ? "animate-spin" : ""}`}
                      />
                      {isGeneratingDescription
                        ? "Generating..."
                        : "AI Generate"}
                    </Button>
                  </div>
                  <Textarea
                    id="description"
                    value={profile.description}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder={
                      profile.userType === "provider"
                        ? "Describe your business, expertise, and what makes you unique..."
                        : profile.userType === "client"
                          ? "What kind of projects or help are you looking for?"
                          : "Describe your business and the services you provide or need..."
                    }
                    rows={4}
                  />
                  {profile.services.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      💡 Describe your business and services
                      will be auto-detected, or select services
                      first to use AI generation
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent
                value="services"
                className="space-y-4 mt-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>
                      {profile.userType === "provider"
                        ? "Services You Provide"
                        : profile.userType === "client"
                          ? "Services You Need"
                          : "Services (Provide/Need)"}
                    </Label>
                    {hasAutoSelectedServices && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Sparkles className="w-3 h-3" />
                        Auto-detected from description
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {availableServices.map((service) => (
                      <Button
                        key={service}
                        variant={
                          profile.services.includes(service)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleServiceToggle(service)
                        }
                        className="text-xs justify-start"
                      >
                        {service}
                      </Button>
                    ))}
                  </div>
                  {profile.services.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {profile.services.map((service) => (
                        <Badge
                          key={service}
                          variant="secondary"
                          className="text-xs"
                        >
                          {service}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() =>
                              handleServiceToggle(service)
                            }
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {(profile.userType === "provider" ||
                  profile.userType === "both") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="experience">
                        Years of Experience
                      </Label>
                      <Input
                        id="experience"
                        value={profile.experience || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            experience: e.target.value,
                          }))
                        }
                        placeholder="e.g., 5+ years"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">
                        Your Hourly Rate
                      </Label>
                      <Input
                        id="hourlyRate"
                        value={profile.hourlyRate || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            hourlyRate: e.target.value,
                          }))
                        }
                        placeholder="e.g., $25-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Service Areas</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newServiceArea}
                          onChange={(e) =>
                            setNewServiceArea(e.target.value)
                          }
                          placeholder="Add service area"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            addServiceArea()
                          }
                        />
                        <Button
                          onClick={addServiceArea}
                          size="sm"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {profile.serviceAreas.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {profile.serviceAreas.map((area) => (
                            <Badge
                              key={area}
                              variant="outline"
                              className="text-xs"
                            >
                              {area}
                              <X
                                className="w-3 h-3 ml-1 cursor-pointer"
                                onClick={() =>
                                  removeServiceArea(area)
                                }
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Business Details Tab */}
              <TabsContent
                value="business"
                className="space-y-4 mt-6"
              >
                {/* Business Images Section - Available for all user types */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Business Images
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Business Logo Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">
                        Business Logo
                      </Label>
                      <div className="relative">
                        {profile.businessLogo ? (
                          <div className="relative group">
                            <img
                              src={profile.businessLogo}
                              alt="Business Logo"
                              className="w-full h-32 object-cover rounded-lg border-2 border-dashed border-border"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  removeImage("logo")
                                }
                              >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                              <p className="text-xs text-muted-foreground text-center">
                                Upload Logo
                                <br />
                                <span className="text-xs">
                                  PNG, JPG up to 5MB
                                </span>
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload("logo", e)
                              }
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Business Image Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">
                        Business Photo
                      </Label>
                      <div className="relative">
                        {profile.businessImage ? (
                          <div className="relative group">
                            <img
                              src={profile.businessImage}
                              alt="Business"
                              className="w-full h-32 object-cover rounded-lg border-2 border-dashed border-border"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  removeImage("image")
                                }
                              >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Camera className="w-6 h-6 text-muted-foreground mb-2" />
                              <p className="text-xs text-muted-foreground text-center">
                                Upload Photo
                                <br />
                                <span className="text-xs">
                                  PNG, JPG up to 5MB
                                </span>
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload("image", e)
                              }
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    💡 A professional logo and business photo
                    help build trust with potential clients
                  </p>
                </div>

                {(profile.userType === "provider" ||
                  profile.userType === "both") && (
                  <>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Business Hours
                      </Label>
                      <div className="space-y-2">
                        {Object.entries(
                          profile.businessHours ||
                            defaultBusinessHours,
                        ).map(([day, hours]) => (
                          <div
                            key={day}
                            className="flex items-center gap-2"
                          >
                            <Label className="w-20 text-sm capitalize">
                              {day}
                            </Label>
                            <Input
                              value={hours}
                              onChange={(e) =>
                                updateBusinessHours(
                                  day,
                                  e.target.value,
                                )
                              }
                              placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                              className="flex-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Certifications & Licenses
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          value={newCertification}
                          onChange={(e) =>
                            setNewCertification(e.target.value)
                          }
                          placeholder="Add certification or license"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            addCertification()
                          }
                        />
                        <Button
                          onClick={addCertification}
                          size="sm"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {profile.certifications &&
                        profile.certifications.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {profile.certifications.map(
                              (cert) => (
                                <Badge
                                  key={cert}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {cert}
                                  <X
                                    className="w-3 h-3 ml-1 cursor-pointer"
                                    onClick={() =>
                                      removeCertification(cert)
                                    }
                                  />
                                </Badge>
                              ),
                            )}
                          </div>
                        )}
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Contact Information Tab */}
              <TabsContent
                value="contact"
                className="space-y-4 mt-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={profile.password || ""}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="Enter your password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone || ""}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="(555) 123-4567"
                  />
                </div>

                {(profile.userType === "provider" ||
                  profile.userType === "both") && (
                  <div className="space-y-2">
                    <Label htmlFor="website">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Website (Optional)
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={profile.website || ""}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      placeholder="https://your-website.com"
                    />
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className="w-full"
                    size="lg"
                  >
                    Complete Profile Setup
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    You can always update your profile later
                  </p>
                </div>
              </TabsContent>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    const tabs = [
                      "basic",
                      "services",
                      "business",
                      "contact",
                    ];
                    const currentIndex =
                      tabs.indexOf(currentTab);
                    if (currentIndex > 0) {
                      setCurrentTab(tabs[currentIndex - 1]);
                    }
                  }}
                  disabled={currentTab === "basic"}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    const tabs = [
                      "basic",
                      "services",
                      "business",
                      "contact",
                    ];
                    const currentIndex =
                      tabs.indexOf(currentTab);
                    if (currentIndex < tabs.length - 1) {
                      setCurrentTab(tabs[currentIndex + 1]);
                    }
                  }}
                  disabled={currentTab === "contact"}
                >
                  Next
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}