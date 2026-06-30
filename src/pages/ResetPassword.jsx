import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useResetPassword } from '@/hooks/useAuth';
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

function getStrength(password) {
  if (!password) return { label: '', color: '', width: 'w-0' };
  if (password.length < 6) return { label: 'Too Short', color: 'bg-red-500', width: 'w-[20%]' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-[40%]' };
  if (score <= 4) return { label: 'Medium', color: 'bg-amber-500', width: 'w-[70%]' };
  return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
}

export default function ResetPassword() {
  const { token: pathToken } = useParams();
  const [searchParams] = useSearchParams();
  const token = pathToken || searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();
  const resetPasswordMutation = useResetPassword();
  const strength = getStrength(password);

  useEffect(() => {
    if (!submitted) return;
    if (countdown === 0) { navigate('/login'); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [submitted, countdown, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) { toast.error("Reset token is missing. Please use the link from your email."); return; }
    if (password.length < 6) { toast.warning("Password must be at least 6 characters."); return; }
    if (password !== confirmPassword) { toast.error("Passwords do not match."); return; }
    try {
      await resetPasswordMutation.mutateAsync({ token, password });
      toast.success("Password reset successfully!");
      setSubmitted(true);
    } catch (error) {
      toast.error(
        'Reset failed: ' +
        (error.response?.data?.error?.errorMessage || error.response?.data?.message || "Invalid or expired token")
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

          {/* No token */}
          {!token ? (
            <Card className="border-destructive/50 bg-destructive/5 backdrop-blur-sm p-6 text-center animate-in fade-in duration-300">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Invalid Request</h3>
              <p className="text-sm text-muted-foreground mb-4">
                No reset token found. Please click the link in your email, or request a new one.
              </p>
              <Button onClick={() => navigate('/forgot-password')} className="w-full">
                Go to Forgot Password
              </Button>
            </Card>

          /* Success state */
          ) : submitted ? (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl p-4 text-center animate-in fade-in zoom-in-95 duration-300">
              <CardHeader className="pb-2">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <ShieldCheck className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  Password Updated! <CheckCircle2 className="text-green-500 h-5 w-5" />
                </CardTitle>
                <CardDescription className="mt-2">
                  Your password has been updated. Redirecting in <span className="text-foreground font-semibold">{countdown}s</span>...
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-4">
                <Button onClick={() => navigate("/login")} className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20">
                  Log In Now
                </Button>
              </CardFooter>
            </Card>

          /* Reset form */
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Reset Password</h2>
                <p className="mt-2 text-sm text-muted-foreground">Enter your new password below.</p>
              </div>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <form onSubmit={handleSubmit}>
                  <CardContent className="pt-6 space-y-5">
                    {/* New Password */}
                    <div className="grid gap-2">
                      <Label htmlFor="password">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="pl-10 pr-10 h-11"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={resetPasswordMutation.isPending}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(v => !v)}
                          className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Strength meter */}
                    {password && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Password Strength</span>
                          <span className={`font-semibold ${
                            strength.label === 'Strong' ? 'text-emerald-500' :
                            strength.label === 'Medium' ? 'text-amber-500' : 'text-red-500'
                          }`}>{strength.label}</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                        </div>
                      </div>
                    )}

                    {/* Confirm Password */}
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          className="pl-10 pr-10 h-11"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={resetPasswordMutation.isPending}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(v => !v)}
                          className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 pb-6">
                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                      disabled={resetPasswordMutation.isPending}
                    >
                      {resetPasswordMutation.isPending ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Resetting...</>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
