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
import {
  deleteDirection,
  setPrincipal,
} from "@/services/directions/directions-services";
import { useState } from "react";
import { showToastAlert } from "@/components/ui/altertas/toast";
import Swal from "sweetalert2";

interface AddressCardProps {
  address: Address;
  onRefreshCards?: () => void;
  onAddressDefault?: () => void;
}

export function AddressCard({ address, onRefreshCards, onAddressDefault }: AddressCardProps) {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleSetPrincipal = () => {
    if (address.id && address.usuario?.id) {
      setLoading(true);
      setPrincipal(address.documentId!, address.usuario.documentId)
        .then(() => {
          showToastAlert({
            title: "Dirección Principal",
            text: "Dirección establecida como principal correctamente.",
            icon: "success",
            position: "bottom-end",
            toast: true,
          });
          onAddressDefault?.();
        })
        .catch((error) => {
          console.error("Error al establecer como principal:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDelete = () => {
    if (!address.documentId) return;

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la dirección. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingDelete(true);
        deleteDirection(address.documentId!)
          .then(() => {
            showToastAlert({
              title: "Dirección eliminada",
              text: "La dirección se ha eliminado correctamente.",
              icon: "success",
              position: "bottom-end",
              toast: true,
            });
            onRefreshCards?.();
          })
          .catch((error) => {
            console.error("Error al eliminar dirección:", error);
            showToastAlert({
              title: "Error",
              text: "No se pudo eliminar la dirección.",
              icon: "error",
              position: "bottom-end",
              toast: true,
            });
          })
          .finally(() => setLoadingDelete(false));
      }
    });
  };

  return (
    <Card className="h-full w-full max-w-full sm:min-w-[300px] sm:max-w-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Home className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-medium truncate">
            {address.nombreRecibe || "Dirección"}
          </h3>
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
          <div className="text-sm space-y-1 break-words">
            <p>
              {address.calle} {address.numeroExterior}
              {address.numeroInterior && `, Int. ${address.numeroInterior}`}
            </p>
            <p>
              {address.ciudad}, {address.estado}, CP {address.codigoPostal}
            </p>
            {address.referencia && (
              <p className="mt-1 italic break-words whitespace-pre-wrap text-muted-foreground line-clamp-3">
                {address.referencia}
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <div className="flex flex-wrap gap-2">
          {!address.principal && (
            <Button
              onClick={handleSetPrincipal}
              className="cursor-pointer"
              variant="outline"
              size="sm"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                  Estableciendo...
                </div>
              ) : (
                "Establecer como principal"
              )}
            </Button>
          )}
          <AddressDialog address={address} userId={address.usuario?.documentId} onRefreshCard={onRefreshCards}>
            <Button className="cursor-pointer" variant="outline" size="sm">
              <Edit className="mr-2 h-3.5 w-3.5" />
              Editar
            </Button>
          </AddressDialog>
          <Button
            onClick={handleDelete}
            className="cursor-pointer"
            variant="outline"
            size="sm"
            disabled={loadingDelete}
          >
            <Trash2 className="mr-2 h-3.5 w-3.5" />
            {loadingDelete ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                Eliminando...
              </div>
            ) : (
              "Eliminar"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
