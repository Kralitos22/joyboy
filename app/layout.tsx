import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "$JOYBOYCAT — Symbol of Freedom 🐱⛵",
  description:
    "The first JOYBOYCAT on Pump.fun. Inspired by Joy Boy's ancient robot Emet — the Iron Giant. A community-driven meme coin on Solana.",
  keywords: ["JOYBOYCAT", "meme coin", "Solana", "Pump.fun", "Emet", "Iron Giant"],
  openGraph: {
    title: "$JOYBOYCAT — Symbol of Freedom",
    description: "The first JOYBOYCAT on Pump.fun. Inspired by Joy Boy's ancient robot Emet.",
    type: "website",
  },
  icons: {
    icon: "/assets/img/favicon.png",
    apple: "/assets/img/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pirata+One&family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
