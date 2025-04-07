import { MarcaCarousel } from '@/modules/Shoco/Components/Carrusel/Carrusel';
import { getMarcas } from '@/services/marcas/marcas-services';
import React from 'react'


export default async function HomePage() {
  // fetch product
    const resultMarcas = await getMarcas();

  return <main className="container mx-auto">
    <MarcaCarousel marca={resultMarcas.data}/>
    


  </main>
}