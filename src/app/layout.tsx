import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat, JetBrains_Mono, Crimson_Text } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Community corkboard fonts
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Custom magazine font for headers
const magazine = localFont({
  src: "../fonts/magazine.otf",
  variable: "--font-magazine",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cool Beans Davis",
  description: "Davis's Vegan + Plant Based Alliance",
};

// Viewport configuration with custom initial-scale for mobile
export const viewport = {
  width: 'device-width',
  initialScale: 1, // Zoom out slightly on mobile (default is 1.0)
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${jetbrainsMono.variable} ${crimsonText.variable} ${magazine.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
