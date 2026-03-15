import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zybrotech',
  description: 'Building bold brands with thoughtful design',
  icons: {
    icon: '/logo.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={cn(inter.className, "overflow-x-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SmoothScrollProvider>
            <PageBackground />
            <Navbar />
            <main>
              {children}
            </main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export function PageBackground() {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-white dark:bg-zinc-950">
            {/* ── LIGHT MODE ── */}
            <div className="absolute inset-0 dark:hidden">
                <div className="w-full h-full opacity-30"
                    style={{
                        background: `radial-gradient(circle at 15% 15%, rgba(186,230,253,0.4) 0%, transparent 60%)`
                    }}
                />
            </div>

            {/* ── DARK MODE ── */}
            <div className="absolute inset-0 hidden dark:block">
                <div className="absolute inset-0 opacity-20"
                    style={{
                        background: `radial-gradient(circle at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 60%)`
                    }}
                />
            </div>
        </div>
    )
}
