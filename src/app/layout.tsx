import "./globals.css";
import { Inter, IBM_Plex_Mono } from "next/font/google"
import { Providers } from "@/components/providers";

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

    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}>



        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}