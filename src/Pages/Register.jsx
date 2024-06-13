import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const onSubmit = (data) => {
    console.log(data);
   

    if (data.password === data.confirmPassword) {
      createUser(data.email, data.password).then((result) => {
        console.log(result);
        if (result?.user?.email) {
          const userInfo = {
            email: data?.email,
            name:  data?.name
          };
          fetch(`http://localhost:5000/user`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem("token", data?.token);
              console.log(data);
            });
        }
        reset();
        navigate(from);
      });
    }
  };
  return (
    <div className="bg-base-200 hero min-h-screen ">
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-5xl my-2 text-orange-600 font-bold  title-font">
            Gym Store{" "}
          </h1>
        </div>
        <div className="card w-72 md:w-96 shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="px-1 text-2xl">Create your account!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                {...register('name',{required:true, maxLength:20})}
                className="input input-bordered"
                
              />
                    {errors.name?.type === 'required' && <p className="my-1 text-red-600" role="alert">Name is required</p>}
                    {errors.name?.type === 'maxLength' && <p className="my-1 text-red-600" role="alert">Write name within 20 character</p>}

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
              
                type="text"
                placeholder="email"
                className="input input-bordered"
                {...register('email',{required:true,pattern:/[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]/i})}
              />
              {errors.email?.type === 'required' && <p className="my-1 text-red-600" role="alert">Email is required</p>}
              {errors.email?.type === 'pattern' && <p className="my-1 text-red-600" role="alert">Please enter a valid email</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                
                placeholder="password (min 6 character)"
                className="input input-bordered"
                {...register('password',{required:true, minLength:6})}
              />
              {errors.password?.type === 'required' && <p className="my-1 text-red-600" role="alert">password is required</p>}
              {errors.password?.type === 'minLength' && <p className="my-1 text-red-600" role="alert">password must be minimum 6 character</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                
                placeholder="confirm your password"
                className="input input-bordered"
                {...register('confirmPassword',{required:true})}
              />
              {errors.confirmPassword?.type === 'required' && <p className="my-1 text-red-600" role="alert">Confirming password required</p>}
              {
                errors.confirmPassword!==errors.password && <p className="my-1 text-red-600" role="alert">Password didn't match</p>
              }
            </div>

            <button className="btn mt-3  text-white bg-orange-600 hover:bg-orange-800">
              Sign up
            </button>
            <Link to="/login" className="mx-auto mt-5">
              <p className=" text-sm font-semibold">
                Already on Gym Store? Sign in! 
              </p>
            </Link> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
