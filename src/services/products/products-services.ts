import { DataResponse } from "@/interfaces/data/response.interface";
import {  Products } from "@/interfaces/products/products.interface";
import { query } from "@/lib/api/server/strapi";
import { formatStrapiImageUrl } from "@/lib/FormatUrlImgStrapi";

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;
const BASE_ENDPOINT: string = "productos";

//? =================** OBTENER TODOS LOS PRODUCTOS **================= 


type ProductFilters = {
  nombre?: string;
  categorias?: string[];  // Para múltiples categorías
  subcategorias?: string[];  // Para múltiples subcategorías
  marcas?: string[];  // Para múltiples marcas
  precioMin?: number;
  precioMax?: number;
};

export async function searchProducts(search: string): Promise<DataResponse<Products[]>> {
  const params = new URLSearchParams();

  // Filtros
  params.append("filters[$or][0][nombre][$containsi]", search);
  params.append("filters[$or][1][descripcion][$containsi]", search);
  params.append("filters[$or][2][categorias][nombre][$containsi]", search);
  params.append("filters[$or][3][subcategorias][nombre][$containsi]", search);
  params.append("filters[$or][4][marca][nombre][$containsi]", search);

  // populate correctamente
  params.append("populate[cover]", "true");
  params.append("populate[galeria]", "true");

  const url = `productos?${params.toString()}`;

  console.log("Consulta URL:", url); // Puedes copiar y probarla en Postman o navegador

  try {
    const res = await query<DataResponse<Products[]>>(url);
    const { data, meta } = res;

    const mappedData = data.map((product) => {
      const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;
      const coverUrl = product.cover
        ? `${STRAPI_HOST}${product.cover.url}`
        : "/images/products/default-img.png";

      const galleryUrls =
        product.galeria?.map((image) => `${STRAPI_HOST}${image.url}`) || [];

      return {
        ...product,
        coverUrl,
        galleryUrls,
      };
    });

    return { data: mappedData, meta };
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw new Error("Error en la solicitud: " + error);
  }
}

export async function searchProductsWithFallback(search: string): Promise<Products[]> {
  const searchTerms = search.trim().split(/\s+/);

  // 🔍 Búsqueda estricta (todas las palabras deben estar en algún campo)
  const strictParams = buildParams(searchTerms, true);
  const strictResults = await fetchProductsByUrl(`productos?${strictParams.toString()}`);

  if (strictResults.length > 0) return strictResults;

  // 🕵️‍♂️ Búsqueda relajada (solo una palabra debe coincidir)
  const looseParams = buildParams(searchTerms, false);
  const looseResults = await fetchProductsByUrl(`productos?${looseParams.toString()}`);
  console.log("looseResults", looseResults);
  
  return looseResults;
}

function buildGroupKey(indexTerm: number, indexFilter: number, isStrict: boolean) {
  return  isStrict ? `filters[$and][${indexTerm+indexFilter}]` : `filters[$or][${indexTerm+indexFilter}]`;

}

function buildParams(terms: string[], isStrict: boolean): URLSearchParams {
  const params = new URLSearchParams();

  terms.forEach((term, i) => {
    
    

    params.append(`${buildGroupKey(i,0,isStrict)}[nombre][$containsi]`, term);
    params.append(`${buildGroupKey(i,1,isStrict)}[descripcion][$containsi]`, term);
    params.append(`${buildGroupKey(i,2,isStrict)}[categorias][nombre][$containsi]`, term);
    params.append(`${buildGroupKey(i,3,isStrict)}[subcategorias][nombre][$containsi]`, term);
    params.append(`${buildGroupKey(i,4,isStrict)}[marca][nombre][$containsi]`, term);
  });

  // params.append("populate", "*");
  params.append("populate[cover]", "true");
  params.append("populate[categorias]", "true");
  params.append("populate[subcategorias]", "true");
  // params.append("populate[galeria]", "true");

  return params;
}

async function fetchProductsByUrl(url: string): Promise<Products[]> {
  try {
    console.log("Consulta URL:", url); // Puedes copiar y probarla en Postman o navegador
    
    const res = await query<DataResponse<Products[]>>(url);
  

    return res.data.map((product) => {
      const coverUrl = product.cover
        ? `${STRAPI_HOST}${product.cover.url}`
        : "/images/products/default-img.png";

      const galleryUrls = product.galeria?.map((image) => `${STRAPI_HOST}${image.url}`) || [];

      return {
        ...product,
        coverUrl,
        galleryUrls,
      };
    });
  } catch (error) {
    console.error("❌ Error al buscar productos:", error);
    return [];
  }
}


function normalizeFilters(filters: ProductFilters): ProductFilters {
  return {
    ...filters,
    categorias: filters.categorias?.map(decodeURIComponent),
    subcategorias: filters.subcategorias?.map(decodeURIComponent),
    marcas: filters.marcas?.map(decodeURIComponent),
  };
}


