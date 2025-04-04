import React from 'react'
import { getProducts } from "@/services/products/products-services";
import { ProductCaroucelC1 } from "@/modules/cesar/components/carrucel/ProductCaroucelC1";
import { ProductCaroucelC2 } from '@/modules/cesar/components/carrucel/ProductCaroucelC2';
export default async function page() {
  const resultProducts = await getProducts();

  return (
    <div style={{display:"flex", flexFlow:"column", alignItems:"center", gap:"25px"}}>
      <h2>Carruceles</h2>
      <ProductCaroucelC1 products={resultProducts.data} />
      <div style={{width:"80vw"}}><hr /></div>
      <ProductCaroucelC2 products={resultProducts.data} />
      <br />
    </div>
  )
}
