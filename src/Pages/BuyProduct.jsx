import React from 'react';
import { IoMdMail } from 'react-icons/io';
import { useLoaderData } from 'react-router-dom';

const BuyProduct = () => {
    const productData=useLoaderData();
    console.log(productData);
    const {name,seller_name,seller_email,price,stock,description,photo_url}=productData;
    return (
        <div className='min-h-screen'>
                        <p className="my-5 text-3xl text-orange-700 text-center"> Wanna buy this Product?</p>
                    <div className='flex justify-center mx-5'>
                    <div className="card rounded w-full lg:w-80  bg-opacity-85  shadow-xl">
        <figure className="px-5 pt-5">
          <img src={photo_url}  className="rounded-lg" />
        </figure>
        <div className=" items-center p-5 ">
          <p className=" title-font text-xl"><span className="font-semibold">Seller: </span>{seller_name}</p>
          <p className=" title-font "><IoMdMail className="inline"></IoMdMail> : {seller_email}</p>
          <hr className="mb-5 mt-3" />
          <h2 className="card-title title-font text-2xl">{name}</h2>
          <p className="my-2 title-font ">{description}</p>
          
          <p className="my-2">Price: <span className="text-orange-600 font-semibold">${price}</span></p>
          <p className="my-2">Stock: <span className="text-red-600 font-semibold">{stock}</span> Pieces</p>
        
        </div>
      </div>
                    </div>
            
        </div>
    );
};

export default BuyProduct;