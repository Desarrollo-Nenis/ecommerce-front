import { Products } from "@/interfaces/products/products.interface";
import Image from "next/image";

interface ProductCardProps {
  product: Products;
  onImageClick: (imageUrl: string) => void;
  isSelected : boolean
}

export const ProductCardC2 = ({ product, onImageClick, isSelected}: ProductCardProps) => {
  return (
    <div className={`cardCaroucelC2 ${isSelected ? "selected" : ""}`} onMouseEnter={(e) => onImageClick(product.coverUrl)}>
      <Image
        src={product?.coverUrl || "/imgs/products/default-img.png"}
        alt={product.nombre}
        width={300}
        height={300}
        draggable={false}
      />
    </div>
  )
}