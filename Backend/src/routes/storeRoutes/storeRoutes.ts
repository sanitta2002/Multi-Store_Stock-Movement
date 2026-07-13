import { STORE_ROUTES } from "@/constant/Routes";
import { StoreController } from "@/controllers/StoreController";
import { adminMiddleware } from "@/middleware/adminMiddleware";
import { authMiddleware } from "@/middleware/authMiddleware";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

const storeController = container.resolve(StoreController);

router.post(
  STORE_ROUTES.CREATE,
  authMiddleware,
  adminMiddleware,
  (req, res, next) => storeController.createStore(req, res, next),
);
router.get(
  STORE_ROUTES.GET_ALL,
  authMiddleware,
  adminMiddleware,
  (req, res, next) => storeController.getStores(req, res, next),
);

router.get(
  STORE_ROUTES.GET_BY_ID,
  authMiddleware,
  adminMiddleware,
  (req,res,next)=>storeController.getStoreById(req,res,next)
);

router.put(STORE_ROUTES.UPDATE, authMiddleware, adminMiddleware, (req, res, next) =>
  storeController.updateStore(req, res, next),
);

router.delete(STORE_ROUTES.DELETE, authMiddleware, adminMiddleware, (req, res, next) =>
  storeController.deleteStore(req, res, next),
);

export default router;
