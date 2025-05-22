import CategoriesGrid from "@/modules/common/components/categories-grid/categories-grid";
import { getCategorias } from "@/services/categories/categories-services";
import { getMarcas } from "@/services/marcas/marcas-services";

export default async function CategoriasPage({}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  //  const { data: productos } = await getProductsByFilters(filtros);
  const { data: categorias } = await getCategorias({});
  const { data: marcas } = await getMarcas();

  const categoriasFiltered = categorias.filter((c) => !c.principal);
  console.log(categoriasFiltered);

  return (
    <main className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Categorías</h1>
        <p className="text-gray-600 mb-4">
          Explora nuestras categorías de productos.
        </p>
        <div className="">
          <CategoriesGrid categories={categoriasFiltered} />
        </div>
      </div>
    </main>
  );
}
