import type { Metadata } from "next";
import "./globals.css";
import "remixicon/fonts/remixicon.css";


export const metadata: Metadata = {
  title: "YPLJ Camp Meeting",
  description: "Young peoeple love jesus camp meeting, redirecting the young to fullfill God's plan for their lives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
