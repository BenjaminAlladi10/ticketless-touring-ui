import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center space-y-8 py-12">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-destructive/10 p-6 text-destructive animate-pulse">
          <AlertTriangle className="h-20 w-20" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tighter">404</h1>
          <h2 className="text-3xl font-bold">Lost in Time?</h2>
          <p className="text-xl text-muted-foreground max-w-[500px]">
            The page you are looking for has been moved, deleted, or never existed in history.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Button variant="outline" size="lg" onClick={() => navigate(-1)} className="flex-1 gap-2">
          <ArrowLeft className="h-5 w-5" /> Go Back
        </Button>
        <Button size="lg" onClick={() => navigate("/")} className="flex-1 gap-2 shadow-lg shadow-primary/20">
          <Home className="h-5 w-5" /> Take Me Home
        </Button>
      </div>
    </div>
  );
}
