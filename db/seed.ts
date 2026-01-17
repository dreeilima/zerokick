import "dotenv/config";
import { db } from "@/lib/db";
import { games, scripts, products, productVariants } from "@/db/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Insert games
  const gamesData = [
    {
      name: "Counter-Strike 2",
      slug: "cs2",
      icon: "/games/cs2.png",
      active: true,
    },
    {
      name: "Valorant",
      slug: "valorant",
      icon: "/games/valorant.png",
      active: true,
    },
    {
      name: "Apex Legends",
      slug: "apex",
      icon: "/games/apex.png",
      active: true,
    },
    {
      name: "Rainbow Six Siege",
      slug: "r6s",
      icon: "/games/r6s.png",
      active: true,
    },
    {
      name: "PUBG",
      slug: "pubg",
      icon: "/games/pubg.png",
      active: true,
    },
    {
      name: "Rust",
      slug: "rust",
      icon: "/games/rust.png",
      active: true,
    },
  ];

  console.log("📦 Inserting games...");

  // Upsert games to avoid conflicts
  await db
    .insert(games)
    .values(gamesData)
    .onConflictDoNothing({ target: games.slug })
    .execute();

  // Fetch games to get IDs (whether inserted or existing)
  const allGames = await db.query.games.findMany();
  console.log(`✅ Loaded ${allGames.length} games`);

  const cs2 = allGames.find((g) => g.slug === "cs2");
  const valorant = allGames.find((g) => g.slug === "valorant");
  const apex = allGames.find((g) => g.slug === "apex");
  const r6s = allGames.find((g) => g.slug === "r6s");

  if (!cs2 || !valorant || !apex || !r6s) {
    console.error("❌ Critical games missing after seed");
    return;
  }

  // Insert scripts (Upser logic needed or clear table? For now simple insert, might convert to upsert later)
  // For simplicity we verify if scripts exist or just skip for now to focus on Products

  // --- SEED PRODUCTS ---
  console.log("🛍️ Seeding Products...");

  const productsData = [
    {
      gameId: cs2.id,
      name: "CS2 PRO Macro Pack",
      slug: "cs2-macro-pack",
      imageUrl: "/games/placeholder.svg",
      basePrice: 1990,
      description:
        "Controle de recoil perfeito para AK-47, M4A1-S e M4A4. Indetectável.",
      active: true,
    },
    {
      gameId: valorant.id,
      name: "Valorant Radiant Scripts",
      slug: "valorant-script-bundle",
      imageUrl: "/games/placeholder.svg",
      basePrice: 2490,
      description:
        "Scripts de movimentação e controle de spray para Vandal e Phantom.",
      active: true,
    },
    {
      gameId: apex.id,
      name: "Apex Predator Pack",
      slug: "apex-legends-pack",
      imageUrl: "/games/placeholder.svg",
      basePrice: 1790,
      description:
        "Otimizado para R-99, R-301 e Flatline. Suporte a todas as miras.",
      active: true,
    },
    {
      gameId: r6s.id,
      name: "R6 Siege Operator Tools",
      slug: "r6-siege-tools",
      imageUrl: "/games/placeholder.svg",
      basePrice: 2290,
      description:
        "Macros verticais precisos para todos os operadores e armas.",
      active: true,
    },
  ];

  await db
    .insert(products)
    .values(productsData)
    .onConflictDoNothing({ target: products.slug })
    .execute();

  const insertedProducts = await db.query.products.findMany();
  console.log(`✅ Loaded ${insertedProducts.length} products`);

  // --- SEED VARIANTS ---
  console.log("🏷️ Seeding Variants...");
  const variantsData = [];

  for (const product of insertedProducts) {
    variantsData.push(
      {
        productId: product.id,
        name: "Semanal",
        type: "universal",
        interval: "week",
        price: product.basePrice,
      },
      {
        productId: product.id,
        name: "Mensal",
        type: "universal",
        interval: "month",
        price: Math.floor(product.basePrice * 1.5),
      }, // Ex: 1990 -> 2985
      {
        productId: product.id,
        name: "Vitalício",
        type: "universal",
        interval: "lifetime",
        price: product.basePrice * 5,
      },
    );
  }

  // Clear existing variants to avoid dups logic for now (simple approach)
  // OR verify uniqueness. Drizzle doesn't have unique on multiple columns easily defined here without schema change.
  // We will check if variants exist for product.
  // Ideally, clean slate or smart upsert.
  // For dev: DELETE all variants and re-insert is easiest.

  // await db.delete(productVariants).execute(); // Too dangerous for prod, but ok for dev seed?
  // Let's just try insert and fail if exists (or explicit check).
  // Actually, let's just insert. If it fails, it fails (user might have run it).

  // Better: Check if active variants exist.
  const existingVariants = await db.query.productVariants.findFirst();
  if (!existingVariants) {
    await db.insert(productVariants).values(variantsData).execute();
    console.log(`✅ Inserted ${variantsData.length} variants`);
  } else {
    console.log("ℹ️ Variants already exist, skipping insert.");
  }

  console.log("🎉 Seed completed successfully!");
}

seed()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
