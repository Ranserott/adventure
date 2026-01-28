import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import Button from "@/components/ui/Button";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return products;
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Hero />

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Nuestros Cafés
            </h2>
            <p className="text-primary/70 max-w-2xl mx-auto">
              Descubre nuestra selección de granos de especialidad, tostados con pasión
              en el corazón de la Patagonia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop">
              <Button variant="outline">Ver Todos los Productos</Button>
            </Link>
          </div>
        </div>
      </section>

      <StorySection />

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-6">
            ¿Listo para tu Aventura?
          </h2>
          <p className="text-neutral/80 max-w-2xl mx-auto mb-8">
            Lleva el sabor de la Patagonia a tu taza. Envíos a todo Chile.
          </p>
          <Link href="/shop">
            <Button size="lg">Explorar Tienda</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
