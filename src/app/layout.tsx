import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import { ClerkProvider, Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import {dark} from "@clerk/themes"
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
    appearance={{
      theme: dark
    }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <header>
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <Button>Sign up</Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>


            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}