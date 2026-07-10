import express from "express";
export class AuthRoutes {
  private _AuthRuter: express.Router;
  constructor() {
    this._AuthRuter = express.Router();
    this.setRoutes();
  }
  private setRoutes() {

  }
  public  getAuthRouter(){
    return this._AuthRuter;
  }
}
