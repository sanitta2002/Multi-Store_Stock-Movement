import {
  Request,
  Response,
  NextFunction,
} from "express";
import { inject, injectable } from "tsyringe";
import { IProductService } from "@/interface/services/IProductService";
import { SuccessMessage } from "@/constant/successMessage";

@injectable()
export class ProductController {
  constructor(
    @inject("IProductService")
    private readonly _productService: IProductService
  ) {}

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, sku, description } = req.body;

      const product =
        await this._productService.createProduct(
          name,
          sku,
          description
        );

      return res.status(201).json({
        success: true,
        message:SuccessMessage.PRODUCT_CREATED_SUCCESSFULLY,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const result =
        await this._productService.getProducts(
          page,
          limit,
          search
        );

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const product =
        await this._productService.getProductById(
          req.params.id as string
        );

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const product =
        await this._productService.updateProduct(
          req.params.id as string,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:SuccessMessage.PRODUCT_UPDATED_SUCCESSFULLY,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this._productService.deleteProduct(
        req.params.id as string
      );

      return res.status(200).json({
        success: true,
        message: SuccessMessage.PRODUCT_DELETE_SUCCESSULLY,
      });
    } catch (error) {
      next(error);
    }
  }
}