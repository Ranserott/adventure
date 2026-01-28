"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface GrindSelectorProps {
  grindOptions: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function GrindSelector({ grindOptions, value, onChange }: GrindSelectorProps) {
  const grindLabels: Record<string, string> = {
    "Whole Bean": "Grano Entero",
    "Espresso": "Espresso",
    "French Press": "French Press",
    "Filter": "Filtro",
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-primary">Molienda</label>
      <div className="flex flex-wrap gap-2">
        {grindOptions.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors border-2",
              value === option
                ? "border-secondary bg-secondary text-primary"
                : "border-neutral/30 text-primary hover:border-secondary/50"
            )}
          >
            {grindLabels[option] || option}
          </button>
        ))}
      </div>
    </div>
  );
}
