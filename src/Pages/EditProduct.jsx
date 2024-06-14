import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Editpost = () => {
    
    const { user } = useAuth();
    const productData=useLoaderData();
    console.log(productData);
    
    const[name,setName]=useState(productData.name);
    const[description,setDescription]=useState(productData.description);
    const[photo,setPhoto]=useState(productData.photo_url);
    const[price,setPrice]=useState(productData.price);
    const[stock,setStock]=useState(productData.stock);


  const token = localStorage.getItem("token");
  const [thisUser, setThisUser] = useState({});
  useEffect(() => {
    fetch(`https://product-management-dashbaord-server.vercel.app/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setThisUser(data));
  }, [user?.email]);
  const handleEditProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const price = form.price.value;
    const stock = form.stock.value;
    const description = form.description.value;
    const photo_url = form.photo_url.value;
    
    const productUpdateData = {
      
      
      name,
      description,
      photo_url,
      price,
      stock,
      
    };

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://product-management-dashbaord-server.vercel.app/editproduct/${productData._id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productUpdateData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire("Product Edited!!");
            form.reset();
          });
      }
    });
  };
    return (
        <div >
      <div>
      <p className="my-5 text-3xl text-orange-700 text-center">Edit Product</p>
        <div className="hero  ">
          <div className="hero-content  flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-sm shadow-amber-900 shadow-2xl bg-base-100">
              <form
                onSubmit={handleEditProduct}
                className="card-body grid grid-cols-2 gap-x-10"
              >
               
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="input input-bordered"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
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
                    placeholder="origin"
                    className="input input-bordered"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
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
                    placeholder="color"
                    className="input input-bordered"
                    value={stock}
                    onChange={(e)=>setStock(e.target.value)}
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
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
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
                    value={photo}
                    onChange={(e)=>setPhoto(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mt-6 col-span-2">
                <button className="btn text-white bg-orange-700 hover:bg-orange-800">
                    Edit product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Editpost;