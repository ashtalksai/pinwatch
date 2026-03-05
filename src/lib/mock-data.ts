export type PinStatus = "healthy" | "broken" | "warning";
export type RepairStatus = "pending" | "repaired" | "failed";
export type ScanStatus = "completed" | "in_progress" | "pending";

export interface MockPin {
  id: string;
  title: string;
  url: string;
  status: PinStatus;
  imageUrl: string;
  scanDate: string;
}

export interface MockRepair {
  id: string;
  pinTitle: string;
  oldUrl: string;
  newUrl: string;
  status: RepairStatus;
  detectedDate: string;
}

export interface MockScan {
  id: string;
  date: string;
  totalPins: number;
  brokenPins: number;
  warningPins: number;
  status: ScanStatus;
  duration: string;
}

export interface ActivityItem {
  id: string;
  type: "scan" | "repair" | "alert";
  message: string;
  time: string;
}

export const mockPins: MockPin[] = [
  { id: "1", title: "Easy Sourdough Bread Recipe", url: "https://myblog.com/sourdough-bread", status: "healthy", imageUrl: "/pins/bread.jpg", scanDate: "2024-01-15" },
  { id: "2", title: "DIY Macrame Wall Hanging Tutorial", url: "https://craftsite.com/macrame-wall", status: "healthy", imageUrl: "/pins/macrame.jpg", scanDate: "2024-01-15" },
  { id: "3", title: "Minimalist Living Room Decor Ideas", url: "https://homedecor.net/minimalist-living/page-removed", status: "broken", imageUrl: "/pins/living-room.jpg", scanDate: "2024-01-15" },
  { id: "4", title: "30-Minute Chicken Stir Fry", url: "https://quickmeals.co/chicken-stirfry", status: "healthy", imageUrl: "/pins/stirfry.jpg", scanDate: "2024-01-15" },
  { id: "5", title: "Watercolor Painting for Beginners", url: "https://artclass.io/watercolor-basics", status: "warning", imageUrl: "/pins/watercolor.jpg", scanDate: "2024-01-15" },
  { id: "6", title: "Cozy Bedroom Makeover on a Budget", url: "https://budgetdecor.com/bedroom-old", status: "broken", imageUrl: "/pins/bedroom.jpg", scanDate: "2024-01-15" },
  { id: "7", title: "Homemade Pasta from Scratch", url: "https://italianfood.blog/pasta-scratch", status: "healthy", imageUrl: "/pins/pasta.jpg", scanDate: "2024-01-15" },
  { id: "8", title: "Bullet Journal Setup 2024", url: "https://journaling.co/bujo-2024", status: "healthy", imageUrl: "/pins/journal.jpg", scanDate: "2024-01-15" },
  { id: "9", title: "Easy Plant Care Guide for Beginners", url: "https://plantparent.com/beginner-guide-404", status: "broken", imageUrl: "/pins/plants.jpg", scanDate: "2024-01-15" },
  { id: "10", title: "Scandinavian Kitchen Design Trends", url: "https://kitchentrends.net/scandi-design", status: "healthy", imageUrl: "/pins/kitchen.jpg", scanDate: "2024-01-15" },
  { id: "11", title: "Chocolate Lava Cake Recipe", url: "https://dessertblog.com/lava-cake", status: "healthy", imageUrl: "/pins/lavacake.jpg", scanDate: "2024-01-15" },
  { id: "12", title: "Modern Farmhouse Bathroom Ideas", url: "https://farmhousestyle.co/bathroom-old-link", status: "broken", imageUrl: "/pins/bathroom.jpg", scanDate: "2024-01-15" },
  { id: "13", title: "Hand Lettering Practice Sheets", url: "https://lettering.fun/practice-sheets", status: "healthy", imageUrl: "/pins/lettering.jpg", scanDate: "2024-01-15" },
  { id: "14", title: "Overnight Oats 5 Ways", url: "https://healthybreakfast.com/oats-5-ways", status: "healthy", imageUrl: "/pins/oats.jpg", scanDate: "2024-01-15" },
  { id: "15", title: "Boho Living Room Inspiration", url: "https://bohostyle.net/living-room-moved", status: "warning", imageUrl: "/pins/boho.jpg", scanDate: "2024-01-15" },
  { id: "16", title: "Crochet Baby Blanket Pattern", url: "https://yarncrafts.com/baby-blanket", status: "healthy", imageUrl: "/pins/crochet.jpg", scanDate: "2024-01-15" },
  { id: "17", title: "Small Space Organization Hacks", url: "https://tinyhouse.blog/org-hacks", status: "healthy", imageUrl: "/pins/organize.jpg", scanDate: "2024-01-15" },
  { id: "18", title: "Mediterranean Diet Meal Prep", url: "https://mealprep.co/mediterranean-deleted", status: "broken", imageUrl: "/pins/mealprep.jpg", scanDate: "2024-01-15" },
  { id: "19", title: "DIY Candle Making at Home", url: "https://craftideas.net/candle-making", status: "healthy", imageUrl: "/pins/candles.jpg", scanDate: "2024-01-15" },
  { id: "20", title: "Mid-Century Modern Dining Table Guide", url: "https://furnitureblog.com/mcm-dining", status: "healthy", imageUrl: "/pins/dining.jpg", scanDate: "2024-01-15" },
  { id: "21", title: "Banana Bread — The Best Recipe", url: "https://bakingblog.net/banana-bread", status: "healthy", imageUrl: "/pins/banana.jpg", scanDate: "2024-01-15" },
  { id: "22", title: "Pottery Wheel Techniques for Beginners", url: "https://ceramics.studio/pottery-basics-gone", status: "broken", imageUrl: "/pins/pottery.jpg", scanDate: "2024-01-15" },
  { id: "23", title: "Outdoor Patio Decor on a Budget", url: "https://outdoorliving.com/patio-budget", status: "warning", imageUrl: "/pins/patio.jpg", scanDate: "2024-01-15" },
  { id: "24", title: "Keto Snacks for Work", url: "https://ketolife.co/work-snacks", status: "healthy", imageUrl: "/pins/keto.jpg", scanDate: "2024-01-15" },
  { id: "25", title: "Embroidery Hoop Art Ideas", url: "https://stitchcraft.com/hoop-art", status: "healthy", imageUrl: "/pins/embroidery.jpg", scanDate: "2024-01-15" },
];

