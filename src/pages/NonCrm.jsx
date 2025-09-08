// NonCrm.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

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
      field1: form.field1.value,
      field2: form.field2.value,
    };

    try {
      // ✅ Send data via Vercel proxy to Google Apps Script
      await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
          type="text"
          name="field1"
          placeholder="Field 1"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="field2"
          placeholder="Field 2"
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Save
        </button>

        {message && <p className="text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default NonCrm;
