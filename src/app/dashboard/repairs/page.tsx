"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RepairStatusBadge } from "@/components/status-badge";
import { mockRepairs, type MockRepair, type RepairStatus } from "@/lib/mock-data";
import {
  Wrench,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function RepairsPage() {
  const [repairs, setRepairs] = useState<MockRepair[]>(mockRepairs);
  const [repairingId, setRepairingId] = useState<string | null>(null);
  const [bulkRepairing, setBulkRepairing] = useState(false);

  const pendingCount = repairs.filter((r) => r.status === "pending").length;
  const repairedCount = repairs.filter((r) => r.status === "repaired").length;

  const handleRepair = async (id: string) => {
    setRepairingId(id);
    await new Promise((r) => setTimeout(r, 1200));
    setRepairs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "repaired" as RepairStatus } : r))
    );
    setRepairingId(null);
  };

  const handleBulkRepair = async () => {
    setBulkRepairing(true);
    const pending = repairs.filter((r) => r.status === "pending");
    for (const repair of pending) {
      await new Promise((r) => setTimeout(r, 600));
      setRepairs((prev) =>
        prev.map((r) =>
          r.id === repair.id ? { ...r, status: "repaired" as RepairStatus } : r
        )
      );
    }
    setBulkRepairing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Repair Queue</h1>
          <p className="text-muted-foreground">
            Fix broken pin links with one click
          </p>
        </div>
        {pendingCount > 0 && (
          <Button
            className="bg-coral-500 hover:bg-coral-600"
            disabled={bulkRepairing}
            onClick={handleBulkRepair}
          >
            {bulkRepairing ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <Zap size={16} className="mr-2" />
            )}
            Repair All ({pendingCount})
          </Button>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Wrench size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="font-mono text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Repaired</p>
                <p className="font-mono text-2xl font-bold">{repairedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <Wrench size={18} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="font-mono text-2xl font-bold">
                  {repairs.filter((r) => r.status === "failed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Repairs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Repairs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pin</TableHead>
                <TableHead className="hidden md:table-cell">
                  URL Change
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[120px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repairs.map((repair) => (
                <TableRow key={repair.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{repair.pinTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        Detected {repair.detectedDate}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="max-w-[180px] truncate text-red-600">
                        {repair.oldUrl}
                      </span>
                      <ArrowRight
                        size={12}
                        className="shrink-0 text-muted-foreground"
                      />
                      <span className="max-w-[180px] truncate text-emerald-600">
                        {repair.newUrl}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RepairStatusBadge status={repair.status} />
                  </TableCell>
                  <TableCell>
                    {repair.status === "pending" && (
                      <Button
                        size="sm"
                        className="bg-coral-500 hover:bg-coral-600"
                        disabled={repairingId === repair.id || bulkRepairing}
                        onClick={() => handleRepair(repair.id)}
                      >
                        {repairingId === repair.id ? (
                          <Loader2 size={14} className="mr-1 animate-spin" />
                        ) : (
                          <Wrench size={14} className="mr-1" />
                        )}
                        Repair
                      </Button>
                    )}
                    {repair.status === "repaired" && (
                      <span className="flex items-center gap-1 text-sm text-emerald-600">
                        <CheckCircle2 size={14} />
                        Done
                      </span>
                    )}
                    {repair.status === "failed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRepair(repair.id)}
                        disabled={repairingId === repair.id}
                      >
                        Retry
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
