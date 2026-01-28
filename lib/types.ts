export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  grindOption: string;
  categoryName: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, grindOption: string) => void;
  updateQuantity: (id: string, grindOption: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
