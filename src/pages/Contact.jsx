import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Contact() {
  return (
    <div className="container py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Get in <span className="text-primary tracking-tighter">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-[500px]">
              Have questions about your booking? Our team is here to help you experience India's heritage better.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email Us</h4>
                <p className="text-muted-foreground">support@touring.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Call Us</h4>
                <p className="text-muted-foreground">+91 1800-TOUR-NOW</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Visit Us</h4>
                <p className="text-muted-foreground text-sm">Touring HQ, Heritage Plaza, New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-border/50 shadow-2xl backdrop-blur-md bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Send a Message
            </CardTitle>
            <CardDescription>
              We'll get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <form className="space-y-6">
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your full name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px] resize-none" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full gap-2 h-11 text-base shadow-lg shadow-primary/20">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
