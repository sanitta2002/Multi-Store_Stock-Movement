import AdminRoutes from "./routes/AdminRoutes";
import AuthRoute from "./routes/AuthRoute";
import ShopperRoutes from "./routes/ShopperRoutes";



function App() {
  return (
   <>
     <AuthRoute />
     <AdminRoutes/>
     <ShopperRoutes/>
   </>
  
  );
}

export default App;
