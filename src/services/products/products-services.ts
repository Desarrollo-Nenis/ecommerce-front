import { DataResponse } from "@/interfaces/data/response.interface";
import {  Products } from "@/interfaces/products/products.interface";
import { query } from "@/lib/api/server/strapi";

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;
const BASE_ENDPOINT: string = "productos";

//? =================** OBTENER TODOS LOS PRODUCTOS **================= 

export async function  getProducts(): Promise<DataResponse<Products[]>> {
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
