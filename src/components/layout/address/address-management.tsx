"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Address } from "@/interfaces/directions/directions.interface";
import { AddressCard } from "./address-card";
import { AddressDialog } from "./address-dialog";

interface AddressManagementProps {
  address: Address[];
}

export default function AddressManagement({ address }: AddressManagementProps) {
  const [addresses, setAddresses] = useState<Address[]>(address);
  const [open, setOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis direcciones</h1>
        <AddressDialog>
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
          <AddressDialog>
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
