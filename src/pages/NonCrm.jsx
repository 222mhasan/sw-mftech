import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const GOOGLE_SHEET_API =
  "https://script.google.com/macros/s/AKfycbyrxvWK--EXM3-cmaBPhmIkzKPCXDS97201Kri23Wqr1Cf-RxJl5VIIjs8EKRQ3cKcp8w/exec";

const NonCRM = () => {
  const { user, userPin, setUserPin } = useContext(AuthContext); // Make sure AuthContext provides setUserPin
  const [formData, setFormData] = useState({
    phone: "",
    designation: "",
    program: "",
    comments: "",
  });
  const [pinInput, setPinInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      name: user?.displayName || "",
      email: user?.email || "",
      pin: userPin || "",
      phone: formData.phone,
      designation: formData.designation,
      program: formData.program,
      comments: formData.comments,
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyrxvWK--EXM3-cmaBPhmIkzKPCXDS97201Kri23Wqr1Cf-RxJl5VIIjs8EKRQ3cKcp8w/exec", {
        method: "POST",
        mode: "no-cors", // Bypass CORS
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      alert("✅ Data submitted Successfully !");
      setFormData({ phone: "", designation: "", program: "", comments: "" });
    } catch (error) {
      setMessage("❌ Submission failed: " + error.message);
    }

    setLoading(false);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim()) {
      localStorage.setItem("userPin", pinInput.trim());
      setUserPin(pinInput.trim());
    }
  };

  // 👉 Show PIN entry page if PIN is missing
  if (!userPin) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Enter your PIN</h2>
        <form onSubmit={handlePinSubmit} className="space-y-4">
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your PIN"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Continue
          </button>
        </form>
      </div>
    );
  }

  // 👉 Main form once PIN is available
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Non-CRM Data Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <input type="hidden" name="pin" value={userPin || ""} />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="input input-bordered w-full"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="designation"
          placeholder="Designation"
          className="input input-bordered w-full"
          value={formData.designation}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="program"
          placeholder="Program"
          className="input input-bordered w-full"
          value={formData.program}
          onChange={handleChange}
          required
        />

        <textarea
          name="comments"
          placeholder="Comments"
          className="textarea textarea-bordered w-full"
          value={formData.comments}
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default NonCRM;
