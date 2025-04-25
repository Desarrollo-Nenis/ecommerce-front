import { Categoria, SubCategoria } from "../categories/categories.interface";


export interface Products {
    id:             number;
    documentId:     string;
    nombre:         string;
    descripcion:    Descripcion[];
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    precioUnitario: number;
    precioVenta:    number;
    categorias:     Categoria[];
    subcategorias:     SubCategoria[];
    unidad_medida:  UnidadMedida;
    cover?:          Cover;
    galeria?:        Cover[];
    coverUrl: string
    galleryUrls?: string[]
}

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
