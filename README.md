# 🚀 Next.js AI Agent — Standard Operating Procedure (SOP)

> **How to use:** Paste this entire file into your AI agent prompt before writing a single line of code.
> Tell the agent: *"Read this SOP completely before writing any code. Follow every rule as a senior Next.js developer would."*

---

## Stack Versions

| Package | Version |
|---|---|
| Next.js | 16.1.6 |
| NextAuth | 4.24.11 |
| Tailwind CSS | 4.1.4 |
| Motion | 12.23.24 |
| React | 19.2.3 |
| Shadcn | 3.8.2 |

---

## Table of Contents

1. [Project Architecture & Structure](#1-project-architecture--structure)
2. [Client vs Server Components](#2-client-vs-server-components)
3. [Data Fetching & Caching](#3-data-fetching--caching)
4. [Styling Architecture](#4-styling-architecture)
5. [Authentication (NextAuth v4)](#5-authentication-nextauth-v4)
6. [Component Patterns](#6-component-patterns)
7. [Routing & Navigation](#7-routing--navigation)
8. [TypeScript Standards](#8-typescript-standards)
9. [Performance Optimization](#9-performance-optimization)
10. [Environment & Configuration](#10-environment--configuration)
11. [AI Agent Prompt Instructions](#11-ai-agent-prompt-instructions)
12. [Pre-Deployment Checklist](#12-pre-deployment-checklist)

---

## 1. Project Architecture & Structure

### 1.1 Directory Structure (App Router)

Every project **MUST** follow this exact folder layout. Do NOT deviate without explicit reason.

```
src/
  app/                         # All routes and pages (App Router)
    (auth)/                    # Route group - auth pages (no layout)
      login/page.tsx
      register/page.tsx
    (dashboard)/               # Route group - protected pages
      layout.tsx               # Dashboard layout wrapper
      page.tsx                 # /dashboard
      [slug]/page.tsx          # Dynamic route
    api/                       # API Route Handlers
      auth/[...nextauth]/route.ts
      [...your-routes]/route.ts
    error.tsx                  # Global error boundary
    loading.tsx                # Global loading UI
    layout.tsx                 # Root layout
    page.tsx                   # / (home)
  components/
    ui/                        # Shadcn base components
    common/                    # Shared project components
    features/                  # Feature-specific components
      auth/
      dashboard/
  lib/
    auth.ts                    # NextAuth config
    db.ts                      # DB connection (Mongoose/Prisma)
    utils.ts                   # Shared utilities
    validations.ts             # Zod schemas
  hooks/                       # Custom React hooks
  types/                       # Global TypeScript types
  constants/                   # App-wide constants
  styles/                      # Global CSS + Tailwind
public/                        # Static assets
.env.local                     # Environment variables
next.config.ts
tailwind.config.ts
tsconfig.json
```

### 1.2 Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserProfile.tsx` |
| Pages | lowercase (Next.js) | `page.tsx`, `layout.tsx` |
| Hooks | camelCase + use prefix | `useUserData.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase + I/T prefix | `IUser`, `TApiResponse` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| API routes | lowercase, kebab-case | `route.ts` in `/api/user-data/` |
| CSS classes | Tailwind utilities only | `className="flex gap-4"` |
| Environment vars | UPPER_SNAKE_CASE | `NEXTAUTH_SECRET` |

---

## 2. Client vs Server Components

> ⚠️ **RULE: Default to Server Components. Only use Client Components when absolutely necessary.**

### 2.1 Server Components (Default)

Use Server Components for:
- Fetching data directly (no `useEffect`/`useState` needed)
- Accessing backend resources (DB, filesystem, secrets)
- Components that do NOT need interactivity
- Anything that reduces JS sent to the browser

```tsx
// src/app/dashboard/page.tsx — Server Component (default)
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserCard } from '@/components/features/dashboard/UserCard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const data = await fetchUserData(session?.user?.id);
  return <UserCard user={data} />;
}
```

### 2.2 Client Components

Add `'use client'` ONLY when you need:
- React hooks (`useState`, `useEffect`, `useRef`, etc.)
- Browser APIs (`window`, `document`, `localStorage`)
- Event listeners and interactivity
- Third-party client-only libraries (Motion animations, etc.)

```tsx
'use client';
// src/components/features/dashboard/InteractiveChart.tsx
import { useState } from 'react';
import { motion } from 'motion/react';

export function InteractiveChart({ data }: { data: ChartData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return <motion.div onClick={() => setActiveIndex(i)}>...</motion.div>;
}
```

### 2.3 Decision Tree

| Question | Answer |
|---|---|
| Does it fetch data? | Server Component. Use async/await directly. |
| Does it use useState? | Client Component. Add `'use client'`. |
| Does it handle events? | Client Component. Add `'use client'`. |
| Is it a layout/page wrapper? | Server Component unless it uses hooks. |
| Does it animate? | Client Component (Motion requires browser). |
| Does it read session? | Server: `getServerSession()`. Client: `useSession()`. |

---

## 3. Data Fetching & Caching

### 3.1 Server-Side Data Fetching

Always prefer fetching in Server Components. Use the native `fetch()` API with Next.js cache options.

```ts
// Pattern 1: Static fetch (cached forever, revalidated manually)
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
});

// Pattern 2: ISR — revalidate every 60 seconds
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
});

// Pattern 3: Dynamic — no cache (always fresh)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});
```

### 3.2 Client-Side Data Fetching

Use SWR or React Query for client-side fetching. **Never use raw `useEffect` for data fetching.**

```ts
// ❌ WRONG — do not do this
useEffect(() => { fetch('/api/data').then(...) }, []);

// ✅ CORRECT — use SWR
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(r => r.json());
const { data, error, isLoading } = useSWR('/api/data', fetcher);
```

### 3.3 API Route Handlers

All API routes live in `src/app/api/`. Use Route Handlers with typed responses.

```ts
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const users = await getUsersFromDB();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
```

### 3.4 Caching Strategy

| Data Type | Strategy | Config |
|---|---|---|
| Static content | force-cache | `cache: 'force-cache'` |
| User-specific data | No cache | `cache: 'no-store'` |
| Semi-dynamic data | ISR | `next: { revalidate: N }` |
| Client state | SWR / React Query | `staleWhileRevalidate` |
| Server mutations | revalidatePath() | After POST/PUT/DELETE |

---

## 4. Styling Architecture

### 4.1 Tailwind CSS — Core Rules

> ⚠️ **RULE: Use Tailwind utility classes for ALL styling. No inline styles. No custom CSS unless absolutely unavoidable.**

- Use Tailwind v4 utility classes exclusively
- Never write CSS in component files
- Responsive design: mobile-first with `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Dark mode: use `dark:` prefix classes
- State variants: `hover:`, `focus:`, `active:`, `disabled:`

```tsx
// ✅ CORRECT
<div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900
               rounded-2xl shadow-md hover:shadow-lg transition-shadow">

// ❌ WRONG — never do this
<div style={{ display: 'flex', padding: '24px', background: '#fff' }}>
```

### 4.2 Global Styles (`src/styles/globals.css`)

```css
@import 'tailwindcss';

:root {
  --color-primary: 59 130 246;   /* blue-500 */
  --color-secondary: 99 84 255;  /* custom purple */
  --radius: 0.75rem;
}

/* Only add global styles for things Tailwind cannot handle */
html { scroll-behavior: smooth; }
* { box-sizing: border-box; }
```

### 4.3 Shadcn Components

- Install components: `npx shadcn@latest add [component]`
- Components live in: `src/components/ui/`
- Customize via `className` prop and `cva()` variants
- **Never edit Shadcn source files directly**

```tsx
import { Button } from '@/components/ui/button';

// ✅ Extend with className
<Button className="w-full bg-blue-600 hover:bg-blue-700">Submit</Button>
```

### 4.4 Animations with Motion

Use the Motion library (v12) for all animations. Keep animations purposeful and performant.

```tsx
'use client';
import { motion } from 'motion/react';

export function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

> 🚨 **Motion MUST be inside a Client Component (`'use client'`). Never use it in Server Components.**

---

## 5. Authentication (NextAuth v4)

### 5.1 Core Setup

```ts
// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate credentials against DB here
        const user = await validateUser(credentials);
        return user ?? null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id as string;
      return session;
    },
  },
};
```

### 5.2 Protecting Routes

Use middleware for route protection. **Never check auth inside every page component.**

```ts
// src/middleware.ts
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/api/protected/:path*'],
};
```

### 5.3 Session Access Patterns

| Context | Method |
|---|---|
| Server Component | `const session = await getServerSession(authOptions);` |
| Client Component | `const { data: session } = useSession();` |
| API Route Handler | `const session = await getServerSession(authOptions);` |
| Middleware | Auto-protected via matcher config |

### 5.4 Required Environment Variables

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=mongodb://localhost:27017/yourdb
```

---

## 6. Component Patterns

### 6.1 Component Template

Every component **MUST** follow this exact structure:

```tsx
// src/components/features/[feature]/ComponentName.tsx

// 1. Imports (in this order: React, libraries, local)
import { type FC } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// 2. TypeScript Interface
interface IComponentNameProps {
  title: string;
  description?: string;
  className?: string;
}

// 3. Component (arrow function, typed)
export const ComponentName: FC<IComponentNameProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};
```

### 6.2 Loading & Error States

Every data-fetching component needs loading and error handling. Use Suspense with `loading.tsx`.

```tsx
// src/app/dashboard/loading.tsx — Auto-used by Next.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
  );
}

// src/app/error.tsx — Must be a Client Component
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center p-8">
      <p>Something went wrong: {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### 6.3 Form Handling

Use Server Actions for form submissions. Pair with React Hook Form + Zod for client-side validation.

```ts
// src/lib/validations.ts
import { z } from 'zod';
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
});

// src/app/actions/auth.ts (Server Action)
'use server';
import { loginSchema } from '@/lib/validations';

export async function loginAction(formData: FormData) {
  const validated = loginSchema.safeParse(Object.fromEntries(formData));
  if (!validated.success) return { error: validated.error.message };
  // ... authenticate user
}
```

---

## 7. Routing & Navigation

### 7.1 Routing Rules

- Use App Router only (never Pages Router)
- Group related routes with route groups: `(groupName)/`
- Dynamic routes: `[param]/page.tsx`
- Catch-all routes: `[...slug]/page.tsx`
- Parallel routes: `@slot/page.tsx`
- Intercepted routes: `(.)route` for modals

### 7.2 Navigation

```tsx
// ✅ CORRECT — use next/link for navigation
import Link from 'next/link';
<Link href="/dashboard" prefetch={true}>Dashboard</Link>

// Programmatic navigation
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/dashboard');
router.replace('/login');   // No back history
router.refresh();           // Revalidate server data
```

> 🚨 **NEVER use `window.location.href` for navigation. Always use `next/link` or `useRouter`.**

### 7.3 Metadata & SEO

```ts
// src/app/page.tsx — Static metadata
export const metadata: Metadata = {
  title: 'My App',
  description: 'My app description',
  openGraph: { ... }
};

// Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);
  return { title: product.name };
}
```

---

## 8. TypeScript Standards

> ⚠️ **RULE: Strict TypeScript everywhere. No `any` types. No implicit any. `tsconfig strict: true`.**

- Define interfaces for all component props
- Use `type` for unions, `interface` for objects
- Export shared types from `src/types/`
- Use Zod for runtime validation + type inference
- Type all API responses

```ts
// src/types/index.ts
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

