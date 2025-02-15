import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

//export default clerkMiddleware()
const isProtectedRoute = createRouteMatcher([
  '/bookmark(.*)',
  '/settings(.*)',
  '/faq(.*)',
  '/home(.*)',
  '/orders(.*)',
  '/successful(.*)',
  '/cart(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};