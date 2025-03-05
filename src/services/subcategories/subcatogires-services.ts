import { SubCategoria } from "@/interfaces/categories/categories.interface";
import { DataResponse } from "@/interfaces/data/response.interface";
import { query } from "@/lib/api/server/strapi";


const BASE_ENDPOINT: string = "subcategorias" 

export function getCategorias(): Promise<DataResponse<SubCategoria>> {
  return query<DataResponse<SubCategoria>>(`${BASE_ENDPOINT}?populate=*`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(
        "Something terrible happened when getting stock actions: ",
        error
      );
      throw error;
    });
}
