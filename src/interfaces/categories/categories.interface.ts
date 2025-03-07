import { Img } from "../data/Img.interface";

export interface Categoria {
    id:             number;
    documentId:     string;
    nombre:         string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    subcategorias?: Categoria[];
    img?:           Img;
}

export interface SubCategoria {
    id:             number;
    documentId:     string;
    nombre:         string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    subcategorias?: Categoria[];
    img?:           Img;
}



