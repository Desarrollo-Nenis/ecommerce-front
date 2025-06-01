import { auth } from "@/auth"
import { ProfileLayout } from "@/modules/profile/profile"
import { getMeInfo } from "@/services/users/users-services";

export default async function PerfilUsuario() {

  const sesion = await auth();
  const user = await getMeInfo( sesion?.user?.user.documentId);

  return <ProfileLayout user={user.data} userAvatar={ sesion?.user?.image} />
}
