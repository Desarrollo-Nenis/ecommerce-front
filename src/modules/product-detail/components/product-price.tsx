// componentes/ProductPrice.tsx
import { Inventario, Descuento } from "@/interfaces/products/products.interface";
import { formatCurrency } from "@/lib/formatCurrency";
import { getPrecioConDescuento } from "@/lib/price-descuento";

interface ProductPriceProps {
  inventario?: Inventario;
  descuento?: Descuento;
}

export const ProductPriceDetail = ({ inventario, descuento }: ProductPriceProps) => {
  const { finalPrice, hasDiscount } = getPrecioConDescuento(inventario, descuento);

  if (finalPrice === null) return null;

  return (
    <div className="flex items-baseline gap-4">
      <span className="text-3xl font-bold text-primary">
        {formatCurrency(finalPrice)}
      </span>
      {hasDiscount && (
        <span className="text-xl text-muted-foreground line-through">
          {formatCurrency(inventario!.precioVenta)}
        </span>
      )}
    </div>
  );
};
