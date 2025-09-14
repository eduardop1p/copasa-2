import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privateRoutes = ['/adminadvisory/dashboard', '/adminadvisory/pix'];

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const cookies = req.cookies;
  const isPrivateRoute = privateRoutes.includes(pathName);
  const isAuth = !!(await getToken({ req }));
  const authProcessing = cookies.has('next-auth.processing');

  const redirect = (newUrl: string) => {
    return NextResponse.redirect(new URL(newUrl, req.url));
  };

  if (isAuth && !authProcessing && pathName === '/adminadvisory/login') {
    return redirect('/adminadvisory/dashboard');
  }

  if (!isAuth && isPrivateRoute) {
    return redirect('/adminadvisory/login');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adminadvisory/:path*'], // Middleware será aplicado a todas as rotas que começam com "/adminadvisory"
};
