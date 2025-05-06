import { DataResponse } from "@/interfaces/data/response.interface";
import { Products } from "@/interfaces/products/products.interface";
import { query } from "@/lib/api/server/strapi";
import { formatStrapiImageUrl } from "@/lib/FormatUrlImgStrapi";

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;
const BASE_ENDPOINT: string = "productos";

//? ====================** FUNCION PARA MAPEAR PRODUCTOS CON IMÁGENES **====================
function mapProductsWithImages(products: Products[]): Products[] {
  return products.map((product) => {
    const coverUrl = product.cover
      ? `${STRAPI_HOST}${product.cover.url}`
      : "/images/products/default-img.png";

    const galleryUrls =
      product.galeria?.map((image) => formatStrapiImageUrl(image.url)) || [];

    const variantes = product.variantes?.map((variante) => {
      const varianteCoverUrl = variante.cover
        ? `${STRAPI_HOST}${variante.cover.url}`
        : "/images/products/default-img.png";

      const varianteGalleryUrls =
        variante.galeria?.map((img) => formatStrapiImageUrl(img.url)) || [];

      return {
        ...variante,
        coverUrl: varianteCoverUrl,
        galleryUrls: varianteGalleryUrls,
      };
    }) || [];

    return {
      ...product,
      coverUrl,
      galleryUrls,
      variantes,
    };
  });
}


//? ====================** OBTENER TODOS LOS PRODUCTOS **=================

type ProductFilters = {
  nombre?: string;
  categorias?: string[];
  marcas?: string[];
  precioMin?: number;
  precioMax?: number;
};

export async function searchProducts(search: string): Promise<DataResponse<Products[]>> {
  const params = new URLSearchParams();

  params.append("filters[$or][0][nombre][$containsi]", search);
  params.append("filters[$or][1][descripcion][$containsi]", search);
  params.append("filters[$or][2][categorias][nombre][$containsi]", search);
  params.append("filters[$or][4][marca][nombre][$containsi]", search);

  params.append("populate[cover]", "true");
  params.append("populate[galeria]", "true");

  const url = `productos?${params.toString()}`;

  try {
    const res = await query<DataResponse<Products[]>>(url);
    return { data: mapProductsWithImages(res.data), meta: res.meta };
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw new Error("Error en la solicitud: " + error);
  }
}

export async function searchProductsWithFallback(search: string): Promise<Products[]> {
  const searchTerms = search.trim().split(/\s+/);

  const strictParams = buildParams(searchTerms, true);
  const strictResults = await fetchProductsByUrl(`productos?${strictParams.toString()}`);

  if (strictResults.length > 0) return strictResults;

  const looseParams = buildParams(searchTerms, false);
  const looseResults = await fetchProductsByUrl(`productos?${looseParams.toString()}`);

  return looseResults;
}

function buildGroupKey(indexTerm: number, indexFilter: number, isStrict: boolean) {
  return isStrict
    ? `filters[$and][${indexTerm + indexFilter}]`
    : `filters[$or][${indexTerm + indexFilter}]`;
}

function buildParams(terms: string[], isStrict: boolean): URLSearchParams {
  const params = new URLSearchParams();

  terms.forEach((term, i) => {
    params.append(`${buildGroupKey(i, 0, isStrict)}[nombre][$containsi]`, term);

    if(!isStrict){
      params.append(`${buildGroupKey(i, 1, isStrict)}[descripcion][$containsi]`, term);
      params.append(`${buildGroupKey(i, 2, isStrict)}[categorias][nombre][$containsi]`, term);
      params.append(`${buildGroupKey(i, 3, isStrict)}[marca][nombre][$containsi]`, term);
    }
  });

  params.append("populate[categorias]", "true");
  params.append("populate[marca]", "true");
  params.append("populate[cover]", "true");
  params.append("populate[galeria]", "true");
  params.append("populate[principal]", "true");
  params.append("populate[inventario]", "true");
  params.append("populate[descuento]", "true");

  return params;
}

async function fetchProductsByUrl(url: string): Promise<Products[]> {
  try {
    const res = await query<DataResponse<Products[]>>(url);
    return mapProductsWithImages(res.data);
  } catch (error) {
    console.error("❌ Error al buscar productos:", error);
    return [];
  }
}

