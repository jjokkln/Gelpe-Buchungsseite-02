import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh Session
    const { data: { user } } = await supabase.auth.getUser();

    // Admin Protection
    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (!user) {
            return NextResponse.redirect(new URL("/anmelden", request.url));
        }

        // Check for admin role
        // Note: Checking DB in middleware can be expensive/slow.
        // Better strategy: Custom Claim in JWT or check strictly in Layout (which we already do).
        // For Middleware, just ensuring Authentication is often enough to fail fast,
        // and let Layout handle Role check to avoid double DB hit if possible,
        // OR do a quick check here if critical. 
        // Given we have Layout check, we can just ensure user is logged in here.

        // HOWEVER, to be safe per requirements:
        // We will trust the layout for the strict "role=admin" check to avoid extra latency here
        // unless we put role in metadata.
        // Let's stick to Auth check here + Layout Role check.
    }

    // Dashboard Protection
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (!user) {
            return NextResponse.redirect(new URL("/anmelden", request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
