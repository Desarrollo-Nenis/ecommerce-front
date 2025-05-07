export interface Address {
    id: number;
    documentId: string;
    calle: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    publishedAt: Date | string;
    numeroExterior: string;
    numeroInterior: string | null;
    referencia: string | null;
    usuario?: string;
    // Campos adicionales que pueden no venir de la API pero son necesarios para la interfaz
    userId?: string | number;
    isPrimary?: boolean;
  }
  
  export interface User {
    id: number | string;
    documentId: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    publishedAt: string | Date;
    name: string | null;
    lastName: string | null;
    role: string;
    email: string;
    authProvider: string;
    direccions: Address[];
  }
  
  export interface ApiResponse {
    data: User;
    meta: Record<string, any>;
  }