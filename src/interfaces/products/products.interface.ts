import { Categoria } from "../categories/categories.interface";
import { Marca } from "../marcas/marca.interface";



export interface Producto {
    id: number;
    nombre: string;
    slug: string;
    descripcion: Descripcion[]; // blocks (puede ser más específico según el editor usado)
    categorias: Categoria[];    
    marca?: Marca;
    inventario: Inventario;
    tipo: 'simple' | 'variante' | 'base';
    variantes: Producto[];
    principal?: Producto;
    atributos?: AtributoSeleccionado[];
    descuento?: Descuento;
    cover?: string; // URL de la imagen
    galeria: string[]; // URLs
    coverUrl: string
    galleryUrls?: string[]
  }
  export interface Inventario {
    stock: string;
    precioCompra: string;
    precioVenta: string;
  }
  export interface GrupoAtributo {
    id: number;
    nombre: string;
    slug: string;
  }

  export interface AtributoSeleccionado {
    id: number;
    tipoAtributo: GrupoAtributo;
    valor: string;
  }

  export interface Descuento {
    id: number;
    activo: boolean;
    tipo: '$' | '%';
    fechaInicio: string;
    fechaFin: string;
    valor: string;
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
    id:            number;
    documentId:    string;
    nombre?:       string;
    createdAt:     Date;
    updatedAt:     Date;
    publishedAt:   Date;
    nombreUnidad?: string;
}

export interface Cover {
    id:                number;
    documentId:        string;
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           Formats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
}

export interface Formats {
    thumbnail: Medium;
    small:     Medium;
    medium:    Medium;
}

export interface Medium {
    name:        string;
    hash:        string;
    ext:         string;
    mime:        string;
    path:        null;
    width:       number;
    height:      number;
    size:        number;
    sizeInBytes: number;
    url:         string;
}

export interface Descripcion {
    type:     string;
    children: Child[];
}

export interface Child {
    type: string;
    text: string;
}
