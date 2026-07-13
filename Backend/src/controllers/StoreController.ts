import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { IStoreService } from "@/interface/services/IStoreService";
import { SuccessMessage } from "@/constant/successMessage";



@injectable()
export class StoreController {
  constructor(
    @inject("IStoreService")
    private readonly _storeService: IStoreService
  ) {}

  async createStore(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, location } = req.body;

      const store = await this._storeService.createStore(
        name,
        location
      );

      return res.status(201).json({
        success: true,
        message: SuccessMessage.STORE_CREATED_SUCCESSFULLY,
        store,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStores(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = (req.query.search as string) || "";

      const result = await this._storeService.getStores(
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

  async getStoreById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const store = await this._storeService.getStoreById(
        req.params.id as string
      );

      return res.status(200).json({
        success: true,
        store,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStore(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const store = await this._storeService.updateStore(
        req.params.id as string,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: SuccessMessage.STORE_UPDTAE_SUCCESSULLY,
        store,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteStore(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this._storeService.deleteStore(req.params.id as string);

      return res.status(200).json({
        success: true,
        message: SuccessMessage.STORE_DELETE_SUCCESSULLY,
      });
    } catch (error) {
      next(error);
    }
  }
}