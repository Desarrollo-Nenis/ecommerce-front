import React from "react";
import Navbar from "./navbar";
import { getMarcas } from "@/services/marcas/marcas-services";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { getCategorias } from "@/services/categories/categories-services";
import { getInformacionTienda } from "@/services/informacion-tienda/informacion-tienda-services";
import { auth } from "@/auth";
import { Categoria } from "@/interfaces/categories/categories.interface";

export const HeaderShop = async () => {
  const informacionTiendaResult = await getInformacionTienda();
  const marcasResult = await getMarcas();
  // const categoriaResult = await getCategorias();
  const sesion = await auth();

  const categoriaResult: { data: Categoria[] } = {
    data: [
      {
        id: 1,
        nombre: "Ropa",
        slug: "ropa",
      },
      {
        id: 2,
        nombre: "Electrónica",
        slug: "electronica",
      },
      {
        id: 3,
        nombre: "Hogar y Cocina",
        slug: "hogar-cocina",
      },
      {
        id: 4,
        nombre: "Juguetes",
        slug: "juguetes",
      },
    ],
  };

  return (
    <header className="">
      <div className="">
        <Navbar
          informacionTienda={informacionTiendaResult.data}
          marcas={marcasResult.data}
          categorias={categoriaResult.data}
          session={sesion}
        ></Navbar>
        <div className="container mx-auto  pt-20">
          <BreadcrumbNav></BreadcrumbNav>
        </div>
      </div>
    </header>
  );
};
