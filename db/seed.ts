import "dotenv/config";
import { db } from "@/lib/db";
import { games, scripts } from "@/db/schema";

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
  const insertedGames = await db.insert(games).values(gamesData).returning();
  console.log(`✅ Inserted ${insertedGames.length} games`);

  // Get game IDs
  const cs2 = insertedGames.find((g: typeof insertedGames[0]) => g.slug === "cs2")!;
  const valorant = insertedGames.find((g: typeof insertedGames[0]) => g.slug === "valorant")!;

  // Insert scripts
  const scriptsData = [
    // CS2 Scripts
    {
      gameId: cs2.id,
      weaponName: "AK-47",
      description: "No-recoil macro for AK-47 with optimized spray pattern control",
      version: "1.0.0",
      fileUrl: "/scripts/cs2/logitech/ak47-v1.0.0.lua",
      deviceType: "logitech",
      active: true,
    },
    {
      gameId: cs2.id,
      weaponName: "AK-47",
      description: "No-recoil macro for AK-47 with optimized spray pattern control",
      version: "1.0.0",
      fileUrl: "/scripts/cs2/razer/ak47-v1.0.0.ahk",
      deviceType: "razer",
      active: true,
    },
    {
      gameId: cs2.id,
      weaponName: "M4A4",
      description: "No-recoil macro for M4A4 with smooth recoil compensation",
      version: "1.0.0",
      fileUrl: "/scripts/cs2/logitech/m4a4-v1.0.0.lua",
      deviceType: "logitech",
      active: true,
    },
    // Valorant Scripts
    {
      gameId: valorant.id,
      weaponName: "Vandal",
      description: "No-recoil macro for Vandal with precise spray control",
      version: "1.0.0",
      fileUrl: "/scripts/valorant/logitech/vandal-v1.0.0.lua",
      deviceType: "logitech",
      active: true,
    },
    {
      gameId: valorant.id,
      weaponName: "Vandal",
      description: "No-recoil macro for Vandal with precise spray control",
      version: "1.0.0",
      fileUrl: "/scripts/valorant/razer/vandal-v1.0.0.ahk",
      deviceType: "razer",
      active: true,
    },
  ];

  console.log("📜 Inserting scripts...");
  const insertedScripts = await db.insert(scripts).values(scriptsData).returning();
  console.log(`✅ Inserted ${insertedScripts.length} scripts`);

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
