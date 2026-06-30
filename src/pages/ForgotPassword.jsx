import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, ArrowLeft, Loader2, Inbox, CheckCircle2 } from 'lucide-react';
import { useForgotPassword } from '@/hooks/useAuth';
import AuthHeroPanel from '@/components/AuthHeroPanel.jsx';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { toast.warning("Email address is required."); return; }
    if (!validateEmail(email)) { toast.error("Please enter a valid email address."); return; }
    try {
      await forgotPasswordMutation.mutateAsync({ email });
      toast.success("Reset link sent successfully.");
      setSubmitted(true);
    } catch (error) {
      toast.error(
        'Request failed: ' +
        (error.response?.data?.error?.errorMessage || error.response?.data?.message || "Unknown server error")
      );
    }
  };

  return (
    <div className="flex h-screen">
      <AuthHeroPanel />

      {/* Right Side */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32 bg-background overflow-y-auto">
        <div className="mx-auto w-full max-w-sm lg:w-96">

          {/* Back to login — above the card */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>

          {!submitted ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Forgot Password</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <form onSubmit={handleSubmit}>
                  <CardContent className="pt-6 space-y-4">
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={forgotPasswordMutation.isPending}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 pb-6">
                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                      disabled={forgotPasswordMutation.isPending}
                    >
                      {forgotPasswordMutation.isPending ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending Link...</>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </>
          ) : (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl p-4 text-center animate-in fade-in zoom-in-95 duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Inbox className="h-8 w-8 animate-bounce text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  Check Your Email <CheckCircle2 className="text-green-500 h-5 w-5" />
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  We've sent a secure link to <span className="text-foreground font-semibold">{email}</span>.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground pb-4">
                Click the link inside to set your new password. Didn't get it? Check your spam folder.
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20"
                >
                  Back to Login
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
