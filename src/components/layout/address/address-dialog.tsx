"use client";

import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Address } from "@/interfaces/directions/directions.interface";
import { addressFormSchema, AddressFormValues } from "./address-schema";
import { DialogTrigger } from "@/components/ui/dialog";
import { createDirection } from "@/services/directions/directions-services";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddressDialogProps {
  address?: Address | null;
  children: ReactNode;
}

export function AddressDialog({ address, children }: AddressDialogProps) {
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
    const now = new Date();

    const newAddress: Address = {
      ...values,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
    };

    if (!address) {
      // Crear nueva dirección
      createDirection(newAddress)
        .then((res) => {
          console.log("Dirección creada:", res);
          // Aquí podrías cerrar el diálogo, actualizar lista, etc.
        })
        .catch((err: any) => {
          console.error("Error al crear dirección:", err.message);
        });
    } else {
      // Lógica para actualizar (puedes implementar una función updateDirection)
      const { createdAt, ...payload } = newAddress;
      console.log("Actualizar dirección:", payload);
    }
  }

  const isFormValid = form.formState.isValid;
  const isButtonDisabled = !isFormValid || !isEditing;

  return (
    <TooltipProvider>
      <Dialog>
        <DialogTrigger>
          <div>{children}</div>
        </DialogTrigger>
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
                <FormField
                  control={form.control}
                  name="nombreRecibe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del usuario *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="calle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calle *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de la calle" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numeroExterior"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número exterior *</FormLabel>
                      <FormControl>
                        <Input placeholder="Número exterior" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numeroInterior"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número interior</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Número interior (opcional)"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ciudad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ciudad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado *</FormLabel>
                      <FormControl>
                        <Input placeholder="Estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codigoPostal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código postal *</FormLabel>
                      <FormControl>
                        <Input placeholder="Código postal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="referencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referencias adicionales</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detalles para facilitar la entrega (color de casa, puntos de referencia, etc.)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Button type="submit" disabled={isButtonDisabled}>
                      {address ? "Actualizar Dirección" : "Guardar dirección"}
                    </Button>
                  </TooltipTrigger>
                  {isButtonDisabled && (
                    <TooltipContent>
                      <span>¡No se han modificado los datos!</span>
                    </TooltipContent>
                  )}
                </Tooltip>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
