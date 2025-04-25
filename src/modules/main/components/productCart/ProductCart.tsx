import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Products } from "@/interfaces/products/products.interface";
import Link from "next/link";

interface ProductCardProps {
  product: Products;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/producto/${product.id}`} className="w-full h-full">
    <Card className="flex flex-col overflow-hidden shadow-md rounded-lg h-full  ">
      <CardHeader className="p-0 flex-shrink-0 bg-gray-100"></CardHeader>
      <CardContent className="flex-grow p-4 flex flex-col">
          <AspectRatio ratio={1 / 1} className="bg-white">
            <Image
              src={product?.coverUrl || "/imgs/products/default-img.png"}
              alt={product.nombre}
              width={300}
              height={300}
              className="object-cover transition-transform duration-300 hover:scale-105 rounded-md"
            />
          </AspectRatio>
          <div className="mt-2 flex flex-col flex-grow">
            <h3 className="font-semibold text-sm line-clamp-1">
              {product.nombre}
            </h3>
            <p className="text-sm text-gray-600 mt-1 break-words line-clamp-2">
              {product.descripcion[0]?.children[0]?.text || "Sin descripción"}
            </p>
          </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center  text-sm text-gray-500">
        <span>{product.unidad_medida?.nombreUnidad}</span>
      </CardFooter>
    </Card>
    </Link>
  );
}
