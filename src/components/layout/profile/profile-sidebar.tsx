"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, MapPin, Phone, Mail, Edit, ShoppingBag } from "lucide-react"

export function ProfileSidebar() {
  return (
    <Card className="md:col-span-2 lg:col-span-1">
      <CardHeader className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-3 shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-background">
          <AvatarImage src="/imgs/default/user.webp?height=96&width=96" alt="Foto de perfil" />
          <AvatarFallback className="bg-orange-50 text-orange-600 font-semibold text-lg">EC</AvatarFallback>
        </Avatar>
        <CardTitle>Eric Carballo</CardTitle>
        <CardDescription>Cliente desde 2022</CardDescription>
        <Badge className="mt-2 bg-blue-500 hover:bg-blue-600">Cliente Frecuente</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <ContactInfo />
        <Separator />
        <ActivitySummary />
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Edit className="mr-2 h-4 w-4" />
          Editar Perfil
        </Button>
      </CardFooter>
    </Card>
  )
}

function ContactInfo() {
  const contactDetails = [
    { icon: <Mail className="h-4 w-4 text-muted-foreground" />, text: "ericjasiel.11@gmail.com" },
    { icon: <Phone className="h-4 w-4 text-muted-foreground" />, text: "+52 55 1234 5678" },
    { icon: <MapPin className="h-4 w-4 text-muted-foreground" />, text: "Ciudad de México, México" },
  ]

  return (
    <>
      {contactDetails.map((detail, index) => (
        <div key={index} className="flex items-center gap-2">
          {detail.icon}
          <span className="text-sm">{detail.text}</span>
        </div>
      ))}
    </>
  )
}

function ActivitySummary() {
  const activities = [
    {
      icon: <ShoppingBag className="h-4 w-4 mb-1" />,
      count: "24",
      label: "Compras",
    },
    {
      icon: <Heart className="h-4 w-4 mb-1 text-red-500" />,
      count: "12",
      label: "Favoritos",
    },
  ]

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Resumen</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {activities.map((activity, index) => (
          <div key={index} className="flex flex-col items-center p-2 bg-muted rounded-md">
            {activity.icon}
            <span className="font-bold">{activity.count}</span>
            <span className="text-xs text-muted-foreground">{activity.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
