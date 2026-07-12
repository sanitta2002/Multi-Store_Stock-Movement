import { Router } from "express";
import { container } from "tsyringe";

import { StockController } from "@/controllers/StockController";
import { authMiddleware } from "@/middleware/authMiddleware";
import { adminMiddleware } from "@/middleware/adminMiddleware";
import { STOCK_ROUTES } from "@/constant/Routes";

const router = Router();

const stockController = container.resolve(StockController);


router.post(
  STOCK_ROUTES.CREATE,
  authMiddleware,
  adminMiddleware,
  (req, res, next) =>
    stockController.createStock(req, res, next)
);

router.get(
  STOCK_ROUTES.GET_ALL,
  authMiddleware,
  adminMiddleware,
  (req, res, next) =>
    stockController.getStocks(req, res, next)
);


router.get(
  STOCK_ROUTES.GET_BY_ID,
  authMiddleware,
  adminMiddleware,
  (req, res, next) =>
    stockController.getStockById(req, res, next)
);


router.put(
  STOCK_ROUTES.UPDATE,
  authMiddleware,
  adminMiddleware,
  (req, res, next) =>
    stockController.updateStock(req, res, next)
);


router.delete(
  STOCK_ROUTES.UPDATE,
  authMiddleware,
  adminMiddleware,
  (req, res, next) =>
    stockController.deleteStock(req, res, next)
);

export default router;