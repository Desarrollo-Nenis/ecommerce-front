import CategoryCarousel from "@/modules/common/components/category-carousel/category-carousel";
import { MainCarousel } from "@/modules/common/components/main-carousel/main-carousel";
import { ProductCarousel } from "@/modules/common/components/product-carousel/product-carousel";
import { MainCarouselItem } from "@/modules/common/interface/main-carousel";
import { getCategorias } from "@/services/categories/categories-services";
import { getAllProducts } from "@/services/products/products-services";

export default async function Home() {
  // fetch product
  const resultProducts = await getAllProducts();
  const resultcategorias = await getCategorias();
  const banners: MainCarouselItem[] = [
    {
      id: "1",
      imageUrl: "/imgs/carrucel/main-carrucel-1.webp",
      link: "/promociones",
      title: "Renueva tu celular",
      subtitle: "¡Hasta 40% de descuento!",
    },
    {
      id: "2",
      imageUrl: "/imgs/carrucel/main-carrucel-2.webp",
      link: "/ofertas",
      title: "Hasta 15 MSI pagando con...",
      subtitle: "Aprovecha nuestras promociones",
    },
    {
      id: "3",
      imageUrl: "/imgs/carrucel/main-carrucel-5.webp",
      link: "/ofertas",
      title: "",
      subtitle: "",
    },
    {
      id: "4",
      imageUrl: "/imgs/carrucel/main-carrucel-7.webp",
      link: "/ofertas",
      title: "Hasta 15 MSI pagando con...",
      subtitle: "",
    },
    // ... más banners
  ];
  return (
    <main className="container mx-auto ">
      <div>
        {/* Carrusel principal */}
        <MainCarousel banners={banners} />

        {/* Carrusel category */}
        <CategoryCarousel categorias={resultcategorias.data} />

        {/* Carrusel de productos (ya existente) */}
        <ProductCarousel products={resultProducts.data} title="Más vendidos" />
      </div>
    </main>
  );
}
