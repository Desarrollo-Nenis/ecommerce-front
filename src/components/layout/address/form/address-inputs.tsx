import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function AddressInput({ control, name, label, placeholder, optional = false }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{!optional && " *"}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value || (optional ? null : ""))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
