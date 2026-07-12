import { SuccessMessage } from "@/constant/successMessage";
import { IAuthService } from "@/interface/services/IAuthService";
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";


@injectable()
export class AuthController {
    constructor(@inject("IAuthService") private readonly _authService: IAuthService) {}
     async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>{
    try {
      const { name, email, password, role } = req.body;
      const result = await this._authService.register(name, email, password, role);
      res.status(201).json({
        success: true,
        message : SuccessMessage.USER_REGISTERED_SUCCESSFULLY,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this._authService.login(email, password);
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        success: true,
        message : SuccessMessage.USER_LOGGED_IN_SUCCESSFULLY,
        data: result,   
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
  refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ){
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }
      const newAccessToken = this._authService.refreshToken(refreshToken);
      res.status(200).json({
        success: true,
        message : SuccessMessage.TOKEN_REFRESHED_SUCCESSFULLY,
        accessToken: newAccessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}