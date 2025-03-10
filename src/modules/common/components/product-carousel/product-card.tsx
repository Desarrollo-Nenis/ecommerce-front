"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Products } from "@/interfaces/products/products.interface"
import { useCartStore } from "@/store/products-cart"
import Image from "next/image"

interface ProductCardProps {
  product: Products
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore()

  const renderDescription = () => {
    if (!product.descripcion || product.descripcion.length === 0) {
      return "No description available"
    }

    return (
      product.descripcion
        .flatMap((desc) => desc.children)
        .map((child) => child.text)
        .join(" ")
        .substring(0, 100) +
      (product.descripcion
        .flatMap((desc) => desc.children)
        .map((child) => child.text)
        .join(" ").length > 100
        ? "..."
        : "")
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="relative bg-white aspect-square w-full overflow-hidden rounded-t-lg">
        <Image
          src={product.coverUrl || "/placeholder.svg?height=300&width=300"}
          alt={product.nombre}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <h3 className="font-semibold text-lg line-clamp-1">{product.nombre}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{renderDescription()}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="font-bold text-lg">${product.precioVenta.toFixed(2)}</span>
        <Button size="sm" onClick={() => addToCart(product)}>
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
