// Register.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

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
    const normalizedEmail = email.trim().toLowerCase();

    if (!name || !email || !password || !confirmPassword || !pin) {
      setError("All fields are required");
      return;
    }

    if (!normalizedEmail.endsWith("@brac.net")) {
      setError("Please use your Official Email (*****@brac.net)");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!/^\d{4,}$/.test(pin)) {
      setError("PIN must be at least 4 digits and numeric only");
      return;
    }

    try {
      const res = await registerUserWithPin(normalizedEmail, password, pin);
      await updateUserProfile(name);

      // sweet alert

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/noncrm");
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen mt-12">
      
      <section className="mx-auto max-w-lg bg-gray-200 border-gray-400 shadow-xl rounded-md px-3 py-5 border  ">
        <h1 className="font-semibold mb-4 text-center text-2xl">Register Here</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-3 font-semibold bg-gray-200"
        >
          <input
            name="name"
            placeholder="Name"
            className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email (BRAC Only)"
            className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            onChange={handleChange}
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300 pr-10"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-type Password"
              className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300 pr-10"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* PIN Field */}
          <input
            name="pin"
            type="tel"
            placeholder="PIN "
            pattern="\d{4,}"
            inputMode="numeric"
            className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            onChange={handleChange}
            required
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
      </section>
    </div>
  );
};

export default Register;
