// Register.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUserWithPin, updateUserProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pin: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { name, email, password, pin } = formData;

    if (!name || !email || !password || !pin) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await registerUserWithPin(email, password, pin);
      await updateUserProfile(name);
      navigate("/noncrm");
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="font-semibold mt-4 text-center text-2xl">Register Here</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md mx-auto mt-10 px-1 md:px-0"
      >
        <input
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          onChange={handleChange}
        />
        <input
          name="pin"
          placeholder="PIN"
          className="input input-bordered w-full"
          onChange={handleChange}
        />
        <button className="btn btn-primary w-full">Register</button>
        {error && <p className="text-red-500">{error}</p>}
        {/* Already have an account */}
                <p>
                  Already have an account ?{" "}
                  <Link
                    to="/auth/login"
                    className="underline text-blue-500 font-semibold text-md"
                  >
                    Login Here
                  </Link>
                </p>
      </form>
    </div>
  );
};

export default Register;
