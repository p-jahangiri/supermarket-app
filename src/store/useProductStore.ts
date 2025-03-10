import { create } from "zustand";
import { Product, Category } from "../types";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "../constants/mockData";

interface ProductState {
  products: Product[];
  categories: Category[];
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
}

interface ProductActions {
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  searchProducts: (query: string) => Product[];
  clearError: () => void;
}

interface ProductStore extends ProductState, ProductActions {}

const initialState: ProductState = {
  products: [],
  categories: [],
  featuredProducts: [],
  isLoading: false,
  error: null,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      await new Promise((resolve) => setTimeout(resolve, 500));

      set({
        products: MOCK_PRODUCTS,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Failed to fetch products. Please try again.",
        isLoading: false,
      });
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      set({
        categories: MOCK_CATEGORIES,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Failed to fetch categories. Please try again.",
        isLoading: false,
      });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const featured = MOCK_PRODUCTS.filter((product) => product.featured);

      set({
        featuredProducts: featured,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Failed to fetch featured products. Please try again.",
        isLoading: false,
      });
    }
  },

  getProductById: (id: string) => {
    return get().products.find((product) => product.id === id);
  },

  getProductsByCategory: (categoryId: string) => {
    return get().products.filter(
      (product) => product.category.id === categoryId
    );
  },

  searchProducts: (query: string) => {
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
      return get().products;
    }

    return get().products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        product.category.name.toLowerCase().includes(searchTerm)
    );
  },

  clearError: () => {
    set({ error: null });
  },
}));
