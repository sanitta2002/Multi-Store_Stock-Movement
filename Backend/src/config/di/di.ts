import { container } from "tsyringe";

import { UserRepository } from "@/repositories/UserRepository";
import { AuthService } from "@/services/AuthService";
import { PasswordHasher } from "@/utils/PasswordHasher/PasswordHasher";
import { JwtService } from "@/jwt/services/JwtService";
import { IProductRepository } from "@/interface/repositories/IProductRepository";
import { ProductRepository } from "@/repositories/ProductRepository";
import { IProductService } from "@/interface/services/IProductService";
import { ProductService } from "@/services/ProductService";


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

container.registerSingleton<IProductRepository>(
  "IProductRepository",
  ProductRepository
);

container.registerSingleton<IProductService>(
  "IProductService",
  ProductService
);