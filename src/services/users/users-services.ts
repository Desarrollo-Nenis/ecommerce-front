import { User } from "@/interfaces/auth/user.interface";
import { query } from "@/lib/api/server/strapi";

export function getUser(): Promise<User> {
  return query<User>("usuarios?populate=*")
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(
        "Something terrible happened whe getting the users:",
        error
      );
      throw error;
    });
}

export function getMeInfo( id: string ): Promise<User> {
  const q = `usuarios/${id}?populate=*`;
  console.log(q);
  return query<User>(q)
    .then((res: User) => {
      return res;
    })
    .catch((error: any) => {
      console.error(
        "Something terrible happened whe getting the users:",
        error
      );
      throw error;
    });
}
