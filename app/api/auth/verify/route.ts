import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";

export async function GET(req: NextRequest) {
  try {
    // Verificar token do header Authorization
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { valid: false, error: "Token não fornecido" },
        { status: 401 },
      );
    }

    const token = authHeader.substring(7); // Remove "Bearer "

    // Verificar token com Better Auth
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { valid: false, error: "Token inválido" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { valid: false, error: "Erro ao verificar token" },
      { status: 500 },
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}
