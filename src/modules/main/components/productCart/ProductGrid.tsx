import { Products } from "@/interfaces/products/products.interface"
import { ProductCard } from "./ProductCart"

interface ProductGridProps {
  products: Products[]
}



export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

