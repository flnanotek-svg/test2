import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LaserPro — Лазерные станки для резки металла",
  description: "Волоконные лазерные станки от 500 Вт до 12 кВт. Точность ±0.03 мм, скорость до 60 м/мин. Доставка по всей России, гарантия 3 года.",
  keywords: ["лазерный станок", "резка металла", "волоконный лазер", "CNC лазер", "лазерная резка", "металлообработка", "промышленное оборудование"],
  authors: [{ name: "LaserPro" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "LaserPro — Лазерные станки для резки металла",
    description: "Волоконные лазерные станки от 500 Вт до 12 кВт. Доставка по РФ, гарантия 3 года.",
    siteName: "LaserPro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaserPro — Лазерные станки для резки металла",
    description: "Волоконные лазерные станки от 500 Вт до 12 кВт. Доставка по РФ, гарантия 3 года.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
