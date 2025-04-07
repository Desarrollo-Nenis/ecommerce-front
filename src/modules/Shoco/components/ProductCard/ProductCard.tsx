import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Products } from "@/interfaces/products/products.interface";
import { Marca } from "@/interfaces/marcas/marca.interface";

interface MarcaCardProps {
  marca: Marca
}

export function MarcaCard({ marca }: MarcaCardProps) {
  return (
    <Card className="h-[500px] w-[150px] justify-center
    flex gap-2 hover:[&>*]:w-[80px]">
      <AspectRatio ratio={9 / 16} className="relative w-full h-full ">
        <Image 
          src={marca.img?.url || "/imgs/marca/default-img.png"}
          alt={marca.nombre}
          width={300}
          height={300}

          className="object-cover  "
        />
        {
          // DE AQUI HACIA ABAJO SON TAILDWIND PARA EL NOMBRE 
          // DE LA MARCA O LA DESCRIPCION DEL PRODUCTO 
        }
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-500 hover:opacity-100">
          <h3 className="text-[#000000] font-semibold text-center text-2xl ">{marca.nombre}</h3>
        </div>
      </AspectRatio>
    </Card>
  );
}
