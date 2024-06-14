import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { googleSignin, signinUser } = useAuth();
  const navigate=useNavigate();
  const location=useLocation();
  const from=location?.state?.from?.pathname || '/';
  const onSubmit = (data) => {
    
    
    signinUser(data.email, data.password).then(() => {
      reset();
      
        navigate(from);
      
    });
  };
  const handleGoogleLogin = () => {
    googleSignin()
    .then(data=>{
      console.log(data);
      if(data?.user?.email){
        const userInfo={
          email:data?.user?.email,
          name:data?.user?.displayName,
        }
        fetch(`https://product-management-dashbaord-server.vercel.app/user`,{
          method:"POST",
          headers: {
            "Content-type":"application/json"
          },
          body:JSON.stringify(userInfo)
        })
        .then((res)=>res.json())
        .then(data=>{
          localStorage.setItem('token',data?.token)
          console.log(data)})
      }
      navigate(from);
    })
    
  };
  return (
      <div className=" bg-base-200 min-h-screen flex items-center">
        <div className="hero  ">
          <div className="hero-content flex-col ">
            <div className="text-center  px-5 ">
              <h1 className="text-5xl text-orange-600 my-3 font-bold title-font">Gym Store</h1>
             
            </div>
            <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="px-1 text-2xl">Sign in your account!</h1>
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
                  <div>                    
                  </div>
                </div>
                <div className="form-control mt-6 gap-2">
                  <button className="btn hover:bg-orange-800 text-white bg-orange-600">
                    Login
                  </button>
                  <p className="text-center">Or,</p>
                  <button
                    onClick={handleGoogleLogin}
                    className="btn bg-white text-black hover:bg-base-300"
                  >
                    <FcGoogle className="text-xl"></FcGoogle> Continue with
                    Google
                  </button>
                 
                  <small className="text-center">
                    By continuing, you agree to Gym Store&apos;s Terms of
                    Service; and acknowledge you&apos;ve read our Privacy
                    Policy.
                  </small>
                  <hr className="w-36 mx-auto" />
                  <Link to="/register" className="mx-auto">
                    <p className=" text-sm font-semibold">
                      Not yet on Gym Store? Sign up!
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Login;
