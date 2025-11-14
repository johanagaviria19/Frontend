import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { LanguageProvider } from "@/components/i18n-provider"
import Link from "next/link"
import { UserMenu } from "@/components/user-menu"
import { Sparkles, Home as HomeIcon, Box, Brain, Settings as SettingsIcon, Users, BarChart3 } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { I18nText } from "@/components/i18n-text"

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "DBVision - Intelligent Product Analysis",
  description: "Analyze products with AI-powered sentiment analysis, price comparisons, and customer insights",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="antialiased">
        <AuthProvider>
          <LanguageProvider>
          <SidebarProvider>
            <Sidebar side="left" variant="floating" collapsible="icon">
              <SidebarHeader>
                <div className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 neon-icon">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary"><I18nText k="sidebar.analytics" /></div>
                    </div>
                  </div>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <div className="px-3">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <Link href="/dashboard" className="block">
                        <SidebarMenuButton className="neon-panel">
                          <HomeIcon className="h-4 w-4" />
                          <I18nText k="sidebar.dashboard" />
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <Link href="/products" className="block">
                        <SidebarMenuButton>
                          <Box className="h-4 w-4" />
                          <I18nText k="sidebar.products" />
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <Link href="/analysis" className="block">
                        <SidebarMenuButton>
                          <Brain className="h-4 w-4" />
                          <I18nText k="sidebar.analysis" />
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <Link href="/settings" className="block">
                        <SidebarMenuButton>
                          <SettingsIcon className="h-4 w-4" />
                          <I18nText k="sidebar.settings" />
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  </SidebarMenu>
                  <SidebarSeparator className="my-4" />
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Users className="h-4 w-4" />
                        <I18nText k="sidebar.admin" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </div>
              </SidebarContent>
              <SidebarFooter>
                <div className="px-4 py-4 text-xs text-muted-foreground"><I18nText k="layout.footer" /></div>
              </SidebarFooter>
            </Sidebar>

            <SidebarInset>
              <div className="min-h-screen bg-background">
                <header className="sticky top-0 z-50 border-b border-border header-gradient backdrop-blur-sm">
                  <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary neon-icon">
                          <Sparkles className="h-6 w-6" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-foreground"><I18nText k="layout.brand" /></h1>
                          <p className="text-sm text-muted-foreground"><I18nText k="layout.tagline" /></p>
                        </div>
                      </div>
                      <UserMenu />
                    </div>
                  </div>
                </header>

                {children}

                <footer className="mt-16 border-t border-border bg-card/50 py-8 gradient-border neon-panel">
                  <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p><I18nText k="layout.footer" /></p>
                </div>
              </footer>
              </div>
            </SidebarInset>
          </SidebarProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
