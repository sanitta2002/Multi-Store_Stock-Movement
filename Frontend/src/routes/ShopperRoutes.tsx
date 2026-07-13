import { Route, Routes } from "react-router-dom";
import { FRONT_ROUTES } from "../constants/frontRoutes";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import ShopperLayout from "../components/layout/ShopperLayout";
import ShopperDashboard from "../pages/ShopperDashboard";

export default function ShopperRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
      <Route element={<ShopperLayout />}>
        <Route
          path={FRONT_ROUTES.SHOP}
          element={<ShopperDashboard />}
        />
      </Route>
      </Route>
    </Routes>
  );
}