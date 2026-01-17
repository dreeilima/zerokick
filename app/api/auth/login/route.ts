import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 },
      );
    }

    // Usar Better Auth para autenticar
    const session = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 },
      );
    }

    // Retornar token e dados do usuário
    return NextResponse.json({
      token: session.token,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}
