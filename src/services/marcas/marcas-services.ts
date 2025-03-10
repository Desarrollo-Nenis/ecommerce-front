import { DataResponse } from "@/interfaces/data/response.interface";
import { Marca } from "@/interfaces/marcas/marca.interface";
import { query } from "@/lib/api/server/strapi";

const BASE_ENDPOINT: string = "marcas";
const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST;

export function getMarcas(): Promise<DataResponse<Marca[]>> {
  return query<DataResponse<Marca[]>>(`${BASE_ENDPOINT}?populate=*`)
    .then((res) => {
      const data: DataResponse<Marca[]> = {
        ...res,
        data: res.data.map((marca) => {
          return {
            ...marca,
            img: { ...marca.img, url: `${STRAPI_HOST}${marca.img?.url}` },
          };
        }) as Marca[],
      };

      return data;
    })
    .catch((error) => {
      console.error(
        "Something terrible happened when getting stock actions: ",
        error
      );
      throw error;
    });
}
