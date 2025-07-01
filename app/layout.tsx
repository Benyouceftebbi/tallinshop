import type React from "react"
import type { Metadata } from "next/metadata"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import FacebookPixel from "@/hooks/facebook-pixel"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sabot Aniq - Élégance & Confort",
  description: "Découvrez nos mules sabots premium pour la femme moderne.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>


                       <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=710268394515342&ev=PageView&noscript=1" />
            `,
          }}
        />
              <FacebookPixel pixelId="710268394515342" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
