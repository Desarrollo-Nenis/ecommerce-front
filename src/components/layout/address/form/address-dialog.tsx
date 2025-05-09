"use client";

import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Address } from "@/interfaces/directions/directions.interface";
import { addressFormSchema, AddressFormValues } from "../schema/address-schema";
import { DialogTrigger } from "@/components/ui/dialog";
import { createDirection, updateDirection } from "@/services/directions/directions-services";
import { showToastAlert } from "@/components/ui/altertas/toast";
import { AddressInput } from "./address-inputs";
import { AddressTxtArea } from "./address-area";

interface AddressDialogProps {
  address?: Address | null;
  children: ReactNode;
  userId?: string | undefined;
  onRefreshCard?: () => void;
}

export function AddressDialog({ address, children, userId, onRefreshCard }: AddressDialogProps) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      calle: "",
      ciudad: "",
      estado: "",
      codigoPostal: "",
      numeroExterior: "",
      numeroInterior: null,
      referencia: "",
      nombreRecibe: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      form.reset(address);
    } else {
      form.reset({
        calle: "",
        ciudad: "",
        estado: "",
        codigoPostal: "",
        numeroExterior: "",
        numeroInterior: null,
        nombreRecibe: "",
        referencia: "",
      });
      setIsEditing(true);
    }
  }, [address, form]);

  useEffect(() => {
    if (address) {
      const isModified = Object.keys(form.getValues()).some(
        (key) => form.getValues()[key] !== address[key]
      );
      setIsEditing(isModified);
    }
  }, [form.getValues(), address]);

  function onSubmit(values: AddressFormValues) {
    setLoading(true);
    const newAddress: Address = {
      ...values,
    };

    if (!address) {
      //? Crear nueva dirección
      createDirection(newAddress, userId!)
        .then((res) => {
          setLoading(false);
          form.reset();
          showToastAlert({
            title: "Dirección Creada",
            text: "La dirección se ah agregado correctamente.",
            icon: "success",
            position: "bottom-end",
            toast: true,
          });
          onRefreshCard();
        })
        .catch((err: any) => {
          console.error("Error al crear dirección:", err.message);
        });
    } else {
      //? EDITAR UNA DIRECCIÓN
      const { id, updatedAt, createdAt, publishedAt, ...payload } = newAddress;
      setLoading(false);
      updateDirection(address.documentId!, payload).then(() => {
        showToastAlert({
          title: "Dirección Actualizada",
          text: "La dirección se ah actualizado correctamente.",
          icon: "success",
          position: "bottom-end",
          toast: true,
        });
        onRefreshCard();
      });
    }
  }

  const isFormValid = form.formState.isValid;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {address ? "Editar dirección" : "Agregar nueva dirección"}
          </DialogTitle>
          <DialogDescription>
            Completa los datos de la dirección. Los campos marcados con * son
            obligatorios.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AddressInput control={form.control} name="nombreRecibe" label="Nombre quien recibe" placeholder="Nombre completo"/>
              <AddressInput control={form.control} name="calle" label="Calle" placeholder="Nombre de la calle"/>
              <AddressInput control={form.control} name="numeroExterior" label="Número exterior" placeholder="Número exterior"/>
              <AddressInput control={form.control} name="numeroInterior" label="Número interior" placeholder="Número interior (opcional)" optional />
              <AddressInput control={form.control} name="ciudad" label="Ciudad" placeholder="Ciudad"/>
              <AddressInput control={form.control} name="estado" label="Estado" placeholder="Estado"/>
              <AddressInput control={form.control} name="codigoPostal" label="Código postal" placeholder="Código postal"/>
            </div>
            <AddressTxtArea control={form.control} name="referencia" label="Referencias adicionales" placeholder="Detalles para facilitar la entrega (color de casa, puntos de referencia, etc.)" optional />
            <Button type="submit" className="cursor-pointer" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                  {address ? "Actualizando..." : "Guardando..."}
                </div>
              ) : address ? (
                "Actualizar Dirección"
              ) : (
                "Guardar dirección"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
