import React, { useState } from 'react';
import { SOCIAL_LINKS } from "@/constants/links";
import { useGithubProfile } from '@/hooks/useGithubProfile';
import profile from "@/assets/userImg.jpg";
import { Github, Linkedin, ExternalLink, User, Code, Globe, Info } from 'lucide-react';

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function About() {
  const { data: githubUser, isLoading, isError } = useGithubProfile();
  const [showProfile, setShowProfile] = useState(false);

  if (isLoading) {
    return (
      <div className="container py-20 flex flex-col items-center gap-8">
        <Skeleton className="h-[400px] w-full max-w-2xl rounded-xl" />
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-24 space-y-12">
      <section className="mx-auto max-w-[800px] text-center space-y-4">
        <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary bg-primary/5">
          About Us
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Redefining the <span className="text-primary tracking-tighter">Touring Experience</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          We are committed to making cultural exploration seamless, accessible, and digital-first.
        </p>
      </section>

      <div className="flex justify-center">
        <Button
          onClick={() => setShowProfile(!showProfile)}
          size="lg"
          variant={showProfile ? "outline" : "default"}
          className="gap-2 shadow-md transition-all active:scale-95"
        >
          {showProfile ? <Info className="w-4 h-4" /> : <User className="w-4 h-4" />}
          {showProfile ? "Hide Developer Profile" : "Meet the Developer"}
        </Button>
      </div>

      {showProfile && githubUser && (
        <Card className="mx-auto max-w-2xl overflow-hidden border-border/50 shadow-2xl backdrop-blur-sm bg-card/50 transition-all animate-in fade-in zoom-in duration-300">
          <div className="h-32 bg-gradient-to-r from-primary/20 to-indigo-500/20" />
          <CardHeader className="relative pb-0">
            <div className="absolute -top-16 left-6 h-28 w-28 rounded-2xl border-4 border-background overflow-hidden shadow-xl">
              <img src={githubUser.avatar_url || profile} alt={githubUser.name} className="h-full w-full object-cover" />
            </div>
            <div className="pt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-3xl font-bold">{githubUser.name}</CardTitle>
                <CardDescription className="text-base flex items-center gap-1.5 mt-1 font-medium">
                  <Code className="w-4 h-4 text-primary" />
                  Full Stack Developer
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <a
                  href={githubUser.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm", variant: "outline" }), "flex items-center gap-2")}
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm" }), "flex items-center gap-2 transition-all hover:translate-y-[-2px]")}
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Location</h4>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  {githubUser.location || "Earth"}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Bio</h4>
                <p className="text-sm leading-relaxed">
                  {githubUser.bio || "Crafting digital experiences that bridge the gap between history and technology."}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-center italic text-muted-foreground">
                "Preserving the past, coding the future."
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
