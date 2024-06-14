import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IoMdMail } from "react-icons/io";

const SingleProduct = ({ isOwn,product,onDelete }) => {
  const token=localStorage.getItem('token');

  const {
    _id,
    name,
    price,
    description, 
    stock,
    seller_name,
    seller_email,
    photo_url,
  } = product;
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/products/${_id}`, {
          method: "DELETE",
          headers:{
            'Content-type':'application/json',
            authorization:`Bearer ${token}`
        },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success",
            });
            onDelete(_id);
          });
      }
    });
  };
  return (
    <div>
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
         { isOwn?
           <div className="flex justify-between mt-5">
           <Link to={`/editproduct/${_id}`}><button className="btn bg-white text-orange-600 font-bold">Edit</button></Link>
           <button onClick={handleDelete} className="btn bg-white text-red-700 font-bold">Delete</button>
         </div> : <div>
         <div className=" justify-between mt-5 hidden">
           <button className="btn bg-white text-amber-900 font-bold">Edit</button>
           <button className="btn bg-white text-amber-900 font-bold">Delete</button>
         </div>
         <Link to={`/buyproduct/${_id}`}><button className="btn bg-orange-600 text-white">Buy</button></Link>
         </div>
         }
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
