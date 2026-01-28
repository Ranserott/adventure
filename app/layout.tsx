import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartSidebar from "@/components/cart/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adventure Cactus Coffee | Café de Especialidad en Puerto Natales",
  description: "Café de especialidad tostado en Puerto Natales, Chile. El refugio térmico y combustible sensorial para el explorador.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartSidebar />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
