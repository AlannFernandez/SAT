import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Solo permitir acceso libre a /landing, /login y /register
  if (["/landing", "/login", "/register"].includes(pathname)) {
    return NextResponse.next();
  }
  // Todas las demás rutas, incluida la raíz, requieren login
  const session = request.cookies.get("sat_session");
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/","/((?!_next|static|favicon.ico|icon.png|icon-192x192.png|icon-512x512.png).*)"],
};
