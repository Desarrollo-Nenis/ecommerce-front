import { BACKEND_ROUTES } from "@/contants/backend-routes/routes";
import { DataResponse } from "@/interfaces/data/response.interface";
import { InformacionTienda } from "@/interfaces/informacion-tienda/informacion-tienda";
import { query } from "@/lib/api/server/strapi";

const BASE_ENDPOINT: string = BACKEND_ROUTES.INFORMATION_ECOMMERCE;
const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;

export function getInformacionTienda(): Promise<
  DataResponse<InformacionTienda>
> {
  return query<DataResponse<InformacionTienda>>(`${BASE_ENDPOINT}?populate=*`)
    .then((res) => {
      const dataMap: InformacionTienda = {
        ...res.data,
        logo: { ...res.data.logo, url: `${STRAPI_HOST}${res.data.logo.url}` },
      };
      return { ...res, data: dataMap };
    })
    .catch((error) => {
      console.error(
        "Something terrible happened when getting stock actions: ",
        error
      );
      throw error;
    });
}
