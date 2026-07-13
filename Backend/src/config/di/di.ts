import { container } from "tsyringe";

import { UserRepository } from "@/repositories/UserRepository";
import { AuthService } from "@/services/AuthService";
import { PasswordHasher } from "@/utils/PasswordHasher/PasswordHasher";
import { JwtService } from "@/jwt/services/JwtService";
import { IProductRepository } from "@/interface/repositories/IProductRepository";
import { ProductRepository } from "@/repositories/ProductRepository";
import { IProductService } from "@/interface/services/IProductService";
import { ProductService } from "@/services/ProductService";
import { IStoreRepository } from "@/interface/repositories/IStoreRepository";
import { StoreRepository } from "@/repositories/StoreRepository";
import { IStoreService } from "@/interface/services/IStoreService";
import { StoreService } from "@/services/StoreService";
import { IStockRepository } from "@/interface/repositories/IStockRepository";
import { StockRepository } from "@/repositories/StockRepository";
import { IStockService } from "@/interface/services/IStockService";
import { StockService } from "@/services/StockService";
import { ITransferService } from "@/interface/services/ITransferService";
import { TransferService } from "@/services/TransferService";
import { IShopperService } from "@/interface/services/IShopperService";
import { ShopperService } from "@/services/ShopperService";


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

container.registerSingleton<IStoreRepository>(
  "IStoreRepository",
  StoreRepository
);

container.registerSingleton<IStoreService>(
  "IStoreService",
  StoreService
);

container.registerSingleton<IStockRepository>(
  "IStockRepository",
  StockRepository
);

container.registerSingleton<IStockService>(
  "IStockService",
  StockService
);
container.registerSingleton<ITransferService>(
    "ITransferService",
    TransferService
);

container.registerSingleton<IShopperService>(
    "IShopperService",
    ShopperService
);