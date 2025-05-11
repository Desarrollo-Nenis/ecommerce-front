"use client"

import { useState } from "react"
import type { Session } from "next-auth"
import type { Address } from "@/interfaces/directions/directions.interface"
import { Button } from "@/components/ui/button"
import CartStep from "./step-1/cart-step"
import { AddressStep } from "./step-2/address-step"
import { PaymentStep } from "./step-3/payment-form"
import { CheckoutStepper } from "./checkout-stepper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/products-cart.store"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface BasketGridProps {
  session: Session
  addresses: Address[]
}

export function BasketGrid({ session, addresses }: BasketGridProps) {
  const [step, setStep] = useState(1) // ← importante: empieza en 1 para coincidir con el ID del step
  const { getCartSummary } = useCartStore()
  const { subtotal, total, impuestos, envio, finalAmount } = getCartSummary()

  const handleNext = () => {
    if (step < 3) setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1)
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <CartStep />
      case 2:
        return <AddressStep userId={session.user?.user.documentId!} addresses={addresses} />
      case 3:
        return <PaymentStep />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
        <CheckoutStepper currentStep={step} setCurrentStep={setStep} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {renderStepContent()}

          <div className="flex justify-between mt-6">
            {step === 1 ? (
              <Button variant="outline" asChild>
                <Link href="/">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Seguir comprando
                </Link>
              </Button>
            ) : (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                {step === 2 ? "Volver al carrito" : "Volver a la dirección"}
              </Button>
            )}

            <Button onClick={step === 3 ? () => alert("¡Pago completado!") : handleNext}>
              {step === 3 ? "Finalizar pago" : "Continuar"}
              {step !== 3 && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Resumen del pedido - Siempre visible */}
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
                {subtotal > total && (
                  <div className="flex justify-between">
                    <span>Descuento</span>
                    <span>- ${(subtotal - total).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos</span>
                  <span>${impuestos.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
