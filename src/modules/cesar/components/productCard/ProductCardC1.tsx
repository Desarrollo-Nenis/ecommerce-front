import { Products } from "@/interfaces/products/products.interface";
import Image from "next/image";

interface ProductCardProps {
  product: Products;
}

export const ProductCardC1 = ({ product }: ProductCardProps) => {
  return (
    <div className="cardCaroucelC1">
      <Image
        src={product?.coverUrl || "/imgs/products/default-img.png"}
        alt={product.nombre}
        width={300}
        height={300}
        draggable={false}
      />
      <h3>
        {product.nombre}
      </h3>
      <p>
        {product.descripcion[0]?.children[0]?.text || "Sin descripción"}
      </p>
    </div>
  )
}