export const mockRepairs: MockRepair[] = [
  { id: "r1", pinTitle: "Minimalist Living Room Decor Ideas", oldUrl: "https://homedecor.net/minimalist-living/page-removed", newUrl: "https://homedecor.net/minimalist-living-room", status: "pending", detectedDate: "2024-01-15" },
  { id: "r2", pinTitle: "Cozy Bedroom Makeover on a Budget", oldUrl: "https://budgetdecor.com/bedroom-old", newUrl: "https://budgetdecor.com/cozy-bedroom-makeover", status: "pending", detectedDate: "2024-01-15" },
  { id: "r3", pinTitle: "Easy Plant Care Guide for Beginners", oldUrl: "https://plantparent.com/beginner-guide-404", newUrl: "https://plantparent.com/plant-care-beginners", status: "repaired", detectedDate: "2024-01-14" },
  { id: "r4", pinTitle: "Modern Farmhouse Bathroom Ideas", oldUrl: "https://farmhousestyle.co/bathroom-old-link", newUrl: "https://farmhousestyle.co/farmhouse-bathroom-ideas", status: "pending", detectedDate: "2024-01-15" },
  { id: "r5", pinTitle: "Mediterranean Diet Meal Prep", oldUrl: "https://mealprep.co/mediterranean-deleted", newUrl: "https://mealprep.co/mediterranean-diet-prep-guide", status: "failed", detectedDate: "2024-01-13" },
  { id: "r6", pinTitle: "Pottery Wheel Techniques for Beginners", oldUrl: "https://ceramics.studio/pottery-basics-gone", newUrl: "https://ceramics.studio/pottery-wheel-beginners", status: "pending", detectedDate: "2024-01-15" },
];

export const mockScans: MockScan[] = [
  { id: "s1", date: "2024-01-15 09:30 AM", totalPins: 25, brokenPins: 6, warningPins: 3, status: "completed", duration: "2m 14s" },
  { id: "s2", date: "2024-01-08 10:15 AM", totalPins: 22, brokenPins: 4, warningPins: 2, status: "completed", duration: "1m 58s" },
  { id: "s3", date: "2024-01-01 08:45 AM", totalPins: 20, brokenPins: 3, warningPins: 1, status: "completed", duration: "1m 42s" },
  { id: "s4", date: "2023-12-25 11:00 AM", totalPins: 18, brokenPins: 2, warningPins: 1, status: "completed", duration: "1m 35s" },
];

export const mockActivity: ActivityItem[] = [
  { id: "a1", type: "scan", message: "Scan completed — 6 broken pins found", time: "2 hours ago" },
  { id: "a2", type: "repair", message: "Plant Care Guide link repaired successfully", time: "3 hours ago" },
  { id: "a3", type: "alert", message: "3 pins have slow-loading URLs (warning)", time: "5 hours ago" },
  { id: "a4", type: "scan", message: "Weekly scheduled scan started", time: "5 hours ago" },
  { id: "a5", type: "repair", message: "Bulk repair completed — 2 of 3 links fixed", time: "1 day ago" },
  { id: "a6", type: "alert", message: "New broken link detected on Sourdough Bread pin", time: "2 days ago" },
];

export const dashboardStats = {
  healthScore: 76,
  totalPins: 25,
  brokenPins: 6,
  warningPins: 3,
  healthyPins: 16,
  lastScanDate: "Jan 15, 2024",
  pinterestConnected: true,
};
