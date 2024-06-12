import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared-Components/Navbar';
import Footer from '../components/Shared-Components/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;