import React from "react";
import { useState } from "react";



const TableCols = ({cols , onColsChange})=>{
    //All'inizio le colonne selezionate sono tutte
    const [selectedCols , setSelectedCols] = useState(cols); 

    //Funzione da chiamare all'onChange dell'input 
   function handleColChange(e) {
    const colAffected = e.target.value;
    //Se avessi usato direttamente la variabile di stato , non avrebbe funzionato perchè l'aggiornamento di  stato è asincrono
    setSelectedCols((prevSelected) => {
      let newSelected;
      if (prevSelected.includes(colAffected)) {
        newSelected = prevSelected.filter((c) => c !== colAffected);
      } else {
        newSelected = [...prevSelected, colAffected];
      }

      // Notifichiamo il componente padre con il nuovo stato corretto
      onColsChange(newSelected);

      return newSelected;
    });
  }


return (
    <table>
        <thead>
            <tr>
                {cols.map((col, index) => (
                    <th key={index}>
                        <label>
                            <input
                                type="checkbox"
                                value = {col}
                                checked={selectedCols.includes(col)}
                                onChange={handleColChange}
                            />
                            {col}
                        </label>
                    </th>
                ))}
            </tr>
        </thead>
    </table>
)

}



export default TableCols;