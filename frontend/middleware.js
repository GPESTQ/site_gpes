import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "gpes_admin_token";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const isLoginPage = pathname === "/admin/login";
    const isAdminRoute = pathname.startsWith("/admin") && !isLoginPage;

    if (!isAdminRoute) return NextResponse.next();

    const token = request.cookies.get(AUTH_COOKIE_NAME);

    if (!token) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};