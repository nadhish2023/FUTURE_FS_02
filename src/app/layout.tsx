import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { AOSInitializer } from "@/components/common/AOSInitializer";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "EchoPulse",
  description: "An immersive audio experience.",
  icons: {
    icon: '/echopulse.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-dark-base text-light-text`}>
        <div className="fixed inset-0 -z-10 h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/background-space.jpg')" }}>
          <div className="absolute inset-0 h-full w-full bg-black/70"></div>
        </div>
        <div className="flex min-h-screen flex-col">
          <AOSInitializer />
          <Navbar />
          <main className="flex flex-grow flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}