export interface Producto {
  id: number
  nombre: string
  cantidad: number
  precio: number
  imagen: string
}

export interface Pedido {
  id: string
  fecha: string
  estado: string
  total: number
  productos: Producto[]
  direccion: string
}
