import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import Home from "../Pages/Dashboard";
import Inventory from "../Pages/Inventory"
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Plans from "../Pages/Subscriptions";
import NotFoundPage from "../Pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registro" element={<Register/>}/>
          
          <Route element={<Layout/>}>

            <Route index element={<Home />} />
            <Route path="/inventario" element={<Inventory/>}/>
            <Route path="/perfil" element={<Profile/>}/>
            <Route path="/planes" element={<Plans/>}/>
          </Route>
          I<Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}
