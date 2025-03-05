"use server"
const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

console.log(STRAPI_HOST);

export async function query<T>(
  url: string,
  options: { method?: string; body?: unknown } = {} // Opciones para el CRUD
): Promise<T> {
  const { method = "GET", body } = options; // Si no se manda método, por defecto es GET

  try {
    const response = await fetch(`${STRAPI_HOST}/api/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : undefined, // Solo se incluye el cuerpo si existe
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
}
