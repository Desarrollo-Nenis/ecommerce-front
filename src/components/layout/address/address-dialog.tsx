"use client";

import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  createDirection,
  updateDirection,
} from "@/services/directions/directions-services";
import { showToastAlert } from "@/components/ui/altertas/toast";
import { useRouter } from "next/navigation";

interface AddressDialogProps {
  address?: Address | null;
  children: ReactNode;
  userId?: string | undefined;
}

export function AddressDialog({
  address,
  children,
  userId,
}: AddressDialogProps) {
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
  const router = useRouter();


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
      // Crear nueva dirección
      createDirection(newAddress, userId!)
        .then((res) => {
          setLoading(false)
          form.reset();
          showToastAlert({
            title: "Dirección Creada",
            text: "La dirección se ah agregado correctamente.",
            icon: "success",
            position: "bottom-end",
            toast: true,
          });
          router.refresh();
        })
        .catch((err: any) => {
          console.error("Error al crear dirección:", err.message);
        });
      } else {
        const { id, ...payload } = newAddress;
        setLoading(false)
        updateDirection(address.documentId!, payload)
          .then(() => {
            showToastAlert({
              title: "Dirección Actualizada",
              text: "La dirección se ah actualizado correctamente.",
              icon: "success",
              position: "bottom-end",
              toast: true,
            });
            router.refresh();
          })
      }
  }

  const isFormValid = form.formState.isValid;

  return (
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
                    <FormLabel>Nombre quien recibe *</FormLabel>
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
                        onChange={(e) => field.onChange(e.target.value || null)}
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
