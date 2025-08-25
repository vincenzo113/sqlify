import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Filemenu from "../components/Filemenu";
import { copySQL, downloadSQL, retrieveSQLfromCSV } from "../utils/Function";
import AreaForPaste from "../components/AreaForPaste";
import * as XLSX from "xlsx";
import TextArea from "../components/TextArea";
import "../style/pages/FromExcel.css";

const FromExcel = () => {
  const [sqlContent, setSqlContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const dataObjects = XLSX.utils.sheet_to_json(ws);
      const headers = dataObjects.length > 0 ? Object.keys(dataObjects[0]) : [];

      const sql = retrieveSQLfromCSV(headers, dataObjects);
      setSqlContent(sql);
    };

    reader.readAsBinaryString(file);
  };

  const handleCopy = () => {
    copySQL(sqlContent);
  };

  const handleDownload = () => {
    downloadSQL(sqlContent);
  };

  const handlePaste = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="from-excel-page">
      <Navbar />
      <div className="from-excel-content">
        <div className="from-excel-header">
          <h1 className="from-excel-title">Excel to SQL</h1>
          <p className="from-excel-description">
            Upload an Excel file or paste your spreadsheet data into this tool.
            This app generates SQL <code>CREATE TABLE</code> and{" "}
            <code>INSERT INTO</code> statements that you can copy or download.
            Run the SQL in your database and start querying your data.
          </p>
        </div>

        <div className="from-excel-sections">
          <div className="from-excel-card filemenu-section">
            <Filemenu
              sqlContent={sqlContent}
              handleUpload={handleUpload}
              handleCopy={handleCopy}
              handleDownload={handleDownload}
              handlePaste={handlePaste}
              fileExtension=".xlsx"
            />
          </div>

          <div className="from-excel-card textarea-section">
            <TextArea
              placeholder="Your SQL script will appear here..."
              sqlContent={sqlContent}
            />
          </div>
        </div>
      </div>

      <AreaForPaste
        isOpen={isModalOpen}
        onClose={onClose}
        setSqlContent={setSqlContent}
      />
    </div>
  );
};

export default FromExcel;