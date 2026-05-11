"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { TI30XSCalculator } from "./TI30XSCalculator";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CalculatorModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 animate-fade-in">
        <button
          onClick={onClose}
          aria-label="Close calculator"
          className="absolute -top-3 -right-3 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-redhawks-gray-800 text-redhawks-gray-300 hover:bg-redhawks-red hover:text-white transition-colors shadow-lg"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <TI30XSCalculator />
      </div>
    </div>
  );
}
