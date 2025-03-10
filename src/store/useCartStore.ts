import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cart, CartItem, Product } from "../types";

interface CartStore {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const initialState: Cart = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialState,

      addToCart: (product: Product, quantity: number) => {
        const { cart } = get();
        const existingItemIndex = cart.items.findIndex(
          (item) => item.product.id === product.id
        );

        let updatedItems: CartItem[];

        if (existingItemIndex !== -1) {
          // Product already exists in cart, update quantity
          updatedItems = [...cart.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity,
          };
        } else {
          // Add new product to cart
          updatedItems = [...cart.items, { product, quantity }];
        }

        // Calculate new totals
        const totalItems = updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        );

        const totalAmount = updatedItems.reduce(
          (total, item) =>
            total +
            (item.product.discountPrice || item.product.price) * item.quantity,
          0
        );

        set({
          cart: {
            items: updatedItems,
            totalItems,
            totalAmount,
          },
        });
      },

      removeFromCart: (productId: string) => {
        const { cart } = get();
        const updatedItems = cart.items.filter(
          (item) => item.product.id !== productId
        );

        // Calculate new totals
        const totalItems = updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        );

        const totalAmount = updatedItems.reduce(
          (total, item) =>
            total +
            (item.product.discountPrice || item.product.price) * item.quantity,
          0
        );

        set({
          cart: {
            items: updatedItems,
            totalItems,
            totalAmount,
          },
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { cart } = get();

        if (quantity <= 0) {
          // If quantity is 0 or negative, remove the item
          return get().removeFromCart(productId);
        }

        const updatedItems = cart.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );

        // Calculate new totals
        const totalItems = updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        );

        const totalAmount = updatedItems.reduce(
          (total, item) =>
            total +
            (item.product.discountPrice || item.product.price) * item.quantity,
          0
        );

        set({
          cart: {
            items: updatedItems,
            totalItems,
            totalAmount,
          },
        });
      },

      clearCart: () => {
        set({ cart: initialState });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
