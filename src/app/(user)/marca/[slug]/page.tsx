import CategoryCarousel from "@/modules/common/components/category-carousel/category-carousel";
import MarcasCarousel from "@/modules/common/components/marcas-carousel/marcas-carousel";
import { ProductGrid } from "@/modules/main/components/productCart/ProductGrid";
import { ResponsiveStoreFilters } from "@/modules/shop/ResponsiveStoreFilters"; // Asegúrate que esta ruta esté bien
import { getCategorias } from "@/services/categories/categories-services";
import { getMarcas } from "@/services/marcas/marcas-services";
import {
  getProductsByFilters,
  ProductFilters,
} from "@/services/products/products-services";

export default async function MarcaPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  const slug = decodeURIComponent(params.slug);

  const { data: marcas } = await getMarcas();
  const { data: categorias } = await getCategorias();
  const marca = marcas.find((cat) => cat.nombre === slug);

  const filtros: ProductFilters = {
    categorias: [
      ...(searchParams?.categorias?.split(",") || []),
    ],
    marcas:[slug, ...(searchParams?.marcas?.split(",") || [])],
    precioMin: searchParams?.precioMin
      ? Number(searchParams?.precioMin)
      : undefined,
    precioMax: searchParams?.precioMax
      ? Number(searchParams?.precioMax)
      : undefined,
  };

  const productFilteredData = await getProductsByFilters(filtros);
 
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Mobile: Filters on top */}
      <div className="md:hidden mb-4">
        <ResponsiveStoreFilters categorias={categorias} marcas={marcas} marcaBase={slug}  />
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
          <ResponsiveStoreFilters categorias={categorias} marcas={marcas} marcaBase={slug}   />
        </div>
        {/* Main content */}
        <div className="md:col-span-3 space-y-4">
          <ProductGrid products={productFilteredData} />
        </div>
      </div>
    </main>
  );
}
