// import React, { useContext, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";

// // Replace with your actual Apps Script URL
// const GOOGLE_SHEET_URL =
//   "https://script.google.com/macros/s/AKfycbyrxvWK--EXM3-cmaBPhmIkzKPCXDS97201Kri23Wqr1Cf-RxJl5VIIjs8EKRQ3cKcp8w/exec";

// const NonCRM = () => {
//   const { user, userPin } = useContext(AuthContext);
//   const [formStatus, setFormStatus] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = new FormData(e.target);
//     const data = {
//       name: form.get("name"),
//       phone: form.get("phone"),
//       designation: form.get("designation"),
//       email: user?.email || "", // logged-in email
//       pin: userPin || "",       // PIN from registration
//     };

//     fetch(GOOGLE_SHEET_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.text())
//       .then((text) => {
//         try {
//           const json = JSON.parse(text);
//           if (json.status === "success") {
//             setFormStatus("success");
//           } else {
//             setFormStatus("error");
//           }
//         } catch (err) {
//           console.error("Invalid JSON from server:", text);
//           setFormStatus("error");
//         }
//       })
//       .catch((err) => {
//         console.error("Submit error:", err);
//         setFormStatus("error");
//       });
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center mb-4">Non CRM Form</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-lg">
//         {/* Name */}
//         <div>
//           <label className="block text-sm font-semibold">Name</label>
//           <input type="text" name="name" required className="input w-full" />
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block text-sm font-semibold">Phone</label>
//           <input type="text" name="phone" required className="input w-full" />
//         </div>

//         {/* Designation */}
//         <div>
//           <label className="block text-sm font-semibold">Designation</label>
//           <input type="text" name="designation" required className="input w-full" />
//         </div>

//         {/* Email (shown for info only) */}
//         <div>
//           <label className="block text-sm font-semibold">Email (auto)</label>
//           <input
//             type="email"
//             value={user?.email || ""}
//             disabled
//             className="input w-full bg-gray-200"
//           />
//         </div>

//         {/* PIN (hidden) */}
//         <input type="hidden" name="pin" value={userPin || ""} />

//         <button type="submit" className="btn btn-primary w-full">
//           Submit
//         </button>

//         {formStatus === "success" && (
//           <p className="text-green-600 font-semibold text-center mt-2">
//             ✅ Submitted successfully!
//           </p>
//         )}
//         {formStatus === "error" && (
//           <p className="text-red-600 font-semibold text-center mt-2">
//             ❌ Something went wrong. Try again.
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default NonCRM;
