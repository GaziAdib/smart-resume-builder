import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicRoutes = ['/auth/login', '/auth/register'];
  const protectedRoutes = ['/', '/user/dashboard', '/manage-resume', '/resume/developer', '/resume/regular'];

//   const protectedRoutes = ['/', '/admin', '/profile', '/settings']; // Add more protected routes

  if (publicRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/login', '/auth/register', '/user/dashboard', '/manage-resume', '/resume/developer', '/resume/regular'],
};
