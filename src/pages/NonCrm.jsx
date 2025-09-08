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
      pin: userPin,
      name: user?.displayName,
      email: user?.email,
      phone: form.phone.value,
      designation: form.designation.value,
      program: form.program.value,
      comments: form.comments.value,
    };

    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setMessage(result.message || "✅ Data saved successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save data.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Non-CRM Data Entry</h2>

        <input type="tel" name="phone" placeholder="Phone Number" className="input input-bordered w-full" required />
        <input type="text" name="designation" placeholder="Designation" className="input input-bordered w-full" required />
        <input type="text" name="program" placeholder="Program" className="input input-bordered w-full" required />
        <textarea name="comments" placeholder="Problem Details" className="input input-bordered w-full"></textarea>

        <button type="submit" className="btn btn-primary w-full">Submit</button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default NonCrm;
