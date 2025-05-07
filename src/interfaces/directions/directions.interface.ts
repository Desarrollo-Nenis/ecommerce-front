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
    nombreRecibe: string;
    // Campos adicionales que pueden no venir de la API pero son necesarios para la interfaz
    userId?: string | number;
    principal?: boolean;
  }
  
  export interface ApiResponse {
    data: Address;
    meta: Record<string, any>;
  }