function normalizeFilters(filters: ProductFilters): ProductFilters {
  return {
    ...filters,
    categorias: filters.categorias?.map(decodeURIComponent),
    marcas: filters.marcas?.map(decodeURIComponent),
  };
}

export async function getProductsByFilters(filters: ProductFilters = {}): Promise<DataResponse<Products[]>> {
  const searchParams = new URLSearchParams();
  const normalizedFilters = normalizeFilters(filters);

  if (normalizedFilters.nombre) {
    searchParams.append("filters[nombre][$containsi]", normalizedFilters.nombre);
  }

  if (normalizedFilters.categorias?.length) {
    searchParams.append("filters[categorias][nombre][$in]", normalizedFilters.categorias.join(","));
  }

  

  if (normalizedFilters.precioMin !== undefined && !isNaN(normalizedFilters.precioMin)) {
    searchParams.append("filters[precioVenta][$gte]", normalizedFilters.precioMin.toString());
  }

  if (normalizedFilters.precioMax !== undefined && !isNaN(normalizedFilters.precioMax)) {
    searchParams.append("filters[precioVenta][$lte]", normalizedFilters.precioMax.toString());
  }

  if (normalizedFilters.marcas?.length) {
    searchParams.append("filters[marca][nombre][$in]", normalizedFilters.marcas.join(","));
  }

  const populate = ["cover", "galeria"];
  populate.forEach((field) => searchParams.append("populate", field));

  const queryString = searchParams.toString();
  const url = `${BASE_ENDPOINT}?${queryString}`;

  try {
    const res = await query<DataResponse<Products[]>>(url);
    return { data: mapProductsWithImages(res.data), meta: res.meta };
  } catch (error) {
    console.error("Error al obtener los productos filtrados:", error);
    throw error;
  }
}

export async function getAllProducts(): Promise<DataResponse<Products[]>> {

  const params = new URLSearchParams();
  params.append("populate[categorias]", "true");
  params.append("populate[marca]", "true");
  params.append("populate[cover]", "true");
  params.append("populate[inventario]", "true");
  params.append("populate[descuento]", "true");
  params.append("populate[variantes][populate][inventario]", "true");

  return query<DataResponse<Products[]>>(
    `${BASE_ENDPOINT}?${params.toString()}`
  )
    .then((res) => ({ data: mapProductsWithImages(res.data), meta: res.meta }))
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
      throw error;
    });
}

export async function getProductById(id: number): Promise<Products> {
  const url = `${BASE_ENDPOINT}?populate=*&filters[id][$eq]=${id}`;

  const products = await query<DataResponse<Products[]>>(url)
    .then((res) => ({ data: mapProductsWithImages(res.data), meta: res.meta }))
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
      throw error;
    });

  return products.data[0] || null;
}

export async function getProductBySlug(slug: string): Promise<Products> {
  if (!slug) {
    throw new Error("Slug no proporcionado");
  }

  const params = new URLSearchParams();
  params.append("filters[slug][$eq]", slug);
  params.append("populate[cover]", "true");
  params.append("populate[galeria]", "true");
  params.append("populate[categorias]", "true");
  params.append("populate[marca]", "true");
  params.append("populate[principal]", "true");
  params.append("populate[inventario]", "true");
  params.append("populate[descuento]", "true");

  // Populate variantes y sus atributos
  params.append("populate[variantes][populate][atributos]", "true"); 
  params.append("populate[variantes][populate][inventario]", "true"); 
  params.append("populate[variantes][populate][descuento]", "true"); 
  params.append("populate[variantes][populate][cover]", "true"); 
  params.append("populate[variantes][populate][galeria]", "true"); 
  params.append("populate[variantes][populate][marca]", "true"); 
  params.append("populate[variantes][populate][categorias]", "true"); 

  const url = `${BASE_ENDPOINT}?${params.toString()}`;

  const products = await query<DataResponse<Products[]>>(url)
    .then((res) => ({ data: mapProductsWithImages(res.data), meta: res.meta }))
    .catch((error) => {
      console.error("Error al obtener el producto por slug:", error);
      throw error;
    });

  return products.data[0]|| null;
}


export async function getProductWithVariantesBySlug(slug: string): Promise<Products> {
  const product = await getProductBySlug(slug);

  if (product?.tipo == "variante" && product.principal) {
    const principal = await getProductBySlug(product.principal.slug);
    return principal;
  }
  return product;
}
