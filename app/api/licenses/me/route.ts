import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { licenses, games } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Buscar licenças do usuário com informações do jogo
    const userLicenses = await db
      .select({
        id: licenses.id,
        gameId: licenses.gameId,
        gameName: games.name,
        gameSlug: games.slug,
        subscriptionTier: licenses.subscriptionTier,
        deviceType: licenses.deviceType,
        expiresAt: licenses.expiresAt,
        active: licenses.active,
        hwid: licenses.hwid,
      })
      .from(licenses)
      .leftJoin(games, eq(licenses.gameId, games.id))
      .where(eq(licenses.userId, session.user.id));

    return NextResponse.json({
      userId: session.user.id,
      licenses: userLicenses,
    });
  } catch (error) {
    console.error("Get licenses error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar licenças" },
      { status: 500 },
    );
  }
}
