import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Crimson_Pro } from "next/font/google";
import "./globals.css";

const bodyFont = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const headingFont = Crimson_Pro({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Classroom Atelier",
  description: "Frontend-only Google Classroom-inspired mockup with client extension surfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
