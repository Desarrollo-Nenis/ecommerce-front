"use client";

import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const addresses = [
  { id: "1", label: "Casa - Calle 123, CDMX", isPrimary: true },
  { id: "2", label: "Oficina - Av. Reforma 456, CDMX", isPrimary: false },
];

export function AddressStep() {
  const [selectedAddress, setSelectedAddress] = useState<string>();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const primary = addresses.find((addr) => addr.isPrimary);
    if (primary) setSelectedAddress(primary.id);
  }, []);

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
          {addresses.map((addr) => (
            <SelectItem key={addr.id} value={addr.id}>
              {addr.label}
            </SelectItem>
          ))}
          <SelectItem value="add-new">
            ➕ Agregar nueva dirección
          </SelectItem>
        </SelectContent>
      </Select>

      {/* <AddressDialog /> */}
    </div>
  );
}
