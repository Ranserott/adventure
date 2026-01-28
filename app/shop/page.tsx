"use client";

import { useState, useEffect } from "react";
import { Product, Category } from "@prisma/client";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

interface ProductWithCategory extends Product {
  category: Category;
}

export default function ShopPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category.slug === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestra Tienda
          </h1>
          <p className="text-primary/70 max-w-2xl mx-auto">
            Explora nuestra selección de cafés de especialidad, equipamiento y mercancía
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
                : "border-neutral/30 text-primary hover:border-secondary/50"
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
                  : "border-neutral/30 text-primary hover:border-secondary/50"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
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
