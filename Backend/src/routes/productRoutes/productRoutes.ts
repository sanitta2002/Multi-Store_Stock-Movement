import { PRODUCT_ROUTES } from "@/constant/Routes";
import { ProductController } from "@/controllers/ProductController";
import { adminMiddleware } from "@/middleware/adminMiddleware";
import { authMiddleware } from "@/middleware/authMiddleware";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

const productController = container.resolve(ProductController);

router.post(PRODUCT_ROUTES.CREATE,authMiddleware,adminMiddleware,(req,res,next)=>productController.createProduct(req,res,next))
router.get(PRODUCT_ROUTES.GET_ALL,authMiddleware,adminMiddleware,(req,res,next)=>productController.getProducts(req,res,next))
router.get(PRODUCT_ROUTES.GET_BY_ID,authMiddleware,adminMiddleware,(req,res,next)=>productController.getProductById(req,res,next))
router.put(PRODUCT_ROUTES.UPDATE,authMiddleware,adminMiddleware,(req,res,next)=>productController.updateProduct(req,res,next))
router.delete(PRODUCT_ROUTES.DELETE,authMiddleware,adminMiddleware,(req,res,next)=>productController.deleteProduct(req,res,next))


export default router;