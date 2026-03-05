"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ScanSearch,
  FileBarChart,
  Wrench,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/scanner", label: "Scanner", icon: ScanSearch },
  { href: "/dashboard/results", label: "Results", icon: FileBarChart },
  { href: "/dashboard/repairs", label: "Repairs", icon: Wrench },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function Sidebar({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col bg-[hsl(220,25%,11%)]">
      <div className="flex h-16 items-center px-6">
        <Logo variant="light" />
      </div>
      <Separator className="bg-white/10" />
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-coral-500/15 text-coral-500"
                    : "text-white/60 hover:bg-white/5 hover:text-white/90"
                )}
              >
                <item.icon size={18} />
                {item.label}
                {isActive && (
                  <ChevronRight size={14} className="ml-auto opacity-60" />
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      <Separator className="bg-white/10" />
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coral-500 text-sm font-medium text-white">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white/90">
              {user?.name || "Guest"}
            </p>
            <p className="truncate text-xs text-white/50">
              {user?.email || "guest@example.com"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/50 hover:bg-white/10 hover:text-white"
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
          >
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 lg:hidden"
          >
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar onLinkClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-muted/30">
        <div className="mx-auto max-w-7xl p-6 pt-16 lg:pt-6">{children}</div>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardShell>{children}</DashboardShell>
    </AuthProvider>
  );
}
