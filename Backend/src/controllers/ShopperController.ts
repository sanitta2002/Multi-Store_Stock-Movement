import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IShopperService } from "@/interface/services/IShopperService";

@injectable()
export class ShopperController {
  constructor(
    @inject("IShopperService")
    private readonly _shopperService: IShopperService,
  ) {}

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const result = await this._shopperService.getProducts(
        page,
        limit,
        search,
      );

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this._shopperService.getProductById(
        req.params.id as string,
      );

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStocks(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await this._shopperService.getStocks(page, limit);

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStockById(req: Request, res: Response, next: NextFunction) {
    try {
      const stock = await this._shopperService.getStockById(
        req.params.id as string,
      );

      return res.status(200).json({
        success: true,
        stock,
      });
    } catch (error) {
      next(error);
    }
  }
}
