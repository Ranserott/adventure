"use client";

import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, getGrindLabel } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-neutral/10 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-neutral/30" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">Tu Carrito</h1>
            <p className="text-neutral/60 mb-8">
              Tu carrito está vacío. ¡Es hora de agregar algunos cafés de especialidad!
            </p>
            <Link href="/shop">
              <Button size="lg">Explorar Productos</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-8">Tu Carrito</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.grindOption}`}
                  className="flex gap-4 p-6 bg-neutral/5 rounded-lg border border-neutral/10"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-neutral/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold text-primary">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id, item.grindOption)}
                        className="p-1 text-red-500 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-sm text-neutral/60 mb-2">
                      {getGrindLabel(item.grindOption)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.grindOption, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-neutral/10 flex items-center justify-center hover:bg-neutral/20 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.grindOption, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-neutral/10 flex items-center justify-center hover:bg-neutral/20 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <p className="font-bold text-accent">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-neutral/5 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-primary mb-4">Resumen</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral/60">Subtotal</span>
                    <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral/60">Envío</span>
                    <span className="font-medium">Se calcula al finalizar</span>
                  </div>
                  <div className="border-t border-neutral/20 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Proceder al Pago
                  </Button>
                </Link>

                <Link href="/shop">
                  <button className="w-full mt-3 text-sm text-neutral/60 hover:text-primary transition-colors">
                    Seguir comprando
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
