"use client";

import { ChevronLeft, Heart, ShoppingCart } from "lucide-react";
import ProductImageGallery from "./product-image-galery";
import { formatCurrency } from "@/lib/formatCurrency";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Descripcion,
  Products,
} from "@/interfaces/products/products.interface";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface ProductDetailProps {
  product: Products;
}

// Función para renderizar el contenido de la descripción
function renderDescription(descripcion: Descripcion[]) {
  return descripcion.map((block, blockIndex) => {
    if (block.type === "paragraph") {
      return (
        <p key={blockIndex} className="mb-4">
          {block.children.map((child, childIndex: number) => {
            if (child.type === "text") {
              // Manejar saltos de línea en el texto
              return child.text
                .split("\n")
                .map((line: string, lineIndex: number) => (
                  <span key={`${childIndex}-${lineIndex}`}>
                    {line}
                    {lineIndex < child.text.split("\n").length - 1 && <br />}
                  </span>
                ));
            }
            return null;
          })}
        </p>
      );
    }
    return null;
  });
}

export function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();

  return (
    <div>
      {/* Navegación de regreso */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a productos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div className="order-2 md:order-1">
          <ProductImageGallery images={product.galleryUrls} />
        </div>

        {/* Detalles del producto */}
        <div className="order-1 md:order-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.nombre}</h1>

              <div className="flex flex-wrap gap-2 mt-2">
                {product.categorias.map((categoria) => (
                  <Badge key={categoria.id}>{categoria.nombre}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {product.subcategorias.map((subcategoria) => (
                  <Badge key={subcategoria.id} variant={"outline"}>
                    {subcategoria.nombre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-primary">
                {formatCurrency(product.precioVenta)}
              </span>
              {product.precioUnitario > product.precioVenta && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatCurrency(product.precioUnitario)}
                </span>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Unidad de medida:{" "}
                {product.unidad_medida.nombreUnidad ||
                  product.unidad_medida.nombre}
              </p>
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Button className="flex-1" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Agregar al carrito
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator />

            <Tabs defaultValue="descripcion">
              <TabsList className="w-full">
                <TabsTrigger value="descripcion" className="flex-1">
                  Descripción
                </TabsTrigger>
                <TabsTrigger value="detalles" className="flex-1">
                  Detalles
                </TabsTrigger>
              </TabsList>
              <TabsContent value="descripcion" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {renderDescription(product.descripcion)}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="detalles" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-sm text-muted-foreground">ID:</div>
                      <div className="text-sm">{product.documentId}</div>

                      <div className="text-sm text-muted-foreground">
                        Categorías:
                      </div>
                      <div className="text-sm">
                        {product.categorias.map((cat) => cat.nombre).join(", ")}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Unidad de medida:
                      </div>
                      <div className="text-sm">
                        {product.unidad_medida.nombreUnidad ||
                          product.unidad_medida.nombre}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Fecha de publicación:
                      </div>
                      <div className="text-sm">
                        {new Date(product.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
