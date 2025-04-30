import { getConfiguracionPago } from "@/services/configuracion-pago/configuracion-pago.service";
import { create } from "zustand";
import { CANTIDAD_MIN_ENVIO_GRATIS, COSTO_ENVIO, PORCENTAJE_IMPUESTOS } from "@/contants/precio-taxes-envio.constant";

interface ConfigStore {
  cantidadMinEnvioGratis: number;
  porcentajeImpuestos: number;
  costoEnvio: number;
  loadConfig: () => Promise<void>;
}

export const useConfigStore = create<ConfigStore>((set) => ({
  cantidadMinEnvioGratis: CANTIDAD_MIN_ENVIO_GRATIS,
  porcentajeImpuestos: PORCENTAJE_IMPUESTOS,
  costoEnvio: COSTO_ENVIO,

  loadConfig: async () => {
    try {
      const config = await getConfiguracionPago();
      set({
        cantidadMinEnvioGratis: config.cantidadMinEnvioGratis,
        porcentajeImpuestos: config.porcentajeImpuestos,
        costoEnvio: config.costoEnvio,
      });
    } catch (e) {
      console.error("Error al cargar configuración", e);
    }
  },
}));
