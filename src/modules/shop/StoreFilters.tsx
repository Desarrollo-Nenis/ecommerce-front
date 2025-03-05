"use client";

import { useState } from "react";
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
import {
  Categoria,
  SubCategoria,
} from "@/interfaces/categories/categories.interface";
import { Marca } from "@/interfaces/marcas/marca.interface";
import { Card } from "@/components/ui/card";

interface StoreFiltersProps {
  categorias: Categoria[];
  subCategorias: SubCategoria[];
  marcas: Marca[];
}

export const StoreFilters = ({ categorias, marcas }: StoreFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 105340]);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("105340");

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    setMinPrice(values[0].toString());
    setMaxPrice(values[1].toString());
  };

  const handleInputChange = (value: string, type: "min" | "max") => {
    const numValue = Number.parseInt(value) || 0;
    if (type === "min") {
      setMinPrice(value);
      setPriceRange([numValue, priceRange[1]]);
    } else {
      setMaxPrice(value);
      setPriceRange([priceRange[0], numValue]);
    }
  };

  return (
    <Card className="w-full max-w-xs p-4 sticky top-20 overflow-hidden">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Filtros</h2>

      <div className="space-y-6">
        {/* categorias */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-blue-900 font-medium">
            <span>Categorias</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {categorias.map((categoria) => (
              <div key={categoria.id} className="flex items-center gap-2">
                <Checkbox id="stock" />
                <Label htmlFor="stock" className="text-sm">
                  {categoria.nombre}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        {/* marca */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-blue-900 font-medium">
            <span>Marcas</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {marcas.map((marca) => (
              <div key={marca.id} className="flex items-center gap-2">
                <Checkbox id="stock" />
                <Label htmlFor="stock" className="text-sm">
                  {marca.nombre}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Precio */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-blue-900 font-medium">
            <span>Precio</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <Slider
              value={priceRange}
              min={0}
              max={100000}
              step={1}
              onValueChange={handlePriceRangeChange}
              className="mb-4"
            />
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-sm mr-1">$</span>
                <Input
                  type="number"
                  value={minPrice}
                  onChange={(e) => handleInputChange(e.target.value, "min")}
                  className=" text-xs"
                />
              </div>
              <span className="text-sm">-</span>
              <div className="flex items-center">
                <span className="text-sm mr-1">$</span>
                <Input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => handleInputChange(e.target.value, "max")}
                  className=" text-xs"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

       
      </div>
    </Card>
  );
};
