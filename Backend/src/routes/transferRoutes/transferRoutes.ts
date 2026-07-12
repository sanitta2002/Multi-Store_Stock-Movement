import { Router } from "express";
import { container } from "tsyringe";

import { TransferController } from "@/controllers/TransferController";
import { authMiddleware } from "@/middleware/authMiddleware";
import { adminMiddleware } from "@/middleware/adminMiddleware";

const router = Router();

const transferController = container.resolve(TransferController);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  (req, res, next) =>
    transferController.transferStock(req, res, next)
);

export default router;