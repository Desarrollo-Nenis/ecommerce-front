import CategoryCarousel from "@/modules/common/components/category-carousel/category-carousel";
import { ProductGrid } from "@/modules/main/components/productCart/ProductGrid";
import { ResponsiveStoreFilters } from "@/modules/shop/ResponsiveStoreFilters"; // Asegúrate que esta ruta esté bien
import { getCategorias } from "@/services/categories/categories-services";
import { getMarcas } from "@/services/marcas/marcas-services";
import { getProductsByFilters } from "@/services/products/products-services";

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
const slug = decodeURIComponent(params.slug);
  const filtros = {
    categoria: [slug],
    subcategoria: searchParams?.subcategoria?.split(","),
    marcas: searchParams?.marca?.split(","),
    precioMin: searchParams?.precioMin
      ? Number(searchParams?.precioMin)
      : undefined,
    precioMax: searchParams?.precioMax
      ? Number(searchParams?.precioMax)
      : undefined,
  };

  const { data: productos } = await getProductsByFilters(filtros);
  const { data: categorias } = await getCategorias();
  const { data: marcas } = await getMarcas();
  const categoria = categorias.find((cat) => cat.nombre === slug);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Mobile: Filters on top */}
      <div className="md:hidden mb-4">
        <ResponsiveStoreFilters categorias={categorias} marcas={marcas} />
      </div>
      <div>
        {categoria?.subcategorias && (
          <CategoryCarousel categorias={categoria?.subcategorias} />
        )}
      </div>
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Desktop: Filters on the side */}
        <div className="hidden md:block">
          <ResponsiveStoreFilters categorias={categorias} marcas={marcas} />
        </div>
        {/* Main content */}
        <div className="md:col-span-3 space-y-4">
          <ProductGrid products={productos} />
        </div>
      </div>
    </main>
  );
}
