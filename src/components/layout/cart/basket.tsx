"use client"

import { useState } from "react"
import { Session } from "next-auth"
import { Address } from "@/interfaces/directions/directions.interface"
import { Button } from "@/components/ui/button"
import CartStep from "./step-1/cart-grid"
import { AddressStep } from "./step-2/address-step"
import { PaymentStep } from "./step-3/payment-form"
import { CheckoutStepper } from "./checkout-stepper"

interface BasketGridProps {
  session: Session
  addresses: Address[]
}

export function BasketGrid({ session, addresses }: BasketGridProps) {
  const [step, setStep] = useState(1) // ← importante: empieza en 1 para coincidir con el ID del step

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
        return <AddressStep addresses={addresses} />
      case 3:
        return <PaymentStep />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <CheckoutStepper currentStep={step} setCurrentStep={setStep} />

      <div className="min-h-[300px]">{renderStepContent()}</div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          Anterior
        </Button>

        <Button onClick={handleNext}>
          {step === 3 ? "Pagar" : "Siguiente"}
        </Button>
      </div>
    </div>
  )
}
