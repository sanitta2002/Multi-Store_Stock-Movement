import { container } from "tsyringe";

import { UserRepository } from "@/repositories/UserRepository";
import { AuthService } from "@/services/AuthService";
import { PasswordHasher } from "@/utils/PasswordHasher/PasswordHasher";
import { JwtService } from "@/jwt/services/JwtService";


container.register("IUserRepository", {
  useClass: UserRepository,
});

container.register("IAuthService", {
  useClass: AuthService,
});

container.register("IBcryptService", {
  useClass: PasswordHasher,
});

container.register("IJwtService", {
  useClass: JwtService,
});