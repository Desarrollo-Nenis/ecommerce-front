

export interface Categoria {
    id:             number;
    documentId:     string;
    nombre:         string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    subcategorias?: SubCategoria[];
}


export interface SubCategoria {
    id:             number;
    documentId:     string;
    nombre:         string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
   
}