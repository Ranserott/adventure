"use client";

import { useEffect } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice, getGrindLabel } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, getTotalPrice, isOpen, setIsOpen } = useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral/20">
            <h2 className="text-lg font-semibold text-primary">Carrito</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-primary/60 hover:text-primary transition-colors"
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-primary/20 mb-4" />
                <p className="text-primary/70 mb-4">Tu carrito está vacío</p>
                <Link href="/shop" onClick={() => setIsOpen(false)}>
                  <Button variant="outline">Explorar Productos</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.grindOption}`}
                    className="flex gap-4 p-4 bg-neutral/5 rounded-lg"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-neutral/10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-primary text-sm truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-primary/60 mb-1">
                        {getGrindLabel(item.grindOption)}
                      </p>
                      <p className="text-sm font-semibold text-accent">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.grindOption, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-neutral/10 flex items-center justify-center hover:bg-neutral/20 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.grindOption, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-neutral/10 flex items-center justify-center hover:bg-neutral/20 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id, item.grindOption)}
                          className="ml-auto p-1 text-red-500 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-neutral/20 p-4 space-y-4">
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-primary">Subtotal</span>
                <span className="font-bold text-primary">{formatPrice(getTotalPrice())}</span>
              </div>
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full" size="lg">
                  Proceder al Pago
                </Button>
              </Link>
              <p className="text-xs text-center text-primary/50">
                Envíos a todo Chile
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
