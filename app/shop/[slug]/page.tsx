"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import GrindSelector from "@/components/product/GrindSelector";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Product as ProductType } from "@/components/product/ProductCard";

// Datos estáticos de productos (mismos que en shop page)
const productsData: Record<string, ProductType> = {
  "patagonia-resiliente": {
    id: "patagonia-resiliente",
    name: "Patagonia Resiliente",
    description: "Nuestra mezcla de casa. Un café balanceado que combina la mejor selección de granos de América Latina y África. Notas de chocolate amargo, nuez y un toque de frutos rojos. Perfecto para cualquier método de preparación.",
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
  "cactus-high": {
    id: "cactus-high",
    name: "Cactus High",
    description: "Originario de las tierras altas de Colombia. Este café de altura excepcional ofrece una acidez brillante con notas de cítricos y caramelo. Un reflejo perfecto de la resiliencia de la Patagonia.",
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
  "glacial-blend": {
    id: "glacial-blend",
    name: "Glacial Blend",
    description: "Una mezcla oscura y audaz inspirada en los glaciares del sur. Notas intensas de chocolate oscuro, ahumado y especias. Ideal para aquellos que buscan un café con carácter y cuerpo.",
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
  "torres-paine": {
    id: "torres-paine",
    name: "Torres del Paine Single Origin",
    description: "Café de origen único de Etiopía con notas distintivas de frutos oscuros, bergamota y miel. Una experiencia sensorial única como las Torres del Paine.",
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
  "fitz-roy": {
    id: "fitz-roy",
    name: "Fitz Roy Espresso",
    description: "Blend especialmente diseñado para espresso. Intenso, con cuerpo completo y crema persistente. Notas de cacao, panela y nuez.",
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
  "bagual-morning": {
    id: "bagual-morning",
    name: "Bagual Morning",
    description: "Café perfecto para comenzar la mañana. Suave, balanceado y fácil de beber. Notas de galleta, vainilla y leche tostada.",
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
  "selknam-decaf": {
    id: "selknam-decaf",
    name: "Selknam Decaf",
    description: "Café descafeinado de montaña sin perder el sabor. Proceso Swiss Water que mantiene todas las características del grano original.",
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
  "kawesqar-reserve": {
    id: "kawesqar-reserve",
    name: "Kawésqar Reserve",
    description: "Edición limitada de micro-lote. Café excepcional con notas complejas de tropical, jasmine y miel de ulmo. Solo 50kg disponibles.",
    price: 22000,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    grindOptions: ["Whole Bean", "Filter"],
    tastingNotes: "Tropical, Jasmine, Miel de ulmo",
    origin: "Nariño, Colombia",
    altitude: "2100-2300 msnm",
    process: "Lavado - Fermentación extendida",
    body: 2,
    acidity: 5,
    stock: 8,
    category: { name: "Granos", slug: "granos" },
  },
  "torta-tres-leches": {
    id: "torta-tres-leches",
    name: "Torta de Tres Leches Patagonia",
    description: "Nuestra versión patagónica del clásico. Tres tipos de leche, bizcocho húmedo y merengue italiano. Esponjosa y decadente.",
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
  "cheesecake-calafate": {
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
  "brownie-glacial": {
    id: "brownie-glacial",
    name: "Brownie Glacial",
    description: "Brownie denso y chocolateado con trozos de chocolate amargo y nueces. Servido caliente con helado de vainilla.",
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
  "croissant": {
    id: "croissant",
    name: "Croissant de Mantequilla",
    description: "Croissant francés clásico hecho con mantequilla premium. Capas crujientes por fuera, tierno y aireado por dentro. Horneado cada mañana.",
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
  "muffin-arandanos": {
    id: "muffin-arandanos",
    name: "Muffin de Arándanos",
    description: "Muffin esponjoso con arándanos frescos y streusel crujiente. Perfecto para acompañar tu café de la mañana.",
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
  "alfajor-cactus": {
    id: "alfajor-cactus",
    name: "Alfajor Cactus",
    description: "Dos suaves galletas de maicena rellenas con dulce de leche y bañadas en chocolate. Nuestra versión con forma de cactus.",
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
  "torta-selknam": {
    id: "torta-selknam",
    name: "Torta Selknam",
    description: "Torta de chocolate intenso con ganache y ganache de calafate. Decorada con motivos inspirados en la cultura Selk'nam.",
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
  "scones-queso": {
    id: "scones-queso",
    name: "Scones de Queso",
    description: "Scones salados con queso chubut y hierbas frescas. Perfectos con un café por la tarde.",
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
  "macarons": {
    id: "macarons",
    name: "Macarons Patagonia",
    description: "Caja de 5 macarons con sabores de la región: calafate, murta, chocolates, vainilla y frambuesa. Almendras finas y ganache francesa.",
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
  "tarta-limon": {
    id: "tarta-limon",
    name: "Tarta de Limón",
    description: "Tarta de limón con curd brillante y merengue italiano tostado. El equilibrio perfecto entre ácido y dulce.",
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
  "cookie": {
    id: "cookie",
    name: "Cookie Gigante",
    description: "Cookie masiva con trozos de chocolate belga y nueces. Borde crujiente, centro suave y derretido.",
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
  "tote-bag": {
    id: "tote-bag",
    name: "Tote Bag Patagonia",
    description: "Bolsa de tela resistente con diseño exclusivo de Adventure Cactus Coffee. Perfecta para tu laptop o compra diaria.",
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
  "tshirt-logo": {
    id: "tshirt-logo",
    name: "T-Shirt Logo - Negro",
    description: "Camiseta de algodón premium con logo bordado. Fit moderno, cómoda y duradera. Disponible en tallas S a XL.",
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
  "tshirt-mountains": {
    id: "tshirt-mountains",
    name: "T-Shirt Mountains - Beige",
    description: "Camiseta con diseño de montañas y slogan 'Café al Fin del Mundo'. Algodón orgánico certificado.",
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
  "hoodie": {
    id: "hoodie",
    name: "Hoodie Adventure",
    description: "Polerón oversize de fleece premium. Logo pequeño en pecho y diseño grande en espalda. Perfecto para aventuras outdoor.",
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
  "taza-ceramica": {
    id: "taza-ceramica",
    name: "Taza Cerámica Resiliente",
    description: "Taza de cerámica artesanal con textura de cactus. 350ml, perfecta para tu café favorito. Cada pieza es única.",
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
  "travel-mug": {
    id: "travel-mug",
    name: "Travel Mug Adventure",
    description: "Taza térmica de acero inoxidable con cierre hermético. Mantiene tu café caliente por 6 horas. Diseño compacto.",
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
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState<string>("Whole Bean");

  const product = productsData[slug];

  useEffect(() => {
    if (product && Array.isArray(product.grindOptions) && product.grindOptions.length > 0) {
      setSelectedGrind(product.grindOptions[0]);
    }
  }, [product]);

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
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

  const grindOptions = Array.isArray(product.grindOptions) ? product.grindOptions : [];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-primary/5">
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
                <span className="text-sm text-primary/60 capitalize">
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
                    className="w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center hover:border-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center hover:border-secondary transition-colors"
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
                <div className="mt-8 pt-8 border-t border-primary/20">
                  <h3 className="font-semibold text-primary mb-3">Notas de Cata</h3>
                  <p className="text-primary/70">{product.tastingNotes}</p>
                </div>
              )}

              {(product.origin || product.altitude || product.process) && (
                <div className="mt-6 pt-6 border-t border-primary/20">
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
                <div className="mt-6 pt-6 border-t border-primary/20">
                  <h3 className="font-semibold text-primary mb-3">Perfil</h3>
                  <div className="space-y-3">
                    {product.body > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-primary/70">Cuerpo</span>
                          <span className="text-primary/70">{product.body}/5</span>
                        </div>
                        <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
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
                        <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
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
