import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IStockService } from "@/interface/services/IStockService";
import { SuccessMessage } from "@/constant/successMessage";

@injectable()
export class StockController {
  constructor(
    @inject("IStockService")
    private readonly _stockService: IStockService
  ) {}

  async createStock(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, storeId, quantity } = req.body;

      const stock = await this._stockService.createStock(
        productId,
        storeId,
        quantity
      );

      return res.status(201).json({
        success: true,
        message: SuccessMessage.STOCK_CREATED_SUCCESSFULLY,
        stock,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStocks(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const result = await this._stockService.getStocks(
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

  async getStockById(req: Request, res: Response, next: NextFunction) {
    try {
      const stock = await this._stockService.getStockById(
        req.params.id as string
      );

      return res.status(200).json({
        success: true,
        stock,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const stock = await this._stockService.updateStock(
        req.params.id as string,
        req.body.quantity
      );

      return res.status(200).json({
        success: true,
        message: SuccessMessage.STOCK_UPDATE_SUCCESSFULLY,
        stock,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteStock(req: Request, res: Response, next: NextFunction) {
    try {
      await this._stockService.deleteStock(req.params.id as string);

      return res.status(200).json({
        success: true,
        message: SuccessMessage.STOCK_DELETE_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  }
}