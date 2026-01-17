import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// ===================== AUTH TABLES (Better Auth) =====================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  stripeCustomerId: text("stripeCustomerId"),
  role: text("role").default("user").notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt", {
    mode: "date",
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt", {
    mode: "date",
    withTimezone: true,
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }),
});

// ===================== ZEROKICK TABLES =====================

// Games supported by the platform
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// Scripts/Macros for each game
export const scripts = pgTable("scripts", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  weaponName: text("weapon_name").notNull(),
  description: text("description"),
  version: text("version").notNull(),
  fileUrl: text("file_url").notNull(),
  deviceType: text("device_type").notNull(), // "logitech" | "razer" | "both"
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// User licenses
export const licenses = pgTable("licenses", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  hwid: text("hwid"),
  // Planos por jogo: "logitech", "logitech_premium", "logitech_premium_pro",
  //                  "razer", "razer_premium", "razer_premium_pro",
  //                  "universal_week", "universal_month", "universal_lifetime"
  // Exemplo: usuário compra "logitech_premium_pro" para CS2 (gameId: 1)
  //          se quiser Valorant, precisa comprar outro plano separado
  subscriptionTier: text("subscription_tier").notNull(),
  deviceType: text("device_type").notNull(), // "logitech" | "razer" | "universal"
  stripeSubscriptionId: text("stripe_subscription_id"),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// Download history
export const downloads = pgTable("downloads", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  scriptId: integer("script_id")
    .notNull()
    .references(() => scripts.id, { onDelete: "cascade" }),
  ipAddress: text("ip_address"),
  downloadedAt: timestamp("downloaded_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// Stripe transactions
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  stripePaymentId: text("stripe_payment_id").notNull(),
  amount: integer("amount").notNull(), // in cents
  currency: text("currency").default("usd").notNull(),
  status: text("status").notNull(), // "succeeded" | "failed" | "pending"
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// ===================== E-COMMERCE TABLES =====================

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  basePrice: integer("base_price").notNull(), // in cents
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  name: text("name").notNull(), // e.g. "Logitech - Premium"
  type: text("type").notNull(), // "logitech" | "razer" | "universal"
  interval: text("interval").notNull(), // "week" | "month" | "lifetime"
  price: integer("price").notNull(), // in cents
  stripePriceId: text("stripe_price_id"),
  active: boolean("active").default(true).notNull(),
});

export const cart = pgTable("cart", {
  id: text("id").primaryKey(), // UUID
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: text("cart_id")
    .notNull()
    .references(() => cart.id, { onDelete: "cascade" }),
  productVariantId: integer("product_variant_id")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
  quantity: integer("quantity").default(1).notNull(),
  addedAt: timestamp("added_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// ===================== RELATIONS =====================

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  licenses: many(licenses),
  downloads: many(downloads),
  transactions: many(transactions),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const gamesRelations = relations(games, ({ many }) => ({
  scripts: many(scripts),
}));

export const scriptsRelations = relations(scripts, ({ one, many }) => ({
  game: one(games, {
    fields: [scripts.gameId],
    references: [games.id],
  }),
  downloads: many(downloads),
}));

export const licensesRelations = relations(licenses, ({ one }) => ({
  user: one(user, {
    fields: [licenses.userId],
    references: [user.id],
  }),
  game: one(games, {
    fields: [licenses.gameId],
    references: [games.id],
  }),
}));

export const downloadsRelations = relations(downloads, ({ one }) => ({
  user: one(user, {
    fields: [downloads.userId],
    references: [user.id],
  }),
  script: one(scripts, {
    fields: [downloads.scriptId],
    references: [scripts.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(user, {
    fields: [transactions.userId],
    references: [user.id],
  }),
}));

// ===================== RELATIONS =====================

export const productsRelations = relations(products, ({ one, many }) => ({
  game: one(games, {
    fields: [products.gameId],
    references: [games.id],
  }),
  variants: many(productVariants),
}));

export const productVariantsRelations = relations(
  productVariants,
  ({ one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
  }),
);

export const cartRelations = relations(cart, ({ one, many }) => ({
  user: one(user, {
    fields: [cart.userId],
    references: [user.id],
  }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(cart, {
    fields: [cartItems.cartId],
    references: [cart.id],
  }),
  variant: one(productVariants, {
    fields: [cartItems.productVariantId],
    references: [productVariants.id],
  }),
}));

// ===================== TYPES =====================

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Account = typeof account.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Verification = typeof verification.$inferSelect;
export type Game = typeof games.$inferSelect;
export type Script = typeof scripts.$inferSelect;
export type License = typeof licenses.$inferSelect;
export type Download = typeof downloads.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;
export type Cart = typeof cart.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
