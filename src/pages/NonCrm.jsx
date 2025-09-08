// NonCrm.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const NonCrm = () => {
  const { user, userPin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    phone: "",
    designation: "",
    program: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      action: "saveNonCrmData",
      uid: user?.uid,
      email: user?.email,
      pin: userPin,
      phone: formData.phone,
      designation: formData.designation,
      program: formData.program,
      comments: formData.comments,
    };

    try {
      // ✅ Send data via Vercel proxy
      await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data Submitted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setFormData({ phone: "", designation: "", program: "", comments: "" });
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Submission failed",
        text: error.message,
        showConfirmButton: true,
      });
    }

    setLoading(false);
  };

  // 👉 Show PIN input if missing
  if (!userPin) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Enter your PIN</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const pin = e.target.pin.value.trim();
            if (pin) localStorage.setItem("userPin", pin);
          }}
          className="space-y-4"
        >
          <input
            type="password"
            name="pin"
            className="input input-bordered w-full"
            placeholder="Enter your PIN"
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Continue
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 font-poppins">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Non-CRM Data Entry
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mx-auto bg-gray-200 w-fit border-gray-400 shadow-xl rounded-md px-3 py-5 border-1"
      >
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="bg-white p-2 w-full rounded-md border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="designation"
          placeholder="Designation"
          className="bg-white p-2 w-full rounded-md border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          value={formData.designation}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="program"
          placeholder="Program"
          className="bg-white p-2 w-full rounded-md border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          value={formData.program}
          onChange={handleChange}
          required
        />

        <textarea
          name="comments"
          placeholder="Problem Details"
          className="bg-white p-2 w-full rounded-md border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          value={formData.comments}
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="btn btn-accent w-full text-md"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default NonCrm;
