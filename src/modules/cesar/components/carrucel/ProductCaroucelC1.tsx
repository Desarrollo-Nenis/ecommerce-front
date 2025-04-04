"use client"
import { Products } from "@/interfaces/products/products.interface";
import { ProductCardC1 } from "@/modules/cesar/components/productCard/ProductCardC1";
import "@/modules/cesar/styles/caroucelC1.css"
import { useEffect, useRef, useState } from "react";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";

interface ProductCarouselProps {
  products: Products[];
}

export function ProductCaroucelC1({ products }: ProductCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollAmount = 85; // Cantidad de desplazamiento
  const autoScrollInterval = 5000; // Tiempo en ms (3s)

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        console.log(sliderRef.current.scrollLeft);
        console.log(sliderRef.current.clientWidth);

        if (
          sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
          sliderRef.current.scrollWidth
        ) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, autoScrollInterval);

    return () => clearInterval(autoScroll); // Limpiar intervalo al desmontar
  }, [products]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    if (sliderRef.current) {
      sliderRef.current.classList.add('active'); // Para efectos visuales (cursor, etc.)
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    sliderRef.current?.classList.remove('active');
  };

  const handleMouseUp = () => {
    setIsDown(false);
    sliderRef.current?.classList.remove('active');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    if (
      sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
      sliderRef.current.scrollWidth && direction == "right"
    ) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else if (
      sliderRef.current.scrollLeft <= 0 && direction == "left"
    ) {
      sliderRef.current.scrollTo({ left: sliderRef.current.scrollWidth, behavior: "smooth" });
    } else {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <article className='caroucel1Cesar'>
      <button onClick={() => handleScroll("left")}><LuArrowLeft /></button>
      <div
        className='caroucel1ContentCesar'
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
        {
          products.map((product) => (
            <ProductCardC1 product={product} key={product.id} />
          ))
        }
      </div>
      <button onClick={() => handleScroll("right")}><LuArrowRight /></button>
    </article>
  )
}
