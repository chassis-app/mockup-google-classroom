import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Noto_Sans_SC, Noto_Sans_TC, Roboto } from "next/font/google";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import "./globals.css";

const bodyFont = Roboto({
  variable: "--font-body-en",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const traditionalChineseFont = Noto_Sans_TC({
  variable: "--font-body-zh-hk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const simplifiedChineseFont = Noto_Sans_SC({
  variable: "--font-body-zh-cn",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const localeFontMap: Record<Locale, string> = {
  en: "var(--font-body-en)",
  "zh-HK": "var(--font-body-zh-hk)",
  "zh-CN": "var(--font-body-zh-cn)",
};

export const metadata: Metadata = {
  title: "Google Classroom Student Mockup",
  description: "Frontend-only Google Classroom student experience mockup based on reference screenshots.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const requestedLocale = headerStore.get("x-app-locale") ?? defaultLocale;
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <html
      lang={locale}
      className={`${bodyFont.variable} ${traditionalChineseFont.variable} ${simplifiedChineseFont.variable} h-full antialiased`}
    >
      <body
        className="min-h-full"
        style={{ "--font-body": localeFontMap[locale] } as CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
