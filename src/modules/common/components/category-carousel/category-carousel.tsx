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
    <Carousel
      className={`w-full pt-4 lg:w-1/2 mx-auto flex justify-center ${className || ""}`}
      opts={{
        align: "center", // Asegura la alineación central en el carrusel
        loop: false,
      }}
    >
      <CarouselContent className="flex justify-center items-center -ml-2 md:-ml-4">
        {categorias.map((item, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-[140px] md:basis-[150px] flex justify-center">
            <Link href={item.nombre || "#"} className="flex flex-col items-center">
              <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100">
                <Image src={item.img?.url || "/placeholder.svg"} alt={item.nombre} fill className="object-cover" />
              </div>
              <span className="mt-2 text-center text-sm font-medium">{item.nombre}</span>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
