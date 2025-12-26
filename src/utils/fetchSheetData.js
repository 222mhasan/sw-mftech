// src/utils/fetchSheetData.js
export const fetchSheetData = async (sheetName = "AllReports") => {
  const SHEET_ID = "1a3G8tapGb_hhx_Xgk0v7vGmvjCXkAxBo4amUynOAgXo";

  /* ---------- 1️⃣ Try OpenSheet ---------- */
  try {
    const res = await fetch(
      `https://opensheet.elk.sh/${SHEET_ID}/${sheetName}`
    );

    if (!res.ok) throw new Error("OpenSheet failed");

    return await res.json(); // already dynamic
  } catch (error) {
    console.warn(
      `OpenSheet failed for "${sheetName}". Falling back to GViz...`
    );

    /* ---------- 2️⃣ GViz Fallback (Dynamic Columns) ---------- */
    const res = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
        sheetName
      )}`
    );

    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));

    const headers = json.table.cols.map(col => col.label);

    return json.table.rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row.c[index]?.v ?? "";
      });
      return obj;
    });
  }
};




// // src/utils/fetchSheetData.js
// export const fetchSheetData = async (sheetName = "AllReports") => {
//   const SHEET_ID = "1a3G8tapGb_hhx_Xgk0v7vGmvjCXkAxBo4amUynOAgXo"; // your Google Sheet ID

//   // Try OpenSheet first
//   try {
//     const res = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/${sheetName}`);
//     if (!res.ok) throw new Error("OpenSheet failed");
//     return await res.json();
//   } catch (error) {
//     console.warn(`OpenSheet failed for "${sheetName}". Falling back to GViz...`, error);

//     // Fallback to GViz
//     const res = await fetch(
//       `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`
//     );
//     const text = await res.text();
//     const json = JSON.parse(text.substring(47).slice(0, -2));

//     return json.table.rows.map(row => ({
//       ID: row.c[0]?.v || "",
//       Title: row.c[1]?.v || "",
//       Link: row.c[2]?.v || ""
//     }));
//   }
// };
