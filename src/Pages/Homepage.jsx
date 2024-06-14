import { useEffect, useState } from "react";
import SingleProduct from "../components/SingleProduct";
import useAuth from "../hooks/useAuth";

const Homepage = () => {
    const [allproducts,setAllProducts]=useState([]);
    const {user}=useAuth();
    const [filter,setFilter]=useState([]);
   
    useEffect(()=>{
        fetch(`https://product-management-dashbaord-server.vercel.app/products`)
        .then(res=>res.json())
        .then(data=>{setAllProducts(data)
            console.log(data); 
            const filtered=allproducts.filter(product=>product.seller_email!==user.email)
            setFilter(filtered);
        })
    },[allproducts])
        
    
    return (
        <div className="mx-5 min-h-screen">
            <p className="my-5 text-3xl text-orange-700 text-center">Gym Store Products</p>
            <div className="my-4 grid grid-cols-1 lg:grid-cols-3 mx-3 gap-5">
                { 
                    filter.map(product=><SingleProduct isOwn={false} key={product.id} product={product}></SingleProduct>)
                }
            </div>
        </div>
    );
};

export default Homepage;