import { ConfiguracionPago, ConfiguracionPagoStrapi } from "@/interfaces/configuracion-pago/configuracion-pago.interface"
import { DataResponse } from "@/interfaces/data/response.interface"
import { query } from "@/lib/api/server/strapi"
import { CANTIDAD_MIN_ENVIO_GRATIS, COSTO_ENVIO, PORCENTAJE_IMPUESTOS } from "@/contants/precio-taxes-envio.constant";

const BASE_ENDPOINT = "configuracion-pago"

const ENV_DEFAULTS: ConfiguracionPago = {
    
  cantidadMinEnvioGratis:CANTIDAD_MIN_ENVIO_GRATIS,
  porcentajeImpuestos:PORCENTAJE_IMPUESTOS,
  costoEnvio: COSTO_ENVIO,
}

export async function getConfiguracionPago(): Promise<ConfiguracionPago> {
  try {
    const res = await query<DataResponse<ConfiguracionPagoStrapi>>(`${BASE_ENDPOINT}?populate=*`)
    return {
      porcentajeImpuestos: res.data?.porcentajeImpuestos ?? ENV_DEFAULTS.porcentajeImpuestos,
      cantidadMinEnvioGratis: res.data?.cantidadMinEnvioGratis ?? ENV_DEFAULTS.cantidadMinEnvioGratis,
      costoEnvio: res.data?.costoEnvio ?? ENV_DEFAULTS.costoEnvio,
    }
  } catch (error) {
    console.error("Error cargando configuración desde Strapi:", error)
    return ENV_DEFAULTS
  }
}
