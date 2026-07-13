import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toonix — Đọc truyện tranh không giới hạn",
  description:
    "Toonix là nền tảng đọc truyện tranh trực tuyến với hàng ngàn bộ truyện thuộc mọi thể loại.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-navy-950 text-ink-50">
        {children}
      </body>
    </html>
  );
}
