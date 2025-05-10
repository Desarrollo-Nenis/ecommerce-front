import { auth } from "@/auth";
import { BasketGrid } from "@/components/layout/cart/basket";
import { ModalAuth } from "@/modules/common/components/auth/modalAuth";
import { getUserDirections } from "@/services/directions/directions-services";

export default async function CartPage() {
  const session = await auth();
  const address = await getUserDirections( session?.user?.user.documentId! );

  if (!session?.user?.user.documentId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ModalAuth />
      </div>
    );
  }

  return <BasketGrid session={session} addresses={address} />;
}
