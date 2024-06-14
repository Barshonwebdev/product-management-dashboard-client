import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import SingleProduct from '../components/SingleProduct';

const MyProducts = () => {
    const {user}=useAuth();
    const [myproducts,setMyProducts]=useState([]);
    
    useEffect(()=>{
        fetch(`https://product-management-dashbaord-server.vercel.app/products/${user?.email}`)
        .then(res=>res.json())
        .then(data=>{setMyProducts(data)
            console.log(data);
        })
    },[])
    const handleDeleteInstant=(id)=>{
        setMyProducts(myproducts.filter((post)=>post._id!==id));
      }
    return (
        <div className="mx-5 min-h-screen">
            <p className="my-5 text-3xl text-orange-700 text-center">Your Products</p>
            <div className="my-4 grid grid-cols-1 lg:grid-cols-3 mx-3 gap-5">
                {
                    myproducts.map(product=><SingleProduct onDelete={handleDeleteInstant} isOwn={true} key={product.id} product={product}></SingleProduct>)
                }
            </div>
        </div>
    );
};

export default MyProducts;