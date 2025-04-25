"use client"

import React from "react"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginForm() {
  return (
    <Card className=" mx-auto max-w-[350px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              O continúa con
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" onClick={() => signIn("google")}>
          <FcGoogle className="mr-2" /> Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" type="button">
          Iniciar sesión
        </Button>
        <p className="mt-2 text-xs text-center text-muted-foreground">
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
