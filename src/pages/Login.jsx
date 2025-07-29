import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {

  const {userLogin, setUser} = useContext(AuthContext);
  const navigate = useNavigate();

const handleSubmit = e =>{
  e.preventDefault();
  const form = new FormData(e.target);
  const email = form.get("email");
  const password = form.get("password");
  console.log(email, password);

  //user login
  userLogin(email, password)
  .then(result =>{
    const user = result.user;
    setUser(user);
    navigate("/nonCrm");
  })
  .catch((error) => {
    alert("Login Failed: " + error.message);
  });


}

  return (
    <div>
      <h1 className="text-center font-semibold text-2xl my-5">Login Here</h1>
      {/* login area */}
      <section className="mx-auto w-fit">
        <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {/* email */}
          <label className="label">Email</label>
          <input name="email" type="email" className="input" placeholder="Email" />
          {/* password */}
          <label className="label">Password</label>
          <input name="password" type="password" className="input" placeholder="Password" />

          <button className="btn btn-neutral mt-4">Login</button>
        </form>

        {/* don't have an account */}
        <p>
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
