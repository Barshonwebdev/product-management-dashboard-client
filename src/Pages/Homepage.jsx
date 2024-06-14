import { useEffect, useState } from "react";
import SingleProduct from "../components/SingleProduct";

const Homepage = () => {
    const [allproducts,setAllProducts]=useState([]);
    
    useEffect(()=>{
        fetch(`http://localhost:5000/products`)
        .then(res=>res.json())
        .then(data=>{setAllProducts(data)
            console.log(data);
        })
    },[])
    return (
        <div className="mx-5 min-h-screen">
            <p className="my-5 text-3xl text-orange-700 text-center">Gym Store Products</p>
            <div className="my-4 grid grid-cols-1 lg:grid-cols-3 mx-3 gap-5">
                {
                    allproducts.map(product=><SingleProduct isOwn={false} key={product.id} product={product}></SingleProduct>)
                }
            </div>
        </div>
    );
};

export default Homepage;