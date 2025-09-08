// Register.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Firebase + Firestore PIN
      const res = await registerUserWithPin(email, password, pin);
      await updateUserProfile(name);

      // Create user sheet in Apps Script
      await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "createUserSheet", uid: pin, email }),
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
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" required />
        <input type="email" name="email" placeholder="Email (BRAC Only)" className="input input-bordered w-full" required />
        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
        <input type="password" name="confirmPassword" placeholder="Retype Password" className="input input-bordered w-full" required />
        <input type="text" name="pin" placeholder="PIN" className="input input-bordered w-full" required />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
