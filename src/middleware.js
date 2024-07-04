import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";

export async function customMiddleware(request) {
  const sessionCookie = request.cookies.get('__session');
  console.log('session cookie', sessionCookie);
  const isSignedIn = !!sessionCookie;
  console.log('isSignedIn', isSignedIn);

  const publicPaths = ['/sign-up', '/sign-in','/'];
  const protectedPaths = ['/explore', '/innerSection', '/contest', '/problems'];

  const requestPath = new URL(request.url).pathname;
  console.log(requestPath,'requestPath')
  const isPublicPath = publicPaths.includes(requestPath);
  console.log(isPublicPath, 'isPublicPath')
  const isProtectedPath = protectedPaths.includes(requestPath);
  console.log(isProtectedPath, 'isProtectedPath')

  if (isSignedIn && isPublicPath) {
    console.log('Redirecting signed-in user from public path');
    return NextResponse.redirect(new URL('/',request.nextUrl));
  }

  if (isSignedIn===false && !isProtectedPath) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  if(isSignedIn && isProtectedPath) {
    return NextResponse.next()
  }


  return NextResponse.next();
}


const clerkMiddleware = authMiddleware();

export default async function combinedMiddleware(request) {
  const clerkResponse = await clerkMiddleware(request);

  if (clerkResponse.status !== 200) {
    return clerkResponse;
  }

  return customMiddleware(request);
}

export const config = {
  matcher: ["/sign-in", "/sign-up"],
};
