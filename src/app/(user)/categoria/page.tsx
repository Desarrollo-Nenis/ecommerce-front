import CategoriesGrid from "@/modules/common/components/categories-grid/categories-grid";
import { TitleGradient } from "@/modules/common/components/titles/title-gradient";
import { getCategorias } from "@/services/categories/categories-services";
import { Tags } from "lucide-react";

export default async function CategoriasPage({}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  //  const { data: productos } = await getProductsByFilters(filtros);
  const { data: categorias } = await getCategorias({});

  const categoriasFiltered = categorias.filter((c) => !c.principal);
  console.log(categoriasFiltered);

  return (
    <main className="container mx-auto px-4 py-8">
      <div>
        <TitleGradient
          title="Categorias"
          subtitle="Explora nuestras categorias"
          tagIcon={<Tags size={40} />}
        ></TitleGradient>
        <div className="">
          <CategoriesGrid categories={categoriasFiltered} />
        </div>
      </div>
    </main>
  );
}
