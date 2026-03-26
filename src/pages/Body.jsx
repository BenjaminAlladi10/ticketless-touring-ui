import React, { useState } from 'react';
import MonumentCard from '@/components/MonumentCard';
import { useMonuments } from '@/hooks/useMonuments';
import ShimmerContainer from '@/components/ShimmerContainer';
import { Search, Map, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Body() {
  const { data: monuments, isLoading, isError, error } = useMonuments();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMonuments = monuments?.filter((monument) =>
    monument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    monument.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4 text-destructive">
          <Map className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
        <p className="text-muted-foreground">Error: {error.message}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white dark:bg-black">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
        </div>

        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Explore India's Heritage
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Book Tickets to <br />
            <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
              Iconic Monuments
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-slate-300 md:text-xl">
            Skip the long queues and experience India's rich history with our seamless,
            ticketless touring platform. Instant booking, zero hassle.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="h-12 gap-2 text-base px-8 shadow-lg shadow-primary/20">
              Explore Destinations <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 gap-2 text-base px-8 border-white/20 bg-white/10">
              How it Works
            </Button>
          </div>
        </div>
      </section>

      {/* Monument Grid */}
      <section id="monuments" className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Popular Destinations</h2>
            <p className="text-muted-foreground">Most visited historical sites across India</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search monuments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {isLoading ? (
          <ShimmerContainer />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {filteredMonuments?.length > 0 ? (
              filteredMonuments.map((monument) => (
                <MonumentCard monument={monument} key={monument._id} />
              ))
            ) : (
              <div className="col-span-full py-10 text-center">
                <p className="text-muted-foreground">No monuments found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
