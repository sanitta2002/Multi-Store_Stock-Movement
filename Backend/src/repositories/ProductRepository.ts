import { injectable } from "tsyringe";
import { ProductModel, IProduct } from "@/models/product/productModel";
import { IProductRepository } from "@/interface/repositories/IProductRepository";

@injectable()
export class ProductRepository implements IProductRepository {
  async create(data: Partial<IProduct>): Promise<IProduct> {
    return await ProductModel.create(data);
  }

 async findAll(
  page: number,
  limit: number,
  search: string
): Promise<{ products: IProduct[]; total: number }> {

  const query = {
    name: {
      $regex: search,
      $options: "i",
    },
  };

  const total = await ProductModel.countDocuments(query);

  const products = await ProductModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    products,
    total,
  };
}
  async findById(id: string): Promise<IProduct | null> {
    return await ProductModel.findById(id);
  }

  async update(
    id: string,
    data: Partial<IProduct>
  ): Promise<IProduct | null> {
    return await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }

  async findBySku(sku: string): Promise<IProduct | null> {
    return await ProductModel.findOne({ sku });
  }
}