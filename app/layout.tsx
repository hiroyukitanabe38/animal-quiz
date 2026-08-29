import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://animal-quiz-s-c8d7.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "どうぶつクイズ",
  description: "どうぶつの名前、わかるかな？楽しく遊べるどうぶつクイズ！",
  openGraph: {
    title: "どうぶつクイズ 🐾",
    description: "どうぶつの名前、わかるかな？楽しく遊べるどうぶつクイズ！",
    url: siteUrl,
    siteName: "どうぶつクイズ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "どうぶつクイズ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "どうぶつクイズ 🐾",
    description: "どうぶつの名前、わかるかな？楽しく遊べるどうぶつクイズ！",
    images: ["/og-image.jpg"],
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
