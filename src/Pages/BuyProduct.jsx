import React from "react";
import { IoMdMail } from "react-icons/io";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";
const BuyProduct = () => {
    const productData = useLoaderData();
   
  console.log(productData);
  const {
    _id,
    name,
    seller_name,
    seller_email,
    price,
    stock,
    description,
    photo_url,
  } = productData;
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
  console.log(price);
  return (
    <div className="min-h-screen">
      <p className="my-5 text-3xl text-orange-700 text-center">
        {" "}
        Wanna buy this Product?
      </p>
      <div className="flex justify-center mx-5">
        <div className="card rounded w-full lg:w-80  bg-opacity-85  shadow-xl">
          <figure className="px-5 pt-5">
            <img src={photo_url} className="rounded-lg" />
          </figure>
          <div className=" items-center p-5 ">
            <p className=" title-font text-xl">
              <span className="font-semibold">Seller: </span>
              {seller_name}
            </p>
            <p className=" title-font ">
              <IoMdMail className="inline"></IoMdMail> : {seller_email}
            </p>
            <hr className="mb-5 mt-3" />
            <h2 className="card-title title-font text-2xl">{name}</h2>
            <p className="my-2 title-font ">{description}</p>

            <p className="my-2">
              Price:{" "}
              <span className="text-orange-600 font-semibold">${price}</span>
            </p>
            <p className="my-2">
              Stock: <span className="text-red-600 font-semibold">{stock}</span>{" "}
              Pieces
            </p>
          </div>
        </div>
        
      </div>
      <div className=" flex flex-col lg:mx-80 mx-10 mt-10 ">
      <Elements stripe={stripePromise}>
                <CheckoutForm name={name} id={_id} price={price}></CheckoutForm>
            </Elements>
      
      </div>
    </div>
  );
};

export default BuyProduct;
