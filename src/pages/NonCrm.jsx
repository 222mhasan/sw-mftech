// NonCrm.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyMHQlIPcwQfbUY1atm9x18eFj-mGQu_I4CmbmFaqJnIRy-T6Nt2YA8V3SS_bDuDsDD6w/exec";

const NonCrm = () => {
  const { user, userPin } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const form = e.target;
    const data = {
      action: "saveNonCrmData",
      uid: user?.uid,
      name: user?.displayName || "",
      email: user?.email || "",
      pin: userPin,
      phone: form.phone.value,
      designation: form.designation.value,
      program: form.program.value,
      comments: form.comments.value,
    };

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log("Data submission response:", result);

      if (result.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data Submitted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: result.message,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.message,
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Non-CRM Data Entry</h2>

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="bg-white p-2 w-full rounded-md border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          className="bg-white p-2 w-full rounded-md border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          required
        />
        <input
          type="text"
          name="program"
          placeholder="Program"
          className="bg-white p-2 w-full rounded-md border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          required
        />
        <textarea
          name="comments"
          placeholder="Problem Details"
          className="bg-white p-2 w-full rounded-md border-b-2 border-transparent focus:border-gray-500 outline-none transition-all duration-300"
          required
        ></textarea>

        <button type="submit" className="btn btn-accent w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default NonCrm;
