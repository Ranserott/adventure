"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import GrindSelector from "@/components/product/GrindSelector";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  grindOptions: string[];
  tastingNotes: string;
  origin: string | null;
  altitude: string | null;
  process: string | null;
  body: number;
  acidity: number;
  stock: number;
  category: {
    name: string;
    slug: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState<string>("Whole Bean");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          const options = Array.isArray(data.grindOptions) ? data.grindOptions : [];
          if (options.length > 0) {
            setSelectedGrind(options[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      grindOption: selectedGrind,
      categoryName: product.category.name,
    });
    setQuantity(1);
  };

  const grindOptions = product && Array.isArray(product.grindOptions) ? product.grindOptions : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-primary/60">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral/10">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="text-sm text-primary/50 capitalize">
                  {product.category.name}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold text-accent">
                  {formatPrice(product.price)}
                </span>
              </div>

              <p className="text-primary/70 mb-8 leading-relaxed">
                {product.description}
              </p>

              {grindOptions.length > 0 && (
                <div className="mb-6">
                  <GrindSelector
                    grindOptions={grindOptions}
                    value={selectedGrind}
                    onChange={setSelectedGrind}
                  />
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="text-sm font-medium text-primary mb-2 block">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-neutral/30 flex items-center justify-center hover:border-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-neutral/30 flex items-center justify-center hover:border-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full"
                  size="lg"
                >
                  {product.stock === 0 ? "Agotado" : "Agregar al Carrito"}
                </Button>

                {product.stock > 0 && product.stock <= 10 && (
                  <p className="text-sm text-secondary text-center">
                    ¡Solo quedan {product.stock} unidades!
                  </p>
                )}
              </div>

              {/* Product Details */}
              {product.tastingNotes && (
                <div className="mt-8 pt-8 border-t border-neutral/20">
                  <h3 className="font-semibold text-primary mb-3">Notas de Cata</h3>
                  <p className="text-primary/70">{product.tastingNotes}</p>
                </div>
              )}

              {(product.origin || product.altitude || product.process) && (
                <div className="mt-6 pt-6 border-t border-neutral/20">
                  <h3 className="font-semibold text-primary mb-3">Especificaciones</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {product.origin && (
                      <div>
                        <span className="text-primary/50">Origen:</span>
                        <p className="text-primary">{product.origin}</p>
                      </div>
                    )}
                    {product.altitude && (
                      <div>
                        <span className="text-primary/50">Altitud:</span>
                        <p className="text-primary">{product.altitude}</p>
                      </div>
                    )}
                    {product.process && (
                      <div>
                        <span className="text-primary/50">Proceso:</span>
                        <p className="text-primary capitalize">{product.process}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(product.body > 0 || product.acidity > 0) && (
                <div className="mt-6 pt-6 border-t border-neutral/20">
                  <h3 className="font-semibold text-primary mb-3">Perfil</h3>
                  <div className="space-y-3">
                    {product.body > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-primary/70">Cuerpo</span>
                          <span className="text-primary/70">{product.body}/5</span>
                        </div>
                        <div className="h-2 bg-neutral/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary"
                            style={{ width: `${(product.body / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {product.acidity > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-primary/70">Acidez</span>
                          <span className="text-primary/70">{product.acidity}/5</span>
                        </div>
                        <div className="h-2 bg-neutral/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary"
                            style={{ width: `${(product.acidity / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
