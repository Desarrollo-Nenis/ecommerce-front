import Image from "next/image";
import { MapPin, Clock, Phone, Mail, Users, Award, Target, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";


export default function AboutUsPage() {

    const redes = [
        {
          icon: Facebook,
          url: "https://facebook.com",
          nombre: "Facebook",
        },
        {
          icon: Instagram,
          url: "https://instagram.com",
          nombre: "Instagram",
        },
        {
          icon: Twitter,
          url: "https://twitter.com",
          nombre: "Twitter",
        },
        {
          icon: Linkedin,
          url: "https://linkedin.com",
          nombre: "LinkedIn",
        },
      ]
  return (
    <main className="container mx-auto flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Nombre de la Empresa
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Comprometidos con la excelencia desde [año de fundación].
                Ofrecemos [productos/servicios] de la más alta calidad.
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
                Fundada en [año], Nombre de la Empresa comenzó con una visión
                clara: [descripción de la visión inicial]. A lo largo de los
                años, hemos crecido y evolucionado, pero nuestro compromiso con
                [valores principales] se ha mantenido inquebrantable.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Hoy, somos líderes en [industria/sector], sirviendo a clientes
                en [áreas geográficas] y ofreciendo soluciones innovadoras que
                [beneficios principales para los clientes].
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="Imagen de la empresa"
                width={1280}
                height={720}
                className="object-cover"
              />
            </div>
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
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Excelencia</h3>
              <p className="text-sm text-muted-foreground">
                Nos esforzamos por superar las expectativas en todo lo que
                hacemos.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 text-center">
              <div className="rounded-full bg-primary p-2 text-primary-foreground">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Trabajo en Equipo</h3>
              <p className="text-sm text-muted-foreground">
                Colaboramos para lograr resultados excepcionales para nuestros
                clientes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 text-center">
              <div className="rounded-full bg-primary p-2 text-primary-foreground">
                <Target className="h-6 w-6" />
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
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mt-8">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Foto del local"
                width={600}
                height={600}
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                {/* Aquí puedes integrar un mapa de Google Maps o similar */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-0.0!3d0.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMDDCsDAn!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Calle Principal #123, Ciudad, País
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 9:00 - 18:00 | Sábados: 9:00 - 13:00
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">+1 234 567 890</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    info@nombredelaempresa.com
                  </p>
                </div>
              </div>
            </div>
          </div>
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
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Foto de miembro del equipo"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Nombre Apellido</h3>
                <p className="text-sm text-muted-foreground">
                  Director/a General
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Foto de miembro del equipo"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Nombre Apellido</h3>
                <p className="text-sm text-muted-foreground">
                  Director/a de Operaciones
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Foto de miembro del equipo"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Nombre Apellido</h3>
                <p className="text-sm text-muted-foreground">
                  Director/a de Marketing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Redes Sociales */}
      <section className="w-full py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Síguenos</h2>
        <div className="flex justify-center gap-6">
          {redes.map((red, i) => (
            <a
              key={i}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={red.nombre}
              className="text-muted-foreground hover:text-primary transition"
            >
              <red.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
