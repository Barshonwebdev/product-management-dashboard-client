import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");
    const [thisUser, setThisUser] = useState({});
    useEffect(() => {
      fetch(`https://product-management-dashbaord-server.vercel.app/user/${user?.email}`)
        .then((res) => res.json())
        .then((data) => setThisUser(data));
    }, [user?.email]);
    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const product_name = form.name.value;
        const price = form.price.value;
        const stock = form.stock.value;
        const description = form.description.value;
        const photoURL = form.photo_url.value;
        const seller = form.seller.value;
        const seller_email = thisUser.email;
        const productData = {
          seller_name:seller,
          seller_email,
          product_name,
          description,
          photo_url:photoURL,
          origin,
          price,
          stock
        };
    
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Add!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch("https://product-management-dashbaord-server.vercel.app/productadd", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(productData),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                Swal.fire("Product Added!!");
                form.reset();
              });
          }
        });
      };
    return (
        <div>
            <p className="my-5 text-3xl text-orange-700 text-center">Add Product</p>
        <div className="hero  ">
          <div className="hero-content  flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-sm shadow-orange-700 shadow-2xl bg-base-100">
              <form
                onSubmit={handleAddProduct}
                className="card-body grid grid-cols-2 gap-x-10"
              >
                <div className="form-control col-span-2">
                  <label className="label">
                    <span className="label-text">Seller</span>
                  </label>
                  <input
                    type="text"
                    name="seller"
                    defaultValue={user.displayName}
                    className="input input-bordered"
                    
                    required
                  />
                </div>
                <div className="form-control col-span-2">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="price"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Stock</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="stock"
                    className="input input-bordered"
                    required
                  />
                </div>
                
                <div className="form-control col-span-2">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="description"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control col-span-2">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    name="photo_url"
                    placeholder="photo url"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mt-6 col-span-2">
                  <button className="btn text-white bg-orange-700 hover:bg-orange-800">
                    Add product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AddProduct;