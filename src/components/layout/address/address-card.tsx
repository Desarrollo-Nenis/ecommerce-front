"use client";

import { Home, MapPin, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Address } from "@/interfaces/directions/directions.interface";
import { AddressDialog } from "./address-dialog";

interface AddressCardProps {
  address: Address;
}

export function AddressCard({ address }: AddressCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-medium">{address.nombreRecibe || "Dirección"}</h3>
          {address.principal && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Principal
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <div className="text-sm">
            <p>
              {address.calle} {address.numeroExterior}
              {address.numeroInterior && `, Int. ${address.numeroInterior}`}
            </p>
            <p>
              {address.ciudad}, {address.estado}, CP {address.codigoPostal}
            </p>
            {address.referencia && (
              <p className="mt-1 italic">{address.referencia}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <div className="flex gap-2">
          {!address.principal && (
            <Button className="cursor-pointer" variant="outline" size="sm">
              Establecer como principal
            </Button>
          )}
          <AddressDialog address={address}>
            <Button className="cursor-pointer" variant="outline" size="sm">
              <Edit className="mr-2 h-3.5 w-3.5" />
              Editar
            </Button>
          </AddressDialog>
          {/* <Button variant="outline" size="sm" onClick={onDelete}> */}
          <Button className="cursor-pointer" variant="outline" size="sm">
            <Trash2 className="mr-2 h-3.5 w-3.5" />
            Eliminar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
