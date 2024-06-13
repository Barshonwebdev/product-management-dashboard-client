import { Outlet } from "react-router-dom";
import Drawer from "../Sidebar-Drawer/Drawer";
import Sidebar from "../Sidebar-Drawer/Sidebar";

const Dashboard = () => {
    return (
        <div className="grid md:grid-flow-col">
           <div className="bg-orange-700 text-white min-h-screen col-span-2 hidden md:block">
           <Sidebar></Sidebar>
           </div>
           <div className="md:hidden">
           <Drawer></Drawer>
           </div>
            <div className="md:col-span-10">
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;