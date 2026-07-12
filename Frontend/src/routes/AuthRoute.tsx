import { Route, Routes } from "react-router-dom"
import { FRONT_ROUTES } from "../constants/frontRoutes"
import Login from "../pages/Login"
import Register from "../pages/Register"


function AuthRoute (){
  return (
    <Routes>
         <Route>
            <Route  path={'/'} element={<Login />} />
            <Route  path={FRONT_ROUTES.LOGIN} element={<Login />} />
            <Route  path={FRONT_ROUTES.REGISTER} element={<Register />} />
         </Route>

    </Routes>
  )
}

export default AuthRoute