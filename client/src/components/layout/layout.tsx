import { Outlet } from "react-router-dom";
import Header from "../../components/ui/Header";
import Footer from "../ui/Footer";

const Layout = () => {
    return (
        <>
        <Header/>
        <main className="flex-1 container mx-auto px-4 py-8">
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default Layout