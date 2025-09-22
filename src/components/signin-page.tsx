import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Heart,
} from "lucide-react";

interface SignInPageProps {
  onSignIn: () => void;
  onBackToHome: () => void;
  onGoToRegister: () => void;
}

export function SignInPage({
  onSignIn,
  onBackToHome,
  onGoToRegister,
}: SignInPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignIn();
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail("demo@demo.com");
    setPassword("demo123");
    setTimeout(() => {
      onSignIn();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="absolute top-4 left-4 md:top-8 md:left-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your Leeds Binder account
          </p>
        </div>

        {/* Sign In Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                >
                  Forgot password?
                </Button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <Separator />
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            {/* Demo Login */}
            <Button
              variant="outline"
              className="w-full mb-4"
              onClick={handleDemoLogin}
            >
              Try Demo Account
            </Button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-blue-600"
                  onClick={onGoToRegister}
                >
                  Sign up here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-xs"
            >
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-xs"
            >
              Privacy Policy
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}