export interface User {
    id:          number;
    documentId:  string;
    nombre:      string | null;
    apellidos:   string;
    correo:      string | null;
    contrasena:    string;
    rol:         string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    locale:      string;
}

export interface UserToken {
    jwt: string;
    user: User;
  }