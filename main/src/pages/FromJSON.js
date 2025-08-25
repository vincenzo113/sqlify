import React from "react";
import Navbar from "../components/Navbar";


const FromJSON = () => {
    


    return (
        <div className="from-json-page">
            <Navbar />
            <div className="from-json-content">
                <div className="from-json-header">
                    <h1 className="from-json-title">JSON to SQL</h1>
                    <p className="from-json-description">
                        Convert your JSON data into SQL queries effortlessly.
                    </p>
                </div>
            </div>
        </div>
    )
}



export default FromJSON;