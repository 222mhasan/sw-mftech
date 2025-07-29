// Register.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
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
    </form>
  );
};

export default Register;
