import { Img } from "../data/img.interface";

export interface Categoria {
    id:             number;
    documentId:     string;
    nombre:         string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    subcategorias?: SubCategoria[];
    img?:           Img;
}

export interface SubCategoria {
    id:             number;
    documentId:     string;
    nombre:         string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    img?:           Img;
}



