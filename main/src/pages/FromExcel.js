import React from "react";
import Navbar from "../components/Navbar";
import Filemenu from "../components/Filemenu";
import { useState } from "react";
import { copySQL, downloadSQL, retrieveSQLfromCSV } from "../utils/Function";
import AreaForPaste from "../components/AreaForPaste";
import * as XLSX from 'xlsx';
import TextArea from "../components/TextArea";

const FromExcel = () => {

  const [sqlContent , setSqlContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
  


    const onClose = ()=>{
      setIsModalOpen(false);
    }


  const handleUpload = (event) => {
  console.log("file uploaded");
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    const bstr = evt.target.result;
    const wb = XLSX.read(bstr, { type: 'binary' });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];

    // Ottieni array di oggetti , senza prendere l'intestazione
    const dataObjects = XLSX.utils.sheet_to_json(ws); 
   //Qui ottengo l'intestazione
    const headers = dataObjects.length > 0 ? Object.keys(dataObjects[0]) : [];
    
    // Genera SQL

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
    <div>
        <Navbar />
      <h1>Import Data from Excel</h1>
        <p>
        Upload a excel file or paste your spreadsheet data into this tool. 
        This site generate SQL CREATE TABLE and INSERT INTO TABLE statements that you can copy to your clipboard or download as a file.
        Run the SQL statements in your warehouse and start querying your data.
      </p>
      <Filemenu sqlContent={sqlContent} handleUpload={handleUpload} handleCopy={handleCopy} handleDownload={handleDownload} handlePaste={handlePaste} fileExtension={".xlsx"} />
      <TextArea placeholder="Your SQL script will appear here..." sqlContent={sqlContent} />
      <AreaForPaste isOpen={isModalOpen} onClose={onClose} setSqlContent={setSqlContent} />
    </div>
  );
};

export default FromExcel;
