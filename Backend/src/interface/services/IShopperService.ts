import { IProduct } from "@/models/product/productModel";
import { IStock } from "@/models/stock/stockModel";

export interface IShopperService {

  getProducts(
    page:number,
    limit:number,
    search:string
  ):Promise<{
    products:IProduct[];
    total:number;
    page:number;
    totalPages:number;
  }>;

  getProductById(
    id:string
  ):Promise<IProduct|null>;

  getStocks(
    page:number,
    limit:number
  ):Promise<{
    stocks:IStock[];
    total:number;
    page:number;
    totalPages:number;
  }>;

  getStockById(
    id:string
  ):Promise<IStock|null>;

}