export async function getProductsByFilters(filters: ProductFilters = {}): Promise<DataResponse<Products[]>> {
  const searchParams = new URLSearchParams();
  const normalizedFilters = normalizeFilters(filters);
  // Filtro por nombre
  if (normalizedFilters.nombre) {
    searchParams.append("filters[nombre][$containsi]", normalizedFilters.nombre);
  }

  // Filtro por categoría
  if (normalizedFilters.categorias?.length) {
    searchParams.append("filters[categorias][nombre][$in]", normalizedFilters.categorias.join(","));
  }

  // Filtro por subcategoría
  if (normalizedFilters.subcategorias?.length) {
    searchParams.append("filters[subcategorias][nombre][$in]", normalizedFilters.subcategorias.join(","));
  }

  // Filtros por precio
  if (normalizedFilters.precioMin !== undefined && !isNaN(normalizedFilters.precioMin)) {
    searchParams.append("filters[precioVenta][$gte]", normalizedFilters.precioMin.toString());
  }

  if (normalizedFilters.precioMax !== undefined && !isNaN(normalizedFilters.precioMax)) {
    searchParams.append("filters[precioVenta][$lte]", normalizedFilters.precioMax.toString());
  }

  // Filtros por marcas
  if (normalizedFilters.marcas?.length) {
    searchParams.append("filters[marca][nombre][$in]", normalizedFilters.marcas.join(","));
  }

  // Agregar populate para imágenes
  const populate = ["cover", "galeria"];
  populate.forEach((field) => {
    searchParams.append("populate", field);
  });

  const queryString = searchParams.toString();
  const url = `${BASE_ENDPOINT}?${queryString}`;

  try {
    const res = await query<DataResponse<Products[]>>(url);

    const { data, meta } = res;

    // Mapeo de la respuesta para agregar URLs de las imágenes
    const mappedData = data.map((product) => {
      const coverUrl = product.cover
        ? `${STRAPI_HOST}${product.cover.url}`
        : "/images/products/default-img.png";

      const galleryUrls = product.galeria?.map((image) => `${STRAPI_HOST}${image.url}`) || [];

      return {
        ...product,
        coverUrl,
        galleryUrls,
      };
    });

    return { data: mappedData, meta };
  } catch (error) {
    console.error("Error al obtener los productos filtrados:", error);
    throw error;
  }
}



 





export async function  getAllProducts(): Promise<DataResponse<Products[]>> {
  return query<DataResponse<Products[]>>(`${BASE_ENDPOINT}?populate=cover&populate=galeria`)
    .then((res) => {
      const { data, meta } = res;

      const mappedData = data.map((product) => {
        // Obtener la URL de la imagen de portada
        const coverUrl = product.cover
          ? `${STRAPI_HOST}${product.cover.url}`
          : "/images/products/default-img.png";

        // Obtener las URLs de las imágenes de la galería
        const galleryUrls =
          product.galeria?.map((image) => `${STRAPI_HOST}${image.url}`) || [];

        // Retornar el producto con las imgs
        return {
          ...product,
          coverUrl,
          galleryUrls,
        };
      });

      return { data: mappedData, meta }; // Devolvemos la estructura completa que coincide con la interfaz `DataProducts`
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
      throw error;
    });
}

export async function  getProductById(id:number): Promise<DataResponse<Products[]>> {
    const url = `${BASE_ENDPOINT}?populate=*&filters[id][$eq]=${id}`;
  
  return query<DataResponse<Products[]>>(url)
    .then((res) => {
      const { data, meta } = res;

      const mappedData = data.map((product) => {
        // Obtener la URL de la imagen de portada
        const coverUrl = product.cover
          ? `${STRAPI_HOST}${product.cover.url}`
          : "/images/products/default-img.png";

        // Obtener las URLs de las imágenes de la galería
        const galleryUrls =
          product.galeria?.map((image) =>formatStrapiImageUrl(image.url)) || [];

        // Retornar el producto con las imgs
        return {
          ...product,
          coverUrl,
          galleryUrls,
        };
      });

      return { data: mappedData, meta }; // Devolvemos la estructura completa que coincide con la interfaz `DataProducts`
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
      throw error;
    });
}





//? =================** CREA UN NUEVO PRODUCTO **================= 

export function createProduct( product: Products ): Promise<Products> {
  return query<Products>(
       `${BASE_ENDPOINT}`, 
      {
        method: "POST",
        body: product,
      }
    )
    .then( (res) => res )
    .catch( (error) => {
      console.error("Error at create product: ", error);
      throw error;
    })
}

//? =================** OBTENER TODOS LOS PRODUCTOS **================= 

export function updateProduct( productId: string, product: Products ): Promise<Products> {
  return query<Products>(
       `${BASE_ENDPOINT}/${productId}`, 
    {
        method: "PUT",
        body: product,
      
    })
    .then( (res) => res )
    .catch( (error) => {
      console.error("Error at update product: ", error);
      throw error;
    })
}
