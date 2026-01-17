/**
 * Global State Management with Zustand
 */

import { create } from "zustand";
import type { User, License } from "./api-client";

interface AuthState {
  user: User | null;
  licenses: License[];
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLicenses: (licenses: License[]) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  licenses: [],
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setLicenses: (licenses) => set({ licenses }),

  setLoading: (loading) => set({ isLoading: loading }),

  login: (user: User) =>
    set({
      user,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      licenses: [],
      isAuthenticated: false,
    }),
}));
