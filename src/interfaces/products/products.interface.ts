import { Categoria } from "../categories/categories.interface";
import { Img } from "../data/img.interface";
import { Marca } from "../marcas/marca.interface";

export interface Products {
  id: number;
  nombre: string;
  slug: string;
  descripcion: Descripcion[]; // blocks (puede ser más específico según el editor usado)
  categorias: Categoria[];
  marca?: Marca;
  inventario?: Inventario;
  tipo:ProductType;
  variantes: Products[];
  principal?: Products;
  atributos?: AtributoSeleccionado[];
  descuento?: Descuento;
  cover?: Img; // URL de la imagen
  galeria: Img[]; // URLs
  coverUrl: string;
  galleryUrls?: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export enum ProductType {
  SIMPLE = "simple",
  BASE = "base",
  VARIANT = "variante",
}


export interface Inventario {
  stock: number;
  precioCompra: number;
  precioVenta: number;
}
export interface GrupoAtributo {
  id?: number;
  nombre: string;
  values?: string[];
}

export interface AtributoSeleccionado {
  id: number;
  tipoAtributo: string;
  valor: string;
}

export interface Descuento {
  id: number;
  activo: boolean;
  tipo: DescuentoTipo;
  fechaInicio: string;
  fechaFin: string;
  valor: string;
}
export enum DescuentoTipo {
  PORCENTAJE = "%",
  MONTO = "$",
}

// export interface Products {
//     id:             number;
//     documentId:     string;
//     nombre:         string;
//     descripcion:    Descripcion[];
//     createdAt:      Date;
//     updatedAt:      Date;
//     publishedAt:    Date;
//     precioUnitario: number;
//     precioVenta:    number;
//     categorias:     Categoria[];
//     subcategorias:     SubCategoria[];
//     // unidad_medida:  UnidadMedida;
//     cover?:          Cover;
//     galeria?:        Cover[];
//     coverUrl: string
//     galleryUrls?: string[]
// }

export interface UnidadMedida {
  id: number;
  documentId: string;
  nombre?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  nombreUnidad?: string;
}

export interface Descripcion {
  type: string;
  children: Child[];
}

export interface Child {
  type: string;
  text: string;
}
