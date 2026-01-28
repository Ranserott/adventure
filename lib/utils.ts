import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);
}

export function getGrindLabel(grind: string): string {
  const labels: Record<string, string> = {
    "Whole Bean": "Grano Entero",
    "Espresso": "Molido para Espresso",
    "French Press": "Molido para French Press",
    "Filter": "Molido para Filtro",
  };
  return labels[grind] || grind;
}
