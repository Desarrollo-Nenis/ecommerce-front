// lib/price.ts
import {
  Descuento,
  DescuentoTipo,
  Inventario,
} from "@/interfaces/products/products.interface";



export const isOfertaActiva = (descuento?: Descuento): boolean => {
  if (!descuento || !descuento.activo) return false;

  const now = new Date();
  const fechaInicio = new Date(descuento.fechaInicio);
  const fechaFin = new Date(descuento.fechaFin);

  return now >= fechaInicio && now <= fechaFin;
};



export const getPrecioConDescuento = (
  inventario?: Inventario,
  descuento?: Descuento
): { finalPrice: number | null; hasDiscount: boolean } => {
  if (!inventario?.precioVenta) return { finalPrice: null, hasDiscount: false };

  const basePrice = inventario.precioVenta;
  const showDiscount = isOfertaActiva(descuento);

  if (!showDiscount || !descuento) {
    return { finalPrice: basePrice, hasDiscount: false };
  }

  let discountedPrice = basePrice;

  if (descuento.tipo === DescuentoTipo.PORCENTAJE) {
    discountedPrice = Math.max(
      basePrice - (basePrice * parseFloat(descuento.valor)) / 100,
      0
    );
   
  }

  if (descuento.tipo === DescuentoTipo.MONTO) {
    discountedPrice = Math.max(
      basePrice - parseFloat(descuento.valor),
      0
    );
  }

  return {
    finalPrice: discountedPrice,
    hasDiscount: true,
  };
};



