import { Outlet } from "react-router-dom";
import Drawer from "../Sidebar-Drawer/Drawer";
import Sidebar from "../Sidebar-Drawer/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Dashboard = () => {
    return (
        <div className="grid lg:grid-cols-12 lg:grid-flow-col">
           <div className="bg-orange-700 rounded-e-3xl text-white col-span-2 hidden lg:block">
           <Sidebar></Sidebar>
           </div>
           <div className="lg:hidden">
            <Header></Header>
           <Drawer></Drawer>
           <Footer></Footer>
           </div>
            <div className="lg:col-span-10 hidden lg:block  bg-base-200">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            </div>
        </div>
    );
};

export default Dashboard;