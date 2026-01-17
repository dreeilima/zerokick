import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

// Rotas protegidas que requerem autenticação
const PROTECTED_ROUTES = [
  "/ajustes",
  "/anotacoes",
  "/calendario",
  "/cartoes",
  "/categorias",
  "/contas",
  "/dashboard",
  "/insights",
  "/lancamentos",
  "/orcamentos",
  "/pagadores",
];

// Rotas públicas (não requerem autenticação)
const PUBLIC_AUTH_ROUTES = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // CORS Configuration for API routes
  if (pathname.startsWith("/api")) {
    const response = NextResponse.next();
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      "http://localhost:1420",
      "tauri://localhost",
      "http://localhost:3000",
    ];

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    } else {
      response.headers.set("Access-Control-Allow-Origin", "*");
    }

    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, DELETE, PATCH, POST, PUT, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    );

    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
  }

  // Redirect authenticated users away from login/signup pages
  if (sessionCookie && PUBLIC_AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to protected and auth routes
  matcher: [
    "/ajustes/:path*",
    "/anotacoes/:path*",
    "/calendario/:path*",
    "/cartoes/:path*",
    "/categorias/:path*",
    "/contas/:path*",
    "/dashboard/:path*",
    "/insights/:path*",
    "/lancamentos/:path*",
    "/orcamentos/:path*",
    "/pagadores/:path*",
    "/login",
    "/signup",
    "/api/:path*", // Include API routes for CORS
  ],
};
