"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Address } from "@/interfaces/directions/directions.interface";
import { formatAddress } from "@/lib/formatAddress";

interface AddressStepProps {
  addresses: Address[];
}

export function AddressStep({ addresses }: AddressStepProps) {
  const [selectedAddress, setSelectedAddress] = useState<string>();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const primary = addresses.find((addr) => addr.principal);
    if (primary) setSelectedAddress(primary.documentId);
  }, [addresses]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Dirección de envío</h2>

      <Select
        value={selectedAddress}
        onValueChange={(value) => {
          if (value === "add-new") {
            setOpenDialog(true);
          } else {
            setSelectedAddress(value);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una dirección" />
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(addresses) &&
            addresses.map((addr) => (
              <SelectItem key={addr.id} value={addr.id.toString()}>
                {formatAddress(addr)}
              </SelectItem>
            ))}
          <SelectItem value="add-new">➕ Agregar nueva dirección</SelectItem>
        </SelectContent>
      </Select>

      {/* {openDialog && <AddressDialog onClose={() => setOpenDialog(false)} />} */}
    </div>
  );
}
