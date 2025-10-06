import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Dashboard";
import Inventory from "../Pages/Inventory"

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/inventario" element={<Inventory/>}/>
        </Routes>
    </BrowserRouter>
  );
}
