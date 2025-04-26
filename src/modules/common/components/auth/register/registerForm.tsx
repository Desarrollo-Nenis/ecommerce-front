"use client"

import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import Alert from "@/components/ui/alertSwal"

import { RegisterFormData, registerFormSchema } from "./schema"

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods

  const [alert, setAlert] = useState<{
    message: string
    type: "error" | "success" | "info" | "warning"
  } | null>(null)

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data)

    setAlert({
      message: "¡Registro exitoso! Tu cuenta ha sido creada correctamente",
      type: "success",
    })

    reset() // Limpia el formulario después de registrar
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[400px] mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Crear cuenta</CardTitle>
          <CardDescription>Ingresa tus datos para registrarte</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}

          <FormProvider {...methods}>
            <Form {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre(s)</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl>
                          <Input placeholder="Pérez" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full mt-2" type="submit" disabled={isSubmitting}>
                  Registrarse
                </Button>
              </form>
            </Form>
          </FormProvider>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setAlert({
                message: "Iniciando sesión con Google...",
                type: "info",
              })
              signIn("google")
            }}
            className="flex items-center justify-center gap-2"
          >
            <FcGoogle className="h-5 w-5" /> Google
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col">
          <p className="text-xs text-center text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <span
              onClick={onSwitchToLogin}
              className="underline underline-offset-4 hover:text-primary cursor-pointer"
            >
              Iniciar sesión
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterForm
