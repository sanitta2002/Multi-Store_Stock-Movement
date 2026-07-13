import {
  Package,
  Store,
  Boxes,
  ArrowRightLeft,
} from "lucide-react";

import { NavLink, } from "react-router-dom";

const menus = [
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
    name: "Stores",
    path: "/stores",
    icon: Store,
  },
  {
    name: "Stock",
    path: "/stock",
    icon: Boxes,
  },
  {
    name: "Transfers",
    path: "/transfers",
    icon: ArrowRightLeft,
  },
];

export default function Sidebar() {




  return (
    <aside className="w-64 bg-black text-white flex flex-col">

      <div className="border-b border-gray-700 p-6">
        <h1 className="text-2xl font-bold">
          StockManager
        </h1>

        <p className="text-sm text-gray-400">
          Multi Store Stock
        </p>
      </div>

      <nav className="mt-6 flex-1">

        {menus.map((menu) => {

          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `mx-3 mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition
                 ${
                   isActive
                     ? "bg-white text-black"
                     : "hover:bg-zinc-800"
                 }`
              }
            >
              <Icon size={20} />

              <span>{menu.name}</span>
            </NavLink>
          );
        })}
      </nav>


    </aside>
  );
}