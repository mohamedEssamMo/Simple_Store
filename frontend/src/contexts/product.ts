import { create } from "zustand";
import type { Product } from "../types";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (newProduct: Product) => Promise<{ success: boolean; message: string }>;
  deleteProduct: (pid: string) => Promise<{ success: boolean; message: string }>;
  updateProduct: (pid: string, updatedProduct: Product) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),

  createProduct: async (newProduct: Product) => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
      return { success: false, message: "All fields are required." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully." };
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
      return { success: true, message: "Products fetched successfully." };
    } catch (error) {
      return { success: false, message: "Failed to fetch products." };
    }
  },

  deleteProduct: async (pid: string) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Failed to delete product." };
    }
  },

  updateProduct: async (pid: string, updatedProduct: Product) => {
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.description || !updatedProduct.image) {
      return { success: false, message: "All fields are required." };
    }
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Failed to update product." };
    }
  },
}));
