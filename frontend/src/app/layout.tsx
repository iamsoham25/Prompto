import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />

        <Navbar />

        {children}

      </body>
    </html>
  );
}