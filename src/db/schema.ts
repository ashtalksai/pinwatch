import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  tier: text("tier").notNull().default("free"),
  pinterestConnected: boolean("pinterest_connected").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const scans = pgTable("scans", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: text("status").notNull().default("pending"),
  totalPins: integer("total_pins").default(0),
  brokenPins: integer("broken_pins").default(0),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const pins = pgTable("pins", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  scanId: uuid("scan_id")
    .notNull()
    .references(() => scans.id),
  pinterestPinId: text("pinterest_pin_id"),
  title: text("title").notNull(),
  url: text("url").notNull(),
  status: text("status").notNull().default("healthy"),
  imageUrl: text("image_url"),
});

export const repairs = pgTable("repairs", {
  id: uuid("id").primaryKey().defaultRandom(),
  pinId: uuid("pin_id")
    .notNull()
    .references(() => pins.id),
  oldUrl: text("old_url").notNull(),
  newUrl: text("new_url").notNull(),
  status: text("status").notNull().default("pending"),
  repairedAt: timestamp("repaired_at"),
});
