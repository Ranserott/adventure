"use client";

import { useState, FormEvent } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, getGrindLabel } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Finalizar Compra</h1>
            <p className="text-neutral/60 mb-8">
              Tu carrito está vacío. Agrega productos antes de continuar.
            </p>
            <Link href="/shop">
              <Button size="lg">Ir a la Tienda</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items,
          total: getTotalPrice(),
        }),
      });

      if (response.ok) {
        clearCart();
        router.push("/thank-you");
      } else {
        console.error("Checkout failed");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">Finalizar Compra</h1>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-neutral/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-primary mb-4">Información de Contacto</h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral/30 rounded-md focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral/30 rounded-md focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-neutral/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-primary mb-4">Dirección de Envío</h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-primary mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral/30 rounded-md focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-primary mb-1">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral/30 rounded-md focus:outline-none focus:border-secondary"
                      />
                    </div>

                    <div>
                      <label htmlFor="region" className="block text-sm font-medium text-primary mb-1">
                        Región
                      </label>
                      <input
                        type="text"
                        id="region"
                        required
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral/30 rounded-md focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-primary mb-1">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral/30 rounded-md focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/cart">
                  <Button variant="outline">Volver al Carrito</Button>
                </Link>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-neutral/5 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-primary mb-4">Resumen del Pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.grindOption}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-neutral/10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary text-sm truncate">{item.name}</p>
                      <p className="text-xs text-neutral/60">{getGrindLabel(item.grindOption)}</p>
                      <p className="text-xs text-neutral/60">Cant: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-accent">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral/20 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral/60">Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral/60">Envío</span>
                  <span>Se calcula al finalizar</span>
                </div>
                <div className="border-t border-neutral/20 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
