import { query } from "@/lib/api/server/strapi";


const BASE_ENDPOINT = "inventarios";

export const getInventarios = async (): Promise<any> => {
  try {
    const response = await query<any>(`${BASE_ENDPOINT}?populate=*`);
    return response;
  } catch (error) {
    console.error("Error fetching inventarios:", error);
    throw new Error("Failed to fetch inventarios.");
  }
};

