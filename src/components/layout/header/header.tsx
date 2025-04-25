import React from "react";
import Navbar from "./navbar";
import { getMarcas } from "@/services/marcas/marcas-services";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { getCategorias } from "@/services/categories/categories-services";
import { getInformacionTienda } from "@/services/informacion-tienda/informacion-tienda-services";
import { auth } from "@/auth";

export const HeaderShop = async () => {
  const informacionTiendaResult = await getInformacionTienda();
  const marcasResult = await getMarcas();
  const categoriaResult = await getCategorias();
  const sesion = await auth();

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
