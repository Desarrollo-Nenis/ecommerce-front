import { DataResponse } from "@/interfaces/data/response.interface";
import { Address } from "@/interfaces/directions/directions.interface";
import { query } from "@/lib/api/server/strapi";

const BASE_ENDPOINT: string = "direccions";

// Obtener direcciones de un usuario específico
export function getUserDirections(
  userId: string
): Promise<DataResponse<Address[]>> {
  const queryDireccions: string = `${BASE_ENDPOINT}?filters[usuario][documentId][$eq]=${userId}populate[usuario]=false`;

  if (!userId) {
    return Promise.reject(new Error("User documentId is required."));
  }

  return query<DataResponse<Address[]>>(queryDireccions)
    .then((res) => res)
    .catch((error) => {
      console.error("Error fetching user directions:", error);
      throw new Error("Failed to fetch user directions.");
    });
}

// Crear una nueva dirección
export function createDirection(data: Address): Promise<Address> {
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

  return query<Address>(`${BASE_ENDPOINT}`, {
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
export function updateDirection(
  directionId: number,
  data: Address
): Promise<Address> {
  if (!directionId || !data) {
    return Promise.reject(new Error("Direction ID and data are required."));
  }

  return query<Address>(`${BASE_ENDPOINT}/${directionId}`, {
    method: "PUT",
    body: JSON.stringify({ data }),
  })
    .then((res: Address) => res)
    .catch((error) => {
      console.error(`Error updating direction with ID ${directionId}:`, error);
      throw new Error("Failed to update the direction.");
    });
}

// Eliminar una dirección por su ID
export function deleteDirection(
  directionId: number
): Promise<DataResponse<Address>> {
  if (!directionId) {
    return Promise.reject(new Error("Direction ID is required."));
  }

  return query<DataResponse<DataResponse<Address>>>(
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
