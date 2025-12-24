export const fetchSheetData = async () => {
  const SHEET_ID = "1a3G8tapGb_hhx_Xgk0v7vGmvjCXkAxBo4amUynOAgXo"; // your sheet ID
  const SHEET_NAME = "Ongoing"; // your tab name

  // 1️⃣ Try OpenSheet first
  try {
    const res = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`);
    if (!res.ok) throw new Error("OpenSheet failed");
    return await res.json();
  } catch (error) {
    console.warn("OpenSheet failed. Falling back to GViz...", error);

    // 2️⃣ Fallback to GViz
    const res = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`
    );
    const text = await res.text();

    const json = JSON.parse(text.substring(47).slice(0, -2));
    return json.table.rows.map(row => ({
      ID: row.c[0]?.v || "",
      Title: row.c[1]?.v || "",
      Link: row.c[2]?.v || ""
    }));
  }
};
