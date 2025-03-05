import { DataStockActions } from "@/interfaces/stock-actions/stock-actions.interface";
import { query } from "@/lib/api/server/strapi";

const BASE_ENDPOINT: string = "acciones-stocks"

export function getStockActions(): Promise<DataStockActions> {
  return query<DataStockActions>(`${BASE_ENDPOINT}acciones-stocks?populate=*`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(
        "Something terrible happened when getting stock actions: ",
        error
      );
      throw error;
    });
}
