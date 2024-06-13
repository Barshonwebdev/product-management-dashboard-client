import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const [confirm, setConfirm] = useState(true);
  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pass = form.password.value;
    const confirmPass = form.confirmPassword.value;
    if (pass !== confirmPass) {
      setConfirm(false);
      alert("Write your password again correctly");
      e.target.reset();
    }

    if (pass === confirmPass) {
      createUser(email, pass).then((data) => {
        console.log(data);
        if (data?.user?.email) {
          const userInfo = {
            email: data?.user?.email,
            name: name
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
        e.target.reset();
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
          <form onSubmit={handleSignup} className="card-body">
            <h1 className="px-1 text-2xl">Create your account!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirm your password"
                className="input input-bordered"
                required
              />
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
