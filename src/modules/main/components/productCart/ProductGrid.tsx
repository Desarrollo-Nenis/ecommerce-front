import { Products } from "@/interfaces/products/products.interface"
import { ProductCard } from "./ProductCart"

interface ProductGridProps {
  products: Products[]
}



export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div  className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

