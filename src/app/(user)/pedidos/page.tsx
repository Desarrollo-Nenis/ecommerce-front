import { auth } from "@/auth";
import { OrdersClient } from "@/components/layout/orders/orders-client"
import { getUserOrders } from "@/services/orders/orders-services";

export default async function PedidosPage() {
  const session = await auth();
  const orders = await getUserOrders( session?.user?.user.id )

  return <OrdersClient initialPedidos={orders.data} />
}
