import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            drawer
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;