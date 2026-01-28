import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";

// Datos estáticos para productos destacados
const featuredProducts = [
  {
    id: "patagonia-resiliente",
    name: "Patagonia Resiliente",
    description: "Nuestra mezcla de casa. Un café balanceado que combina la mejor selección de granos de América Latina y África.",
    price: 12000,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    grindOptions: ["Whole Bean", "Espresso", "French Press", "Filter"],
    tastingNotes: "Chocolate, Nuez, Frutos rojos",
    origin: "Blend",
    altitude: "1200-1800 msnm",
    process: "Lavado",
    body: 3,
    acidity: 2,
    stock: 50,
    category: { name: "Granos", slug: "granos" },
  },
  {
    id: "cactus-high",
    name: "Cactus High",
    description: "Originario de las tierras altas de Colombia. Este café de altura excepcional ofrece una acidez brillante con notas de cítricos y caramelo.",
    price: 15000,
    image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800&q=80",
    grindOptions: ["Whole Bean", "Espresso", "French Press", "Filter"],
    tastingNotes: "Cítricos, Caramelo, Floral",
    origin: "Huila, Colombia",
    altitude: "1800-2100 msnm",
    process: "Lavado",
    body: 2,
    acidity: 4,
    stock: 35,
    category: { name: "Granos", slug: "granos" },
  },
  {
    id: "torta-tres-leches",
    name: "Torta de Tres Leches Patagonia",
    description: "Nuestra versión patagónica del clásico. Tres tipos de leche, bizcocho húmedo y merengue italiano.",
    price: 8500,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Dulce, Vainilla, Leche",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 12,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
  {
    id: "cheesecake-calafate",
    name: "Cheesecake Calafate",
    description: "Cheesecake de Nueva York con coulis de calafate silvestre. La acidez única de esta baya patagónica complementa perfectamente el cremoso queso crema.",
    price: 7500,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Cremoso, Ácido, Calafate",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 15,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Nuestros Destacados
            </h2>
            <p className="text-primary/70 max-w-2xl mx-auto">
              Descubre nuestra selección de cafés de especialidad y postres artesanales,
              tostados con pasión en el corazón de la Patagonia
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
