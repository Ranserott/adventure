import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product & {
    category: {
      name: string;
      slug: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const grindOptions = Array.isArray(product.grindOptions)
    ? product.grindOptions
    : [];

  return (
    <Link href={`/shop/${product.id}`} className="group">
      <div className="overflow-hidden rounded-lg bg-white border border-neutral/20 hover:border-secondary transition-colors">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-neutral/10">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock > 0 && product.stock <= 10 && (
            <div className="absolute top-2 right-2">
              <Badge variant="success">¡Últimos {product.stock}!</Badge>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary">Agotado</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-primary group-hover:text-secondary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="font-bold text-accent whitespace-nowrap ml-2">
              {formatPrice(Number(product.price))}
            </span>
          </div>

          <p className="text-sm text-primary/70 line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-primary/60 capitalize">
              {product.category.name}
            </span>
            {grindOptions.length > 0 && (
              <span className="text-xs text-primary/60">
                {grindOptions.length} opciones
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
