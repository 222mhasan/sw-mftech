// Register.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx5uIxOzNi4cPWs09WoeXC0m68H-qLY07IAIjlsmzASBX52IM2aG4YVTGm7STViPXRK/exec";

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
    const pin = form.pin.value;

    // ✅ Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Firebase registration + Firestore PIN save
      const res = await registerUserWithPin(email, password, pin);

      // Update display name
      await updateUserProfile(name);

      // Use display name as sheet name (replace spaces with underscores)
      const sheetName = name.replace(/\s+/g, "_");

      // Create sheet for user in Google Sheets
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "createUserSheet",
          uid: sheetName,
          email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Reset form
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
          placeholder="PIN"
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
