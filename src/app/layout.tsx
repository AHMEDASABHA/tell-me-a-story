import type { Metadata } from "next";
import { Modern_Antiqua } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const modernAntiqua = Modern_Antiqua({
  weight: "400",
  variable: "--font-modern-antiqua",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tell me a story",
  description: "Generate your kid favorite story",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${modernAntiqua.variable} antialiased h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
