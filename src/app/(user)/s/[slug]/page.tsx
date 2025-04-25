
import {  searchProductsWithFallback } from "@/services/products/products-services";
import { ProductGrid } from "@/modules/main/components/productCart/ProductGrid";
import { StoreFilters } from "@/modules/shop/StoreFilters";
import { getCategorias } from "@/services/categories/categories-services";
import { getMarcas } from "@/services/marcas/marcas-services";

export default async function SearchSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params;
  const searchDecode = decodeURIComponent(slug );

  const productos = await searchProductsWithFallback(searchDecode);
  console.log("productos", productos);
    const { data: categorias } = await getCategorias();
    const { data: marcas } = await getMarcas();

  return (
     <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StoreFilters
              categorias={categorias}
              marcas={marcas}
            />
            <div className="col-span-3 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
        Resultados para: <span className="text-primary">{searchDecode}</span>
      </h2>

      {productos.length > 0 ? (
        <ProductGrid products={productos} />
      ) : (
        <p>No se encontraron productos para esta búsqueda.</p>
      )}
            </div>
          </div>
        </main>
   
  );
}
