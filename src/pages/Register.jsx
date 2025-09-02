// Register.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const { registerUserWithPin, updateUserProfile, setUserPin } = useContext(AuthContext);
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

    // Validation
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

    if (!/^\d+$/.test(pin)) {
      setError("PIN must be numeric only");
      return;
    }

    try {
      // Register user and save PIN in Firestore
      const res = await registerUserWithPin(normalizedEmail, password, pin);

      // Update display name
      await updateUserProfile(name);

      // Save PIN in context/localStorage for NonCRM page
      setUserPin(pin);
      localStorage.setItem("userPin", pin);

      // Sweet Alert
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
    <div className="min-h-screen mt-12 flex justify-center items-start">
      <section className="mx-auto max-w-lg bg-gradient-to-l from-gray-200 to-gray-100 border-gray-400 shadow-xl rounded-md px-6 py-8 border">
        <h1 className="font-semibold mb-6 text-center text-2xl">Register Here</h1>
        <form onSubmit={handleSubmit} className="space-y-4 font-semibold">
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

          {/* Password */}
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

          {/* Confirm Password */}
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

          {/* PIN */}
          <input
            name="pin"
            type="tel"
            placeholder="BRAC PIN"
            inputMode="numeric"
            className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary text-lg w-full">Register</button>

          {error && <p className="text-red-500 mt-1">{error}</p>}

          <p className="mt-2 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="underline text-blue-500 font-semibold"
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
