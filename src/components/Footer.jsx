import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-1 w-full border-t border-border/40 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 py-2">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-10 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ticketless Touring. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-destructive fill-destructive" />
          <span>for travelers</span>
        </div>
      </div>
    </footer>
  );
}
