import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogIn as LogInIcon, UserPlus, Mail, Lock, User, CheckCircle2, ArrowLeft } from 'lucide-react';

import userContext from '@/contexts/userContext';
import { useLogin, useRegister } from '@/hooks/useAuth';
import loginHero from '@/assets/login-hero.png';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function LogIn() {
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    termsAccepted: false
  });

  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleCheckboxChange = (checked) => {
    setRegisterData({ ...registerData, termsAccepted: checked });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginMutation.mutateAsync(loginData);
      const userData = { ...data.data.user };
      setUser(userData);
      toast.success(`Welcome back, ${data.data.user.username}`);
      navigate("/");
    }
    catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.error?.errorMessage || "Unknown error"));
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerData.termsAccepted) {
      toast.warning('Please accept the terms and conditions.');
      return;
    }
    if ([registerData.username, registerData.email, registerData.password].some((field) => !field?.trim())) {
      toast.warning("All fields are required.");
      return;
    }
    try {
      await registerMutation.mutateAsync(registerData);
      toast.info("Registration successful. Please login to continue.")
      setActiveTab("login");
    }
    catch (error) {
      toast.error('Registration failed: ' + (error.response?.data?.error?.errorMessage || "Unknown error"));
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image & Branding */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={loginHero}
          alt="Taj Mahal at sunset"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 space-y-4 text-white">
          <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" /> Back to explore
          </Link>
          <h1 className="text-5xl font-black tracking-tighter">
            Rediscover <br />
            <span className="text-primary italic">Heritage.</span>
          </h1>
          <p className="max-w-md text-lg text-white/70">
            Secure your journey to India's most iconic landmarks with our seamless digital ticketing experience.
          </p>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32 bg-background">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold tracking-tight">
              {activeTab === "login" ? "Welcome Back" : "Start Your Journey"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeTab === "login"
                ? "Enter your details to access your bookings"
                : "Create an account to start exploring monuments"}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col w-full space-y-2">
            <TabsList className="flex w-full mb-6 h-12 bg-muted/30 p-1 rounded-xl border border-border/20" variant="line">
              <TabsTrigger 
                value="login" 
                className={`gap-2 text-sm transition-all relative ${activeTab === 'login' ? '!text-primary font-bold' : 'text-muted-foreground'}`}
              >
                <LogInIcon className="h-4 w-4" /> Login
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className={`gap-2 text-sm transition-all relative ${activeTab === 'register' ? '!text-primary font-bold' : 'text-muted-foreground'}`}
              >
                <UserPlus className="h-4 w-4" /> Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        required
                        className="pl-10 h-11"
                        value={loginData.email}
                        onChange={handleLoginChange}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button type="button" className="text-xs font-medium text-primary hover:underline">
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="pl-10 h-11"
                        value={loginData.password}
                        onChange={handleLoginChange}
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? "Authenticating..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        name="username"
                        placeholder="johndoe"
                        required
                        className="pl-10 h-11"
                        value={registerData.username}
                        onChange={handleRegisterChange}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      required
                      className="h-11"
                      value={registerData.fullName}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-email">Email Address</Label>
                    <Input
                      id="reg-email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      required
                      className="h-11"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      name="password"
                      type="password"
                      required
                      className="h-11"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="terms"
                      onCheckedChange={handleCheckboxChange}
                      checked={registerData.termsAccepted}
                    />
                    <Label htmlFor="terms" className="text-xs font-normal leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I agree to the <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
                    </Label>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20" disabled={registerMutation.isPending}>
                  {registerMutation.isPending ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
