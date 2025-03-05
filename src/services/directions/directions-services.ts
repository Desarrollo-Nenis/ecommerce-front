import { DataResponse } from "@/interfaces/data/response.interface";
import { Directions } from "@/interfaces/directions/directions.interface";
import { query } from "@/lib/api/server/strapi";


const BASE_ENDPOINT: string = "direccions"

// Obtener direcciones de un usuario específico
export function getUserDirections(userId: string): Promise<DataResponse<Directions>> {

    const queryDireccions: string = `${BASE_ENDPOINT}?filters[usuario][documentId][$eq]=${userId}&populate=*&fields[0]=id&fields[1]=documentId&fields[2]=calle&fields[3]=ciudad&fields[4]=estado&fields[5]=codigoPostal&fields[6]=createdAt&fields[7]=updatedAt&fields[8]=numeroExterior&fields[9]=numeroInterior&fields[10]=referencia`;
    
  if (!userId) {
    return Promise.reject(new Error("User documentId is required."));
  }

  return query<DataResponse<Directions>>(queryDireccions)
    .then((res) => res)
    .catch((error) => {
      console.error("Error fetching user directions:", error);
      throw new Error("Failed to fetch user directions.");
    });
}

// Crear una nueva dirección
export function createDirection(data: Directions): Promise<Directions> {
  if (
    !data ||
    !data.calle ||
    !data.ciudad ||
    !data.estado ||
    !data.codigoPostal ||
    !data.numeroExterior ||
    !data.numeroInterior ||
    !data.referencia ||
    !data.usuario
  ) {
    return Promise.reject(new Error("All required fields must be provided."));
  }

  return query<Directions>(
      `${BASE_ENDPOINT}`, 
       {
        method: "POST",
        body: JSON.stringify({ data }),
      
    })
    .then((res) => res)
    .catch((error) => {
      console.error("Error creating a new direction:", error);
      throw new Error("Failed to create the direction.");
    });
}

// Actualizar una dirección existente
export function updateDirection( directionId: number, data: Directions ): Promise<Directions> {
  if (!directionId || !data) {
    return Promise.reject(new Error("Direction ID and data are required."));
  }

  return query<Directions>(
       `${BASE_ENDPOINT}/${directionId}`, 
       {
        method: "PUT",
        body: JSON.stringify({ data }),
      }
    )
    .then((res: Directions) => res)
    .catch((error) => {
      console.error(`Error updating direction with ID ${directionId}:`, error);
      throw new Error("Failed to update the direction.");
    });
}

// Eliminar una dirección por su ID
export function deleteDirection(directionId: number): Promise<DataResponse<Directions>> {
  if (!directionId) {
    return Promise.reject(new Error("Direction ID is required."));
  }

  return query<DataResponse<DataResponse<Directions>>>(
      `${BASE_ENDPOINT}/${directionId}`, 
       {
        method: "DELETE",
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Error deleting direction with ID ${directionId}:`, error);
      throw new Error("Failed to delete the direction.");
    });
}
