import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estudios de Síntesis Profunda",
  description:
    "Licenciatura en yo mismo — programa personal de formación integral",
  appleWebApp: {
    capable: true,
    title: "Síntesis Profunda",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 py-4 text-center text-xs text-stone-400 dark:border-stone-800">
          Licenciatura en yo mismo · v1.0
        </footer>
      </body>
    </html>
  );
}
