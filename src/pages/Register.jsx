// Register.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const allowedEmails = [
  "to.shariatpur@brac.net",
  "to.madaripur@brac.net",
  "to.faridpur@brac.net",
  "to.gopalgonj@brac.net",
  "to.rajbari@brac.net",
  "to.bhanga-faridpur@brac.net",
  "to.khulna@brac.net",
  "to.bagerhat@brac.net",
  "to.sathkhira@brac.net",
  "to.jashore@brac.net",
  "to.chuadanga@brac.net",
  "to.jhenaidha@brac.net",
  "to.kustia@brac.net",
  "to.narail@brac.net",
  "to.magura@brac.net",
  "to.meherpur@brac.net",
  "to.barishal@brac.net",
  "to.pirojpur@brac.net",
  "to.patuakhali@brac.net",
  "to.bhola@brac.net",
  "to.barguna@brac.net"
];

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

    if (!allowedEmails.includes(normalizedEmail)) {
      setError("Only authorized BRAC emails can register.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await registerUserWithPin(normalizedEmail, password, pin);
      await updateUserProfile(name);
      navigate("/noncrm");
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="font-semibold mt-4 text-center text-2xl">Register Here</h1>
      <section className="mx-auto max-w-lg bg-gray-200 border-gray-400 shadow-xl rounded-md px-3 py-5 mt-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-2 mx-auto mt-1 md:px-0 bg-gray-200 font-semibold"
        >
          <input
            name="name"
            placeholder="Name"
            className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            onChange={handleChange}
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
            placeholder="PIN (at least 4 digits)"
            pattern="\d{4,}"
            inputMode="numeric"
            className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300"
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
      </section>
    </div>
  );
};

export default Register;
