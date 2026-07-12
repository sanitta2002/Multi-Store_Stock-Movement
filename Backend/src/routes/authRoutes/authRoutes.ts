import { AUTH_ROUTES } from "@/constant/Routes";
import { AuthController } from "@/controllers/AuthController";
import { Router } from "express";
import { container } from "tsyringe";


const router = Router();

const authController  = container.resolve(AuthController);

router.post(AUTH_ROUTES.REGISTER, (req, res, next) =>
  authController.register(req, res, next)
);

router.post(AUTH_ROUTES.LOGIN, (req, res, next) =>
  authController.login(req, res, next)
);
router.post(AUTH_ROUTES.REFRESH_TOKEN, (req, res, next) =>
  authController.refreshToken(req, res, next)
);

export default router;