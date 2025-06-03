import { auth } from "@/auth";
import { BasketGrid } from "@/modules/cart/basket";
import { Button } from "@/components/ui/button";
import { ModalAuth } from "@/modules/common/components/auth/modalAuth";
import { getUserDirections } from "@/services/directions/directions-services";
import { getInfoEcommerce } from "@/services/informacion-tienda/informacion-tienda-services";
import Link from "next/link";

export default async function CartPage() {
  const session = await auth();
  const  informacionTienda = await getInfoEcommerce()
  
  if (!session?.user?.user.documentId) {
    return (
     
       <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl font-bold mb-6">{`Bienvenido a ${ informacionTienda.data.nombre}`}</h1>
        <p className="text-xl mb-8 max-w-md">Descubre asombrosos productos a excelentes precios. Comienza a comprar ahora!</p>
        <div className="flex gap-4">
            <ModalAuth />
          <Button variant="outline" size="lg">
            <Link href="/">Buscar Products</Link>
          </Button>
        </div>
      </div>
    </div>
    );
  }

  const address = await getUserDirections(session?.user?.user.documentId);
  return <BasketGrid session={session} addresses={address.data} />;
}
