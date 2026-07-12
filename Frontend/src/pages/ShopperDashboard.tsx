
import { Package, Search } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { Card, CardContent, CardFooter } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";

export default function ShopperDashboard() {
  interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    description: string;
  }

  const products: Product[] = [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Product Catalog"
        description="Browse available products and their stock levels across our stores."
      />

      <div className="mb-6 max-w-md">
        <Input 
          placeholder="Search products..." 
          leftIcon={<Search className="h-5 w-5" />}
        />
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
                <Package className="h-16 w-16 text-gray-400" />
              </div>
              <CardContent className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
                <div className="text-xl font-bold text-blue-600">${product.price}</div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  View Stock Levels
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No products available"
          description="Check back later for our new arrivals."
          icon={<Package className="h-8 w-8 text-gray-400" />}
        />
      )}
    </div>
  );
}
