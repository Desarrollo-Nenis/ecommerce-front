

export interface InformacionTienda {
    id:          number;
    documentId:  string;
    nombre:      string;
    numero:      null;
    correo:      null;
    direccion:   null;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    logo:        Logo;
}

export interface Logo {
    id:                number;
    documentId:        string;
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           null;
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
