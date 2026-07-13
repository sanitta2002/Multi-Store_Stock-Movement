import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { ITransferService } from "@/interface/services/ITransferService";
import { SuccessMessage } from "@/constant/successMessage";

@injectable()
export class TransferController {
  constructor(
    @inject("ITransferService")
    private readonly _transferService: ITransferService
  ) {}

  async transferStock(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        productId,
        fromStoreId,
        toStoreId,
        quantity,
      } = req.body;

      await this._transferService.transferStock(
        productId,
        fromStoreId,
        toStoreId,
        quantity
      );

      return res.status(200).json({
        success: true,
        message: SuccessMessage.STOCK_TRANSFERRED_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  }
}