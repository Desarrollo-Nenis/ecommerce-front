import { Products } from "@/interfaces/products/products.interface"
import { ProductCard } from "@/modules/common/components/product-carousel/product-card"

interface ProductGridProps {
  products: Products[]
}



export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div  className="grid grid-cols-3 md:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

