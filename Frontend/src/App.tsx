import AdminRoutes from "./routes/AdminRoutes";
import AuthRoute from "./routes/AuthRoute";
import ShopperRoutes from "./routes/ShopperRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
   <>
     <AuthRoute />
     <AdminRoutes/>
     <ShopperRoutes/>
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
   </>
  
  );
}

export default App;

