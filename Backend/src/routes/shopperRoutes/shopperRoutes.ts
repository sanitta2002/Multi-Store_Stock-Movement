import { Router } from "express";
import { container } from "tsyringe";

import { ShopperController } from "@/controllers/ShopperController";
import { authMiddleware } from "@/middleware/authMiddleware";

const router = Router();

const shopperController = container.resolve(ShopperController);

router.get(
  "/products",
  authMiddleware,
  (req, res, next) =>
    shopperController.getProducts(req, res, next)
);

router.get(
  "/products/:id",
  authMiddleware,
  (req, res, next) =>
    shopperController.getProductById(req, res, next)
);


router.get(
  "/stocks",
  authMiddleware,
  (req, res, next) =>
    shopperController.getStocks(req, res, next)
);


router.get(
  "/stocks/:id",
  authMiddleware,
  (req, res, next) =>
    shopperController.getStockById(req, res, next)
);

export default router;