import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white overflow-x-hidden">

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