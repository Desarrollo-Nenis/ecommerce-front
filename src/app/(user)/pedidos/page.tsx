import { OrdersClient } from "@/components/layout/orders/orders-client"

export default async function PedidosPage() {
  const pedidos = await getPedidos()

  return <OrdersClient initialPedidos={pedidos} />
}

async function getPedidos() {
  return [
    {
      id: "ORD-1234",
      fecha: "2023-12-15",
      estado: "entregado",
      total: 125.99,
      productos: [
        { id: 1, nombre: "Camiseta Básica", cantidad: 2, precio: 29.99, imagen: "/placeholder.svg?height=80&width=80" },
        {
          id: 2,
          nombre: "Pantalón Vaquero",
          cantidad: 1,
          precio: 65.99,
          imagen: "/placeholder.svg?height=80&width=80",
        },
      ],
      direccion: "Calle Principal 123, Ciudad",
    },
    {
      id: "ORD-5678",
      fecha: "2024-01-20",
      estado: "en camino",
      total: 89.95,
      productos: [
        {
          id: 3,
          nombre: "Zapatillas Deportivas",
          cantidad: 1,
          precio: 89.95,
          imagen: "/placeholder.svg?height=80&width=80",
        },
      ],
      direccion: "Avenida Central 456, Ciudad",
    },
    {
      id: "ORD-9012",
      fecha: "2024-02-05",
      estado: "procesando",
      total: 215.97,
      productos: [
        {
          id: 4,
          nombre: "Chaqueta de Invierno",
          cantidad: 1,
          precio: 129.99,
          imagen: "/placeholder.svg?height=80&width=80",
        },
        { id: 5, nombre: "Bufanda de Lana", cantidad: 1, precio: 25.99, imagen: "/placeholder.svg?height=80&width=80" },
        {
          id: 6,
          nombre: "Guantes Térmicos",
          cantidad: 1,
          precio: 19.99,
          imagen: "/placeholder.svg?height=80&width=80",
        },
        { id: 7, nombre: "Gorro de Punto", cantidad: 1, precio: 15.99, imagen: "/placeholder.svg?height=80&width=80" },
        {
          id: 8,
          nombre: "Calcetines Térmicos",
          cantidad: 2,
          precio: 11.99,
          imagen: "/placeholder.svg?height=80&width=80",
        },
      ],
      direccion: "Plaza Mayor 789, Ciudad",
    },
  ]
}
