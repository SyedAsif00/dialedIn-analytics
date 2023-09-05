import React from "react";

function FileUploadComponent({ onFileChange, loading }) {
  return (
    <div>
      <input type="file" accept=".xlsx" onChange={onFileChange} />
      {loading ? <p>Loading data...</p> : ""}
    </div>
  );
}

export default FileUploadComponent;
