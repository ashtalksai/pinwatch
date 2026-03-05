"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockScans } from "@/lib/mock-data";
import {
  ScanSearch,
  Link2,
  CheckCircle2,
  Loader2,
  Wifi,
  WifiOff,
} from "lucide-react";

export default function ScannerPage() {
  const [pinterestConnected, setPinterestConnected] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  const runScan = useCallback(() => {
    setScanning(true);
    setScanProgress(0);
    setScanComplete(false);
  }, []);

  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          setScanComplete(true);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [scanning]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pin Scanner</h1>
        <p className="text-muted-foreground">
          Scan your Pinterest pins for broken links and issues
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${pinterestConnected ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"}`}
            >
              {pinterestConnected ? <Wifi size={24} /> : <WifiOff size={24} />}
            </div>
            <div>
              <p className="font-semibold">Pinterest Account</p>
              <p className="text-sm text-muted-foreground">
                {pinterestConnected
                  ? "Connected as @creative_pinner"
                  : "Connect to start scanning"}
              </p>
            </div>
          </div>
          <Button
            variant={pinterestConnected ? "outline" : "default"}
            className={
              !pinterestConnected ? "bg-coral-500 hover:bg-coral-600" : ""
            }
            onClick={() => setPinterestConnected(!pinterestConnected)}
          >
            <Link2 size={16} className="mr-2" />
            {pinterestConnected ? "Disconnect" : "Connect Pinterest"}
          </Button>
        </CardContent>
      </Card>

      {/* Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanSearch size={20} />
            Run Scan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scanning && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 size={14} className="animate-spin" />
                  Scanning pins...
                </span>
                <span className="font-mono">
                  {Math.min(Math.round(scanProgress), 100)}%
                </span>
              </div>
              <Progress value={Math.min(scanProgress, 100)} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Checking URLs, response codes, and page availability...
              </p>
            </div>
          )}

          {scanComplete && (
            <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 size={20} className="text-emerald-600" />
              <div>
                <p className="font-medium text-emerald-900">Scan Complete</p>
                <p className="text-sm text-emerald-700">
                  Found 25 pins — 6 broken, 3 warnings. View results for
                  details.
                </p>
              </div>
            </div>
          )}

          <Button
            className="bg-coral-500 hover:bg-coral-600"
            disabled={scanning || !pinterestConnected}
            onClick={runScan}
          >
            {scanning ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <ScanSearch size={16} className="mr-2" />
            )}
            {scanning ? "Scanning..." : "Start Scan"}
          </Button>
        </CardContent>
      </Card>

      {/* Scan History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scan History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Total Pins</TableHead>
                <TableHead>Broken</TableHead>
                <TableHead>Warnings</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockScans.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">{scan.date}</TableCell>
                  <TableCell className="font-mono">{scan.totalPins}</TableCell>
                  <TableCell className="font-mono text-red-600">
                    {scan.brokenPins}
                  </TableCell>
                  <TableCell className="font-mono text-amber-600">
                    {scan.warningPins}
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">
                    {scan.duration}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    >
                      {scan.status}
                    </Badge>
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
