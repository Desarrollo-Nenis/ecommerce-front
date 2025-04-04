import { Img } from "../data/Img.interface";


export interface Marca {
    coverUrl: string;
    id:          number;
    documentId:  string;
    nombre:      string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    img?:         Img;
}



