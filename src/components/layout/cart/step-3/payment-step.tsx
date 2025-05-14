"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CreditCard, ExternalLink, Loader2, AlertCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Payment, PaymentRequest, PaymentItem } from "@/interfaces/payment/payments"
import { createPayment } from "@/services/payments/payments"
import { useCartStore } from "@/store/products-cart.store"
import { showToastAlert } from "@/components/ui/altertas/toast"

const formSchema = z.object({
  paymentProvider: z.enum(["STRIPE", "MERCADO_PAGO"], {
    required_error: "Por favor selecciona un método de pago",
  }),
})

export function PaymentStep({ items }: { items: PaymentItem[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const [sanitizedItems, setSanitizedItems] = useState<PaymentItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()
  const { getCartSummary } = useCartStore()
  const { impuestos, envio, finalAmount } = getCartSummary()

  // Sanitizar los items al cargar el componente
  useEffect(() => {
    try {
      // Asegurarse de que todos los campos existan y sean del tipo correcto
      const sanitized = items.map((item) => ({
        id: item.id,
        title: item.title,
        description: typeof item.description === "string" ? item.description : `${item.title} - Producto`,
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentProvider: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      setError(null)

      // Crear un item adicional para los impuestos si son mayores a 0
      const taxItem: PaymentItem | null =
        impuestos > 0
          ? {
              id: "tax",
              title: "Impuestos",
              description: "Impuestos aplicados a la compra",
              quantity: 1,
              unitPrice: impuestos,
            }
          : null

      // Crear un item adicional para el envío si es mayor a 0
      const shippingItem: PaymentItem | null =
        envio > 0
          ? {
              id: "shipping",
              title: "Costo de envío",
              description: "Costo de envío de los productos",
              quantity: 1,
              unitPrice: envio,
            }
          : null

      // Combinar los items del carrito con los items de impuestos y envío
      const allItems = [...sanitizedItems, ...(taxItem ? [taxItem] : []), ...(shippingItem ? [shippingItem] : [])]

      const paymentRequest: PaymentRequest = {
        currency: "MXN",
        description: "Compra de productos",
        callbackUrl: "http://localhost:3000/pedidos",
        provider: values.paymentProvider,
        items: allItems,
        totalAmount: finalAmount,
      }

      const userId = session?.user?.user?.documentId
      const userEmail = session?.user?.user.email
      const payment: Payment = await createPayment(paymentRequest, userId, userEmail!)

      setPaymentUrl(payment.redirectUrl)

      showToastAlert({
        title: "Pago creado correctamente",
        text: "Haz clic en el botón para completar tu pago",
        icon: "success",
        position: "top-end",
        toast: true,
      })
    } catch (error) {
      console.error("Error al crear el pago:", error)
      setError(error instanceof Error ? error.message : "Error desconocido al procesar el pago")

      showToastAlert({
        title: "Error al procesar el pago",
        text:
          error instanceof Error ? error.message : "Ocurrió un error al crear el pago. Por favor, intenta nuevamente.",
        icon: "error",
        position: "top-end",
        toast: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Método de pago</h2>
        <p className="text-sm text-muted-foreground">
          Selecciona tu método de pago preferido. Serás redirigido a la plataforma del proveedor para completar el pago
          de forma segura.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {paymentUrl ? (
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              Tu pago ha sido creado. Haz clic en el botón a continuación para ser redirigido a la plataforma de pago
              donde podrás ingresar los datos de tu tarjeta de forma segura.
            </AlertDescription>
          </Alert>
          <Button className="w-full" onClick={() => window.open(paymentUrl, "_blank")} variant="default">
            Completar pago <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <div className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                        <RadioGroupItem value="STRIPE" id="stripe" />
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-md">
                            <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                          </div>
                          <div>
                            <label htmlFor="stripe" className="font-medium cursor-pointer">
                              Stripe
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Paga con tarjeta de crédito o débito a través de Stripe
                            </p>
                          </div>
                        </div>
                        <img src="https://freelogopng.com/images/all_img/1685814539stripe-icon-png.png?height=30&width=50" alt="Stripe" className="h-8" />
                      </div>

                      <div className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                        <RadioGroupItem value="MERCADO_PAGO" id="mercadopago" />
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <label htmlFor="mercadopago" className="font-medium cursor-pointer">
                              Mercado Pago
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Paga con tarjeta de crédito, débito o saldo de Mercado Pago
                            </p>
                          </div>
                        </div>
                        <img src="https://logowik.com/content/uploads/images/mercado-pago3162.logowik.com.webp?height=30&width=50" alt="Mercado Pago" className="h-8" />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isLoading || sanitizedItems.length === 0}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando
                  </>
                ) : (
                  "Continuar con el pago"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
