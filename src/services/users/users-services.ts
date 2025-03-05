import { DataUser, User } from "@/interfaces/users/users.interace";
import { query } from "@/lib/api/server/strapi";

export function getUser(): Promise<DataUser> {
  return query<DataUser>("usuarios?populate=*")
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

export function getMeInfo(userId: string): Promise<User> {
  const q = `usuarios?filters[usuario][documentId][$eq]=${userId}`;
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
