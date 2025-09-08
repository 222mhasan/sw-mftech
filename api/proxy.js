// api/proxy.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycby5Kf1RV02nKugLm6FgOIbh03I-fHRTBBtlTQpCtEGHxVHLSpfmLJvc6HNsYH_AXxk/exec";

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    // Apps Script sometimes returns plain text, parse safely
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { status: "success", message: "Data sent to Apps Script" };
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
