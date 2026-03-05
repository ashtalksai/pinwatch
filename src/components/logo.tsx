import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

const sizes = {
  sm: { icon: 16, text: "text-lg" },
  md: { icon: 20, text: "text-xl" },
  lg: { icon: 28, text: "text-3xl" },
};

export function Logo({ className, size = "md", variant = "dark" }: LogoProps) {
  const s = sizes[size];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-500">
        <Pin className="text-white" size={s.icon} />
      </div>
      <span
        className={cn(
          "font-bold tracking-tight",
          s.text,
          variant === "light" ? "text-white" : "text-foreground"
        )}
      >
        Pinwatch
      </span>
    </div>
  );
}
