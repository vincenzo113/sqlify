import React from "react";
import Navbar from "../components/Navbar";
import Filemenu from "../components/Filemenu";
import { retrieveSQLfromCSV , downloadSQL , copySQL} from "../utils/Function";
import TextArea from "../components/TextArea";
import { useState } from "react";
import AreaForPaste from "../components/AreaForPaste";



const FromJSON = () => {
    
const [sqlContent , setSqlContent] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);


const onClose = ()=>{
  setIsModalOpen(false);
}


//filemenu handlers: 
const handleUpload = (event)=>{

}


const handleCopy = ()=>{
copySQL(sqlContent);
}


const handleDownload = ()=>{
downloadSQL(sqlContent);
}


const handlePaste = () =>{
setIsModalOpen(true);
}


    return (
        <div className="from-json-page">
            <Navbar />
            <div className="from-json-content">
                <div className="from-json-header">
                    <h1 className="from-json-title">JSON to SQL</h1>
                    <p className="from-json-description">
                        Convert your JSON data into SQL queries effortlessly.
                    </p>
                    <div>
                        <Filemenu
              sqlContent={sqlContent}
              handleUpload={handleUpload}
              handleCopy={handleCopy}
              handleDownload={handleDownload}
              handlePaste={handlePaste}
              fileExtension=".json"
            />
            <div className="from-csv-card textarea-section">
            <TextArea
              placeholder="Your SQL script will appear here..."
              sqlContent={sqlContent}
            />
          </div>

          <AreaForPaste
        isOpen={isModalOpen}
        onClose={onClose}
        setSqlContent={setSqlContent}
        extension={"JSON"}
      />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default FromJSON;