// NonCrm.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzYtFXC2gpFOqA-dau7V3JDHkuzbT3-U2ltmBFVjUgQuLz3YCl5S_1kRmnTPPUSxySF/exec";

const NonCrm = () => {
  const { user, userPin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const dataToSend = {
      action: "saveNonCrmData",
      uid: userPin, // sheet name = PIN
      name: user?.displayName || "",
      email: user?.email || "",
      pin: userPin,
      phone: form.phone.value,
      designation: form.designation.value,
      program: form.program.value,
      comments: form.comments.value,
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        icon: "success",
        title: "Data Submitted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userPin) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Enter your PIN</h2>
        <p className="text-gray-600">PIN is required to submit NonCRM data.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">NonCRM Data Entry</h2>

        <input
          type="text"
          name="phone"
          placeholder="Phone"
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
          placeholder="Problem Details"
          className="input input-bordered w-full h-24"
        ></textarea>

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default NonCrm;
