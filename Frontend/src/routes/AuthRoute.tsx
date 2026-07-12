import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute"
import { FRONT_ROUTES } from "../constants/frontRoutes"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"


function AuthRoute (){
  return (
    <Routes>
         <Route>
            <Route  path={'/'} element={<Login />} />
            <Route  path={FRONT_ROUTES.LOGIN} element={<Login />} />
            <Route  path={FRONT_ROUTES.REGISTER} element={<Register />} />
         </Route>

        <Route element = {<ProtectedRoute />}>
         <Route path={FRONT_ROUTES.DASHBOARD} element={<Dashboard />} />

        </Route>
    </Routes>
  )
}

export default AuthRoute