export type TApiResponse<T> = {
  data: T;
  error?: string;
  status: number;
};
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noEmit": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## 9. Performance Optimization

### 9.1 Image Optimization

```tsx
// ✅ ALWAYS use next/image, NEVER use <img>
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority={true}        // LCP images get priority
  placeholder="blur"     // Show blur while loading
  className="object-cover w-full h-full"
/>
```

### 9.2 Code Splitting

```ts
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false,  // Disable SSR for browser-only libs
});
```

### 9.3 Font Optimization

```ts
// src/app/layout.tsx
import { Geist } from 'next/font/google';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export default function RootLayout({ children }) {
  return <html className={geist.variable}>{children}</html>;
}
```

> 🚨 **NEVER import fonts via `<link>` in the HTML. Always use `next/font` for automatic optimization.**

### 9.4 Performance Checklist

1. Images: Always use `next/image` with proper `width`/`height`
2. Fonts: Always use `next/font`, never CDN links
3. Bundle: Dynamic import heavy components
4. Caching: Use appropriate cache strategy per data type
5. Prefetch: Link prefetch for critical navigation paths
6. Suspense: Wrap async components with Suspense boundaries
7. revalidatePath: Call after data mutations

---

## 10. Environment & Configuration

### 10.1 Environment Variables

