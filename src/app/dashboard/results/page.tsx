"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PinStatusBadge } from "@/components/status-badge";
import { mockPins, type PinStatus } from "@/lib/mock-data";
import {
  Search,
  Image as ImageIcon,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

const filterTabs: { label: string; value: PinStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Healthy", value: "healthy" },
  { label: "Broken", value: "broken" },
  { label: "Warning", value: "warning" },
];

export default function ResultsPage() {
  const [filter, setFilter] = useState<PinStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"title" | "status">("title");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let data = [...mockPins];
    if (filter !== "all") data = data.filter((p) => p.status === filter);
    if (search)
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.url.toLowerCase().includes(search.toLowerCase())
      );
    data.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortDir === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    return data;
  }, [filter, search, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const toggleSort = (field: "title" | "status") => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const statusCounts = useMemo(() => {
    const counts = { all: mockPins.length, healthy: 0, broken: 0, warning: 0 };
    mockPins.forEach((p) => counts[p.status]++);
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Scan Results</h1>
        <p className="text-muted-foreground">
          View and filter all scanned pins
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {filterTabs.map((tab) => (
            <Button
              key={tab.value}
              variant={filter === tab.value ? "default" : "outline"}
              size="sm"
              className={
                filter === tab.value
                  ? "bg-coral-500 hover:bg-coral-600"
                  : ""
              }
              onClick={() => {
                setFilter(tab.value);
                setPage(1);
              }}
            >
              {tab.label}
              <span className="ml-1.5 font-mono text-xs opacity-70">
                {statusCounts[tab.value]}
              </span>
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search pins..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
      </div>

      {/* Results Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                <TableHead>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => toggleSort("title")}
                  >
                    Pin Title
                    <ArrowUpDown size={14} className="text-muted-foreground" />
                  </button>
                </TableHead>
                <TableHead className="hidden md:table-cell">URL</TableHead>
                <TableHead>
                  <button
                    className="flex items-center gap-1"
                    onClick={() => toggleSort("status")}
                  >
                    Status
                    <ArrowUpDown size={14} className="text-muted-foreground" />
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((pin) => (
                <TableRow key={pin.id}>
                  <TableCell>
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      <ImageIcon
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{pin.title}</TableCell>
                  <TableCell className="hidden max-w-[300px] truncate font-mono text-xs text-muted-foreground md:table-cell">
                    {pin.url}
                  </TableCell>
                  <TableCell>
                    <PinStatusBadge status={pin.status} />
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No pins found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
            {filtered.length} pins
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
