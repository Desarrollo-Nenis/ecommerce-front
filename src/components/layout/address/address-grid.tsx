"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressCard } from "./address-card";
import { AddressDialog } from "./address-dialog";
import { Address } from "@/interfaces/directions/directions.interface";
import { Session } from "next-auth";

interface AddressGridProps {
  address: Address[];
  session: Session;
}

export default function AddressGrid({ address, session }: AddressGridProps) {
  const [addresses] = useState<Address[]>(address);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis direcciones</h1>
        <AddressDialog
          userId={session.user?.user.documentId}
        >
          <Button className="flex items-center gap-2 cursor-pointer">
            <PlusCircle className="h-4 w-4" />
            Agregar nueva dirección
          </Button>
        </AddressDialog>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            No tienes direcciones guardadas
          </p>
          <AddressDialog 
            userId={session.user?.user.documentId}
          >
            <Button variant="link" className="mt-2 cursor-pointer">
              Agregar una dirección
            </Button>
          </AddressDialog>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      )}
    </div>
  );
}
