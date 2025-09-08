// api/proxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch(
        "https://script.google.com/a/macros/brac.net/s/AKfycbyMHQlIPcwQfbUY1atm9x18eFj-mGQu_I4CmbmFaqJnIRy-T6Nt2YA8V3SS_bDuDsDD6w/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        }
      );
      const data = await response.text(); // Apps Script returns text
      res.status(200).send(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
