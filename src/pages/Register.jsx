// Register.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwbdiYrcaA6XwNNzYS4fkG8bZfQ9_v3bVlXRHV3RXywTxe7Mar0vzbyDB1AvJHkkTLb/exec";

const Register = () => {
  const { registerUserWithPin, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const pin = form.pin.value.trim();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Firebase registration + save PIN
      const { user } = await registerUserWithPin(email, password, pin);

      // Update display name
      await updateUserProfile(name);

      // Create user sheet in Apps Script using PIN as sheet name
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "createUserSheet",
          pin, // sheet name = PIN
          email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      form.reset();
      navigate("/noncrm");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (BRAC Only)"
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Retype Password"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="pin"
          placeholder="PIN (will be your sheet name)"
          className="input input-bordered w-full"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
