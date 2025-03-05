
import { Categoria, SubCategoria } from "@/interfaces/categories/categories.interface";
import { DataResponse } from "@/interfaces/data/response.interface";
import { query } from "@/lib/api/server/strapi";


const BASE_ENDPOINT: string = "categorias" 

export function getCategorias(): Promise<DataResponse<Categoria[]>> {
  return query<DataResponse<Categoria[]>>(`${BASE_ENDPOINT}?populate=*`)
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
const BASE_ENDPOINT_SUBCATEGORIAS = "subcategorias"

export function getSubCategorias(): Promise<DataResponse<SubCategoria[]>> {
  return query<DataResponse<Categoria[]>>(`${BASE_ENDPOINT_SUBCATEGORIAS}?populate=*`)
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
