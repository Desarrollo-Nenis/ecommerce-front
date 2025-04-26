import { LoginData, RegisterData } from "@/interfaces/auth/user.interface";
import { query } from "@/lib/api/server/strapi";
import { BACKEND_ROUTES } from '../../contants/backend-routes/routes';

export async function registerUser(data: RegisterData): Promise<any> {
  return await query<any>(BACKEND_ROUTES.REGISTER, { 
    method: "POST",
    body: data,
  });
}

export async function loginUser(data: LoginData): Promise<any> {
  return await query<any>(BACKEND_ROUTES.LOGIN, {
    method: "POST",
    body: data,
  });
}
