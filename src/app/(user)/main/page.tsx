import { ProductGrid } from "@/modules/main/components/productCart/ProductGrid";
import { StoreFilters } from "@/modules/shop/StoreFilters";
import {
  getCategorias,
  getSubCategorias,
} from "@/services/categories/categories-services";
import { getMarcas } from "@/services/marcas/marcas-services";
import { getProducts } from "@/services/products/products-services";

export default async function MainPage() {

  // fetch 
  const resultProducts = await getProducts();
  const resultCategorias = await getCategorias();
  const resultSubCategorias = await getSubCategorias();
  const resultMarcas = await getMarcas();

  return (
    <main className="container mx-auto p-4">
        
      <div className="grid grid-cols-10 gap-3">
        {/* Columna de filtros */}
        <aside className="col-span-2">
          <StoreFilters
            marcas={resultMarcas.data}
            categorias={resultCategorias.data}
            subCategorias={resultSubCategorias.data}
          />
        </aside>

        {/* Columna del grid de productos */}
        <section className="col-span-8">
          <ProductGrid products={resultProducts.data} />
        
        </section>
      </div>
    </main>
  );
}
