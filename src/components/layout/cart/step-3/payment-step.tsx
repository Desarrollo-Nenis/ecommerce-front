"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CreditCard, AlertCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Payment, PaymentRequest, PaymentItem } from "@/interfaces/payment/payments.interface"
import { createPayment } from "@/services/payments/payments-services"
import { useCartStore } from "@/store/products-cart.store"
import { showToastAlert } from "@/components/ui/altertas/toast"
import { formSchema } from "./schema"
import { generatePaymentDescription } from "@/lib/generateDescription"
import { FRONTEND_ROUTES } from '../../../../contants/frontend-routes/routes';
import Image from "next/image"

type PaymentStepProps = {
  items: PaymentItem[]
}




export const PaymentStep = forwardRef<
  { handleSubmit: () => void },
  PaymentStepProps
>(({ items }, ref) => {

  
  const [isLoading, setIsLoading] = useState(false)
  const [sanitizedItems, setSanitizedItems] = useState<PaymentItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()
  const { getCartSummary } = useCartStore()
  const { subtotal,total } = getCartSummary()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentProvider: undefined,
    },
  })

  useEffect(() => {
    try {
      const sanitized = items.map((item) => ({
        id: item.id,
        title: item.title,
        description: typeof item.description === "string"
          ? item.description
          : `${item.title} - Producto`,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }))
      setSanitizedItems(sanitized)
      setError(null)
    } catch (err) {
      console.error("Error al sanitizar items:", err)
      setError("Error al procesar los productos del carrito")
    }
  }, [items])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      setError(null)
      const allItems = [
        ...sanitizedItems,
      
      ]

      const paymentRequest: PaymentRequest = {
        currency: "MXN",
        description: generatePaymentDescription(allItems),
        callbackUrl: FRONTEND_ROUTES.CALLBACK,
        provider: values.paymentProvider,
        items: allItems,
        totalAmount: total,
      }

      const userId = session?.user?.user?.documentId
      const userEmail = session?.user?.user.email
      const payment: Payment = await createPayment(paymentRequest, userId, userEmail!)

      window.open(payment.redirectUrl)
    } catch (error) {
      console.error("Error al crear el pago:", error)
      setError(
        error instanceof Error
          ? error.message
          : "Error desconocido al procesar el pago"
      )
      showToastAlert({
        title: "Error al procesar el pago",
        text:
          error instanceof Error
            ? error.message
            : "Ocurrió un error al crear el pago. Por favor, intenta nuevamente.",
        icon: "error",
        position: "top-end",
        toast: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({
    handleSubmit: async () => {
      return await form.handleSubmit(onSubmit)()
    },
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Método de pago</h2>
        <p className="text-sm text-muted-foreground">
          Selecciona tu método de pago preferido. Serás redirigido a la
          plataforma del proveedor para completar el pago de forma segura.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="paymentProvider"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                  >
                    <label
                      htmlFor="stripe"
                      className="flex items-center space-x-3 border rounded-md p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value="STRIPE" id="stripe" />
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-md">
                          <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                        </div>
                        <div>
                          <p className="font-medium">Stripe</p>
                          <p className="text-sm text-muted-foreground">
                            Paga con tarjeta de crédito o débito a través de Stripe
                          </p>
                        </div>
                      </div>
                      <Image
                        src="/icons/stripe.webp"
                        alt="Stripe"
                        width={32}
                        height={32}
                        className="h-8"
                      />
                    </label>

                    <label
                      htmlFor="mercadopago"
                      className="flex items-center space-x-3 border rounded-md p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value="MERCADO_PAGO" id="mercadopago" />
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                          <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="font-medium">Mercado Pago</p>
                          <p className="text-sm text-muted-foreground">
                            Paga con tarjeta de crédito, débito o saldo de Mercado Pago
                          </p>
                        </div>
                      </div>
                      <Image
                        src="/icons/mercado-pago.webp"
                        alt="Mercado Pago"
                        width={40}
                        height={30}
                        className="h-8"
                      />
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
        </form>
      </Form>
    </div>
  )
})

PaymentStep.displayName = "PaymentStep"

