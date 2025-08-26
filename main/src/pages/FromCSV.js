import React from "react";
import Navbar from "../components/Navbar";
import Filemenu from "../components/Filemenu";
import TextArea from "../components/TextArea";
import Papa from "papaparse";
import { useEffect } from "react";
import { useState } from "react";
import { retrieveSQLfromCSV , downloadSQL , copySQL} from "../utils/Function";
import '../style/pages/FromCSV.css'
import AreaForPaste from "../components/AreaForPaste";

const FromCSV = () => {

     const [sqlContent , setSqlContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = ()=>{
      setIsModalOpen(false);
    }


    const handleUpload = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
  header: true,
  complete: function(results) {
    const cleanedData = results.data
      .map(row => {
        const newRow = {};
        Object.keys(row).forEach(key => {
          newRow[key] = row[key].trim() === "" ? null : row[key]; // rimuove anche spazi
        });
        return newRow;
      })
      // Rimuove righe completamente vuote
      .filter(row => Object.values(row).some(value => value !== null));

    setSqlContent(retrieveSQLfromCSV(results.meta.fields, cleanedData));
  }
});
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
    <div className="from-csv-page">
      <Navbar />
      <div className="from-csv-content">
        <div className="from-csv-header">
          <h1 className="from-csv-title">CSV to SQL</h1>
          <p className="from-csv-description">
            Upload a CSV file or paste your spreadsheet data into this tool.
            This app generates SQL <code>CREATE TABLE</code> and{" "}
            <code>INSERT INTO</code> statements that you can copy or download.
            Run the SQL in your database and start querying your data.
          </p>
        </div>

        <div className="from-csv-sections">
          <div className="from-csv-card filemenu-section">
            <Filemenu
              sqlContent={sqlContent}
              handleUpload={handleUpload}
              handleCopy={handleCopy}
              handleDownload={handleDownload}
              handlePaste={handlePaste}
              fileExtension=".csv"
            />
          </div>

          <div className="from-csv-card textarea-section">
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
        extension={"CSV"}
      />
    </div>
  );
};

export default FromCSV;