import { Img } from "../data/Img.interface";


export interface Marca {
    id:          number;
    documentId:  string;
    nombre:      string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    img:         Img;
}



