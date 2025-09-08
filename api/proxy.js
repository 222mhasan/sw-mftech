// api/proxy.js
import fetch from "node-fetch";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwbdiYrcaA6XwNNzYS4fkG8bZfQ9_v3bVlXRHV3RXywTxe7Mar0vzbyDB1AvJHkkTLb/exec";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

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
