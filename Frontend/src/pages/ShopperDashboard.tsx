import { useEffect, useState } from "react";
import { Package, Search, MapPin, Box } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { useShopper } from "../hooks/useShopper";

export default function ShopperDashboard() {
  const { products, stocks, isLoading, error, fetchShopperData } = useShopper();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchShopperData();
  }, [fetchShopperData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchShopperData(searchTerm);
  };

  const getProductStock = (productId: string) => {
    return stocks.filter((stock) => stock.product._id === productId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Product Catalog"
        description="Browse our collection of products and check availability at our various store locations."
      />

      <form onSubmit={handleSearch} className="relative max-w-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for products by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products
            .map((product) => {
              // Only consider stock records that actually have quantity > 0
              const productStock = getProductStock(product._id).filter((s) => s.quantity > 0);
              const totalStock = productStock.reduce((acc: number, curr) => acc + curr.quantity, 0);
              return { product, productStock, totalStock };
            })
            .filter(({ totalStock }: { totalStock: number }) => totalStock > 0) // Only show available items
            .map(({ product, productStock, totalStock }) => {
            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="p-6 border-b border-gray-50 flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                      <Package className="h-6 w-6" />
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        totalStock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {totalStock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 font-mono tracking-wider mb-3">
                    SKU: {product.sku}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description || "No description available."}
                  </p>
                </div>

                <div className="bg-gray-50 p-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    Store Availability
                  </h4>
                  {productStock.length > 0 ? (
                    <ul className="space-y-3">
                      {productStock.map((stock) => (
                        <li
                          key={stock._id}
                          className="flex justify-between items-center text-sm"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">
                              {stock.store.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {stock.store.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Box
                              className={`h-4 w-4 ${
                                stock.quantity > 0 ? "text-green-500" : "text-gray-400"
                              }`}
                            />
                            <span
                              className={`font-semibold ${
                                stock.quantity > 0 ? "text-gray-900" : "text-gray-400"
                              }`}
                            >
                              {stock.quantity}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm text-gray-500 italic text-center py-2">
                      Not available in any store yet.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">We couldn't find any products matching your search.</p>
        </div>
      )}
    </div>
  );
}
