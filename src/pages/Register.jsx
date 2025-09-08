// Register.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyb6NMBAl9pWFJdanDGkLl-ZFNOymEmdg3FDKRSVe_WMzTaHfIobO_vlXJ73ojYkYSY/exec";

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

    // ✅ Validation
    if (!name || !email || !password || !confirmPassword || !pin) {
      setError("All fields are required");
      return;
    }

    if (!email.endsWith("@brac.net")) {
      setError("Please use your official BRAC email");
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
      // 🔹 Firebase registration + save PIN in Firestore
      const res = await registerUserWithPin(email, password, pin);

      // 🔹 Update display name
      await updateUserProfile(name);

      // 🔹 Use PIN as sheet name
      const sheetName = pin;

      // 🔹 Create sheet for user in Google Sheets
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "createUserSheet",
          uid: sheetName, // sheet name = PIN
          email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // 🔹 Reset form
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
