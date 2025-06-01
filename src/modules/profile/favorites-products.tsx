"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react"

export function ProductosFavoritos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Productos favoritos</CardTitle>
        <CardDescription>Productos que has guardado para ver más tarde</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductGrid />
      </CardContent>
    </Card>
  )
}

function ProductGrid() {
  // Datos de ejemplo para productos favoritos
  const favoritos = [
    {
      id: 1,
      nombre: "Taladro Percutor Profesional",
      precio: "$2,199.00",
      precioAnterior: "$2,499.00",
      imagen: "/imgs/products/default-img.png?height=200&width=200",
      calificacion: 4.8,
      enOferta: true,
      stock: true,
    },
    {
      id: 2,
      nombre: "Set de Herramientas 150 piezas",
      precio: "$1,850.00",
      precioAnterior: "$2,100.00",
      imagen: "/imgs/products/default-img.png?height=200&width=200",
      calificacion: 4.5,
      enOferta: true,
      stock: true,
    },
    {
      id: 3,
      nombre: "Escalera Telescópica de Aluminio",
      precio: "$3,450.00",
      precioAnterior: null,
      imagen: "/imgs/products/default-img.png?height=200&width=200",
      calificacion: 4.2,
      enOferta: false,
      stock: false,
    },
    {
      id: 4,
      nombre: "Compresor de Aire 50L",
      precio: "$4,299.00",
      precioAnterior: "$4,899.00",
      imagen: "/imgs/products/default-img.png?height=200&width=200",
      calificacion: 4.7,
      enOferta: true,
      stock: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {favoritos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

function ProductCard({ producto }) {
  return (
    <div className="border rounded-lg overflow-hidden group relative">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 text-rose-500 hover:bg-white hover:text-rose-600"
        >
          <Heart className="h-4 w-4 fill-current" />
        </Button>
      </div>

      {producto.enOferta && <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">Oferta</Badge>}

      <div className="aspect-square relative overflow-hidden">
        <img
          src={producto.imagen || "/imgs/products/default-img.png"}
          alt={producto.nombre}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>

      <div className="p-3 space-y-2">
        <h3 className="font-medium text-sm line-clamp-2">{producto.nombre}</h3>

        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs">{producto.calificacion}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-sm">{producto.precio}</div>
            {producto.precioAnterior && (
              <div className="text-xs line-through text-muted-foreground">{producto.precioAnterior}</div>
            )}
          </div>

          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-8 w-8" disabled={!producto.stock}>
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!producto.stock && <div className="text-xs text-red-500">Agotado</div>}
      </div>
    </div>
  )
}
