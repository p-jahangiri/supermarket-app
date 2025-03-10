import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Address } from "../types";
import { MOCK_USER } from "../constants/mockData";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  updateAddress: (address: Address) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

interface UserStore extends UserState, UserActions {}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // In a real app, this would be an API call
          // For now, we'll simulate a login with mock data
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (email === MOCK_USER.email && password === "password") {
            set({
              user: MOCK_USER,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              error: "Invalid email or password",
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            error: "Login failed. Please try again.",
            isLoading: false,
          });
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // In a real app, this would be an API call
          // For now, we'll simulate registration
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const newUser: User = {
            ...MOCK_USER,
            id: "user" + Date.now(),
            name,
            email,
          };

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: "Registration failed. Please try again.",
            isLoading: false,
          });
        }
      },

      logout: () => {
        set(initialState);
      },

      updateProfile: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });

        try {
          // In a real app, this would be an API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const { user } = get();

          if (!user) {
            throw new Error("User not found");
          }

          const updatedUser = {
            ...user,
            ...userData,
          };

          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: "Failed to update profile. Please try again.",
            isLoading: false,
          });
        }
      },

      updateAddress: async (address: Address) => {
        set({ isLoading: true, error: null });

        try {
          // In a real app, this would be an API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const { user } = get();

          if (!user) {
            throw new Error("User not found");
          }

          const updatedUser = {
            ...user,
            address,
          };

          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: "Failed to update address. Please try again.",
            isLoading: false,
          });
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });

        try {
          // In a real app, this would be an API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Simulate password reset
          if (email === MOCK_USER.email) {
            set({ isLoading: false });
            return;
          }

          throw new Error("Email not found");
        } catch (error) {
          set({
            error: "Failed to reset password. Please try again.",
            isLoading: false,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
