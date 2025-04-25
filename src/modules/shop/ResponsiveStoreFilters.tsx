"use client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { StoreFilters } from "./StoreFilters"; // mismo archivo que ya tienes
import { Categoria } from "@/interfaces/categories/categories.interface";
import { Marca } from "@/interfaces/marcas/marca.interface";
import { Card } from "@/components/ui/card";

interface Props {
  categorias: Categoria[];
  marcas: Marca[];
}

export const ResponsiveStoreFilters = ({ categorias, marcas }: Props) => {
  return (
    <>
      {/* Mobile: Button to open sheet */}
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Mostrar filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto max-h-screen">
            <SheetTitle></SheetTitle>
            <StoreFilters categorias={categorias} marcas={marcas} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Show filters as static card */}
      <Card className="hidden md:block">
        <StoreFilters categorias={categorias} marcas={marcas} />
      </Card>
    </>
  );
};
