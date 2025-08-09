import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

function extractSubdomain(request: NextRequest): string | null {
    const url = request.url;
    const host = request.headers.get('host') || '';
    const hostname = host.split(':')[0];

    // Local development environment
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
        // Try to extract subdomain from the full URL
        const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
        if (fullUrlMatch && fullUrlMatch[1]) {
            return fullUrlMatch[1];
        }

        // Fallback to host header approach
        if (hostname.includes('.localhost')) {
            return hostname.split('.')[0];
        }

        return null;
    }

    return null;
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const subdomain = extractSubdomain(request);

    if (subdomain) {
        // For the root path on a subdomain, rewrite to the subdomain page
        if (pathname === '/') {
            return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
        }
        const match = pathname.match(/^\/blogs\/([^/]+)/);
        if (match) {
            return NextResponse.rewrite(new URL(`/s/${subdomain}/blogs/${match[1]}`, request.url));
        }
    }

    // On the root domain, allow normal access
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. all root files inside /public (e.g. /favicon.ico)
         */
        '/((?!api|_next|[\\w-]+\\.\\w+).*)'
    ]
};