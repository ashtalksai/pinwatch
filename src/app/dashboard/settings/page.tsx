"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { Check, Link2, Wifi, WifiOff } from "lucide-react";

const plans = [
  { name: "Free", pins: "50 pins", price: "$0", current: false },
  { name: "Starter", pins: "500 pins", price: "$9/mo", current: false },
  { name: "Pro", pins: "2,500 pins", price: "$19/mo", current: true },
  { name: "Business", pins: "10,000 pins", price: "$39/mo", current: false },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Alex Chen");
  const [email, setEmail] = useState(user?.email || "creator@example.com");
  const [saved, setSaved] = useState(false);
  const [pinterestConnected, setPinterestConnected] = useState(true);
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    scanReports: true,
    repairNotifications: false,
  });

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="bg-coral-500 hover:bg-coral-600"
            onClick={handleSaveProfile}
          >
            {saved ? (
              <>
                <Check size={16} className="mr-2" />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Plan & Billing */}
      <Card>
        <CardHeader>
          <CardTitle>Plan & Billing</CardTitle>
          <CardDescription>
            Manage your subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg border p-4 ${
                  plan.current
                    ? "border-coral-500 bg-coral-50"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{plan.name}</h3>
                  {plan.current && (
                    <Badge className="bg-coral-500 hover:bg-coral-500">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.pins}
                </p>
                <p className="mt-2 font-mono text-lg font-bold">
                  {plan.price}
                </p>
                {!plan.current && (
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    {plan.price === "$0" ? "Downgrade" : "Upgrade"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what alerts and reports you receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Alerts</p>
              <p className="text-sm text-muted-foreground">
                Get notified when broken pins are detected
              </p>
            </div>
            <Switch
              checked={notifications.emailAlerts}
              onCheckedChange={(checked) =>
                setNotifications((n) => ({ ...n, emailAlerts: checked }))
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Scan Reports</p>
              <p className="text-sm text-muted-foreground">
                Receive weekly scan summary reports
              </p>
            </div>
            <Switch
              checked={notifications.scanReports}
              onCheckedChange={(checked) =>
                setNotifications((n) => ({ ...n, scanReports: checked }))
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Repair Notifications</p>
              <p className="text-sm text-muted-foreground">
                Get notified when repairs are completed
              </p>
            </div>
            <Switch
              checked={notifications.repairNotifications}
              onCheckedChange={(checked) =>
                setNotifications((n) => ({
                  ...n,
                  repairNotifications: checked,
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Pinterest Connection */}
      <Card>
        <CardHeader>
          <CardTitle>Pinterest Connection</CardTitle>
          <CardDescription>
            Link your Pinterest account for pin scanning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  pinterestConnected
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {pinterestConnected ? (
                  <Wifi size={24} />
                ) : (
                  <WifiOff size={24} />
                )}
              </div>
              <div>
                <p className="font-medium">
                  {pinterestConnected ? "Connected" : "Not Connected"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {pinterestConnected
                    ? "@creative_pinner — Last synced Jan 15, 2024"
                    : "Connect your account to start scanning pins"}
                </p>
              </div>
            </div>
            <Button
              variant={pinterestConnected ? "destructive" : "default"}
              className={
                !pinterestConnected ? "bg-coral-500 hover:bg-coral-600" : ""
              }
              onClick={() => setPinterestConnected(!pinterestConnected)}
            >
              <Link2 size={16} className="mr-2" />
              {pinterestConnected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