```bash
# .env.local (never commit this file)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Database
MONGODB_URI=mongodb://localhost:27017/appname
DATABASE_URL=postgresql://...   # If using Prisma

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=

# Third Party
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=   # NEXT_PUBLIC_ prefix for client
```

> ⚠️ Variables **WITHOUT** `NEXT_PUBLIC_` are server-only. Variables **WITH** `NEXT_PUBLIC_` are exposed to the browser. **Never put secrets in `NEXT_PUBLIC_` variables.**

### 10.2 next.config.ts

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'your-cdn.com' }],
  },
  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000'] },
  },
};

export default nextConfig;
```

---

## 11. AI Agent Prompt Instructions

> ✅ **This section contains the actual prompt text to paste to your AI agent. Copy it word for word.**

### 11.1 Master System Prompt

Paste this at the start of **EVERY** new project:

```
You are a senior Next.js developer. Before writing any code, read the
entire SOP document provided. Then follow these rules strictly:

ARCHITECTURE:
- Use App Router (never Pages Router)
- Default to Server Components, add 'use client' only when needed
- Follow the exact folder structure from the SOP
- Use TypeScript strict mode everywhere, no 'any' types

STYLING:
- Tailwind CSS utility classes only, no inline styles
- Shadcn/ui for base components
- Motion library for all animations (client components only)
- Mobile-first responsive design

