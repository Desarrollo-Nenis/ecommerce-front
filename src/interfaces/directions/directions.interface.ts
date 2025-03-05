export interface Directions {
    id:             number;
    documentId:     string;
    calle:          string;
    ciudad:         string;
    estado:         string;
    codigoPostal:   string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    numeroExterior: string;
    numeroInterior: null;
    referencia:     string;
    usuario:        string;
}

