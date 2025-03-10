import { create } from "zustand";
import Swal from "sweetalert2";
import { Products } from "@/interfaces/products/products.interface";

interface CartItem extends Products {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  loadCart: () => void;
  addToCart: (product: Products) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  // CARGAR EL CARRITO
  loadCart: () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const loadedCart = JSON.parse(savedCart).map((item: any) => ({
        ...item,
        precio: item.precio || 0,
      }));
      
      set({ cart: loadedCart });
    }
  },

  // AGREGAR PRODUCTO AL CARRITO
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);

      let updatedCart;

      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }];
      }

      // Guardar el carrito actualizado en localStorage
      saveCartToLocalStorage(updatedCart);

      Swal.fire({
        title: "Producto añadido",
        text: `${product.nombre} se agregó al carrito.`,
        icon: "success",
        timer: 2000,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
      });

      return { cart: updatedCart };
    }
  ),

  // INCREMENTAR CANTIDAD DEL PRODUCTO
  increaseQuantity: (id) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      // Guardar el carrito actualizado en localStorage
      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }
  ),

  // DECREMENTAR CANTIDAD DEL PRODUCTO 
  decreaseQuantity: (id) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      // Guardar el carrito actualizado en localStorage
      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }
  ),

  // ELIMINAR POR COMPLETO EL PRODUCTO DEL CARRITO
  removeFromCart: (id) =>
    set((state) => {
      const productToRemove = state.cart.find((item) => item.id === id);

      if (!productToRemove) return state;

      Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Quieres eliminar "${productToRemove.nombre}" del carrito?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedCart = state.cart.filter((item) => item.id !== id);
          saveCartToLocalStorage(updatedCart);

          Swal.fire({
            title: "Producto eliminado",
            text: `"${productToRemove.nombre}" ha sido eliminado del carrito.`,
            icon: "success",
            timer: 2000,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
          });

          set({ cart: updatedCart });
        }
      });

      return state;
    }
  ),
}));
