import { Outlet } from "react-router-dom";
import Drawer from "../Sidebar-Drawer/Drawer";
import Sidebar from "../Sidebar-Drawer/Sidebar";

const Dashboard = () => {
    return (
        <div className="grid lg:grid-flow-col">
           <div className="bg-orange-700 rounded-e-3xl text-white min-h-screen col-span-2 hidden lg:block">
           <Sidebar></Sidebar>
           </div>
           <div className="lg:hidden">
           <Drawer></Drawer>
           </div>
            <div className="lg:col-span-10  bg-base-200">
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;