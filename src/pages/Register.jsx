// Register.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { registerUserWithPin, updateUserProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pin: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { name, email, password, confirmPassword, pin } = formData;

    if (!name || !email || !password || !confirmPassword || !pin) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
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
          className="bg-white p-2 w-full border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="bg-white p-2 w-full border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          onChange={handleChange}
        />

        {/* Password Field with Eye Toggle */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="bg-white p-2 w-full border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300 pr-10"
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Field with Eye Toggle */}
        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-type Password"
            className="bg-white p-2 w-full border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300 pr-10"
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-3 text-gray-600 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <input
          name="pin"
          placeholder="PIN"
          className="bg-white p-2 w-full border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          onChange={handleChange}
        />

        <button className="btn btn-primary text-lg w-full">Register</button>

        {error && <p className="text-red-500">{error}</p>}

        <p>
          Already have an account?{" "}
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
