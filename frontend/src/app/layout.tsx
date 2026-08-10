import "./globals.css";

import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prompto — Master AI Prompting",
  description:
    "Learn, practice, evaluate and improve your Prompt Engineering skills with Prompto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />

        <Navbar />

        <ScrollToTop />

        {children}
      </body>
    </html>
  );
}