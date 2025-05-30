"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"

export function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de la cuenta</CardTitle>
        <CardDescription>Actualiza tu información personal y preferencias</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PersonalInfoForm />
        <Separator />
        <PasswordChangeForm />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Guardar cambios
        </Button>
      </CardFooter>
    </Card>
  )
}

function PersonalInfoForm() {
  const fields = [
    { id: "nombre", label: "Nombre", defaultValue: "Juan", type: "text" },
    { id: "apellido", label: "Apellido", defaultValue: "Domínguez", type: "text" },
    { id: "email", label: "Correo electrónico", defaultValue: "juan.dominguez@email.com", type: "email" },
    { id: "telefono", label: "Teléfono", defaultValue: "+52 55 1234 5678", type: "text" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input id={field.id} type={field.type} defaultValue={field.defaultValue} />
        </div>
      ))}
    </div>
  )
}

function PasswordChangeForm() {
  const fields = [
    { id: "password", label: "Cambiar contraseña", placeholder: "Nueva contraseña" },
    { id: "password-confirm", label: "Confirmar contraseña", placeholder: "Confirmar nueva contraseña" },
  ]

  return (
    <>
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input id={field.id} type="password" placeholder={field.placeholder} />
        </div>
      ))}
    </>
  )
}
