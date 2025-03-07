"use client";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel";
import { Categoria } from "@/interfaces/categories/categories.interface";

interface CategoryCarouselProps {
  categorias: Categoria[];
  className?: string;
}

export default function CategoryCarousel({ categorias, className }: CategoryCarouselProps) {
  return (
    <div className={`relative w-full lg:w-1/2 mx-auto ${className || ""}`}>
      {/* Agregamos el efecto de fade en los extremos */}
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white via-transparent to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white via-transparent to-transparent pointer-events-none z-10"></div>

      <Carousel
        className="w-full pt-4 flex justify-center overflow-hidden"
        opts={{
          align: "center",
          loop: false,
        }}
      >
        <CarouselContent className="flex justify-center items-center -ml-2 md:-ml-4">
          {categorias.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-[140px] md:basis-[150px] flex justify-center">
              <Link href={item.nombre || "#"} className="flex flex-col items-center">
                <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100 shadow-lg">
                  <Image src={item.img?.url || "/placeholder.svg"} alt={item.nombre} fill className="object-cover" />
                </div>
                <span className="mt-2 text-center text-sm font-medium">{item.nombre}</span>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}
