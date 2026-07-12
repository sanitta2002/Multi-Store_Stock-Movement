import { IUser } from "@/models/user/userModel";

export interface IAuthService {
  register(
    name: string,
    email: string,
    password: string,
    role?: "admin" | "user"
  ): Promise<{
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }>;

  login(
    email: string,
    password: string
  ): Promise<{
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }>;
 refreshToken(refreshToken: string): Promise<string> 
}           
  