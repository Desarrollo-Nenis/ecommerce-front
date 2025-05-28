import { Address } from "../directions/directions.interface";

export interface Order {
  id:               number;
  documentId:       string;
  estado:           string;
  fechaPedido:      Date;
  provider:         string;
  metadata:         Metadata;
  createdAt:        Date;
  updatedAt:        Date;
  publishedAt:      Date;
  informacionEnvio: InformacionEnvio;
  pagos:            Pago[];
}

export interface InformacionEnvio {
  id:         number;
  esLocal:    boolean;
  costoEnvio: number;
  nota:       null;
  direccion:  Address;
}

export interface Metadata {
  productos:        DetailsProducts[];
  subtotal:         number;
  total:            number;
  informacionEnvio: MetadataInformacionEnvio;
}

export interface MetadataInformacionEnvio {
  esLocal:    boolean;
  costoEnvio: number;
  direccion:  number;
}

export interface DetailsProducts {
  id:                number;
  nombre:            string;
  coverUrl:          string;
  cantidad:          number;
  precioUnitario:    number;
  precioDescuento:   number;
  tipoDescuento:     null;
  descuentoAplicado: number;
}

export interface Pago {
  id:         number;
  documentId: string;
  monto:      number;
  moneda:     string;
  estadoPago: string;
  orderId:    string;
}
