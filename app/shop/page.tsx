"use client";

import { useState } from "react";
import ProductCard, { Product } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

// Datos estáticos de productos
const allProducts: Product[] = [
  // GRANOS
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
    id: "glacial-blend",
    name: "Glacial Blend",
    description: "Una mezcla oscura y audaz inspirada en los glaciares del sur. Notas intensas de chocolate oscuro, ahumado y especias.",
    price: 13000,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    grindOptions: ["Whole Bean", "Espresso", "French Press", "Filter"],
    tastingNotes: "Chocolate oscuro, Ahumado, Especias",
    origin: "Blend",
    altitude: "1000-1500 msnm",
    process: "Natural",
    body: 5,
    acidity: 1,
    stock: 40,
    category: { name: "Granos", slug: "granos" },
  },
  {
    id: "torres-paine",
    name: "Torres del Paine Single Origin",
    description: "Café de origen único de Etiopía con notas distintivas de frutos oscuros, bergamota y miel.",
    price: 18000,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
    grindOptions: ["Whole Bean", "Espresso", "French Press", "Filter"],
    tastingNotes: "Frutos oscuros, Bergamota, Miel",
    origin: "Yirgacheffe, Etiopía",
    altitude: "1900-2200 msnm",
    process: "Lavado",
    body: 2,
    acidity: 5,
    stock: 25,
    category: { name: "Granos", slug: "granos" },
  },
  {
    id: "fitz-roy",
    name: "Fitz Roy Espresso",
    description: "Blend especialmente diseñado para espresso. Intenso, con cuerpo completo y crema persistente.",
    price: 14000,
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80",
    grindOptions: ["Whole Bean", "Espresso"],
    tastingNotes: "Cacao, Panela, Nuez",
    origin: "Blend Brasil - Colombia",
    altitude: "1100-1700 msnm",
    process: "Lavado",
    body: 4,
    acidity: 2,
    stock: 45,
    category: { name: "Granos", slug: "granos" },
  },
  {
    id: "bagual-morning",
    name: "Bagual Morning",
    description: "Café perfecto para comenzar la mañana. Suave, balanceado y fácil de beber.",
    price: 11000,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    grindOptions: ["Whole Bean", "Espresso", "French Press", "Filter"],
    tastingNotes: "Galleta, Vainilla, Leche tostada",
    origin: "Blend",
    altitude: "1200-1600 msnm",
    process: "Lavado",
    body: 3,
    acidity: 3,
    stock: 60,
    category: { name: "Granos", slug: "granos" },
  },
  {
    id: "selknam-decaf",
    name: "Selknam Decaf",
    description: "Café descafeinado de montaña sin perder el sabor. Proceso Swiss Water.",
    price: 14500,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80",
    grindOptions: ["Whole Bean", "Espresso", "French Press", "Filter"],
    tastingNotes: "Chocolate suave, Caramelo, Frutos secos",
    origin: "Colombia",
    altitude: "1600-1900 msnm",
    process: "Swiss Water",
    body: 3,
    acidity: 2,
    stock: 30,
    category: { name: "Granos", slug: "granos" },
  },
  {
    id: "kawesqar-reserve",
    name: "Kawésqar Reserve",
    description: "Edición limitada de micro-lote. Café excepcional con notas complejas de tropical y jasmine.",
    price: 22000,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    grindOptions: ["Whole Bean", "Filter"],
    tastingNotes: "Tropical, Jasmine, Miel de ulmo",
    origin: "Nariño, Colombia",
    altitude: "2100-2300 msnm",
    process: "Lavado",
    body: 2,
    acidity: 5,
    stock: 8,
    category: { name: "Granos", slug: "granos" },
  },

  // PASTELERÍA
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
    description: "Cheesecake de Nueva York con coulis de calafate silvestre.",
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
  {
    id: "brownie-glacial",
    name: "Brownie Glacial",
    description: "Brownie denso y chocolateado con trozos de chocolate amargo y nueces.",
    price: 6500,
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Chocolate, Nueces, Caramelo",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 18,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
  {
    id: "croissant",
    name: "Croissant de Mantequilla",
    description: "Croissant francés clásico hecho con mantequilla premium. Horneado cada mañana.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Mantequilla, Crujiente, Hojaldrado",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 25,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
  {
    id: "muffin-arandanos",
    name: "Muffin de Arándanos",
    description: "Muffin esponjoso con arándanos frescos y streusel crujiente.",
    price: 4000,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Arándanos, Vainilla, Cítrico",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 20,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
  {
    id: "alfajor-cactus",
    name: "Alfajor Cactus",
    description: "Dos suaves galletas de maicena rellenas con dulce de leche y bañadas en chocolate.",
    price: 3000,
    image: "https://images.unsplash.com/photo-1621893027164-7320cf14a07b?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Dulce de leche, Chocolate, Vainilla",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 30,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
  {
    id: "torta-selknam",
    name: "Torta Selknam",
    description: "Torta de chocolate intenso con ganache y ganache de calafate.",
    price: 9000,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Chocolate, Calafate, Intenso",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 8,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
  {
    id: "scones-queso",
    name: "Scones de Queso",
    description: "Scones salados con queso chubut y hierbas frescas.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1619221882220-4479aff00bf0?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Queso, Hierbas, Salado",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 16,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
  {
    id: "macarons",
    name: "Macarons Patagonia",
    description: "Caja de 5 macarons con sabores de la región: calafate, murta, chocolates, vainilla y frambuesa.",
    price: 8000,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Frutal, Almendra, Dulce",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 14,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
  {
    id: "tarta-limon",
    name: "Tarta de Limón",
    description: "Tarta de limón con curd brillante y merengue italiano tostado.",
    price: 7000,
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Limón, Ácido, Merengue",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 10,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },
  {
    id: "cookie",
    name: "Cookie Gigante",
    description: "Cookie masiva con trozos de chocolate belga y nueces.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    grindOptions: [],
    tastingNotes: "Chocolate, Nueces, Vainilla",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 22,
    category: { name: "Pasteleria", slug: "pasteleria" },
  },

  // MERCH
  {
    id: "tote-bag",
    name: "Tote Bag Patagonia",
    description: "Bolsa de tela resistente con diseño exclusivo de Adventure Cactus Coffee.",
    price: 12000,
    image: "https://images.unsplash.com/photo-1597484661643-2f5fef26aa4b?w=800&q=80",
    grindOptions: [],
    tastingNotes: "",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 40,
    category: { name: "Merch", slug: "merch" },
  },
  {
    id: "tshirt-logo",
    name: "T-Shirt Logo - Negro",
    description: "Camiseta de algodón premium con logo bordado. Fit moderno, cómoda y duradera.",
    price: 18000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    grindOptions: [],
    tastingNotes: "",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 25,
    category: { name: "Merch", slug: "merch" },
  },
  {
    id: "tshirt-mountains",
    name: "T-Shirt Mountains - Beige",
    description: "Camiseta con diseño de montañas y slogan 'Café al Fin del Mundo'.",
    price: 19000,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    grindOptions: [],
    tastingNotes: "",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 20,
    category: { name: "Merch", slug: "merch" },
  },
  {
    id: "hoodie",
    name: "Hoodie Adventure",
    description: "Polerón oversize de fleece premium. Logo pequeño en pecho y diseño grande en espalda.",
    price: 35000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    grindOptions: [],
    tastingNotes: "",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 15,
    category: { name: "Merch", slug: "merch" },
  },
  {
    id: "taza-ceramica",
    name: "Taza Cerámica Resiliente",
    description: "Taza de cerámica artesanal con textura de cactus. 350ml.",
    price: 9500,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    grindOptions: [],
    tastingNotes: "",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 30,
    category: { name: "Merch", slug: "merch" },
  },
  {
    id: "travel-mug",
    name: "Travel Mug Adventure",
    description: "Taza térmica de acero inoxidable con cierre hermético. Mantiene tu café caliente por 6 horas.",
    price: 22000,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    grindOptions: [],
    tastingNotes: "",
    origin: null,
    altitude: null,
    process: null,
    body: 0,
    acidity: 0,
    stock: 18,
    category: { name: "Merch", slug: "merch" },
  },
];

const categories: Category[] = [
  { id: "1", name: "Granos", slug: "granos" },
  { id: "2", name: "Pasteleria", slug: "pasteleria" },
  { id: "3", name: "Merch", slug: "merch" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? allProducts.filter((p) => p.category.slug === selectedCategory)
    : allProducts;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestra Tienda
          </h1>
          <p className="text-primary/70 max-w-2xl mx-auto">
            Explora nuestra selección de cafés de especialidad, pastelería y mercancía
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-6 py-2 rounded-full font-medium transition-all border-2",
              selectedCategory === null
                ? "bg-secondary text-primary border-secondary"
                : "border-primary/30 text-primary hover:border-secondary/50"
            )}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-all border-2 capitalize",
                selectedCategory === category.slug
                  ? "bg-secondary text-primary border-secondary"
                  : "border-primary/30 text-primary hover:border-secondary/50"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-primary/70">No hay productos disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
