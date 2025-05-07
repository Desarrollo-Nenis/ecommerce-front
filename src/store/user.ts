import { create } from "zustand";
import { User } from "@/interfaces/auth/user.interface";
import { getMeInfo } from "@/services/users/users-services";

interface UserState {
  user: User | null;
  loading: boolean;
  setUserFromSession: (sessionUser: { id: string }) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,

  setUserFromSession: async (sessionUser) => {
    if (!sessionUser?.id) {
      set({ user: null });
      return;
    }
  
    let currentUser: User | null;
    set((state) => {
      currentUser = state.user;
      return {};
    });
  
    if (currentUser?.id === sessionUser.id) {
      return;
    }
  
    set({ loading: true });
    try {
      const fullUser = await getMeInfo(sessionUser.id);
      set({ user: fullUser });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  }
  
}));
