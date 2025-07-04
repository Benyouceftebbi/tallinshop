import type React from "react"
import type { Metadata } from "next/metadata"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

import Script from "next/script"

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
    <head>
        {/* ✅ Meta Pixel Script */}
     <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject = t;
                var ttq = w[t] = w[t] || [];
                ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
                ttq.setAndDefer = function (t, e) {
                  t[e] = function () {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                  }
                };
                for (var i = 0; i < ttq.methods.length; i++) {
                  ttq.setAndDefer(ttq, ttq.methods[i]);
                }
                ttq.instance = function (t) {
                  for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) {
                    ttq.setAndDefer(e, ttq.methods[n]);
                  }
                  return e;
                };
                ttq.load = function (e, n) {
                  var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                  ttq._i = ttq._i || {};
                  ttq._i[e] = [];
                  ttq._i[e]._u = i;
                  ttq._t = ttq._t || {};
                  ttq._t[e] = +new Date;
                  ttq._o = ttq._o || {};
                  ttq._o[e] = n || {};
                  var o = document.createElement("script");
                  o.type = "text/javascript";
                  o.async = !0;
                  o.src = i + "?sdkid=" + e + "&lib=" + t;
                  var a = document.getElementsByTagName("script")[0];
                  a.parentNode.insertBefore(o, a);
                };
                ttq.load('D1K2J7RC77UF9R48USOG');
                ttq.page();
              }(window, document, "ttq");
            `,
          }}
        />

      </head>

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>

          
          {children}
  
        </ThemeProvider>
      </body>
    </html>
  )
}
