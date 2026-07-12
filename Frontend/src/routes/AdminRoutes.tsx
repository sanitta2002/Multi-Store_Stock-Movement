import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Stores from "../pages/Stores";
import Stock from "../pages/Stock";
import Transfers from "../pages/Transfers";
import { FRONT_ROUTES } from "../constants/frontRoutes";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route element={<DashboardLayout />}>
        <Route
          path={FRONT_ROUTES.DASHBOARD}
          element={<Dashboard />}
        />

        <Route
          path={FRONT_ROUTES.PRODUCTS}
          element={<Products />}
        />

        <Route
          path={FRONT_ROUTES.STORES}
          element={<Stores />}
        />

        <Route
          path={FRONT_ROUTES.STOCK}
          element={<Stock />}
        />

        <Route
          path={FRONT_ROUTES.TRANSFERS}
          element={<Transfers />}
        />
      </Route>
      </Route>
    </Routes>
  );
}