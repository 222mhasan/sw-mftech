// Register.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyMHQlIPcwQfbUY1atm9x18eFj-mGQu_I4CmbmFaqJnIRy-T6Nt2YA8V3SS_bDuDsDD6w/exec";

const Register = () => {
  const { registerUserWithPin, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const pin = form.pin.value;

    try {
      // Firebase registration + Firestore PIN
      const res = await registerUserWithPin(email, password, pin);
      await updateUserProfile(name);

      // Create sheet for this user in Google Sheets
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "createUserSheet",
          uid: res.user.uid,
          email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log("Sheet creation response:", result);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/noncrm");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <section className="mx-auto max-w-lg bg-gradient-to-l from-gray-200 to-gray-100 border-gray-400 shadow-xl rounded-md px-6 py-6 border">
        <h1 className="font-semibold mb-6 text-center text-2xl">Register Here</h1>
        <form onSubmit={handleRegister} className="space-y-4 font-semibold">
          <input
            name="name"
            placeholder="Name"
            className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email (BRAC Only)"
            className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            required
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300 pr-10"
              required
            />
            <span
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <input
            name="pin"
            type="tel"
            placeholder="BRAC PIN"
            pattern="\d{4,}"
            inputMode="numeric"
            className="bg-white p-2 w-full border-b-2 rounded-md border-transparent focus:border-gray-500 outline-none transition-all duration-300"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="btn btn-primary text-lg w-full">Register</button>
        </form>
      </section>
    </div>
  );
};

export default Register;
