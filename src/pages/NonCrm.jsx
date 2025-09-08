import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const APPS_SCRIPT_URL = "/api/proxy";

const NonCrm = () => {
  const { user, userPin } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!userPin) {
      setMessage("❌ User PIN not found. Please log in again.");
      return;
    }

    const form = e.target;
    const data = {
      action: "saveNonCrmData",
      pin: userPin,
      name: form.name.value || "",
      email: user?.email || "",
      phone: form.phone.value || "",
      designation: form.designation.value || "",
      program: form.program.value || "",
      comments: form.comments.value || "",
    };

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result;
      try {
        result = await res.json();
      } catch {
        result = { status: "success", message: "Data sent to Apps Script" };
      }

      if (result.status === "success") {
        setMessage("✅ Data saved successfully!");
        form.reset();
      } else {
        setMessage(`❌ Failed to save data: ${result.message}`);
      }
    } catch (err) {
      console.error("NonCrm submission error:", err);
      setMessage(`❌ Failed to save data: ${err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">NonCrm Form</h2>

        <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" />
        <input type="text" name="phone" placeholder="Phone" className="input input-bordered w-full" />
        <input type="text" name="designation" placeholder="Designation" className="input input-bordered w-full" />
        <input type="text" name="program" placeholder="Program" className="input input-bordered w-full" />
        <textarea name="comments" placeholder="Comments" className="textarea textarea-bordered w-full" />

        <button type="submit" className="btn btn-primary w-full">Save</button>
        {message && <p className="text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default NonCrm;
