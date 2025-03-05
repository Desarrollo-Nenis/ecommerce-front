"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { MainCarouselItem } from "../../interface/main-carousel";

interface MainCarouselProps {
  banners: MainCarouselItem[];
}

export function MainCarousel({ banners }: MainCarouselProps) {
  return (
    <div className="w-full h-full">
      <Carousel className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="relative w-full h-full">
              {/* Enlace opcional, si no hay `link` simplemente no redirige */}
              {banner.link ? (
                <Link href={banner.link} className="block relative w-full h-full">
                  <BannerImage banner={banner} />
                </Link>
              ) : (
                <div className="relative w-full h-full">
                  <BannerImage banner={banner} />
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
        <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}

/**
 * Componente interno para mostrar la imagen y un overlay de texto (opcional).
 */
function BannerImage({ banner }: { banner: MainCarouselItem }) {
  return (
    <>
      <Image
        src={"/imgs/products/default-img.png"}
        alt={banner.title ?? "Banner Image"}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 100vw,
               100vw"
      />
      {/* Overlay de texto opcional */}
      {(banner.title || banner.subtitle) && (
        <div className="absolute inset-0 flex flex-col justify-center items-start p-4 md:p-8 bg-black/30 text-white">
          {banner.title && <h2 className="text-xl md:text-3xl font-bold mb-2">{banner.title}</h2>}
          {banner.subtitle && <p className="text-sm md:text-lg">{banner.subtitle}</p>}
        </div>
      )}
    </>
  );
}
