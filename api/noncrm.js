// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const googleScriptURL = "https://script.google.com/macros/s/AKfycbw3wGdoiW_ojJB9bQMGgS56bjSlTDTaYtjbzVX9O0ZH52lRhbsFUX4FOFrDi0HhOp_FzA/exec";

//     const response = await fetch(googleScriptURL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(req.body),
//     });

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// }
