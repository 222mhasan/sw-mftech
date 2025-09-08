// NonCrm.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx5uIxOzNi4cPWs09WoeXC0m68H-qLY07IAIjlsmzASBX52IM2aG4YVTGm7STViPXRK/exec";

const NonCrm = () => {
  const { user, userPin } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const form = e.target;
    const data = {
      action: "saveNonCrmData",
      uid: user?.uid,
      email: user?.email,
      pin: userPin,
      name: user?.displayName || "",
      phone: form.phone.value,
      designation: form.designation.value,
      program: form.program.value,
      comments: form.comments.value,
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // necessary for Apps Script
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setMessage("✅ Data saved successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save data.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">NonCrm Form</h2>

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="program"
          placeholder="Program"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="comments"
          placeholder="Comments / Problem Details"
          className="input input-bordered w-full h-24"
        ></textarea>

        <button type="submit" className="btn btn-primary w-full">
          Save
        </button>

        {message && <p className="text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default NonCrm;
