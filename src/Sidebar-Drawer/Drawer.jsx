import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { CgGym, CgProfile } from "react-icons/cg";
import { FaArrowUp } from "react-icons/fa";
const Drawer = () => {
  return (
    <div className="drawer min-h-screen">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn flex justify-center mx-20 md:mx-64 mt-2 bg-orange-700 text-white drawer-button">
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-72 min-h-screen bg-orange-700 text-white rounded-e-3xl">
          {/* Sidebar content here */}
          <p className='text-2xl mx-3 mt-6'><CgGym className='inline text-2xl me-2'></CgGym>Gym Store</p>
          <div className='mt-24  items-center flex '>
           <div className='flex flex-col text-center space-y-4'>
           <Link className='flex items-center' to={'/'} ><FaStore className='me-2'></FaStore>Store</Link>
           <Link className='flex items-center' to={'/myproducts'} ><CgProfile className='me-2'></CgProfile>My Products</Link>
           <Link className='flex items-center' to={'/addproduct'} ><FaArrowUp className='me-2'></FaArrowUp>Add Product</Link>
           </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
