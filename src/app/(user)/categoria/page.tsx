import CategoryCarousel from "@/modules/common/components/category-carousel/category-carousel"
import { ProductGrid } from "@/modules/main/components/productCart/ProductGrid";
import { ResponsiveStoreFilters } from "@/modules/shop/ResponsiveStoreFilters";
import { getCategorias } from "@/services/categories/categories-services";
import { getMarcas } from "@/services/marcas/marcas-services";
import {  getProductsByFilters } from "@/services/products/products-services";

export default async function CategoriasPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {

 const filtros = {
     categoria: [params.slug],
     subcategoria: searchParams.subcategoria?.split(","),
     marcas: searchParams.marca?.split(","),
     precioMin: searchParams.precioMin ? Number(searchParams.precioMin) : undefined,
     precioMax: searchParams.precioMax ? Number(searchParams.precioMax) : undefined,
   };
 
   const { data: productos } = await getProductsByFilters(filtros);
   const { data: categorias } = await getCategorias();
   const { data: marcas } = await getMarcas();
 
   return (
    <main className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Filtros: se muestran arriba en móviles, al lado en pantallas md+ */}
      <div className="order-2 md:order-1">
        <ResponsiveStoreFilters categorias={categorias} marcas={marcas} />
      </div>
  
      {/* Productos + Carrusel */}
      <div className="order-1 md:order-2 md:col-span-3 space-y-6">
        <CategoryCarousel categorias={categorias} />
        <ProductGrid products={productos} />
      </div>
    </div>
  </main>
  
   );
}