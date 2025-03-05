import { Meta } from "../data/pagination.interface";

export interface DataUser {
    data: User[];
    meta: Meta;
}

export interface User {
    id:          number;
    documentId:  string;
    nombre:      string;
    apellidos:   string;
    correo:      string;
    rol:         string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
}


