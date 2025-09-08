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

    // Data to send
    const data = {
      action: "saveNonCrmData",
      pin: userPin, // sheet name = user's PIN
      name: form.name.value || "",
      email: user?.email || "",
      phone: form.phone.value || "",
      designation: form.designation.value || "",
      program: form.program.value || "",
      comments: form.comments.value || "",
    };

    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === "success") {
        setMessage("✅ Data saved successfully!");
        form.reset();
      } else {
        setMessage("❌ Failed to save data.");
      }
    } catch (err) {
      console.error("NonCrm submission error:", err);
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
