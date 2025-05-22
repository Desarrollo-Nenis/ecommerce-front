import { BACKEND_ROUTES } from "@/contants/backend-routes/routes"
import type { Orders, Datum, SimplifiedOrder } from "@/interfaces/orders/pedido.interface"
import { query } from "@/lib/api/server/strapi"

const BASE_ENDPOINT: string = BACKEND_ROUTES.PAYMENTS

export async function getUserOrders(userId: string | undefined): Promise<SimplifiedOrder[]> {
  try {
    const res = await query<Orders>(`${BASE_ENDPOINT}/user/${userId}`)

    const simplifiedOrders: SimplifiedOrder[] = res.data.map((order: Datum) => ({
      id: order.id,
      orderId: order.orderId,
      createdAt: order.createdAt,
      monto: order.monto,
      moneda: order.moneda,
      estadoPago: order.estadoPago,
      proveedor: order.proveedor,
      providerPaymentId: order.providerPaymentId,
      cliente: order.cliente,
      items: order.metadata.items.map(item => ({
        title: item.title,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    }))

    return simplifiedOrders
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error)
    throw new Error("No se pudieron obtener las órdenes del usuario")
  }
}
