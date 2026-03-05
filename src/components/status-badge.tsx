import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PinStatus, RepairStatus } from "@/lib/mock-data";

const pinStatusConfig: Record<
  PinStatus,
  { label: string; className: string }
> = {
  healthy: {
    label: "Healthy",
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  broken: {
    label: "Broken",
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
  warning: {
    label: "Warning",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
};

const repairStatusConfig: Record<
  RepairStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
  repaired: {
    label: "Repaired",
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
};

export function PinStatusBadge({ status }: { status: PinStatus }) {
  const config = pinStatusConfig[status];
  return (
    <Badge variant="secondary" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}

export function RepairStatusBadge({ status }: { status: RepairStatus }) {
  const config = repairStatusConfig[status];
  return (
    <Badge variant="secondary" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
