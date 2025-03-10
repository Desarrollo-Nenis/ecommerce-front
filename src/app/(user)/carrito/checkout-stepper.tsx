"use client"

import { Check } from "lucide-react"

interface CheckoutStepperProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export function CheckoutStepper({ currentStep, setCurrentStep }: CheckoutStepperProps) {
  const steps = [
    { id: 1, name: "Carrito" },
    { id: 2, name: "Dirección" },
    { id: 3, name: "Pago" },
  ]

  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <button
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step.id < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : step.id === currentStep
                    ? "border-primary bg-background text-foreground"
                    : "border-muted-foreground/30 bg-background text-muted-foreground"
              } ${step.id < currentStep ? "cursor-pointer" : step.id > currentStep ? "cursor-not-allowed" : ""}`}
              disabled={step.id > currentStep}
            >
              {step.id < currentStep ? <Check className="h-5 w-5" /> : <span>{step.id}</span>}
            </button>
            <span
              className={`mt-2 text-sm font-medium ${
                step.id === currentStep ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Línea conectora */}
      <div className="absolute top-5 left-0 right-0 h-[2px] -translate-y-1/2">
        <div className="mx-auto h-full w-[calc(100%-5rem)] bg-muted-foreground/30">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

