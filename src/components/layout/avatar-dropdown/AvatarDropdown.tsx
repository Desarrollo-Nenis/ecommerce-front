"use client";

import Link from "next/link";
import { LogOut, Settings, ShoppingCart, User } from "lucide-react";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AvatarDropdownProps {
  avatarUrl?: string | null;
}

export const AvatarDropdown = ({ avatarUrl }: AvatarDropdownProps) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hidden md:flex justify-center items-center"
        >
          <Avatar>
            <AvatarImage
              src={avatarUrl || "/placeholder-avatar.jpg"}
              alt="@username"
            />
            <AvatarFallback>
              <User className="h-7 w-7" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/perfil" className="flex w-full items-center gap-2">
            <User className="w-4 h-4" /> Perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/pedidos" className="flex w-full items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> Pedidos
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/configuracion" className="flex w-full items-center gap-2">
            <Settings className="w-4 h-4" /> Configuración
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            signOut(); // Redirigir tras cerrar sesión
          }}
          className="cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
