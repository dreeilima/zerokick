import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { licenses, games } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const { hwid } = body;

    if (!hwid) {
      return NextResponse.json(
        { error: "HWID não fornecido" },
        { status: 400 },
      );
    }

    // Buscar licenças ativas do usuário
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
      .where(
        and(eq(licenses.userId, session.user.id), eq(licenses.active, true)),
      );

    if (userLicenses.length === 0) {
      return NextResponse.json({
        valid: false,
        message: "Nenhuma licença ativa encontrada",
      });
    }

    // Verificar se alguma licença já tem HWID registrado
    const licenseWithHwid = userLicenses.find((l) => l.hwid);

    if (licenseWithHwid) {
      // Se HWID já está registrado, verificar se é o mesmo
      if (licenseWithHwid.hwid === hwid) {
        return NextResponse.json({
          valid: true,
          license: licenseWithHwid,
        });
      } else {
        return NextResponse.json({
          valid: false,
          message:
            "HWID não corresponde ao registrado. Contate o suporte para resetar.",
        });
      }
    }

    // Se nenhuma licença tem HWID, registrar o HWID na primeira licença
    const firstLicense = userLicenses[0];
    await db
      .update(licenses)
      .set({ hwid })
      .where(eq(licenses.id, firstLicense.id));

    return NextResponse.json({
      valid: true,
      license: {
        ...firstLicense,
        hwid,
      },
    });
  } catch (error) {
    console.error("Verify license error:", error);
    return NextResponse.json(
      { error: "Erro ao verificar licença" },
      { status: 500 },
    );
  }
}
