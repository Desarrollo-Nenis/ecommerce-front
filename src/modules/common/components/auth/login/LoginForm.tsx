"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { ECOMMERCE_PRIVADO } from "@/contants/auth/ecommerce-privado.constant";

export default function LoginForm({
  onSwitchToRegister,
}: {
  onSwitchToRegister: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // importante, no queremos que redirija automáticamente
    });

    if (res?.error) {
      setErrorMsg("Correo o contraseña incorrectos");
    } else {
      // Aquí puedes redirigir o mostrar éxito
      window.location.href = "/"; // O donde quieras
    }
  };

  
  return (
    <Card className="mx-auto max-w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button className="w-full" type="button" onClick={handleLogin}>
          Iniciar sesión
        </Button>

        <div className="relative mt-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              O continúa con
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={() => signIn("google")}
        >
          <FcGoogle className="mr-2" /> Google
        </Button>
      </CardContent>

      <CardFooter className="flex flex-col">
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </p>
          {ECOMMERCE_PRIVADO ? (
            <div>
              <p className="mt-2 text-sm">¿No tienes una cuenta? </p>
              <span
                // onClick={onSwitchToRegister}
                className="cursor-pointer font-medium text-primary hover:underline"
              >
                Comunicate con soporte
              </span>
            </div>
          ) : (
            <p className="mt-2 text-sm">
              ¿No tienes una cuenta?{" "}
              <span
                onClick={onSwitchToRegister}
                className="cursor-pointer font-medium text-primary hover:underline"
              >
                Regístrate aquí
              </span>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
