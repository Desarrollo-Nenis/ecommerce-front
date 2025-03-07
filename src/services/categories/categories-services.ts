
import { Categoria, SubCategoria } from "@/interfaces/categories/categories.interface";
import { DataResponse } from "@/interfaces/data/response.interface";
import { query } from "@/lib/api/server/strapi";


const BASE_ENDPOINT: string = "categorias" 
const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;

export function getCategorias(): Promise<DataResponse<Categoria[]>> {
  return query<DataResponse<Categoria[]>>(`${BASE_ENDPOINT}?populate=*`)
  .then((res) => {
    const data: DataResponse<SubCategoria[]> = {
      ...res,
      data: res.data.map((categoria) => ({
        ...categoria,
        img: categoria.img ? { ...categoria.img, url: `${STRAPI_HOST}${categoria.img.url}` } : undefined,
      })),
    };
    return data;
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
  return query<DataResponse<SubCategoria[]>>(`${BASE_ENDPOINT_SUBCATEGORIAS}?populate=*`)
    .then((res) => {
      const data: DataResponse<SubCategoria[]> = {
        ...res,
        data: res.data.map((subcategoria) => ({
          ...subcategoria,
          img: subcategoria.img ? { ...subcategoria.img, url: `${STRAPI_HOST}${subcategoria.img.url}` } : undefined,
        })),
      };
      return data;
    })
    .catch((error) => {
      console.error("Something terrible happened when getting subcategories: ", error);
      throw error;
    });
}

