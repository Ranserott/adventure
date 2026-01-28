"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { getTotalItems, setIsOpen } = useCart();

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/shop", label: "Tienda" },
    { href: "/about", label: "Nosotros" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary border-b border-neutral/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/icono.jpg" alt="Adventure Cactus Coffee" className="h-10 w-10 rounded-full" />
            <span className="text-xl font-bold text-secondary hidden sm:inline-block">
              Adventure Cactus Coffee
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-secondary",
                  pathname === item.href ? "text-secondary" : "text-neutral"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-neutral hover:text-secondary transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
