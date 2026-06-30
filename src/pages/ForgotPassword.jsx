import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, ArrowLeft, Loader2, Inbox, CheckCircle2 } from 'lucide-react';
import { useForgotPassword } from '@/hooks/useAuth';
import AuthHeroPanel from '@/components/AuthHeroPanel.jsx';
import { motion, AnimatePresence } from 'framer-motion';

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

const fadeSlide = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

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
        <motion.div
          className="mx-auto w-full max-w-sm lg:w-96"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Back to login — above the card */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" {...fadeSlide}>
                <div className="mb-5">
                  <h2 className="text-3xl font-bold tracking-tight">Forgot Password</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Enter your email and we'll send you a reset link.
                  </p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
                  <form onSubmit={handleSubmit}>
                    <CardContent className="pt-4 space-y-4">
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
                    <CardFooter className="pt-1 pb-4">
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
              </motion.div>
            ) : (
              <motion.div key="success" {...fadeSlide}>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl text-center">
                  <CardHeader className="pb-2">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Inbox className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
                      Check Your Email <CheckCircle2 className="text-green-500 h-5 w-5" />
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      We've sent a reset link to <span className="text-foreground font-semibold">{email}</span>.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground pb-2">
                    Didn't get it? Check your spam folder.
                  </CardContent>
                  <CardFooter className="pt-1 pb-4">
                    <Button
                      onClick={() => navigate("/login")}
                      className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20"
                    >
                      Back to Login
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
