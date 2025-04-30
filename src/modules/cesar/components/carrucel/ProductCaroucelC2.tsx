"use client"
import { Products } from "@/interfaces/products/products.interface";
import "@/modules/cesar/styles/caroucelC2.css"
import { useEffect, useRef, useState } from "react";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import { ProductCardC2 } from "../productCard/ProductCardC2";
import Image from "next/image";

interface ProductCarouselProps {
  products: Products[];
}

export function ProductCaroucelC2({ products }: ProductCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    products.length > 0 ? products[0].coverUrl : null
  );
  const [isDown, setIsDown] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    if (sliderRef.current) {
      sliderRef.current.classList.add('active'); // Para efectos visuales (cursor, etc.)
      setStartY(e.pageY - sliderRef.current.offsetTop);
      setScrollTop(sliderRef.current.scrollTop);
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
    const y = e.pageY - sliderRef.current.offsetTop;
    const walk = (y - startY) * 1;
    sliderRef.current.scrollTop = scrollTop - walk;
  };

  return (
    <article className='caroucel2Cesar'>
      <div className="caroucel2asideCesar">
        <div
          className='caroucel2ContentCesar'
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          ref={sliderRef}>
          {
            products.map((product, index) => {
              return (
                <ProductCardC2
                  product={product}
                  key={product.id}
                  onImageClick={handleImageClick}
                  isSelected={selectedImage === product.coverUrl}
                />
              )
            })
          }
        </div>
        <div className='arrow'>↓</div>
      </div>
      {selectedImage && (
        <div className="selectedImageContainerC2">
          <Image
            src={selectedImage || "/imgs/products/default-img.png"}
            alt="selectedImage"
            width={300}
            height={300}
            draggable={false}
          />
        </div>
      )}
    </article>
  )
}