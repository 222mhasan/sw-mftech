import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { userLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);

    //user login
    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        alert("Login Successful");
        navigate("/nonCrm");
      })
      .catch((error) => {
        alert("Login Failed: " + error.message);
      });
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-center font-semibold text-2xl my-5">Login Here</h1>
      {/* login area */}
      <section className="mx-auto w-fit">
        <form
          onSubmit={handleSubmit}
          className="space-y-2 max-w-md mx-auto mt-10 px-1 md:px-0"
        >
          {/* email */}

          <input
            required
            name="email"
            type="email"
            className="bg-white p-2 w-full border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            placeholder="Email"
          />

          {/* password */}

          <input
            required
            name="password"
            type="password"
            className="bg-white p-2 w-full border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            placeholder="Password"
          />

          <button className="btn btn-accent text-lg w-full">Login</button>
        </form>

        {/* don't have an account */}
        <p className="mt-2">
          Dont't have an account ?{" "}
          <Link
            to="/auth/register"
            className="underline text-blue-500 font-semibold text-md"
          >
            Register Here
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
