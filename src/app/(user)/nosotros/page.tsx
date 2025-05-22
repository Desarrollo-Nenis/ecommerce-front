import Image from "next/image";
import { getInfoEcommerce } from "@/services/informacion-tienda/informacion-tienda-services";
import * as Icons from "lucide-react";
import Link from "next/link";
import { getGoogleMapsEmbedUrl } from "@/lib/maps/frame";
import ImageLightbox from "./ImageLightbox";

export default async function AboutUsPage() {
  const { data: infoEcommerce } = await getInfoEcommerce();
  console.log(infoEcommerce.direcciones[0].imagenes);

  return (
    <main className="container mx-auto flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {infoEcommerce.nosotros.nombreEmpresa}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {infoEcommerce.nosotros.eslogan
                  ? infoEcommerce.nosotros.eslogan
                  : "texto eslogan"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Nuestra Historia
              </h2>
              <p className="text-muted-foreground md:text-lg">
                {infoEcommerce.nosotros.historia
                  ? infoEcommerce.nosotros.historia
                  : " texto historia Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam, repudiandae!"}
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              {infoEcommerce.nosotros.imagenHistoria.url && (
                <Image
                  src={infoEcommerce.nosotros.imagenHistoria.url}
                  alt="Imagen de la empresa"
                  width={1280}
                  height={720}
                  className="object-cover"
                />
              )}
            </div>infoEcommerce
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Nuestros Valores
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Los principios que guían nuestro trabajo diario y nuestras
                decisiones.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 text-center">
              <div className="rounded-full bg-primary p-2 text-primary-foreground">
                <Icons.Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Excelencia</h3>
              <p className="text-sm text-muted-foreground">
                Nos esforzamos por superar las expectativas en todo lo que
                hacemos.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 text-center">
              <div className="rounded-full bg-primary p-2 text-primary-foreground">
                <Icons.Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Trabajo en Equipo</h3>
              <p className="text-sm text-muted-foreground">
                Colaboramos para lograr resultados excepcionales para nuestros
                clientes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 text-center">
              <div className="rounded-full bg-primary p-2 text-primary-foreground">
                <Icons.Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Innovación</h3>
              <p className="text-sm text-muted-foreground">
                Buscamos constantemente nuevas formas de mejorar y crecer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Nuestra Ubicación
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Visítanos y descubre todo lo que tenemos para ofrecerte.
              </p>
            </div>
          </div>

          {infoEcommerce.direcciones.map((direccion) => (
            <div
              key={direccion.coordenadas}
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mt-8"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <ImageLightbox images={direccion.imagenes} />
              </div>

              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  {/* Aquí puedes integrar un mapa de Google Maps o similar */}
                  {direccion.urlFrame?.includes("<iframe") ? (
                    <div
                      className="absolute inset-0"
                      dangerouslySetInnerHTML={{
                        __html: direccion.urlFrame,
                      }}
                    />
                  ) : (
                    <iframe
                      src={
                        getGoogleMapsEmbedUrl(direccion?.coordenadas) ||
                        direccion.urlFrame
                      }
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      className="absolute inset-0"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icons.MapPin className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {direccion.direccion}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Clock className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">{direccion.horario}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Phone className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {direccion.numero || infoEcommerce.numeroGeneral}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Mail className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {direccion.correo || infoEcommerce.correoGeneral}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Nuestro Equipo
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Conoce a las personas que hacen posible nuestra misión.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            {infoEcommerce.nosotros.personal.map((persona) => (
              <div
                key={persona.id}
                className="flex flex-col items-center space-y-4"
              >
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={persona.img.url}
                    alt="Foto de miembro del equipo"
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">{persona.nombre}</h3>
                  <p className="text-sm text-muted-foreground">
                    {persona.puesto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Redes Sociales */}
      <section className="w-full py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Síguenos</h2>
        <div className="flex justify-center gap-6">
          {infoEcommerce.redesSociales?.map((red) => {
            return (
              <Link href={red.url} key={red.url}>
                <Image
                  width={40}
                  height={40}
                  src={red.icono.url}
                  alt={red.nombreRedSocial}
                  className="w-7 h-7 hover:scale-125 hover:shadow-2xl hover:text-primary duration-300 transition-transform transform"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
