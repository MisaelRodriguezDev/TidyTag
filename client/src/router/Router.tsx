import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import Home from "../Pages/Dashboard";
import Inventory from "../Pages/Inventory"

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>

            <Route index element={<Home />} />
            <Route path="/inventario" element={<Inventory/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
