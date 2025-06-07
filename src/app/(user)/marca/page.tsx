import MarcasGrid from "@/modules/common/components/marcas-grid/marcas-grid";
import { TitleGradient } from "@/modules/common/components/titles/title-gradient";
import { getMarcas } from "@/services/marcas/marcas-services";
import { Tags } from "lucide-react";

export default async function MarcasPage() {
  //  const { data: productos } = await getProductsByFilters(filtros);
  const { data: marcas } = await getMarcas();

  return (
    <main className="container mx-auto px-4 py-8">
      <div>
        <TitleGradient
          title="Categorias"
          subtitle="Explora nuestras categorias"
          tagIcon={<Tags size={40} />}
        ></TitleGradient>
        <div className="">
          <MarcasGrid marcas={marcas} />
        </div>
      </div>
    </main>
  );
}
