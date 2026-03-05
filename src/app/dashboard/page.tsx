"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatsCard } from "@/components/stats-card";
import { dashboardStats, mockActivity } from "@/lib/mock-data";
import {
  Pin,
  AlertTriangle,
  Calendar,
  ScanSearch,
  Wrench,
  Link2,
  Activity,
  TrendingUp,
} from "lucide-react";

function HealthScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80
      ? "text-emerald-500"
      : score >= 60
        ? "text-amber-500"
        : "text-red-500";

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-mono text-3xl font-bold">{score}</div>
        <div className="text-xs text-muted-foreground">Health</div>
      </div>
    </div>
  );
}

const activityIcons = {
  scan: ScanSearch,
  repair: Wrench,
  alert: AlertTriangle,
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your Pinterest pin health
        </p>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Pins"
          value={dashboardStats.totalPins}
          subtitle="Monitored"
          icon={Pin}
        />
        <StatsCard
          title="Broken Pins"
          value={dashboardStats.brokenPins}
          subtitle="Needs attention"
          icon={AlertTriangle}
          iconColor="text-red-500"
        />
        <StatsCard
          title="Warnings"
          value={dashboardStats.warningPins}
          subtitle="Slow or redirects"
          icon={TrendingUp}
          iconColor="text-amber-500"
        />
        <StatsCard
          title="Last Scan"
          value={dashboardStats.lastScanDate}
          subtitle="Completed"
          icon={Calendar}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Health Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pin Health Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <HealthScoreRing score={dashboardStats.healthScore} />
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                {dashboardStats.healthyPins} Healthy
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                {dashboardStats.warningPins} Warning
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                {dashboardStats.brokenPins} Broken
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/scanner" className="block">
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <ScanSearch size={18} className="text-coral-500" />
                Run New Scan
              </Button>
            </Link>
            <Link href="/dashboard/repairs" className="block">
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <Wrench size={18} className="text-coral-500" />
                View Repairs
              </Button>
            </Link>
            <Link href="/dashboard/settings" className="block">
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <Link2 size={18} className="text-coral-500" />
                {dashboardStats.pinterestConnected
                  ? "Pinterest Connected"
                  : "Connect Pinterest"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity size={16} />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivity.slice(0, 5).map((item) => {
                const Icon = activityIcons[item.type];
                return (
                  <div key={item.id} className="flex gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Icon size={14} className="text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug">{item.message}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
