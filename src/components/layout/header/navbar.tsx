"use client";

import Link from "next/link";
import { Menu, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marca } from "@/interfaces/marcas/marca.interface";
import Image from "next/image";
import { Categoria } from "@/interfaces/categories/categories.interface";
import { Card } from "@/components/ui/card";
import { InformacionTienda } from "@/interfaces/informacion-tienda/informacion-tienda";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBar } from "../search-bar/SearchBar";

import { AvatarDropdown } from "../avatar-dropdown/AvatarDropdown";
import { ButtonLogin } from "@/modules/common/components/auth/login/ButtonLogin";
import { Session } from "next-auth";
import { FRONTEND_ROUTES } from "../../../contants/frontend-routes/routes";
import { useEffect } from "react";
import { useCartStore } from "@/store/products-cart.store";

interface NavbarProps {
  marcas: Marca[];
  categorias: Categoria[];
  informacionTienda: InformacionTienda;
  session: Session | null;
}
export default function Navbar({
  marcas,
  categorias,
  informacionTienda,
  session,
}: NavbarProps) {

  const { loadCart } = useCartStore();

  useEffect(() => {
    loadCart();
  }, []);
  
  return (
    <Card className="border  fixed top-0 left-0 w-full z-50 ">
      <div className="container flex h-16 items-center px-4">
        {/* sidebar movil */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] flex flex-col h-full"
          >
            {/* Header con título */}
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex flex-row items-center gap-2">
                  <Image
                    src={informacionTienda.logo.url}
                    width={100}
                    height={100}
                    alt="logo"
                  />

                  {/* <span className="font-semibold">{informacionTienda.nombre}</span> */}
                </Link>
              </SheetTitle>
            </SheetHeader>

            {/* Contenido Principal Scrollable con ScrollArea */}
            <ScrollArea className="flex-1 overflow-y-auto">
              <nav className="flex flex-col gap-4 px-4 py-2">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      Marcas
                      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {marcas.map((marca) => (
                      <Button
                        key={marca.nombre}
                        asChild
                        variant="ghost"
                        className="w-full justify-start pl-4"
                      >
                        <Link href={marca.nombre}>{marca.nombre}</Link>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </nav>
            </ScrollArea>

            {/* Sección de Usuario Fija */}
            <div className="border-t pt-4 bg-background sticky bottom-0">
              {/* Avatar */}

              <div className="flex flex-row justify-between">
                <div className="flex items-center gap-3 mb-4 px-4">
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image || "/placeholder-avatar.jpg"}
                      alt="@username"
                    />
                    <AvatarFallback>
                      <User className="h-5 w-5 " />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">@username</span>
                </div>
                <div className="">
                  <ThemeToggle />
                </div>
              </div>
              {/* Opciones de Usuario */}
              <div className="px-4">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/profile">Perfil</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/orders">Pedidos</Link>
                </Button>

                <Button
                  variant="link"
                  className="w-full justify-start mt-2"
                  onClick={() => console.log("Cerrar sesión")}
                >
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* navbar desktop */}
        <div className="flex flex-row   container gap-2">
          <Link href="/" className="hidden md:flex items-center  gap-2 mr-6">
            <Image
              src={informacionTienda.logo.url}
              width={100}
              height={100}
              alt="logo"
            />
            {/* <span className="font-semibold inline-block">{informacionTienda.nombre}</span> */}
          </Link>
          <NavigationMenu className="hidden md:flex ">
            <NavigationMenuList>
              {/* <NavigationMenuItem>
                <Link href="/main" legacyBehavior passHref>
                  <NavigationMenuLink className="font-semibold">Inicio</NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categorias.map((categoria) => (
                      <li key={categoria.nombre}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`${FRONTEND_ROUTES.CATEGORIA}/${categoria.nombre}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {categoria.nombre}
                            </div>
                            {categoria.subcategorias && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {categoria.subcategorias
                                  .map((subcategoria) => subcategoria.nombre)
                                  .join(",  ")}
                              </p>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Marcas</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {marcas.map((marca) => (
                      <li key={marca.nombre}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`${FRONTEND_ROUTES.MARCA}/${marca.nombre}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {/* <div className="text-sm font-medium leading-none">
                            {marca.nombre}
                          </div> */}
                            {marca.img && (
                              <Image
                                src={marca.img?.url}
                                width={100}
                                height={100}
                                alt={marca.nombre}
                              />
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

               <NavigationMenuItem>
                <Link href="/nosotros" legacyBehavior passHref>
                  <NavigationMenuLink className="font-semibold">Sobre Nosotros</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* search */}
          <SearchBar />
          <div className=" flex flex-row items-center gap-2">
            {/* avatar */}
            <AvatarDropdown avatarUrl={session?.user?.image} />
            {/* toggle theme */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <ButtonLogin session={session}></ButtonLogin>
          </div>
        </div>
      </div>
    </Card>
  );
}
