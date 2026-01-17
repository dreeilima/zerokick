import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../lib/db";
import { games, licenses, users } from "../db/schema";
import { eq } from "drizzle-orm";

async function seedLicenses() {
  console.log("🌱 Semeando licenças de teste...");

  // 1. Pegar o primeiro usuário (admin/dev)
  const allUsers = await db.select().from(users).limit(1);
  if (allUsers.length === 0) {
    console.error("❌ Nenhum usuário encontrado! Crie uma conta primeiro.");
    process.exit(1);
  }
  const user = allUsers[0];
  console.log(`👤 Usuário encontrado: ${user.name} (${user.email})`);

  // 2. Garantir que os jogos existem
  const gameData = [
    {
      name: "Counter-Strike 2",
      slug: "cs2",
      description: "O FPS tático mais jogado do mundo.",
      imageUrl: "/games/cs2.jpg",
      status: "active" as const,
    },
    {
      name: "Valorant",
      slug: "valorant",
      description: "Um tiro tático 5v5 baseado em personagens.",
      imageUrl: "/games/valorant.jpg",
      status: "active" as const,
    },
  ];

  for (const g of gameData) {
    await db.insert(games).values(g).onConflictDoNothing();
  }

  const allGames = await db.select().from(games);
  console.log(`🎮 Jogos garantidos: ${allGames.length}`);

  // 3. Criar licenças para o usuário
  for (const game of allGames) {
    // Verificar se já tem licença
    const existing = await db.query.licenses.findFirst({
      where: (licenses, { eq, and }) =>
        and(eq(licenses.userId, user.id), eq(licenses.gameId, game.id)),
    });

    if (!existing) {
      await db.insert(licenses).values({
        userId: user.id,
        gameId: game.id,
        subscriptionTier: "logitech_premium_pro", // Plano completo
        deviceType: "logitech",
        active: true,
        expiresAt: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(), // +30 dias
      });
      console.log(`✅ Licença criada para ${game.name}`);
    } else {
      console.log(`ℹ️ Licença já existe para ${game.name}`);
    }
  }

  console.log("✨ Seed concluído com sucesso!");
  process.exit(0);
}

seedLicenses().catch((err) => {
  console.error("❌ Erro no seed:", err);
  process.exit(1);
});
