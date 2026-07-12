
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function ShopperLayout() {
  return (
    <div className="flex h-screen bg-gray-50 flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
