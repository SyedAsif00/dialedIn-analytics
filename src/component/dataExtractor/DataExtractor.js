import * as XLSX from "xlsx";

export async function extractDataFromExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Extract headers (column names) from the first row
        const headers = [];
        const range = XLSX.utils.decode_range(sheet["!ref"]);
        for (let C = range.s.c; C <= range.e.c; C++) {
          const cellAddress = { c: C, r: range.s.r };
          const cellRef = XLSX.utils.encode_cell(cellAddress);
          headers.push(sheet[cellRef].v);
        }

        const data = XLSX.utils.sheet_to_json(sheet);

        console.log("Extracted Data:", data); // Log the extracted data
        console.log("Headers:", headers); // Log the headers

        resolve({ data, columns: headers });
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsBinaryString(file);
  });
}
