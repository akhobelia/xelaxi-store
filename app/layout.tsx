import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Xelaxi",
  description: "Gaming ტექნიკა და აქსესუარები კარგ ფასად",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body className={notoGeorgian.className}>
        {children}
      </body>
    </html>
  );
} 