DATA:
- Server Components: async/await directly
- Client Components: SWR or React Query
- API Routes: Route Handlers with proper error handling
- Validate all inputs with Zod

QUALITY:
- Every component has proper TypeScript interface
- Handle loading, error, and empty states
- next/image for ALL images, next/link for ALL navigation
- next/font for ALL fonts

Think step by step. Ask for clarification if requirements are unclear.
Generate complete, working code — no placeholder comments.
```

### 11.2 Feature-Specific Prompts

**For Authentication Pages:**
```
Build a login page using NextAuth credentials + Google OAuth.
Use Shadcn Card, Input, Button. Validate with Zod + React Hook Form.
Show error messages inline. Redirect to /dashboard on success.
Follow the auth setup in the SOP exactly.
```

**For Dashboard Pages:**
```
Build the dashboard at /dashboard. It is a Server Component.
Fetch user data server-side with getServerSession.
Use Shadcn layout components. Add loading.tsx and error.tsx.
Animate page entrance with Motion (separate Client Component).
```

**For API Routes:**
```
Create a REST API at /api/[resource]. Handle GET, POST, PUT, DELETE.
Check auth with getServerSession on every route.
Validate request body with Zod. Return typed NextResponse.
Handle all errors with try/catch and proper status codes.
```

### 11.3 Common Agent Mistakes to Prevent

Add these reminders to your prompt to prevent common AI agent errors:

- ❌ Do NOT use `useRouter` from `next/router` — use `next/navigation`
- ❌ Do NOT use `<img>` tags — always `next/image`
- ❌ Do NOT fetch data in `useEffect` — use Server Components or SWR
- ❌ Do NOT hardcode URLs — use environment variables
- ❌ Do NOT put secrets in `NEXT_PUBLIC_` variables
- ❌ Do NOT use the Pages Router (`pages/` folder)
- ❌ Do NOT forget `'use client'` on components using hooks
- ❌ Do NOT forget `'use server'` on Server Actions
- ❌ Do NOT skip TypeScript types
- ❌ Do NOT use any CSS frameworks other than Tailwind

---

## 12. Pre-Deployment Checklist

### 12.1 Code Quality
- [ ] `npm run build` — must succeed with 0 errors
- [ ] `npm run lint` — fix all ESLint warnings
- [ ] All TypeScript errors resolved
- [ ] All `console.log` statements removed
- [ ] No hardcoded credentials or URLs

### 12.2 Environment
- [ ] All `.env.local` variables added to Vercel/host environment
- [ ] `NEXTAUTH_URL` updated to production domain
- [ ] `NEXTAUTH_SECRET` is a strong random string
- [ ] OAuth redirect URLs updated in Google/GitHub console
- [ ] `.env.local` is in `.gitignore`

### 12.3 Performance
- [ ] All images use `next/image`
- [ ] All fonts use `next/font`
- [ ] Dynamic imports for heavy components
- [ ] Appropriate cache headers set
- [ ] Run Lighthouse audit — target 90+ all scores

### 12.4 Security
- [ ] All routes requiring auth are protected in middleware
- [ ] API routes validate session before processing
- [ ] User inputs validated with Zod
- [ ] CORS headers configured for API routes
- [ ] No sensitive data in client-side code

---

*Next.js AI Agent SOP — Version 1.0*
*Stack: Next.js 16.1.6 · NextAuth 4.24.11 · Tailwind 4.1.4 · Motion 12.23.24 · React 19.2.3 · Shadcn 3.8.2*
