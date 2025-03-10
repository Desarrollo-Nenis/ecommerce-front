"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  selectedAddress: z.string().optional(),
  addNewAddress: z.boolean().default(false),
  firstName: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  lastName: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
  address: z
    .string()
    .min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
  city: z.string().min(2, { message: "La ciudad es requerida." }),
  state: z.string().min(1, { message: "El estado es requerido." }),
  postalCode: z
    .string()
    .min(5, { message: "El código postal debe tener al menos 5 caracteres." }),
  country: z.string().min(1, { message: "El país es requerido." }),
  phone: z
    .string()
    .min(10, { message: "El teléfono debe tener al menos 10 dígitos." }),
  shippingMethod: z.enum(["standard", "express"]),
  saveAddress: z.boolean().default(false),
});

const savedAddresses = [
  { id: "1", label: "Casa - Calle 123, CDMX" },
  { id: "2", label: "Oficina - Av. Reforma 456, CDMX" },
];

export function AddressForm() {
  const [hasSavedAddresses, setHasSavedAddresses] = useState(
    savedAddresses.length > 0
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedAddress: hasSavedAddresses ? savedAddresses[0].id : undefined,
      addNewAddress: !hasSavedAddresses,
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "MX",
      phone: "",
      shippingMethod: "standard",
      saveAddress: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {hasSavedAddresses && (
          <FormField
            control={form.control}
            name="selectedAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecciona una dirección guardada</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una dirección" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {savedAddresses.map((addr) => (
                      <SelectItem key={addr.id} value={addr.id}>
                        {addr.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="addNewAddress"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <FormLabel>Ingresar una nueva dirección</FormLabel>
            </FormItem>
          )}
        />

        {form.watch("addNewAddress") && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle Principal 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad de México" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="CDMX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="55 1234 5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saveAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Guardar esta dirección para futuras compras
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="shippingMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Método de envío</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="standard" id="standard" />
                    <label htmlFor="standard" className="cursor-pointer">
                      Estándar (3-5 días hábiles) - Gratis
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="express" id="express" />
                    <label htmlFor="express" className="cursor-pointer">
                      Express (1-2 días hábiles) - $99.00
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
