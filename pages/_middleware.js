import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // Token will exist if the user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    // Allow the request if the following conditions are true
    // 1. if the token exist
    // 2. The token exists
    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    // Redirect them to login if they dont have token and requesting a protected route
    if (!token && pathname !== '/login') {
        const url = `http://localhost:3000/login`;
        return NextResponse.redirect(url);
    }
}