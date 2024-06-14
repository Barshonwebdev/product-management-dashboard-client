import React from 'react';
import { Link } from 'react-router-dom';
import { CgGym } from "react-icons/cg";
import { FaStore } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaArrowUp } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className='fixed '>
            <p className='text-2xl mx-6 mt-6'><CgGym className='inline text-2xl me-2'></CgGym>Gym Store</p>
           <div className='mt-32 justify-center items-center flex '>
           <div className='flex flex-col text-center space-y-4'>
           <Link className='flex items-center' to={'/'} ><FaStore className='me-2'></FaStore>Store</Link>
           <Link className='flex items-center' to={'/myproducts'} ><CgProfile className='me-2'></CgProfile>My Products</Link>
           <Link className='flex items-center' to={'/addproduct'} ><FaArrowUp className='me-2'></FaArrowUp>Add Product</Link>
           </div>
           </div>
        </div>
    );
};

export default Sidebar;