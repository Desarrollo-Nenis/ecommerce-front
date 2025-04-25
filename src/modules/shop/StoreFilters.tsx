"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Categoria } from "@/interfaces/categories/categories.interface";
import { Marca } from "@/interfaces/marcas/marca.interface";
import { Card } from "@/components/ui/card";

interface StoreFiltersProps {
  categorias: Categoria[];
  marcas: Marca[];
}

export const StoreFilters = ({
  categorias,
  marcas,
}: StoreFiltersProps) => {
  const router = useRouter();

  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [selectedSubcategorias, setSelectedSubcategorias] = useState<string[]>([]);
  const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 105000]);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("105000");

  const updateURL = () => {
    const params = new URLSearchParams();

    if (selectedCategorias.length)
      params.set("categoria", selectedCategorias.join(","));

    if (selectedSubcategorias.length)
      params.set("subcategoria", selectedSubcategorias.join(","));

    if (selectedMarcas.length)
      params.set("marca", selectedMarcas.join(","));

    if (minPrice !== "0")
      params.set("precioMin", minPrice);

    if (maxPrice !== "105000")
      params.set("precioMax", maxPrice);

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    updateURL();
  }, [selectedCategorias, selectedSubcategorias, selectedMarcas]);

  const applyPriceFilter = () => {
    updateURL();
  };

  const toggleItem = (prev: string[], item: string) =>
    prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item];

  return (
    <div className="w-full max-w-xs p-4 sticky top-20">
      <h2 className="text-xl font-semibold text-primary mb-4">Filtros</h2>

      <div className="space-y-6">
        {/* Categorías con Subcategorías */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between w-full font-medium">
            <span>Categorías</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {categorias.map((categoria) => (
              <div key={categoria.id}>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCategorias.includes(categoria.nombre)}
                    onCheckedChange={() =>
                      setSelectedCategorias((prev) =>
                        toggleItem(prev, categoria.nombre)
                      )
                    }
                    id={`cat-${categoria.id}`}
                  />
                  <Label htmlFor={`cat-${categoria.id}`} className="text-sm">
                    {categoria.nombre}
                  </Label>
                </div>

                <div className="ml-5 mt-1 space-y-1">
                  {(categoria.subcategorias || []).map((sub) => (
                    <div key={sub.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedSubcategorias.includes(sub.nombre)}
                        onCheckedChange={() =>
                          setSelectedSubcategorias((prev) =>
                            toggleItem(prev, sub.nombre)
                          )
                        }
                        id={`sub-${sub.id}`}
                      />
                      <Label
                        htmlFor={`sub-${sub.id}`}
                        className="text-sm text-muted-foreground"
                      >
                        {sub.nombre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Marcas */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between w-full font-medium">
            <span>Marcas</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {marcas.map((marca) => (
              <div key={marca.id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedMarcas.includes(marca.nombre)}
                  onCheckedChange={() =>
                    setSelectedMarcas((prev) =>
                      toggleItem(prev, marca.nombre)
                    )
                  }
                  id={`marca-${marca.id}`}
                />
                <Label htmlFor={`marca-${marca.id}`} className="text-sm">
                  {marca.nombre}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Precio */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between w-full font-medium">
            <span>Precio</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <Slider
              value={priceRange}
              min={0}
              max={105000}
              step={1}
              onValueChange={(values) => {
                setPriceRange(values);
                setMinPrice(values[0].toString());
                setMaxPrice(values[1].toString());
              }}
              className="mb-4"
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="text-xs"
              />
              <span className="text-sm">-</span>
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="text-xs"
              />
            </div>
            <Button onClick={applyPriceFilter} className="mt-2 w-full">
              Aplicar precio
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
