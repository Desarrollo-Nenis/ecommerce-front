

export interface Marca {
    id:          number;
    documentId:  string;
    nombre:      string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    img:         Img;
}

export interface Img {
    id:                number;
    documentId:        string;
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           Formats;
    hash:              string;
    ext:               EXT;
    mime:              MIME;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
}

export enum EXT {
    Jpg = ".jpg",
    PNG = ".png",
}

export interface Formats {
    thumbnail: Large;
    small?:    Large;
    large?:    Large;
    medium?:   Large;
}

export interface Large {
    name:        string;
    hash:        string;
    ext:         EXT;
    mime:        MIME;
    path:        null;
    width:       number;
    height:      number;
    size:        number;
    sizeInBytes: number;
    url:         string;
}

export enum MIME {
    ImageJPEG = "image/jpeg",
    ImagePNG = "image/png",
}



