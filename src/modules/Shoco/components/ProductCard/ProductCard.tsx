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
    <Card className="hover:z-0 relative flex flex-col overflow-hidden rounded-lg h-[500px] w-[200px] transition-all duration-500 ease-in-out hover:w-[250px] hover:shadow-xl hover:-translate-y-4 cursor-pointer ">
      <AspectRatio ratio={9 / 16} className="relative w-full h-full">
        <Image 
          src={marca?.coverUrl || "/imgs/products/default-img.png"}
          alt={marca.nombre}
          width={300}
          height={300}

          className="object-cover "
        />
        {
          // DE AQUI HACIA ABAJO SON TAILDWIND PARA EL NOMBRE 
          // DE LA MARCA O LA DESCRIPCION DEL PRODUCTO 
        }
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-500 hover:opacity-100">
          <h3 className="text-[#000000] text-lg font-semibold ">{marca.nombre}</h3>
        </div>
      </AspectRatio>
    </Card>
  );
}
