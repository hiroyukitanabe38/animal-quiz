import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "どうぶつクイズ",
  description: "ヒントを読んで動物を当てよう。100匹のどうぶつ図鑑を集める、幼児向け4択クイズ。",
  openGraph: {
    title: "どうぶつクイズ",
    description: "ヒントを よんで 100ぴき あつめよう！",
    images: [{ url: "/og.webp", width: 1200, height: 630, alt: "どうぶつクイズ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "どうぶつクイズ",
    description: "ヒントを よんで 100ぴき あつめよう！",
    images: ["/og.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
