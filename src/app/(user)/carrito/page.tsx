"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/products-cart"
import { ChevronLeft, ChevronRight, Minus, Plus, Trash2 } from "lucide-react"
import { CheckoutStepper } from "./checkout-stepper"
import { AddressForm } from "./address-form"
import { PaymentForm } from "./payment-form"

export default function CartPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { cart, loadCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore()

  useEffect(() => {
    loadCart() // Cargar productos del localStorage al montar
  }, [])

  const subtotal = cart.reduce((total, item) => total + item.precioVenta * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.16
  const total = subtotal + shipping + tax

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
        <CheckoutStepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Artículos en tu carrito</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length > 0 ? (
                  <div className="space-y-6">
                    {cart.map((item: any) => (
                      <div key={item.id} className="flex items-start space-x-4">
                        <div className="shrink-0">
                          <Image
                            src={item.coverUrl || "/imgs/products/default-img.png"}
                            alt={item.nombre}
                            width={80}
                            height={80}
                            className="rounded-md border object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">{item.nombre}</h3>
                          <p className="text-sm text-muted-foreground">${item.precioVenta.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">Tu carrito está vacío</p>
                    <Button asChild>
                      <Link href="/">Continuar comprando</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              {cart.length > 0 && (
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Seguir comprando
                    </Link>
                  </Button>
                  <Button onClick={nextStep}>
                    Continuar al pago
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Dirección de envío</CardTitle>
              </CardHeader>
              <CardContent>
                <AddressForm />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Volver al carrito
                </Button>
                <Button onClick={nextStep}>
                  Continuar al pago
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Información de pago</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentForm />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Volver a la dirección
                </Button>
                <Button onClick={() => alert("¡Pago completado! Gracias por tu compra.")}>Finalizar pago</Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
