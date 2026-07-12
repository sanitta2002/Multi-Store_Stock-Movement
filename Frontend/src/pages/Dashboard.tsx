
import { Package, Store, ArrowRightLeft, TrendingUp } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { Card, CardContent } from "../components/common/Card";

export default function Dashboard() {
  const stats = [
    { name: "Total Products", value: "0", icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Active Stores", value: "0", icon: Store, color: "text-green-600", bg: "bg-green-100" },
    { name: "Total Stock Items", value: "0", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Recent Transfers", value: "0", icon: ArrowRightLeft, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader 
        title="Admin Dashboard" 
        description="Overview of your stores, products, and stock movements." 
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.name}>
            <CardContent className="flex items-center p-6">
              <div className={`p-3 rounded-lg ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{item.value}</dd>
                </dl>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <CardContent>
            <div className="text-center py-10 text-gray-500">
              No recent activity to display.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
