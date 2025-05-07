import { auth } from "@/auth";
import AddressManagement from "@/components/layout/address/address-management";
import { getUserDirections } from "@/services/directions/directions-services";

export default async function Home() {

  const session = await auth();
  if( !session?.user?.user.documentId ){
    return (
      <div>
        no
      </div>
    )
  }
  const address = await getUserDirections( session?.user?.user.documentId );
  
  return (
    <main className="container mx-auto px-4 py-8">
      <AddressManagement address={address.data} />
    </main>
  )
}
