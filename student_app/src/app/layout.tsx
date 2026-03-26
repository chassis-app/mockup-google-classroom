import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const bodyFont = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Google Classroom Student Mockup",
  description:
    "Frontend-only Google Classroom student experience mockup based on reference screenshots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
