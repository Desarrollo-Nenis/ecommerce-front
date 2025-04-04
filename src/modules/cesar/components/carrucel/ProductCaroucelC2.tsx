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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <article className='caroucel2Cesar'>
      <div
        className='caroucel2ContentCesar'
        ref={sliderRef}>
        {
          products.map((product, index) => {
            if (index < 5) {
              return (
                <ProductCardC2
                  product={product}
                  key={product.id}
                  onImageClick={handleImageClick}
                  isSelected={selectedImage === product.coverUrl}
                />
              )
            }
          })
        }
        {
          products.length >= 6 ? (
            <div className="cardCaroucelC2 opaque">+Images</div>
          ) : null
        }
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