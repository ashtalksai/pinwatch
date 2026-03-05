"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import {
  Search,
  LinkIcon,
  Wrench,
  Bell,
  Check,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Pin Health Scanner",
    description:
      "Automatically scan all your Pinterest pins to detect broken links, slow-loading pages, and content issues.",
  },
  {
    icon: LinkIcon,
    title: "Broken Link Detection",
    description:
      "Identify dead links, redirects, and 404 errors across your entire pin collection in minutes.",
  },
  {
    icon: Wrench,
    title: "One-Click Repair",
    description:
      "Fix broken pins instantly with smart URL suggestions and bulk repair tools. No manual work needed.",
  },
  {
    icon: Bell,
    title: "Smart Monitoring",
    description:
      "Get notified the moment a pin breaks. Scheduled scans keep your profile healthy around the clock.",
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    pins: "50 pins",
    features: ["Weekly scans", "Basic reports", "Email alerts"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    pins: "500 pins",
    features: [
      "Daily scans",
      "Detailed reports",
      "One-click repair",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    pins: "2,500 pins",
    features: [
      "Hourly scans",
      "Advanced analytics",
      "Bulk repair",
      "API access",
      "Custom alerts",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$39",
    period: "/month",
    pins: "10,000 pins",
    features: [
      "Real-time monitoring",
      "Team accounts",
      "White-label reports",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-coral-500 hover:bg-coral-600">
                Sign up free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[hsl(220,25%,8%)] pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(11,76%,60%,0.15),_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
            Now monitoring 2M+ pins for 10K+ creators
          </div>
          <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-bold tracking-tight text-white md:text-7xl">
            Stop Losing Traffic to{" "}
            <span className="text-coral-500">Broken Pins</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
            Pinwatch scans your Pinterest profile, detects broken links, and
            repairs them automatically. Keep your pins healthy and your traffic
            flowing.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-coral-500 px-8 text-base hover:bg-coral-600"
              >
                Start Free Scan
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-base text-white hover:bg-white/10"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Mock dashboard preview */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl">
              <div className="rounded-lg bg-[hsl(220,25%,12%)] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="text-sm text-white/50">Health Score</div>
                    <div className="mt-1 font-mono text-3xl font-bold text-emerald-400">
                      92%
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="text-sm text-white/50">Total Pins</div>
                    <div className="mt-1 font-mono text-3xl font-bold text-white">
                      1,247
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="text-sm text-white/50">Broken</div>
                    <div className="mt-1 font-mono text-3xl font-bold text-coral-500">
                      23
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to keep pins healthy
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              From detection to repair, Pinwatch handles your entire pin health
              workflow so you can focus on creating content.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral-50 text-coral-500">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-muted/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Start free and scale as your Pinterest presence grows. No hidden
              fees, cancel anytime.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={
                  tier.highlighted
                    ? "relative border-coral-500 shadow-lg shadow-coral-500/10"
                    : ""
                }
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-coral-500 px-3 py-1 text-xs font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tier.pins}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-mono text-4xl font-bold">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-coral-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup" className="mt-6 block">
                    <Button
                      className={
                        tier.highlighted
                          ? "w-full bg-coral-500 hover:bg-coral-600"
                          : "w-full"
                      }
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Logo size="sm" />
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground">
                Features
              </a>
              <a href="#pricing" className="hover:text-foreground">
                Pricing
              </a>
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Pinwatch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
