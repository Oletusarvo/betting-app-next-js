import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequestWithAuth) {
  console.log(req.url);

  if (req.url.startsWith('/dashboard')) {
    return withAuth(req);
  } else {
    return NextResponse.next();
  }
}
