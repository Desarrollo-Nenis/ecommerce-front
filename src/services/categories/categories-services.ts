
import { BACKEND_ROUTES } from "@/contants/backend-routes/routes";
import { Categoria, SubCategoria } from "@/interfaces/categories/categories.interface";
import { DataResponse } from "@/interfaces/data/response.interface";
import { query } from "@/lib/api/server/strapi";
import { formatStrapiImageUrl } from "@/lib/FormatUrlImgStrapi";


const BASE_ENDPOINT: string = BACKEND_ROUTES.CATEGORIES; 


type CategoryFilters = {
  nombre?: string;
  
};

export function getCategorias(filters: CategoryFilters = {}): Promise<DataResponse<Categoria[]>> {
  const searchParams = new URLSearchParams();

  // Agregar filtros si existen
  if (filters.nombre) {
    searchParams.append("filters[nombre][$containsi]", filters.nombre);
  }



  // Aseguramos cargar relaciones como imagen y subcategorías
  searchParams.append("populate", "*");

  const url = `${BASE_ENDPOINT}?${searchParams.toString()}`;

  return query<DataResponse<Categoria[]>>(url)
    .then((res) => {
      const data: DataResponse<Categoria[]> = {
        ...res,
        data: res.data.map((categoria) => ({
          ...categoria,
          img: categoria.img ? { ...categoria.img, url:formatStrapiImageUrl(categoria.img.url) } : undefined,
          subcategorias: categoria.subcategorias?.map((subcategoria) => ({
            ...subcategoria,
            img: subcategoria.img ? { ...subcategoria.img, url: formatStrapiImageUrl(subcategoria.img.url)} : undefined,
          })),
      }))}
      return data;
    })
    .catch((error) => {
      console.error("Error al obtener categorías filtradas: ", error);
      throw error;
    });
}

const BASE_ENDPOINT_SUBCATEGORIAS = "subcategorias"

export function getSubCategorias(filters: CategoryFilters = {}): Promise<DataResponse<SubCategoria[]>> {
  const searchParams = new URLSearchParams();

  // Agregar filtros si existen
  if (filters.nombre) {
    searchParams.append("filters[nombre][$containsi]", filters.nombre);
  }

 

  // Incluir relaciones como imagen, etc.
  searchParams.append("populate", "*");

  const url = `${BASE_ENDPOINT_SUBCATEGORIAS}?${searchParams.toString()}`;

  return query<DataResponse<SubCategoria[]>>(url)
    .then((res) => {
      const data: DataResponse<SubCategoria[]> = {
        ...res,
        data: res.data.map((subcategoria) => ({
          ...subcategoria,
          img: subcategoria.img ? { ...subcategoria.img, url:formatStrapiImageUrl(subcategoria.img.url) } : undefined,
        })),
      };
      return data;
    })
    .catch((error) => {
      console.error("Error al obtener subcategorías filtradas: ", error);
      throw error;
    });
}


