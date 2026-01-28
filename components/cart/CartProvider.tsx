"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { CartItem, CartContextType } from "@/lib/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("advencac-cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("advencac-cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.id === item.id && i.grindOption === item.grindOption
      );

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.grindOption === item.grindOption
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string, grindOption: string) => {
    setItems((prevItems) =>
      prevItems.filter((i) => !(i.id === id && i.grindOption === grindOption))
    );
  };

  const updateQuantity = (id: string, grindOption: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, grindOption);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === id && i.grindOption === grindOption ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
