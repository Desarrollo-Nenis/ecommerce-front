"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MarcaCard } from "@/modules/Shoco/Components/ProductCard/ProductCard";
import { Products } from "@/interfaces/products/products.interface";
import { Marca } from "@/interfaces/marcas/marca.interface";

interface MarcaCarouselProps {
  marca: Marca[]
}

export function MarcaCarousel({ marca }: MarcaCarouselProps) {
  return ( 
    <Carousel className=" max-w-4xl  bg-amber-700">
      <CarouselContent className="flex overflow-visible ">
        {marca.map((marca, index) => (
          <CarouselItem
            key={index}
           
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 p-2">
                
            <MarcaCard marca ={marca} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
