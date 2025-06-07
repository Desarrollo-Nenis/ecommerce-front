import { ProductGrid } from "@/modules/main/components/productCart/ProductGrid";
import { ResponsiveStoreFilters } from "@/modules/shop/ResponsiveStoreFilters"; // Asegúrate que esta ruta esté bien
import { getCategorias } from "@/services/categories/categories-services";
import { getMarcas } from "@/services/marcas/marcas-services";
import {
  parseProductFilters,
  ProductFilters,
  searchProductsWithParams,
} from "@/services/products/products-services";

export default async function MarcaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { slug } = await params;
  const decodeSlug = decodeURIComponent(slug);
  const searchParamsDecode = await searchParams;
  const { data: marcas } = await getMarcas();
  const { data: categorias } = await getCategorias();

  const filtros: ProductFilters = parseProductFilters(searchParamsDecode);

  const filtrosWithMarca: ProductFilters = {
    ...filtros,
    marcas: [slug, ...(filtros.marcas ?? [])],
  };
  const productFilteredData = await searchProductsWithParams(filtrosWithMarca);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Mobile: Filters on top */}
      <div className="md:hidden mb-4">
        <ResponsiveStoreFilters
          categorias={categorias}
          marcas={marcas}
          marcaBase={decodeSlug}
        />
      </div>
      <div>
        {/* {marcas && (
          <MarcasCarousel marcas={marcas} />
        )} */}
      </div>
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Desktop: Filters on the side */}
        <div className="hidden md:block">
          <ResponsiveStoreFilters
            categorias={categorias}
            marcas={marcas}
            selectedFilters={filtrosWithMarca}
            marcaBase={decodeSlug}
          />
        </div>
        {/* Main content */}
        <div className="md:col-span-3 space-y-4">
          <ProductGrid products={productFilteredData} />
        </div>
      </div>
    </main>
  );
}
