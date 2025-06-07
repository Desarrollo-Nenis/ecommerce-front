"use client";

// 👇 Esto fuerza a que Next.js no prerenderice y lo trate como una página 100% dinámica
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import CategoriesGrid from "@/modules/common/components/categories-grid/categories-grid";
import { TitleGradient } from "@/modules/common/components/titles/title-gradient";
import { getCategorias } from "@/services/categories/categories-services";
import { Tags } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Categoria } from "@/interfaces/categories/categories.interface";
import { ErrorState } from "@/modules/common/components/error/ErrorState";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const result = await getCategorias({});

        const categoriasFiltradas =
          result?.data.filter((c: Categoria) => !c.principal) || [];
        setCategorias(categoriasFiltradas);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
        setError("No se pudieron cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8 flex justify-center">
        <Loader2 className="animate-spin" size={40} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <ErrorState
          icon={<Tags size={40} />}
          title="Error al cargar categorías"
          message={error}
        />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <TitleGradient
        title="Categorías"
        subtitle="Explora nuestras categorías"
        tagIcon={<Tags size={40} />}
      />
      <CategoriesGrid categories={categorias} />
    </main>
  );
}
