import { MarcaCarousel } from '@/modules/Shoco/components/Carrusel/Carrusel';
import {  } from '@/modules/Shoco/components/Carrusel/Carrusel';
import { MarcaCard } from '@/modules/Shoco/components/ProductCard/ProductCard';
import { getProducts } from '@/services/products/products-services';
import { getMarcas } from '@/services/marcas/marcas-services';
import React from 'react'


export default async function HomePage() {
  // fetch product
    const resultMarcas = await getMarcas();

  return <main className="container mx-auto">
    <MarcaCarousel marca={resultMarcas.data}/>
    


  </main>
}