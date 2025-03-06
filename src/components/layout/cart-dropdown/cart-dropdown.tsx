"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Tipo para los artículos del carrito
type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const CartContent = ({ cartItems }: { cartItems: CartItem[] }) => {
  // Calcular el total del carrito
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Mi Carrito</h4>
        <span className="text-sm text-muted-foreground">{cartItems.length} artículos</span>
      </div>

      <Separator />

      {cartItems.length > 0 ? (
        <div className="max-h-[250px] overflow-auto space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-md border"
              />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{item.name}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {item.quantity} x ${item.price.toFixed(2)}
                  </span>
                  <span>${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center">
          <p className="text-muted-foreground">Tu carrito está vacío</p>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <Separator />
          <div className="flex items-center justify-between font-medium">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </>
      )}

      <Button asChild className="w-full">
        <Link href="/carrito">Ir al carrito</Link>
      </Button>
    </div>
  )
}

export default function CartDropdown() {
  const [isMobile, setIsMobile] = useState(false)

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Producto 1",
      price: 1,
      quantity: 1,
      image: "/imgs/products/default-img.png?height=50&width=50",
    },
    {
      id: "2",
      name: "Producto 2",
      price: 2,
      quantity: 1,
      image: "/imgs/products/default-img.png?height=50&width=50",
    },
    {
      id: "3",
      name: "Producto 3",
      price: 3,
      quantity: 1,
      image: "/imgs/products/default-img.png?height=50&width=50",
    },
  ])

  // Detectar si es celular o desktop
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()

    // Comprobar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // badge del carrito con los artículos
  const CartIcon = () => (
    <div className="relative">
      <ShoppingCart className="h-6 w-6" />
      <span className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
        {cartItems.length}
      </span>
    </div>
  )

  // Renderizar componente diferente según el dispositivo
  if (isMobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <CartIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-4">
          <CartContent cartItems={cartItems} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CartIcon />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4" align="end">
        <CartContent cartItems={cartItems} />
      </HoverCardContent>
    </HoverCard>
  )
}