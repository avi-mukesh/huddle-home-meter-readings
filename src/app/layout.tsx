import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import NavbarProvider from "@/context/NavbarContext";
import Header from "@/components/shared/Header";

export const metadata: Metadata = {
  title: {
    template: "%s | Huddle",
    default: "Huddle",
  },
  description: "View house energy and electricity usage on this website.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NavbarProvider>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden pt-7">
            <Navbar />
            <div className="flex-grow p-6 pt-10 md:overflow-auto md:p-12">
              <Header />
              {children}
            </div>
          </div>
        </NavbarProvider>
      </body>
    </html>
  );
}
