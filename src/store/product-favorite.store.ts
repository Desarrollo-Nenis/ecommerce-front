import { create } from "zustand";
import { Products } from "@/interfaces/products/products.interface";
import Swal from "sweetalert2";

// Función para guardar en localStorage
const saveFavoritesToLocalStorage = (favorites: Products[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

interface FavoritesStore {
  favorites: Products[];

  loadFavorites: () => void;
  addFavorite: (product: Products) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number | null) => boolean;
  toggleFavorite: (product: Products) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  loadFavorites: () => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      const parsed: Products[] = JSON.parse(saved);
      set({ favorites: parsed });
    }
  },

  addFavorite: (product) => {
    set((state) => {
      const updatedFavorites = [...state.favorites, product];
      saveFavoritesToLocalStorage(updatedFavorites);

      Swal.fire({
        title: "Favorito añadido",
        text: `${product.nombre} se agregó a tus favoritos.`,
        icon: "success",
        timer: 2000,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
      });

      return { favorites: updatedFavorites };
    });
  },

  removeFavorite: (id) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter((p) => p.id !== id);
      saveFavoritesToLocalStorage(updatedFavorites);

      Swal.fire({
        title: "Favorito eliminado",
        text: `El producto ha sido eliminado de tus favoritos.`,
        icon: "info",
        timer: 2000,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
      });

      return { favorites: updatedFavorites };
    });
  },

  isFavorite: (id) => {
    return get().favorites.some((product) => product.id === id);
  },

  toggleFavorite: (product) => {
    const { isFavorite, addFavorite, removeFavorite } = get();
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  },
}));
