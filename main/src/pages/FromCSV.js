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
                setSqlContent(retrieveSQLfromCSV(results.meta.fields , results.data ));
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
    <div>
        <Navbar />
      <h1>CSV to SQL converter</h1>
      <p>
        Upload a csv file or paste your spreadsheet data into this tool. 
        This site generate SQL CREATE TABLE and INSERT INTO TABLE statements that you can copy to your clipboard or download as a file.
        Run the SQL statements in your warehouse and start querying your data.
      </p>
      <Filemenu sqlContent={sqlContent} handleUpload={handleUpload} handleCopy={handleCopy} handleDownload={handleDownload} handlePaste={handlePaste} fileExtension={".csv"} />
      <br/>
      <TextArea placeholder="Your SQL script will appear here..." sqlContent={sqlContent} />
      <AreaForPaste isOpen={isModalOpen} onClose={onClose} setSqlContent={setSqlContent} />
    </div>
  );
};

export default FromCSV;