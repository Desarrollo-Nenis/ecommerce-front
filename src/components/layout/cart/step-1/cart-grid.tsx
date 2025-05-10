"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/products-cart.store";
import { Session } from "next-auth";
import { Address } from "@/interfaces/directions/directions.interface";

export default function CartStep() {
  const {
    cart,
    getCartSummary,
    loadCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore();

  const { subtotal, total, impuestos, envio, finalAmount } = getCartSummary();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Productos del carrito */}
      <div className="lg:col-span-2 space-y-4">
        {cart.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Tu carrito está vacío
          </p>
        ) : (
          cart.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.inventario?.precioVenta?.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 ml-4"
                  >
                    Eliminar
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
